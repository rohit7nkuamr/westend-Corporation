// API Service for Django Backend Integration
// In Vite, environment variables are available via import.meta.env
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://157.173.221.140/api';

// Log the API URL for debugging
console.log('API Base URL:', API_BASE_URL);

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  console.log(`Making API call to: ${API_BASE_URL}${endpoint}`);
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    console.log(`API response status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      // Try to get more error details if available
      try {
        const errorData = await response.text();
        console.error('API Error Details:', errorData);
      } catch (e) {
        console.error('Could not parse error details');
      }
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`API data received with ${data.results ? data.results.length : 'unknown'} results`);
    return data;
  } catch (error) {
    console.error('API Call Error:', error);
    throw error;
  }
};

// Verticals/Categories API
export const getVerticals = async () => {
  const response = await apiCall('/verticals/');
  // Handle paginated response format
  return response.results || response;
};

export const getVerticalById = async (id) => {
  return apiCall(`/verticals/${id}/`);
};

// Products API
export const getProducts = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await apiCall(`/products/${queryString ? `?${queryString}` : ''}`);
  // Handle paginated response format
  return response.results || response;
};

export const getProductById = async (id) => {
  return apiCall(`/products/${id}/`);
};

export const getProductsByCategory = async (categoryId) => {
  const response = await apiCall(`/products/?category=${categoryId}`);
  // Handle paginated response format
  return response.results || response;
};

// Contact/Inquiry API
export const submitContactForm = async (formData) => {
  return apiCall('/contact/', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
};

export const submitQuoteRequest = async (quoteData) => {
  return apiCall('/quote-request/', {
    method: 'POST',
    body: JSON.stringify(quoteData),
  });
};

// Company Info API
export const getCompanyInfo = async () => {
  return apiCall('/company-info/');
};

// About/Features API
export const getFeatures = async () => {
  return apiCall('/features/');
};

export const getWhyChooseUs = async () => {
  return apiCall('/why-choose-us/');
};

// Stats/Metrics API
export const getStats = async () => {
  return apiCall('/stats/');
};

export default {
  getVerticals,
  getVerticalById,
  getProducts,
  getProductById,
  getProductsByCategory,
  submitContactForm,
  submitQuoteRequest,
  getCompanyInfo,
  getFeatures,
  getWhyChooseUs,
  getStats,
};
