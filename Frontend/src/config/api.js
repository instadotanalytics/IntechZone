// config/api.js
const API_CONFIG = {
  // Base URLs
  BASE_URL: 'http://localhost:5000',
  
  // Timeout settings
  TIMEOUT: 30000,
  
  // Endpoints
  ENDPOINTS: {
    // Auth endpoints
    ADMIN_LOGIN: '/api/auth/login',
    ADMIN_VERIFY: '/api/auth/me',
    ADMIN_LOGOUT: '/api/auth/logout',
    ADMIN_CHANGE_PASSWORD: '/api/auth/change-password',
    
    // Dashboard endpoints
    DASHBOARD_STATS: '/api/admin/dashboard/stats',
    DASHBOARD_ACTIVITY: '/api/admin/dashboard/activity',
    
    // Profile endpoints
    PROFILE_UPDATE: '/api/admin/profile',
    
    // Contact endpoints (Public)
    CONTACT_SUBMIT: '/api/contact/submit',
    GET_CONTACT_INFO: '/api/contact/info',
    
    // Admin Contact endpoints
    ADMIN_CONTACTS: '/api/admin/contacts',
    ADMIN_CONTACTS_STATS: '/api/admin/contacts/stats',
    ADMIN_CONTACT_STATUS: '/api/admin/contacts/:id/status',
    ADMIN_CONTACT_DELETE: '/api/admin/contacts/:id',
    ADMIN_UPDATE_CONTACT_INFO: '/api/admin/contact-info',
    
    // Service Enquiry endpoints
    SERVICE_ENQUIRY_SUBMIT: '/api/service-enquiry/submit',
    ADMIN_ENQUIRIES: '/api/admin/enquiries',
    ADMIN_ENQUIRIES_STATS: '/api/admin/enquiries/stats',
    ADMIN_ENQUIRY_STATUS: '/api/admin/enquiries/:id/status',
    ADMIN_ENQUIRY_DELETE: '/api/admin/enquiries/:id',
    
    // Projects endpoints
    GET_PROJECTS: '/api/admin/projects',
    CREATE_PROJECT: '/api/admin/projects',
    UPDATE_PROJECT: '/api/admin/projects',
    DELETE_PROJECT: '/api/admin/projects',
    
    // ✅ Job Application endpoints (MATCH BACKEND ROUTES)
    JOB_APPLY: '/api/fulltime-job/apply',
    ADMIN_JOB_APPLICATIONS: '/api/fulltime-job/admin/applications',
    ADMIN_JOB_STATS: '/api/fulltime-job/admin/stats',
    ADMIN_JOB_DETAIL: '/api/fulltime-job/admin/:id',
    ADMIN_JOB_STATUS: '/api/fulltime-job/admin/:id/status',
    ADMIN_JOB_NOTES: '/api/fulltime-job/admin/:id/notes',
    ADMIN_JOB_DELETE: '/api/fulltime-job/admin/:id',
    ADMIN_JOB_RESUME_DOWNLOAD: '/api/fulltime-job/admin/:id/resume',
    
    // ✅ Internship endpoints
    INTERNSHIP_APPLY: '/api/internship/apply',
    ADMIN_INTERNSHIP_APPLICATIONS: '/api/internship/admin/applications',
    ADMIN_INTERNSHIP_STATS: '/api/internship/admin/stats',
    ADMIN_INTERNSHIP_DETAIL: '/api/internship/admin/applications/:id',
    ADMIN_INTERNSHIP_STATUS: '/api/internship/admin/applications/:id/status',
    ADMIN_INTERNSHIP_NOTES: '/api/internship/admin/applications/:id/notes',
    ADMIN_INTERNSHIP_DELETE: '/api/internship/admin/applications/:id',
    
    // ✅ Part Time Application endpoints
    PART_TIME_APPLY: '/api/part-time/apply',
    ADMIN_PART_TIME_APPLICATIONS: '/api/part-time/admin/applications',
    ADMIN_PART_TIME_STATS: '/api/part-time/admin/stats',
    ADMIN_PART_TIME_DETAIL: '/api/part-time/admin/applications/:id',
    ADMIN_PART_TIME_STATUS: '/api/part-time/admin/applications/:id/status',
    ADMIN_PART_TIME_DELETE: '/api/part-time/admin/applications/:id',
    ADMIN_PART_TIME_BULK_DELETE: '/api/part-time/admin/applications/bulk',
    ADMIN_PART_TIME_RESUME: '/api/part-time/admin/resume/:id',
    
    // Career endpoints
    GET_CAREERS: '/api/careers',
    GET_CAREER_BY_ID: '/api/careers/:id',
    
    // Team endpoints
    GET_TEAM: '/api/team',
    GET_TEAM_MEMBER: '/api/team/:id',
    
    // Settings endpoints
    GET_SETTINGS: '/api/settings',
    UPDATE_SETTINGS: '/api/admin/settings',
  }
};

export default API_CONFIG;