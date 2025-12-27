from rest_framework import viewsets, status
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from django.db.models import Q
from django.conf import settings
from django.core.mail import EmailMessage
import uuid
import logging
import json

from .models import ChatSession, ChatMessage, ChatTicket, CachedResponse
from .serializers import (
    ChatSessionSerializer, ChatMessageSerializer, ChatTicketSerializer,
    ProductChatSerializer, CompanyInfoChatSerializer
)
from .services import CostOptimizedChatbot
from .deepseek_ai import deepseek_service
from api.models import Product, CompanyInfo, Vertical

logger = logging.getLogger(__name__)


class ChatSessionViewSet(viewsets.ModelViewSet):
    """Chat session management"""
    queryset = ChatSession.objects.all()
    serializer_class = ChatSessionSerializer
    lookup_field = 'session_id'
    
    def get_queryset(self):
        return ChatSession.objects.filter(is_active=True)
    
    def create(self, request, *args, **kwargs):
        """Create a new chat session"""
        session_id = str(uuid.uuid4())
        
        session = ChatSession.objects.create(
            session_id=session_id,
            user_ip=request.META.get('REMOTE_ADDR'),
            user_agent=request.META.get('HTTP_USER_AGENT', '')[:500]
        )
        
        serializer = self.get_serializer(session)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@csrf_exempt
