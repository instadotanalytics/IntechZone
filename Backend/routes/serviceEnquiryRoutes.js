import express from 'express';
import { submitServiceEnquiry } from '../controllers/serviceEnquiryController.js';

const router = express.Router();

// Public route for service enquiry
router.post('/submit', submitServiceEnquiry);

export default router;