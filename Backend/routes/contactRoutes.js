import express from 'express';
import { submitContactForm , getContactInfo } from '../controllers/contactController.js';

const router = express.Router();

// Public route for contact form
router.post('/submit', submitContactForm);
router.get('/info', getContactInfo);

export default router;