import express from 'express';
import {
  getContactMessages,
  getContactMessageById,
  updateMessageStatus,
  deleteContactMessage,
  getContactStats,
} from '../controllers/contactController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/contacts', getContactMessages);
router.get('/contacts/stats', getContactStats);
router.get('/contacts/:id', getContactMessageById);
router.put('/contacts/:id/status', updateMessageStatus);
router.delete('/contacts/:id', deleteContactMessage);

export default router;