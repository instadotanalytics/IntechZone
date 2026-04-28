// routes/internshipRoutes.js
import express from 'express';
import {
  submitInternshipApplication,
  getAllInternshipApplications,
  getInternshipApplicationById,
  updateInternshipStatus,
  updateInternshipNotes,
  deleteInternshipApplication,
  getInternshipStats,
  uploadResume
} from '../controllers/internshipController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public route - Submit application
router.post('/apply', uploadResume, submitInternshipApplication);

// Admin routes (protected)
router.get('/admin/applications', protect, getAllInternshipApplications);
router.get('/admin/applications/:id', protect, getInternshipApplicationById);
router.get('/admin/stats', protect, getInternshipStats);
router.put('/admin/applications/:id/status', protect, updateInternshipStatus);
router.put('/admin/applications/:id/notes', protect, updateInternshipNotes);
router.delete('/admin/applications/:id', protect, deleteInternshipApplication);

export default router;