def chat_message(request):
    """Handle chat messages with cost optimization"""
    try:
        data = request.data
        session_id = data.get('session_id')
        message = data.get('message', '').strip()
        
        if not session_id or not message:
            return Response({
                'error': 'Session ID and message are required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Get or create session
        session = ChatSession.objects.filter(session_id=session_id, is_active=True).first()
        if not session:
            return Response({'error': 'Invalid session'}, status=status.HTTP_404_NOT_FOUND)
        
        # Save user message
        user_message = ChatMessage.objects.create(
            session=session,
            message_type='user',
            content=message
        )
        
        # Initialize chatbot service
        chatbot = CostOptimizedChatbot()
        
        # Check cached response first (FREE)
        cached_response = chatbot.check_cached_response(message)
        if cached_response:
            bot_message = ChatMessage.objects.create(
                session=session,
                message_type='bot',
                content=cached_response['response'],
                intent=cached_response['intent'],
                confidence=cached_response['confidence'],
                response_data=cached_response['response_data']
            )
            session.update_activity()
            
            return Response({
                'session_id': session_id,
                'message': ChatMessageSerializer(bot_message).data,
                'source': 'cache'
            })
        
        # Try local intent detection (FREE)
        intent_result = chatbot.detect_intent_locally(message)
        intent = intent_result[0] if intent_result else None
        confidence = intent_result[1] if intent_result else 0.0
        
        # Generate template response if intent found and doesn't require AI (FREE)
        if intent and not chatbot.should_use_ai(message, intent):
            # Prepare context for template
            context = {'original_message': message}
            if intent == 'product_search':
                # Search for products to include in response
                products = chatbot.search_products_locally(message)
                context['products'] = products
            
            template_response = chatbot.generate_template_response(intent, context)
            if template_response:
                bot_message = ChatMessage.objects.create(
                    session=session,
                    message_type='bot',
                    content=template_response['response'],
                    intent=intent,
                    confidence=confidence,
                    response_data=context
                )
                session.update_activity()
                
                # Cache the response
                chatbot.cache_response(
                    message, template_response['response'], 
                    context, intent, confidence
                )
                
                return Response({
                    'session_id': session_id,
                    'message': ChatMessageSerializer(bot_message).data,
                    'source': 'template'
                })
        
        # Handle specific intents locally (FREE) - only for non-template handled intents
        response_data = {}
        bot_response = ""
        
        # These are now handled by template responses above
        # product_search, contact_info, categories are handled by generate_template_response
        
        # Handle any remaining specific intents that aren't template-based
        if intent and intent not in ['product_search', 'contact_info', 'categories', 'greeting', 'about_company', 'pricing', 'shipping', 'quality', 'certification', 'ticket_create', 'goodbye']:
            # Fallback for any unhandled intents
            bot_response = "I can help you with product information, contact details, pricing, and more. What would you like to know?"
            confidence = 0.6
        
        # If we have a response, save and return it
        if bot_response:
            bot_message = ChatMessage.objects.create(
                session=session,
                message_type='bot',
                content=bot_response,
                intent=intent,
                confidence=confidence,
                response_data=response_data
            )
            session.update_activity()
            
            # Cache successful responses
            if confidence >= 0.7:
                chatbot.cache_response(message, bot_response, response_data, intent, confidence)
            
            return Response({
                'session_id': session_id,
                'message': ChatMessageSerializer(bot_message).data,
                'source': 'local_processing'
            })
        
        # Only use DeepSeek AI for complex queries or when local processing fails (COST-EFFECTIVE)
        # AI ENABLED with new OpenRouter API key
        if deepseek_service.is_available():
            try:
                # Use AI for general questions, typos, or when confidence is low (COST-EFFECTIVE)
                use_ai = False
                
                # Use AI only for extremely low confidence responses (< 0.3)
                if confidence < 0.3:
                    use_ai = True
                
                # Use AI for specific conversational patterns only
                general_patterns = [
                    'how are you', 'what is your name', 'who are you', 
                    'can you help me', 'tell me about yourself', 'what can you do'
                ]
                
                message_lower = message.lower()
                for pattern in general_patterns:
                    if pattern in message_lower:
                        use_ai = True
                        break
                
                # Use AI for potential typos (very short messages only)
                if len(message.strip()) < 3:
                    use_ai = True
                
                # Use AI for messages that don't match known intents
                if not intent:
                    use_ai = True
                
                # IMPORTANT: Don't use AI for product-related queries
                product_keywords = ['show me', 'products', 'rice', 'ghee', 'spices', 'dairy', 'basmati', 'amul', 'india gate']
                if any(keyword in message_lower for keyword in product_keywords):
                    use_ai = False
                
                if use_ai:
                    # Get recent session history for context
                    session_messages = ChatMessage.objects.filter(
                        session=session
                    ).order_by('-timestamp')[:5]  # Last 5 messages
                    
                    session_history = []
                    for msg in reversed(session_messages):  # Chronological order
                        session_history.append({
                            'message_type': msg.message_type,
                            'content': msg.content
                        })
                    
                    # Generate AI response
                    ai_result = deepseek_service.generate_ai_response(message, session_history)
                    
                    if ai_result['success']:
                        bot_message = ChatMessage.objects.create(
                            session=session,
                            message_type='bot',
                            content=ai_result['response'],
                            intent='ai_assisted',
                            confidence=0.9,
                            ai_tokens_used=ai_result.get('tokens_used', 0),
                            response_data={'source': 'deepseek_ai', 'cached': ai_result.get('cached', False)}
                        )
                        session.update_activity()
                        
                        return Response({
                            'session_id': session_id,
                            'message': ChatMessageSerializer(bot_message).data,
                            'source': 'deepseek_ai'
                        })
                    else:
                        # Use fallback response if AI fails
                        bot_message = ChatMessage.objects.create(
                            session=session,
                            message_type='bot',
                            content=ai_result.get('fallback_response', 'I apologize, but I\'m having trouble understanding. Could you please rephrase your question?'),
                            intent='ai_fallback',
                            confidence=0.6,
                            response_data={'error': ai_result.get('error', 'AI service unavailable')}
                        )
                        session.update_activity()
                        
                        return Response({
                            'session_id': session_id,
                            'message': ChatMessageSerializer(bot_message).data,
                            'source': 'ai_fallback'
                        })
                    
            except Exception as e:
                logger.error(f"DeepSeek AI error: {e}")
                # Continue to fallback response
        
        # Final fallback for unrecognized queries
        bot_response = "I'm here to help! You can ask me about:\n\n• **Products**: \"show me rice products\", \"spices\", \"ghee\"\n• **Contact**: \"phone number\", \"address\"\n• **Categories**: \"baked goods\", \"dairy products\"\n• **Pricing**: \"how much for rice\"\n\nWhat would you like to know?"
        confidence = 0.6
        
        bot_message = ChatMessage.objects.create(
            session=session,
            message_type='bot',
            content=bot_response,
            intent='fallback',
            confidence=confidence,
            response_data={}
        )
        session.update_activity()
        
        return Response({
            'session_id': session_id,
            'message': ChatMessageSerializer(bot_message).data,
            'source': 'fallback'
        })
        
    except Exception as e:
        logger.error(f"Chat message error: {e}")
        return Response({
            'error': 'An error occurred while processing your message'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@csrf_exempt
def create_chat_ticket(request):
    """Create support ticket from chat"""
    try:
        data = request.data
        session_id = data.get('session_id')
        
        # Generate ticket ID
        ticket_id = f"TKT-{timezone.now().strftime('%Y%m%d')}-{uuid.uuid4().hex[:6].upper()}"
        
        ticket = ChatTicket.objects.create(
            session=ChatSession.objects.get(session_id=session_id),
            ticket_id=ticket_id,
            name=data.get('name'),
            email=data.get('email'),
            phone=data.get('phone', ''),
            company=data.get('company', ''),
            subject=data.get('subject'),
            message=data.get('message')
        )
        
        # Send email notification (async)
        try:
            support_email = getattr(settings, 'SUPPORT_EMAIL', 'support@westendcorporation.in')
            subject = f"New Chat Support Ticket: {ticket_id}"
            body = f"""
New support ticket created via chat:

Ticket ID: {ticket_id}
Name: {ticket.name}
Email: {ticket.email}
Phone: {ticket.phone}
Company: {ticket.company}

Subject: {ticket.subject}

Message:
{ticket.message}
"""
            
            email = EmailMessage(
                subject=subject,
                body=body,
                to=[support_email],
                reply_to=[ticket.email]
            )
            email.send(fail_silently=True)
        except Exception as e:
            logger.error(f"Failed to send ticket email: {e}")
        
        return Response({
            'success': True,
            'ticket_id': ticket_id,
            'message': 'Support ticket created successfully. We will contact you soon.'
        })
        
    except Exception as e:
        logger.error(f"Ticket creation error: {e}")
        return Response({
            'error': 'Failed to create support ticket'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def chat_history(request, session_id):
    """Get chat history for a session"""
    try:
        session = ChatSession.objects.filter(session_id=session_id, is_active=True).first()
        if not session:
            return Response({'error': 'Session not found'}, status=status.HTTP_404_NOT_FOUND)
        
        messages = session.messages.all().order_by('timestamp')
        serializer = ChatMessageSerializer(messages, many=True)
        
        return Response({
            'session': ChatSessionSerializer(session).data,
            'messages': serializer.data
        })
        
    except Exception as e:
        logger.error(f"Chat history error: {e}")
        return Response({
            'error': 'Failed to retrieve chat history'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
