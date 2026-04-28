import express from 'express';
import {
  getAllEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry,
  getEnquiryStats,
} from '../controllers/serviceEnquiryController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/enquiries', getAllEnquiries);
router.get('/enquiries/stats', getEnquiryStats);
router.get('/enquiries/:id', getEnquiryById);
router.put('/enquiries/:id/status', updateEnquiryStatus);
router.delete('/enquiries/:id', deleteEnquiry);

export default router;