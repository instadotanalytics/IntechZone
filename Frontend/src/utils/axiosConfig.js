// utils/axiosConfig.js
import axios from 'axios';
import API_CONFIG from '../config/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT || 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Adds token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // For FormData, remove Content-Type header to let browser set it with boundary
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    
    // Log request for debugging (remove in production)
    console.log(`📤 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handles errors globally
apiClient.interceptors.response.use(
  (response) => {
    // Log response for debugging (remove in production)
    console.log(`📥 API Response: ${response.config.url} - ${response.status}`);
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      console.warn('🔐 Unauthorized! Clearing token and redirecting to login...');
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminInfo');
      
      // Redirect to login if not already there
      if (window.location.pathname !== '/admin-login') {
        window.location.href = '/admin-login';
      }
    }
    
    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error('⛔ Forbidden: You don\'t have permission to access this resource');
    }
    
    // Handle 404 Not Found
    if (error.response?.status === 404) {
      console.error('🔍 Not Found: The requested resource does not exist');
    }
    
    // Handle 500 Server Error
    if (error.response?.status === 500) {
      console.error('💥 Server Error: Please try again later');
    }
    
    // Handle file upload specific errors
    if (error.response?.status === 413) {
      console.error('📁 File too large: Please upload a smaller file (max 5MB)');
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;