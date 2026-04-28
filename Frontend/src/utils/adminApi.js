// utils/adminApi.js
import apiClient from './axiosConfig';
import API_CONFIG from '../config/api';

const adminApi = {
  // Auth
  login: (username, password) => apiClient.post(API_CONFIG.ENDPOINTS.ADMIN_LOGIN, { username, password }),
  verifyToken: () => apiClient.get(API_CONFIG.ENDPOINTS.ADMIN_VERIFY),
  logout: () => apiClient.post(API_CONFIG.ENDPOINTS.ADMIN_LOGOUT),
  
  // Dashboard
  getStats: () => apiClient.get(API_CONFIG.ENDPOINTS.DASHBOARD_STATS),
  getActivity: () => apiClient.get(API_CONFIG.ENDPOINTS.DASHBOARD_ACTIVITY),
  
  // Contacts
  getContacts: () => apiClient.get(API_CONFIG.ENDPOINTS.ADMIN_CONTACTS),
  updateContactStatus: (id, status) => apiClient.put(API_CONFIG.ENDPOINTS.ADMIN_CONTACT_STATUS.replace(':id', id), { status }),
  deleteContact: (id) => apiClient.delete(API_CONFIG.ENDPOINTS.ADMIN_CONTACT_DELETE.replace(':id', id)),
  
  // Enquiries
  getEnquiries: () => apiClient.get(API_CONFIG.ENDPOINTS.ADMIN_ENQUIRIES),
  updateEnquiryStatus: (id, status) => apiClient.put(API_CONFIG.ENDPOINTS.ADMIN_ENQUIRY_STATUS.replace(':id', id), { status }),
  deleteEnquiry: (id) => apiClient.delete(API_CONFIG.ENDPOINTS.ADMIN_ENQUIRY_DELETE.replace(':id', id)),
  
  // Settings
  getSettings: () => apiClient.get(API_CONFIG.ENDPOINTS.GET_SETTINGS),
  updateSettings: (settings) => apiClient.put(API_CONFIG.ENDPOINTS.UPDATE_SETTINGS, settings),
  
  // Services
  getServices: () => apiClient.get('/api/services'),
  updateServices: (services) => apiClient.put('/api/admin/services', { services }),
  
  // Careers
  getCareers: () => apiClient.get('/api/careers'),
  updateCareers: (careers) => apiClient.put('/api/admin/careers', { careers }),
};

export default adminApi;