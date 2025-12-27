// Cost-effective chatbot API service - CACHING DISABLED
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://westendcorporation.in/api';

// Caching disabled to prevent issues
const localCache = new Map();
const CACHE_EXPIRY = 0; // Disabled - no caching

// Debug logging
console.log('🤖 Chatbot Service Initializing...');
console.log('📡 API Base URL:', API_BASE_URL);
console.log('🌐 Environment:', import.meta.env.MODE);

class ChatbotAPI {
  constructor() {
    this.sessionId = null;
    this.sessionPromise = this.initializeSession();
  }

  async initializeSession() {
    // Always create fresh session - no caching
    const sessionId = await this.createBackendSession();
    this.sessionId = sessionId;
    return sessionId;
  }

  async getSessionId() {
    if (!this.sessionId) {
      await this.sessionPromise;
    }
    return this.sessionId;
  }

  async createBackendSession() {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/sessions/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({})
      });

      if (!response.ok) {
        throw new Error(`Failed to create session: ${response.status}`);
      }

      const data = await response.json();
      return data.session_id;
    } catch (error) {
      console.error('Failed to create backend session:', error);
      // Fallback to local ID generation
      return 'chat_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }
  }

  // Check local cache first (FREE)
  getCachedResponse(message) {
    const normalizedMessage = message.toLowerCase().trim();
    const cacheKey = btoa(normalizedMessage).substring(0, 20);
    
    const cached = localCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_EXPIRY) {
      return cached.response;
    }
    return null;
  }

  // Cache successful responses (FREE)
  setCachedResponse(message, response) {
    const normalizedMessage = message.toLowerCase().trim();
    const cacheKey = btoa(normalizedMessage).substring(0, 20);
    
    localCache.set(cacheKey, {
      response,
      timestamp: Date.now()
    });
    
    // Limit cache size
    if (localCache.size > 100) {
      const firstKey = localCache.keys().next().value;
      localCache.delete(firstKey);
    }
  }

  // Local intent detection (FREE)
  detectIntentLocally(message) {
    const normalizedMessage = message.toLowerCase().trim();
    
    const intents = {
      greeting: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'],
      product_search: ['product', 'show', 'find', 'looking for', 'search', 'item', 'commodity'],
      contact_info: ['contact', 'phone', 'email', 'address', 'reach', 'call', 'location'],
      pricing: ['price', 'cost', 'quote', 'how much', 'rates', 'pricing', 'budget'],
      certification: ['certified', 'fssai', 'iso', 'quality', 'standards', 'compliance'],
      categories: ['categories', 'vertical', 'types', 'section', 'department', 'group'],
      ticket_create: ['complaint', 'issue', 'problem', 'support', 'help', 'technical'],
      about_company: ['about', 'company', 'who are', 'history', 'background', 'story'],
      shipping: ['shipping', 'delivery', 'export', 'logistics', 'transport', 'worldwide'],
      quality: ['quality', 'best', 'premium', 'top', 'excellent', 'standard'],
      goodbye: ['bye', 'goodbye', 'thanks', 'thank you', 'see you', 'exit']
    };

    // Check for exact matches first
    for (const [intent, keywords] of Object.entries(intents)) {
      for (const keyword of keywords) {
        if (normalizedMessage.includes(keyword)) {
          return intent;
        }
      }
    }

    return null;
  }

  // Generate local responses for common intents (FREE)
  generateLocalResponse(intent, message) {
    const responses = {
      greeting: "Hello! Welcome to Westend Corporation. I'm here to help you find information about our products, services, or answer any questions you might have. What can I assist you with today?",
      
      contact_info: "You can reach us at:\n\n📞 Phone: +91 93119 33481\n📧 Email: support@westendcorporation.in\n📍 Address: X-57, Phase 2, Okhla, New Delhi - 110020\n\nOur business hours are Monday to Saturday, 9 AM to 6 PM.",
      
      about_company: "Westend Corporation is a leading international food exporter from India, specializing in premium quality food products including groceries, pulses, spices, and frozen vegetables. We export to USA, Canada, and worldwide markets with FSSAI certification.",
      
      shipping: "We export products worldwide with reliable shipping and logistics. Our products reach USA, Canada, and many other countries with proper documentation and quality assurance. Delivery times vary by destination but typically range from 7-21 days.",
      
      quality: "Quality is our top priority at Westend Corporation. We maintain strict quality control from sourcing to packaging, ensuring only the best products reach our customers. We are FSSAI, ISO, and HACCP certified.",
      
      certification: "Westend Corporation maintains various quality certifications including:\n\n• FSSAI Certification\n• ISO Certification\n• HACCP Compliance\n• Organic India Certification\n• USDA Organic\n\nAll our products meet strict international quality standards.",
      
      categories: "We offer several main product categories:\n\n🌾 **Groceries & Pulses** - Premium quality grains and lentils\n🥬 **Frozen Vegetables** - Fresh frozen produce\n📦 **Processed Foods** - Ready-to-eat and value-added products\n\nWhich category interests you?",
      
      goodbye: "Thank you for contacting Westend Corporation! Feel free to reach out anytime if you need more information. Have a great day!",
      
      pricing: "For pricing information, I can help you get a quote. Could you please tell me which products you're interested in and the quantity you need? Our pricing is competitive and varies based on order quantity and destination.",
      
      ticket_create: "I understand you need support. I can create a support ticket for you. Could you please provide:\n\n• Your name and email\n• A brief description of your issue\n• Your phone number (optional)\n\nThis will help our support team assist you better."
    };

    return responses[intent] || null;
  }

  async sendMessage(message) {
    try {
      // Get session ID (creates one if needed)
      const sessionId = await this.getSessionId();
      
      // Cache disabled - always call API for fresh responses
      
      // Try local intent detection (FREE)
      const localIntent = this.detectIntentLocally(message);
      if (localIntent) {
        const localResponse = this.generateLocalResponse(localIntent, message);
        if (localResponse) {
          const response = {
            message: {
              content: localResponse,
              message_type: 'bot',
              timestamp: new Date().toISOString(),
              response_data: {},
              intent: localIntent,
              confidence: 0.9
            },
            source: 'local_processing',
            cost: 0
          };
          
          // Cache disabled - do not cache
          return response;
        }
      }

      // Always call API - no caching
      const cacheBuster = Date.now() + Math.random();
      const response = await fetch(`${API_BASE_URL}/chat/message/?_cb=${cacheBuster}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
        body: JSON.stringify({
          session_id: sessionId,
          message: message
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      
      // Cache disabled - do not cache responses
      return {
        ...data,
        cost: data.source === 'ai_fallback' ? 1 : 0.1 // Minimal cost for non-AI responses
      };

    } catch (error) {
      console.error('Chatbot API error:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        sessionId: sessionId,
        apiUrl: `${API_BASE_URL}/chat/message/`
      });
      
      // Fallback response (FREE)
      const fallbackResponse = {
        message: {
          content: "I'm having trouble connecting right now. You can:\n\n• Try asking in a different way\n• Contact us at support@westendcorporation.in\n• Call us at +91 93119 33481\n\nI'll be back to help you shortly!",
          message_type: 'bot',
          timestamp: new Date().toISOString(),
          response_data: {},
          intent: 'error',
          confidence: 0.5
        },
        source: 'fallback',
        cost: 0
      };

      return fallbackResponse;
    }
  }

  async createTicket(ticketData) {
    try {
      const sessionId = await this.getSessionId();
      
      const response = await fetch(`${API_BASE_URL}/chat/ticket/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId,
          ...ticketData
        })
      });

      if (!response.ok) {
        throw new Error(`Ticket creation error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Ticket creation error:', error);
      throw error;
    }
  }

  async getChatHistory() {
    try {
      const sessionId = await this.getSessionId();
      
      const response = await fetch(`${API_BASE_URL}/chat/history/${sessionId}/`);
      
      if (!response.ok) {
        throw new Error(`History error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Chat history error:', error);
      return { messages: [] };
    }
  }

  // Clear local cache
  clearCache() {
    localCache.clear();
  }

  // Get cache statistics
  getCacheStats() {
    return {
      size: localCache.size,
      maxSize: 100
    };
  }
}

export default new ChatbotAPI();
