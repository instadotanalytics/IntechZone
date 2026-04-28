// utils/apiService.js
import apiClient from './axiosConfig';
import API_CONFIG from '../config/api';

class ApiService {
  // ==================== AUTH SERVICES ====================
  
  static adminLogin(email, password) {
    return apiClient.post(API_CONFIG.ENDPOINTS.ADMIN_LOGIN, { email, password });
  }

  static adminVerify() {
    return apiClient.get(API_CONFIG.ENDPOINTS.ADMIN_VERIFY);
  }

  static adminLogout() {
    return apiClient.post(API_CONFIG.ENDPOINTS.ADMIN_LOGOUT);
  }

  static changePassword(currentPassword, newPassword) {
    return apiClient.put(API_CONFIG.ENDPOINTS.ADMIN_CHANGE_PASSWORD, { currentPassword, newPassword });
  }

  // ==================== DASHBOARD SERVICES ====================
  
  static getDashboardStats() {
    return apiClient.get(API_CONFIG.ENDPOINTS.DASHBOARD_STATS);
  }

  static getDashboardActivity() {
    return apiClient.get(API_CONFIG.ENDPOINTS.DASHBOARD_ACTIVITY);
  }

  // ==================== PROFILE SERVICES ====================
  
  static updateProfile(data) {
    return apiClient.put(API_CONFIG.ENDPOINTS.PROFILE_UPDATE, data);
  }

  // ==================== CONTACT SERVICES (Public) ====================
  
  static submitContactForm(formData) {
    return apiClient.post(API_CONFIG.ENDPOINTS.CONTACT_SUBMIT, formData);
  }

  static getContactInfo() {
    return apiClient.get(API_CONFIG.ENDPOINTS.GET_CONTACT_INFO);
  }

  // ==================== ADMIN CONTACT MANAGEMENT ====================
  
  static getContactMessages(params = {}) {
    return apiClient.get(API_CONFIG.ENDPOINTS.ADMIN_CONTACTS, { params });
  }

  static getContactStats() {
    return apiClient.get(API_CONFIG.ENDPOINTS.ADMIN_CONTACTS_STATS);
  }

  static updateContactStatus(id, status) {
    const url = API_CONFIG.ENDPOINTS.ADMIN_CONTACT_STATUS.replace(':id', id);
    return apiClient.put(url, { status });
  }

  static deleteContactMessage(id) {
    const url = API_CONFIG.ENDPOINTS.ADMIN_CONTACT_DELETE.replace(':id', id);
    return apiClient.delete(url);
  }

  static updateContactInfo(data) {
    return apiClient.put(API_CONFIG.ENDPOINTS.ADMIN_UPDATE_CONTACT_INFO, data);
  }

  // ==================== SERVICE ENQUIRY (Public) ====================
  
  static submitServiceEnquiry(formData) {
    return apiClient.post(API_CONFIG.ENDPOINTS.SERVICE_ENQUIRY_SUBMIT, formData);
  }

  // ==================== ADMIN ENQUIRY MANAGEMENT ====================
  
  static getEnquiries(params = {}) {
    return apiClient.get(API_CONFIG.ENDPOINTS.ADMIN_ENQUIRIES, { params });
  }

  static getEnquiryStats() {
    return apiClient.get(API_CONFIG.ENDPOINTS.ADMIN_ENQUIRIES_STATS);
  }

  static updateEnquiryStatus(id, status) {
    const url = API_CONFIG.ENDPOINTS.ADMIN_ENQUIRY_STATUS.replace(':id', id);
    return apiClient.put(url, { status });
  }

  static deleteEnquiry(id) {
    const url = API_CONFIG.ENDPOINTS.ADMIN_ENQUIRY_DELETE.replace(':id', id);
    return apiClient.delete(url);
  }

  // ==================== PROJECTS SERVICES ====================
  
  static getProjects(params = {}) {
    return apiClient.get(API_CONFIG.ENDPOINTS.GET_PROJECTS, { params });
  }

  static createProject(projectData) {
    return apiClient.post(API_CONFIG.ENDPOINTS.CREATE_PROJECT, projectData);
  }

  static updateProject(id, projectData) {
    return apiClient.put(`${API_CONFIG.ENDPOINTS.UPDATE_PROJECT}/${id}`, projectData);
  }

  static deleteProject(id) {
    return apiClient.delete(`${API_CONFIG.ENDPOINTS.DELETE_PROJECT}/${id}`);
  }

  // ==================== JOB APPLICATION SERVICES ====================
  
