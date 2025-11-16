// API Service for Django Backend Integration
// In Vite, env vars are exposed via import.meta.env and must be prefixed with VITE_
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Call Error:', error);
    throw error;
  }
};

// Verticals/Categories API
export const getVerticals = async () => {
  return apiCall('/verticals/');
};

export const getVerticalById = async (id) => {
  return apiCall(`/verticals/${id}/`);
};

// Products API
export const getProducts = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  return apiCall(`/products/${queryString ? `?${queryString}` : ''}`);
};

export const getProductById = async (id) => {
  return apiCall(`/products/${id}/`);
};

export const getProductsByCategory = async (categoryId) => {
  return apiCall(`/products/?category=${categoryId}`);
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
