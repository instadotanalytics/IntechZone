import express from 'express';
import {
  getAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from '../controllers/adminController.js';
import { 
  getDashboardStats, 
  getWeeklyVisitorData, 
  trackVisitor,
  getRecentActivity,
  updateProfile
} from '../controllers/dashboardController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// PUBLIC ROUTES (No authentication)
router.post('/track-visitor', trackVisitor);

// PROTECTED ROUTES (Authentication required)
router.use(protect);

// Profile routes
router.put('/profile', updateProfile);

// Dashboard stats routes
router.get('/dashboard/stats', getDashboardStats);
router.get('/dashboard/activity', getRecentActivity);
router.get('/dashboard/weekly-visitors', getWeeklyVisitorData);

// Admin management
router.route('/admins')
  .get(getAdmins)
  .post(createAdmin);

router.route('/admins/:id')
  .get(getAdminById)
  .put(updateAdmin)
  .delete(deleteAdmin);

export default router;