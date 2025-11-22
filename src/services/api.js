// API Service for Django Backend Integration
// In Vite, environment variables are available via import.meta.env
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://westendcorporation.in/api';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
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
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Silent error handling in production
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

export const getProductsByCategory = async (categoryId, options = {}) => {
  let queryParams = `category=${categoryId}`;
  
  // Add featured filter if specified
  if (options.featured) {
    queryParams += '&featured=true';
  }
  
  const response = await apiCall(`/products/?${queryParams}`);
  // Handle paginated response format
  return response.results || response;
};

// Contact/Inquiry API
export const submitContactForm = async (formData) => {
  try {
    // Use the apiCall helper which has been configured for the API
    const response = await apiCall('/contact/', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    
    return response;
  } catch (error) {
    throw error;
  }
};

export const submitQuoteRequest = async (quoteData) => {
  try {
    // Use the apiCall helper which has been configured for the API
    const response = await apiCall('/quote-request/', {
      method: 'POST',
      body: JSON.stringify(quoteData),
    });
    
    return response;
  } catch (error) {
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

// Page visit tracking
export const submitPageVisit = async (data = {}) => {
  try {
    const response = await apiCall('/page-visit/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    // don't fail the app if tracking fails
    console.warn('Page visit tracking failed', error);
    return null;
  }
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