  static submitJobApplication(formData) {
    return apiClient.post(API_CONFIG.ENDPOINTS.JOB_APPLY, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 60000
    });
  }

  static getJobApplicationStats() {
    return apiClient.get(API_CONFIG.ENDPOINTS.ADMIN_JOB_STATS);
  }

  static getJobApplications(params = {}) {
    return apiClient.get(API_CONFIG.ENDPOINTS.ADMIN_JOB_APPLICATIONS, { params });
  }

  static getJobApplicationById(id) {
    const url = API_CONFIG.ENDPOINTS.ADMIN_JOB_DETAIL.replace(':id', id);
    return apiClient.get(url);
  }

  static updateJobApplicationStatus(id, status) {
    const url = API_CONFIG.ENDPOINTS.ADMIN_JOB_STATUS.replace(':id', id);
    return apiClient.put(url, { status });
  }

  static updateJobApplicationNotes(id, notes) {
    const url = API_CONFIG.ENDPOINTS.ADMIN_JOB_NOTES.replace(':id', id);
    return apiClient.put(url, { notes });
  }

  static deleteJobApplication(id) {
    const url = API_CONFIG.ENDPOINTS.ADMIN_JOB_DELETE.replace(':id', id);
    return apiClient.delete(url);
  }

  static getResumeUrl(id) {
    const url = API_CONFIG.ENDPOINTS.ADMIN_JOB_RESUME_DOWNLOAD.replace(':id', id);
    return `${API_CONFIG.BASE_URL}${url}`;
  }

  static getJobAppStats() {
    return apiClient.get(API_CONFIG.ENDPOINTS.ADMIN_JOB_STATS);
  }

  // ==================== INTERNSHIP SERVICES ====================
  
  static submitInternshipApplication(formData) {
    return apiClient.post('/api/internship/apply', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }

  static getInternshipApplications(params = {}) {
    return apiClient.get('/api/internship/admin/applications', { params });
  }

  static getInternshipStats() {
    return apiClient.get('/api/internship/admin/stats');
  }

  static getInternshipApplicationById(id) {
    return apiClient.get(`/api/internship/admin/applications/${id}`);
  }

  static updateInternshipStatus(id, status) {
    return apiClient.put(`/api/internship/admin/applications/${id}/status`, { status });
  }

  static updateInternshipNotes(id, notes) {
    return apiClient.put(`/api/internship/admin/applications/${id}/notes`, { notes });
  }

  static deleteInternshipApplication(id) {
    return apiClient.delete(`/api/internship/admin/applications/${id}`);
  }

  // ==================== PART TIME APPLICATION SERVICES ====================
  
  // Public: Submit part time application
  static submitPartTimeApplication(formData) {
    return apiClient.post('/api/part-time/apply', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 60000
    });
  }

  // Admin: Get all part time applications
  static getPartTimeApplications(params = {}) {
    return apiClient.get('/api/part-time/admin/applications', { params });
  }

  // Admin: Get part time application statistics
  static getPartTimeStats() {
    return apiClient.get('/api/part-time/admin/stats');
  }

  // Admin: Get single part time application by ID
  static getPartTimeApplicationById(id) {
    return apiClient.get(`/api/part-time/admin/applications/${id}`);
  }

  // Admin: Update part time application status
  static updatePartTimeStatus(id, status, notes = '') {
    return apiClient.put(`/api/part-time/admin/applications/${id}/status`, { status, notes });
  }

  // Admin: Delete part time application
  static deletePartTimeApplication(id) {
    return apiClient.delete(`/api/part-time/admin/applications/${id}`);
  }

  // Admin: Bulk delete part time applications
  static bulkDeletePartTimeApplications(ids) {
    return apiClient.delete('/api/part-time/admin/applications/bulk', { data: { ids } });
  }

  // Helper: Get resume download URL
  static getPartTimeResumeUrl(id) {
    return `${API_CONFIG.BASE_URL}/api/part-time/admin/resume/${id}`;
  }

  // ==================== CAREER SERVICES ====================
  
  static getCareers() {
    return apiClient.get(API_CONFIG.ENDPOINTS.GET_CAREERS);
  }

  static getCareerById(id) {
    const url = API_CONFIG.ENDPOINTS.GET_CAREER_BY_ID.replace(':id', id);
    return apiClient.get(url);
  }

  // ==================== TEAM SERVICES ====================
  
  static getTeam() {
    return apiClient.get(API_CONFIG.ENDPOINTS.GET_TEAM);
  }

  static getTeamMember(id) {
    const url = API_CONFIG.ENDPOINTS.GET_TEAM_MEMBER.replace(':id', id);
    return apiClient.get(url);
  }

  // ==================== SETTINGS SERVICES ====================
  
  static getSettings() {
    return apiClient.get(API_CONFIG.ENDPOINTS.GET_SETTINGS);
  }

  static updateSettings(settings) {
    return apiClient.put(API_CONFIG.ENDPOINTS.UPDATE_SETTINGS, settings);
  }
}

export default ApiService;