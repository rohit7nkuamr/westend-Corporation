"""
DeepSeek AI Integration Service for Westend Corporation Chatbot
Cost-optimized AI responses with database integration
"""

import logging
import json
from typing import Dict, Optional, List
from django.conf import settings
from django.core.cache import cache
from openai import OpenAI
from api.models import Vertical, Product
from .models import ChatMessage

logger = logging.getLogger(__name__)


class DeepSeekAIService:
    """DeepSeek AI service for intelligent chatbot responses"""
    
    def __init__(self):
        self.client = None
        self.api_key = getattr(settings, 'DEEPSEEK_API_KEY', '')
        self.api_base = getattr(settings, 'DEEPSEEK_API_BASE', 'https://api.deepseek.com/v1')
        self.model = getattr(settings, 'DEEPSEEK_MODEL', 'deepseek-chat')
        self.max_tokens = getattr(settings, 'AI_MAX_TOKENS_PER_REQUEST', 150)
        self.temperature = getattr(settings, 'AI_TEMPERATURE', 0.3)
        self.daily_limit = getattr(settings, 'AI_DAILY_TOKEN_LIMIT', 50000)
        self.enable_caching = getattr(settings, 'AI_ENABLE_CACHING', True)
        
        if self.api_key:
            try:
                self.client = OpenAI(
                    api_key=self.api_key,
                    base_url=self.api_base
                )
                logger.info("DeepSeek AI client initialized")
            except Exception as e:
                logger.error(f"Failed to initialize DeepSeek AI client: {e}")
                self.client = None
        else:
            logger.warning("DeepSeek API key not configured")
            self.client = None
    
    def is_available(self) -> bool:
        """Check if DeepSeek AI is available"""
        return self.client is not None and bool(self.api_key)
    
    def check_daily_limit(self) -> bool:
        """Check if daily token limit is exceeded"""
        cache_key = 'ai_daily_tokens'
        daily_tokens = cache.get(cache_key, 0)
        return daily_tokens < self.daily_limit
    
    def track_token_usage(self, tokens_used: int):
        """Track token usage for cost control"""
        cache_key = 'ai_daily_tokens'
        daily_tokens = cache.get(cache_key, 0)
        daily_tokens += tokens_used
        cache.set(cache_key, daily_tokens, 86400)  # Reset after 24 hours
        
        if daily_tokens > self.daily_limit * 0.8:  # 80% warning
            logger.warning(f"AI token usage at 80%: {daily_tokens}/{self.daily_limit}")
    
    def get_database_context(self) -> str:
        """Get relevant database context for AI"""
        try:
            # Get product categories
            verticals = Vertical.objects.filter(is_active=True).order_by('order')
            categories_text = "\n".join([
                f"- {v.title}: {v.description[:100]}... ({Product.objects.filter(vertical=v, is_active=True).count()} products)"
                for v in verticals
            ])
            
            # Get company info
            company_info = {
                "name": "Westend Corporation",
                "business": "International food export from India",
                "address": "X-57, Phase 2, Okhla, New Delhi - 110020",
                "phone": "+91 93119 33481",
                "email": "support@westendcorporation.in",
                "hours": "Monday to Saturday, 9 AM to 6 PM"
            }
            
            context = f"""
WESTEND CORPORATION DATABASE CONTEXT:

COMPANY INFO:
- Name: {company_info['name']}
- Business: {company_info['business']}
- Address: {company_info['address']}
- Phone: {company_info['phone']}
- Email: {company_info['email']}
- Hours: {company_info['hours']}

PRODUCT CATEGORIES:
{categories_text}

AVAILABLE PRODUCTS:
Use the product search function to find specific products based on user queries.
Common products include: rice, ghee, spices, dairy, baked goods, health mixes.

RESPONSE GUIDELINES:
- Always be helpful and professional
- Use database information for accurate responses
- For product inquiries, ask for specific categories or keywords
- Keep responses concise but informative
- Include contact information when relevant
"""
            return context
        except Exception as e:
            logger.error(f"Error getting database context: {e}")
            return "Error retrieving database context"
    
    def generate_ai_response(self, message: str, session_history: List[Dict] = None) -> Dict:
        """Generate AI response using DeepSeek"""
        if not self.is_available():
            return {
                'success': False,
                'error': 'DeepSeek AI not available',
                'fallback_response': self._get_fallback_response(message)
            }
        
        if not self.check_daily_limit():
            return {
                'success': False,
                'error': 'Daily AI token limit exceeded',
                'fallback_response': 'I\'m currently experiencing high demand. Please try again later or contact our support team directly.'
            }
        
        # Check cache first
        if self.enable_caching:
            cache_key = f"ai_response_{hash(message.lower())}"
            cached_response = cache.get(cache_key)
            if cached_response:
                return {
                    'success': True,
                    'response': cached_response,
                    'cached': True,
                    'tokens_used': 0
                }
        
        try:
            # Prepare system message with database context
            system_message = f"""You are a helpful assistant for Westend Corporation, an international food export company based in India.

{self.get_database_context()}

IMPORTANT: 
- Use the database information provided above
- Be concise and helpful
- For typos, try to understand the intent
- Always prioritize accuracy over creativity
- If you don't know something, admit it politely
- For product inquiries, suggest specific categories or ask for clarification
"""
            
            # Prepare messages
            messages = [
                {"role": "system", "content": system_message},
                {"role": "user", "content": message}
            ]
            
            # Add recent conversation history if available
            if session_history:
                for msg in session_history[-3:]:  # Last 3 messages for context
                    if msg.get('message_type') == 'user':
                        messages.append({"role": "user", "content": msg.get('content', '')})
                    elif msg.get('message_type') == 'bot':
                        messages.append({"role": "assistant", "content": msg.get('content', '')})
            
            # Generate response
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                max_tokens=self.max_tokens,
                temperature=self.temperature,
                stream=False
            )
            
            ai_response = response.choices[0].message.content
            tokens_used = response.usage.total_tokens
            
            # Track usage
            self.track_token_usage(tokens_used)
            
            # Cache successful responses
            if self.enable_caching and tokens_used < self.max_tokens * 0.8:
                cache.set(cache_key, ai_response, 3600)  # Cache for 1 hour
            
            return {
                'success': True,
                'response': ai_response,
                'tokens_used': tokens_used,
                'cached': False
            }
            
        except Exception as e:
            logger.error(f"DeepSeek API error: {e}")
            return {
                'success': False,
                'error': str(e),
                'fallback_response': self._get_fallback_response(message)
            }
    
    def _get_fallback_response(self, message: str) -> str:
        """Generate fallback response when AI is unavailable"""
        message_lower = message.lower()
        
        # Handle common typos and basic patterns
        if any(word in message_lower for word in ['address', 'location', 'where']):
            return f"You can find us at:\n\n📍 **Address**: X-57, Phase 2, Okhla, New Delhi - 110020\n📞 **Phone**: +91 93119 33481\n📧 **Email**: support@westendcorporation.in\n\nWe're open Monday to Saturday, 9 AM to 6 PM."
        
        if any(word in message_lower for word in ['contact', 'phone', 'email', 'call']):
            return f"Here's how to reach us:\n\n📞 **Phone**: +91 93119 33481\n📧 **Email**: support@westendcorporation.in\n📍 **Address**: X-57, Phase 2, Okhla, New Delhi - 110020\n\n⏰ **Business Hours**: Monday to Saturday, 9 AM to 6 PM"
        
        if any(word in message_lower for word in ['hello', 'hi', 'hey']):
            return "Hello! Welcome to Westend Corporation! 🌾\n\nI'm here to help you with:\n• **Products**: Rice, spices, dairy, baked goods\n• **Contact**: Phone, email, address\n• **Pricing**: Bulk export quotes\n• **Orders**: How to place orders\n\nWhat would you like to know?"
        
        # General fallback
        return "I'm here to help with Westend Corporation's products and services! You can ask me about:\n\n• **Products**: \"show me rice products\", \"spices\", \"ghee\"\n• **Contact**: \"phone number\", \"address\"\n• **Pricing**: \"how much for basmati rice\"\n• **Orders**: \"how to place bulk order\"\n\nWhat specific information are you looking for?"


# Global instance
deepseek_service = DeepSeekAIService()
