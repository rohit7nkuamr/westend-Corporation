// API Service for Django Backend Integration
// In Vite, environment variables are available via import.meta.env
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://157.173.221.140/api';

// Log the API URL for debugging
console.log('API Base URL:', API_BASE_URL);

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  console.log(`Making API call to: ${API_BASE_URL}${endpoint}`);
  try {
    // Prepare headers with defaults
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    };
    
    // Prepare the request options
    const requestOptions = {
      ...options,
      headers,
      credentials: 'include', // Include cookies for CSRF if needed
      mode: 'cors', // Enable CORS
    };
    
    // Make the API call
    const response = await fetch(`${API_BASE_URL}${endpoint}`, requestOptions);

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
  console.log('Submitting contact form:', formData);
  try {
    // Use the apiCall helper which has been configured for the API
    const response = await apiCall('/contact/', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    
    console.log('Contact form submission response:', response);
    return response;
  } catch (error) {
    console.error('Contact form submission error:', error);
    throw error;
  }
};

export const submitQuoteRequest = async (quoteData) => {
  console.log('Submitting quote request:', quoteData);
  try {
    // Use the apiCall helper which has been configured for the API
    const response = await apiCall('/quote-request/', {
      method: 'POST',
      body: JSON.stringify(quoteData),
    });
    
    console.log('Quote request submission response:', response);
    return response;
  } catch (error) {
    console.error('Quote request submission error:', error);
    throw error;
  }
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
