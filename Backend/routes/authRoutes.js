import express from 'express';
import { loginAdmin, getMe, logoutAdmin, changePassword } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes (no authentication needed)
router.post('/login', loginAdmin);

// Protected routes (authentication needed)
router.get('/me', protect, getMe);
router.post('/logout', protect, logoutAdmin);
router.put('/change-password', protect, changePassword);

export default router;