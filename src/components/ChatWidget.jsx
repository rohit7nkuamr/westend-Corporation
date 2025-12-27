import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Minimize2, Maximize2, User, Bot, Phone, Mail, MapPin, Clock, ChevronDown, Wheat, Package, ChefHat } from 'lucide-react';
import chatbotService from '../services/chatbot';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [ticketData, setTicketData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  // Simple cache busting for API calls only
  const cacheBuster = useRef(Date.now());
  
  // Clear only chat-related storage on mount
  useEffect(() => {
    // Clear only chatbot-related storage, not everything
    const keysToRemove = ['chatbot_messages', 'chatbot_session'];
    keysToRemove.forEach(key => localStorage.removeItem(key));
    
    // Initialize chatbot service
    console.log('🔧 Initializing ChatWidget with chatbot service...');
  }, []);

  // Modern Food Assistant Icon Component
  const FoodAssistantIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Modern Chef Hat */}
      <motion.path
        d="M7 6C7 3 9 2 12 2C15 2 17 3 17 6L17 8L7 8Z"
        fill="url(#hatGradient)"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
      
      {/* Modern Wheat Design */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Center Stem */}
        <path
          d="M12 8L12 20"
          stroke="url(#stemGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        
        {/* Wheat Grains - Modern Design */}
        {[6, 10, 14, 18].map((y, i) => (
          <g key={i}>
            {/* Left grains */}
            <motion.path
              d={`M12 ${y} L${12 - 4} ${y - 3}`}
              stroke="url(#grainGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * i }}
            />
            <motion.circle
              cx={12 - 4}
              cy={y - 3}
              r="2"
              fill="url(#seedGradient)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2, delay: 0.1 * i + 0.1 }}
            />
            
            {/* Right grains */}
            <motion.path
              d={`M12 ${y} L${12 + 4} ${y - 3}`}
              stroke="url(#grainGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * i + 0.05 }}
            />
            <motion.circle
              cx={12 + 4}
              cy={y - 3}
              r="2"
              fill="url(#seedGradient)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2, delay: 0.1 * i + 0.15 }}
            />
          </g>
        ))}
      </motion.g>
      
      <defs>
        <linearGradient id="hatGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F8FAFC" />
        </linearGradient>
        <linearGradient id="stemGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#16A34A" />
          <stop offset="100%" stopColor="#15803D" />
        </linearGradient>
        <linearGradient id="grainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="seedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
    </svg>
  );

  // Food Expert Icon for header
  const FoodExpertIcon = () => (
    <motion.div
      animate={{ 
        rotate: [0, 3, -3, 0],
        scale: [1, 1.05, 1]
      }}
      transition={{ 
        duration: 4, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <ChefHat size={20} className="text-white" />
    </motion.div>
  );

  useEffect(() => {
    // Load chat history when component mounts
    const loadChatHistory = async () => {
      try {
        await chatbotService.sessionPromise;
        const history = await chatbotService.getChatHistory();
        
        // Always show welcome message
        const welcomeMessage = {
          id: 'welcome-' + Date.now(),
          content: "Hello! I'm your Westend Food Assistant. I can help you find the perfect organic food products, spices, grains, and more for your needs. What are you looking for today?",
          message_type: 'bot',
          timestamp: new Date().toISOString(),
          response_data: {}
        };
        
        if (history && history.length > 0) {
          setMessages([welcomeMessage, ...history]);
        } else {
          setMessages([welcomeMessage]);
        }
      } catch (error) {
        console.log('Failed to load chat history:', error.message);
        // Show welcome message even if history fails
        const welcomeMessage = {
          id: 'welcome-' + Date.now(),
          content: "Hello! I'm your Westend Food Assistant. I can help you find the perfect organic food products, spices, grains, and more for your needs. What are you looking for today?",
          message_type: 'bot',
          timestamp: new Date().toISOString(),
          response_data: {}
        };
        setMessages([welcomeMessage]);
      }
    };
    
    if (isOpen) {
      loadChatHistory();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addUserMessage = (content) => {
    const userMessage = {
      id: Date.now(),
      content,
      message_type: 'user',
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
  };

  const addBotMessage = (content, responseData = {}) => {
    // Clean up the response - remove excessive formatting and quotes
    const cleanContent = content
      .replace(/\*\*/g, '') // Remove bold markdown
      .replace(/\*/g, '') // Remove italic markdown
      .replace(/#{1,6}\s/g, '') // Remove headers
      .replace(/📁|📦|📝|🏷️|💡|🎯|📍|📞|📧|⏰|🌾|📋|💰|🏭|✅|❌/g, '') // Remove excessive emojis
      .replace(/\n{3,}/g, '\n\n') // Reduce excessive newlines
      .replace(/:\s*\n/g, ': ') // Fix broken lines after colons
      .trim();
    
    const botMessage = {
      id: Date.now(),
      content: cleanContent,
      message_type: 'bot',
      timestamp: new Date().toISOString(),
      response_data: responseData || {}
    };
    setMessages(prev => [...prev, botMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const message = inputMessage.trim();
    setInputMessage('');
    addUserMessage(message);
    setIsTyping(true);

    try {
      console.log('📤 Sending message via chatbot service:', message);
      const response = await chatbotService.sendMessage(message);
      console.log('📥 Received response:', response);
      
      setTimeout(() => {
        addBotMessage(response.message.content, response.message.response_data);
        setIsTyping(false);
        
        // Focus input after response
        inputRef.current?.focus();
      }, 800 + Math.random() * 700); // Simulate thinking time
      
    } catch (error) {
      console.error('ChatWidget error:', error);
      setIsTyping(false);
      addBotMessage("I'm having trouble connecting right now. Please try again or contact our support team directly.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTicketSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const result = await chatbotService.createTicket(ticketData);
      
      addBotMessage(`Support ticket created successfully!\n\nTicket ID: ${result.ticket_id}\n\nOur team will contact you soon at ${ticketData.email}.`);
      
      // Reset form and hide
      setTicketData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
      });
      setShowTicketForm(false);
      
    } catch (error) {
      addBotMessage("Failed to create ticket. Please try again or contact us directly at support@westendcorporation.in");
    }
  };

  const formatBotMessage = (content) => {
    // Format the message with proper line breaks and basic styling
    return content.split('\n').map((line, index) => {
      if (line.trim() === '') return null;
      
      // Check if it's a list item
      if (line.match(/^[\d\.\-\•]\s/)) {
        return (
          <div key={index} className="flex items-start gap-2 py-1">
            <span className="text-primary-500 mt-1">•</span>
            <span className="text-gray-700">{line.replace(/^[\d\.\-\•]\s/, '')}</span>
          </div>
        );
      }
      
      // Check if it's a product title
      if (line.match(/^\d+\.\s/)) {
        return (
          <div key={index} className="font-semibold text-gray-800 py-2 border-b border-gray-100">
            {line}
          </div>
        );
      }
      
      // Regular line
      return (
        <div key={index} className="text-gray-700 py-1">
          {line}
        </div>
      );
    }).filter(Boolean);
  };

  const renderMessage = (message) => {
    const isUser = message.message_type === 'user';
    
    return (
      <motion.div
        key={message.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div className={`flex gap-3 max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
          {/* Avatar */}
          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isUser ? 'bg-gradient-to-br from-blue-500 to-indigo-600' : 'bg-gradient-to-br from-green-500 via-green-600 to-green-700'
          }`}>
            {isUser ? (
              <User size={16} className="text-white" />
            ) : (
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Wheat size={16} className="text-white" />
              </motion.div>
            )}
          </div>
          
          {/* Modern Message bubble */}
          <div className={`px-4 py-3 rounded-2xl chat-message-bubble shadow-sm hover:shadow-md transition-shadow duration-200 ${
            isUser 
              ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-br-sm shadow-lg' 
              : 'bg-white text-gray-800 rounded-bl-sm border border-gray-200 shadow-sm'
          }`}>
            <div className="text-sm whitespace-pre-line leading-relaxed">
              {isUser ? message.content : formatBotMessage(message.content)}
            </div>
          </div>
          <p className={`text-xs mt-2 ${isUser ? 'text-primary-200' : 'text-gray-400'}`}>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </motion.div>
    );
  };

  const renderProductCards = (products) => {
    return (
      <div className="grid grid-cols-1 gap-3 mb-4">
        {products.map((product, index) => (
          <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex gap-3">
              {product.image && (
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-14 h-14 object-cover rounded-lg"
                />
              )}
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-gray-900">{product.name}</h4>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">{product.description}</p>
                <div className="flex gap-2 mt-2">
                  {product.badge && (
                    <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full border border-green-100">
                      {product.badge}
                    </span>
                  )}
                  <span className="text-xs text-gray-500">
                    MOQ: {product.moq}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Modern Chat Button */}
      <motion.div
        className={`fixed z-50 ${window.innerWidth < 640 ? 'bottom-4 right-4' : 'bottom-6 right-6'}`}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, duration: 0.8 }}
      >
        {/* Always visible help text */}
        <div className="absolute bottom-full right-0 mb-2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
          Need help with food products?
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700 hover:from-emerald-600 hover:via-green-700 hover:to-teal-800 text-white p-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-white/30 backdrop-blur-sm overflow-hidden"
          aria-label="Chat with Food Assistant"
        >
          {/* Background shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: -100 }}
            whileHover={{ x: 100 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
          
          {isOpen ? (
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <>
              <FoodAssistantIcon />
              {/* Animated status indicator */}
              <motion.span 
                className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full border-2 border-white shadow-lg"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.8, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <motion.span 
                  className="absolute inset-0 rounded-full bg-amber-400"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.span>
            </>
          )}
        </button>
        
      </motion.div>

      {/* Modern Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 flex flex-col overflow-hidden chat-window chat-transition glass-effect chat-widget`}
            data-cache-buster={cacheBuster}
            style={{
              width: isMinimized ? '320px' : window.innerWidth < 640 ? '90vw' : '420px',
              height: isMinimized ? '48px' : window.innerWidth < 640 ? '65vh' : '650px',
              maxHeight: isMinimized ? '48px' : window.innerWidth < 640 ? '70vh' : '75vh',
              bottom: window.innerWidth < 640 ? '80px' : '96px',
              right: window.innerWidth < 640 ? '5vw' : '24px'
            }}
          >
            {/* Modern Header */}
            <div className="bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700 text-white p-4 flex items-center justify-between relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.4'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
              </div>
              
              <div className="flex items-center gap-3 relative z-10">
                <motion.div 
                  className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-lg"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <FoodExpertIcon />
                </motion.div>
                <div>
                  <h3 className="font-bold text-base flex items-center gap-2">
                    <span>Westend Food Assistant</span>
                    <motion.div
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Wheat size={16} className="text-amber-300" />
                    </motion.div>
                  </h3>
                  <p className="text-xs text-emerald-100 flex items-center gap-2">
                    <motion.span 
                      className="w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-lg"
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [1, 0.7, 1]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    ></motion.span>
                    <span className="font-medium">Online</span>
                    <span className="text-emerald-200">• Ready to help</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 relative z-10">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-xl transition-all duration-200 backdrop-blur-sm"
                >
                  <ChevronDown size={18} className={isMinimized ? 'rotate-180' : ''} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-xl transition-all duration-200 backdrop-blur-sm"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages - Hidden when minimized */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-gray-50 chat-messages">
                  <div className="space-y-4">
                    {messages.map(renderMessage)}
                    
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                      >
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 via-green-600 to-green-700 flex items-center justify-center">
                            <motion.div
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            >
                              <Wheat size={16} className="text-white" />
                            </motion.div>
                          </div>
                          <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-bl-sm border border-gray-100 shadow-lg">
                            <div className="flex items-center gap-2">
                              <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                              >
                                <ChefHat size={14} className="text-green-600" />
                              </motion.div>
                              <span className="text-sm text-gray-600">Finding products...</span>
                              <motion.div className="flex gap-1">
                                <motion.div 
                                  className="w-2 h-2 bg-gradient-to-r from-green-400 to-green-500 rounded-full"
                                  animate={{ scale: [1, 1.5, 1] }}
                                  transition={{ duration: 0.8, repeat: Infinity }}
                                ></motion.div>
                                <motion.div 
                                  className="w-2 h-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                                  animate={{ scale: [1, 1.5, 1] }}
                                  transition={{ duration: 0.8, delay: 0.2, repeat: Infinity }}
                                ></motion.div>
                                <motion.div 
                                  className="w-2 h-2 bg-gradient-to-r from-green-600 to-green-700 rounded-full"
                                  animate={{ scale: [1, 1.5, 1] }}
                                  transition={{ duration: 0.8, delay: 0.4, repeat: Infinity }}
                                ></motion.div>
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                  <div ref={messagesEndRef} />
                </div>

                {/* Ticket Form */}
                {showTicketForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="border-t border-gray-100 p-4 bg-gray-50"
                  >
                    <form onSubmit={handleTicketSubmit} className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Your Name*"
                          required
                          value={ticketData.name}
                          onChange={(e) => setTicketData({...ticketData, name: e.target.value})}
                          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        <input
                          type="email"
                          placeholder="Email*"
                          required
                          value={ticketData.email}
                          onChange={(e) => setTicketData({...ticketData, email: e.target.value})}
                          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="tel"
                          placeholder="Phone"
                          value={ticketData.phone}
                          onChange={(e) => setTicketData({...ticketData, phone: e.target.value})}
                          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          placeholder="Company"
                          value={ticketData.company}
                          onChange={(e) => setTicketData({...ticketData, company: e.target.value})}
                          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Subject*"
                        required
                        value={ticketData.subject}
                        onChange={(e) => setTicketData({...ticketData, subject: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <textarea
                        placeholder="Describe your issue*"
                        required
                        rows={3}
                        value={ticketData.message}
                        onChange={(e) => setTicketData({...ticketData, message: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      />
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="flex-1 bg-primary-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
                        >
                          Create Ticket
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowTicketForm(false)}
                          className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* Input */}
                <div className="border-t border-gray-100 bg-white p-3 sm:p-4">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent chat-input chat-transition"
                      disabled={isTyping}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isTyping}
                      className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 hover:from-green-700 hover:via-green-800 hover:to-green-900 disabled:from-gray-400 disabled:to-gray-500 text-white p-2 sm:p-3 rounded-full transition-all duration-200 disabled:cursor-not-allowed hover:scale-105 shadow-lg hover:shadow-xl border border-white/20"
                    >
                      {isTyping ? (
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <ChefHat size={18} />
                        </motion.div>
                      ) : (
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Send size={18} />
                        </motion.div>
                      )}
                    </button>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="flex gap-2 mt-3 flex-wrap chat-quick-actions">
                    <motion.button
                      onClick={() => setInputMessage('Show me your products')}
                      className="text-xs bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border border-green-200 px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-md flex items-center gap-1"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Package size={12} className="text-green-600" />
                      Products
                    </motion.button>
                    <motion.button
                      onClick={() => setInputMessage('Contact information')}
                      className="text-xs bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 border border-emerald-200 px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-md flex items-center gap-1"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Wheat size={12} className="text-emerald-600" />
                      Contact
                    </motion.button>
                    <motion.button
                      onClick={() => setShowTicketForm(true)}
                      className="text-xs bg-gradient-to-r from-teal-50 to-green-50 hover:from-teal-100 hover:to-green-100 border border-teal-200 px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-md flex items-center gap-1"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChefHat size={12} className="text-teal-600" />
                      Support
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
