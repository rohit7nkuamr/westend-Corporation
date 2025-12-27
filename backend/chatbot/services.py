import hashlib
import re
import json
from typing import Dict, List, Optional, Tuple
from django.core.cache import cache
from django.db.models import Q
from fuzzywuzzy import fuzz, process
from api.models import Product, CompanyInfo, Vertical
from .models import ChatIntent, CachedResponse


class CostOptimizedChatbot:
    """Cost-effective chatbot with local intelligence and smart caching"""
    
    def __init__(self):
        self.cache_timeout = 60 * 60 * 24  # 24 hours cache
        self.similarity_threshold = 75  # Higher threshold for better matches
        
    def get_question_hash(self, question: str) -> str:
        """Generate hash for question caching"""
        return hashlib.sha256(question.lower().strip().encode()).hexdigest()
    
    def normalize_text(self, text: str) -> str:
        """Normalize text for better matching"""
        # Remove extra whitespace, convert to lowercase
        text = re.sub(r'\s+', ' ', text.lower().strip())
        # Remove common punctuation
        text = re.sub(r'[^\w\s]', '', text)
        return text
    
    def check_cached_response(self, question: str) -> Optional[Dict]:
        """Check if we have a cached response for this question"""
        question_hash = self.get_question_hash(question)
        cached = CachedResponse.objects.filter(question_hash=question_hash).first()
        
        if cached:
            # Update usage count
            CachedResponse.objects.filter(id=cached.id).update(usage_count=cached.usage_count + 1)
            return {
                'type': 'cached',
                'response': cached.response,
                'response_data': cached.response_data,
                'intent': cached.intent,
                'confidence': cached.confidence,
                'source': 'cache'
            }
        return None
    
    def detect_intent_locally(self, message: str) -> Optional[Tuple[str, float]]:
        """Detect intent using local pattern matching (no AI API call)"""
        normalized_message = self.normalize_text(message)
        
        # Get active intents ordered by priority
        intents = ChatIntent.objects.filter(is_active=True).order_by('-priority')
        
        best_intent = None
        best_score = 0
        
        for intent in intents:
            keywords = [kw.strip().lower() for kw in intent.keywords.split(',')]
            
            # Check for exact keyword matches
            for keyword in keywords:
                if keyword in normalized_message:
                    return intent.name, 0.9  # High confidence for exact match
            
            # Check fuzzy matching
            for keyword in keywords:
                score = fuzz.partial_ratio(keyword, normalized_message)
                if score > self.similarity_threshold and score > best_score:
                    best_intent = intent.name
                    best_score = score / 100.0
        
        return (best_intent, best_score) if best_intent else None
    
    def search_products_locally(self, query: str, limit: int = 10) -> List[Dict]:
        """Search products using fuzzy matching (no AI API call)"""
        # Try cache first
        cache_key = f"chat_products_{hashlib.md5(query.lower().encode()).hexdigest()}"
        cached_result = cache.get(cache_key)
        
        if cached_result:
            return cached_result
        
        # Get all active products
        products = Product.objects.filter(is_active=True, is_public=True)
        product_names = {p.name: p for p in products}
        
        # Extract keywords from query for better matching
        query_words = query.lower().split()
        
        # Try different search strategies with improved accuracy
        all_results = []
        
        # Strategy 1: Direct fuzzy search on full query with higher threshold
        results = process.extract(query.lower(), list(product_names.keys()), limit=limit, scorer=fuzz.ratio)
        all_results.extend([(name, score, 'full_query') for name, score in results])
        
        # Strategy 2: Search individual keywords with strict matching
        for word in query_words:
            if len(word) > 3:  # Only match words longer than 3 characters
                # Use token sort ratio for better word order matching
                word_results = process.extract(word, list(product_names.keys()), limit=limit//2, scorer=fuzz.token_sort_ratio)
                all_results.extend([(name, score, f'keyword_{word}') for name, score in word_results])
        
        # Strategy 3: Exact word matching for high confidence
        for word in query_words:
            if len(word) > 2:
                for product_name in product_names.keys():
                    if word in product_name.lower():
                        # Boost score for exact word matches
                        all_results.append((product_name, 90, f'exact_{word}'))
        
        # Strategy 4: Search vertical names with higher confidence
        verticals = Vertical.objects.filter(is_active=True)
        for vertical in verticals:
            vertical_words = vertical.title.lower().split()
            for v_word in vertical_words:
                if v_word in query.lower() and len(v_word) > 3:
                    # Get products from this vertical
                    vertical_products = Product.objects.filter(vertical=vertical, is_active=True, is_public=True)[:5]
                    for product in vertical_products:
                        all_results.append((product.name, 85, f'vertical_{vertical.title.lower()}'))
        
        # Remove duplicates and sort by score
        unique_results = {}
        for name, score, method in all_results:
            if name not in unique_results or score > unique_results[name][1]:
                unique_results[name] = (name, score, method)
        
        # Sort by score and take top results
        sorted_results = sorted(unique_results.values(), key=lambda x: x[1], reverse=True)[:limit]
        
        # Format results
        formatted_results = []
        for name, score, method in sorted_results:
            if score >= self.similarity_threshold:
                product = product_names[name]
                formatted_results.append({
                    'id': product.id,
                    'name': product.name,
                    'slug': product.slug,
                    'description': product.description[:200] + '...' if len(product.description) > 200 else product.description,
                    'image': product.image.url if product.image else None,
                    'badge': product.badge,
                    'stock_status': product.stock_status,
                    'moq': product.moq,
                    'packaging': product.packaging,
                    'vertical': product.vertical.title,
                    'match_score': score,
                    'match_method': method
                })
        
        # Cache results for 1 hour
        cache.set(cache_key, formatted_results, 60 * 60)
        return formatted_results
    
    def should_use_ai(self, message: str, intent: str = None) -> bool:
        """FULLY AI-DEPENDENT: Always use AI for all messages"""
        # Always return True to ensure AI handles all queries
        # This provides natural, conversational responses instead of templates
        return True
        
        # Use AI for conversational questions
        ai_triggers = [
            'how are you', 'what is your name', 'who are you', 'can you help',
            'tell me about', 'what can', 'i need', 'looking for', 'want to know',
            'hello', 'hi', 'hey', 'thanks', 'thank you'
        ]
        
        return any(trigger in message_lower for trigger in ai_triggers)
    
    def get_company_info(self) -> Dict:
        """Get company information from cache or database"""
        cache_key = 'chat_company_info'
        cached_info = cache.get(cache_key)
        
        if cached_info:
            return cached_info
        
        company = CompanyInfo.objects.first()
        if company:
            info = {
                'name': company.name,
                'tagline': company.tagline,
                'phone': company.phone,
                'email': company.email,
                'headquarters': company.headquarters,
                'description': company.description
            }
            # Cache for 24 hours
            cache.set(cache_key, info, self.cache_timeout)
            return info
        
        return {}
    
    def get_verticals_info(self) -> List[Dict]:
        """Get product categories information"""
        cache_key = 'chat_verticals_info'
        cached_info = cache.get(cache_key)
        
        if cached_info:
            return cached_info
        
        verticals = Vertical.objects.filter(is_active=True).order_by('order')
        info = [
            {
                'id': v.id,
                'title': v.title,
                'description': v.description,
                'icon_name': v.icon_name,
                'gradient': v.gradient
            }
            for v in verticals
        ]
        
        # Cache for 6 hours
        cache.set(cache_key, info, 60 * 60 * 6)
        return info
    
    def generate_template_response(self, intent: str, context: Dict = None) -> Dict:
        """Generate response from template (no AI API call)"""
        try:
            chat_intent = ChatIntent.objects.get(name=intent, is_active=True)
            
            # Special handling for product search with found products
            if intent == 'product_search' and context and 'products' in context:
                products = context['products']
                if products:
                    # Check if this is a general product inquiry
                    message_lower = context.get('original_message', '').lower().strip()
                    
                    # Only show categories for very specific general inquiries
                    exact_general_phrases = [
                        'show me your products',
                        'what products', 
                        'do you have',
                        'inventory',
                        'catalog',
                        'list products'
                    ]
                    
                    # Show categories only for exact matches or very close variations
                    show_categories = False
                    for phrase in exact_general_phrases:
                        if message_lower == phrase or message_lower.startswith(phrase):
                            show_categories = True
                            break
                    
                    if show_categories:
                        # Show categories first for general inquiries
                        response = "I'd be happy to help you find products! We offer 8 main categories:\n\n"
                        
                        verticals = Vertical.objects.filter(is_active=True).order_by('order')
                        for i, v in enumerate(verticals, 1):
                            product_count = Product.objects.filter(vertical=v, is_active=True).count()
                            response += f"{i}. {v.title} ({product_count} items)\n"
                            response += f"   {v.description[:80]}...\n\n"
                        
                        response += "Which category interests you most?\n"
                        response += "Just tell me: spices, rice, ghee, baked goods, etc."
                        
                        return {
                            'type': 'category_menu',
                            'response': response,
                            'intent': intent,
                            'confidence': 0.9,
                            'requires_ai': False,
                            'source': 'template'
                        }
                    else:
                        # Specific product search - show top 3 results only
                        response = f"I found {len(products)} matching products. Here are the top results:\n\n"
                        
                        for i, product in enumerate(products[:3], 1):  # Only show top 3
                            response += f"{i}. {product['name']}\n"
                            response += f"Category: {product['vertical']}\n"
                            
                            # Add key details
                            if product.get('moq') and product['moq'].strip():
                                response += f"MOQ: {product['moq']}\n"
                            
                            # Short description
                            if product.get('description') and product['description'].strip():
                                desc = product['description'][:100] + '...' if len(product['description']) > 100 else product['description']
                                response += f"{desc}\n"
                            
                            response += "\n"
                        
                        if len(products) > 3:
                            response += f"{len(products) - 3} more products available. Ask for more specifics!\n\n"
                        
                        response += "Need more help?\n"
                        response += "Ask for specific products: basmati rice, amul ghee\n"
                        response += "Browse categories: show me spices, dairy products\n"
                        response += "Get pricing: how much for rice"
                        
                        return {
                            'type': 'product_list',
                            'response': response,
                            'intent': intent,
                            'confidence': 0.9,
                            'requires_ai': False,
                            'source': 'template',
                            'products': products[:3]
                        }
                else:
                    # No products found - give helpful guidance
                    response = "I couldn't find exact matches. Let me help you:\n\n"
                    response += "Browse Our Categories:\n"
                    
                    verticals = Vertical.objects.filter(is_active=True).order_by('order')
                    for v in verticals[:4]:  # Show only top 4 categories
                        product_count = Product.objects.filter(vertical=v, is_active=True).count()
                        response += f"- {v.title} ({product_count} items)\n"
                    
                    response += f"\nAnd {len(verticals) - 4} more categories...\n\n"
                    response += "Try:\n"
                    response += "- rice, ghee, masala, spices\n"
                    response += "- everest, amul, chings (brands)\n"
                    response += "- baked goods, dairy products (categories)"
                    
                    return {
                        'type': 'no_products',
                        'response': response,
                        'intent': intent,
                        'confidence': 0.7,
                        'requires_ai': False,
                        'source': 'template'
                    }
            
            # Special handling for contact info
            if intent == 'contact_info':
                response = "Here's how to reach our export team:\n\n"
                response += "Email: support@westendcorporation.in\n"
                response += "Phone: +91 93119 33481\n"
                response += "Address: X-57, Phase 2, Okhla, New Delhi - 110020\n\n"
                response += "Business Hours: Monday to Saturday, 9 AM to 6 PM\n\n"
                response += "For bulk orders and international shipping, custom product requirements, quality certifications and documentation, pricing and logistics information, we typically respond within 24 hours."
                
                return {
                    'type': 'contact_info',
                    'response': response,
                    'intent': intent,
                    'confidence': 0.9,
                    'requires_ai': False,
                    'source': 'template'
                }
            
            # Special handling for categories
            if intent == 'categories':
                response = "We have 8 main product categories:\n\n"
                
                verticals = Vertical.objects.filter(is_active=True).order_by('order')
                for v in verticals:
                    product_count = Product.objects.filter(vertical=v, is_active=True).count()
                    response += f"- {v.title}: {v.description[:80]}... ({product_count} items)\n"
                
                response += "\nWhich category would you like to explore?"
                
                return {
                    'type': 'category_list',
                    'response': response,
                    'intent': intent,
                    'confidence': 0.9,
                    'requires_ai': False,
                    'source': 'template'
                }
            
            # Use regular template for other intents
            response = chat_intent.response_template
            
            return {
                'type': 'template',
                'response': response,
                'intent': intent,
                'confidence': 0.8,
                'requires_ai': False,
                'source': 'template'
            }
            
        except ChatIntent.DoesNotExist:
            return {
                'type': 'error',
                'response': 'I apologize, but I encountered an error processing your request.',
                'intent': intent,
                'confidence': 0.0,
                'requires_ai': False,
                'source': 'template'
            }
        except Exception as e:
            logger.error(f"Error generating template response: {e}")
            return {
                'type': 'error',
                'response': 'I apologize, but I encountered an error. Please try again.',
                'intent': intent,
                'confidence': 0.0,
                'requires_ai': False,
                'source': 'template'
            }
    
    def cache_response(self, question: str, response: str, response_data: Dict, intent: str, confidence: float):
        """Cache a response for future use"""
        question_hash = self.get_question_hash(question)
        
        # Only cache high-confidence responses
        if confidence >= 0.7:
            CachedResponse.objects.update_or_create(
                question_hash=question_hash,
                defaults={
                    'question': question,
                    'response': response,
                    'response_data': response_data,
                    'intent': intent,
                    'confidence': confidence
                }
            )
