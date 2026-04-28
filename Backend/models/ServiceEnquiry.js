import mongoose from 'mongoose';

const serviceEnquirySchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  company: {
    type: String,
    default: '',
  },
  service: {
    type: String,
    required: [true, 'Service selection is required'],
  },
  serviceCategory: {
    type: String,
    enum: ['Development', 'Infrastructure', 'Consulting & Analytics'],
  },
  budget: {
    type: String,
    enum: ['Less than ₹50,000', '₹50,000 - ₹2,00,000', '₹2,00,000 - ₹5,00,000', '₹5,00,000 - ₹10,00,000', '₹10,00,000+', 'Not sure'],
    default: 'Not sure',
  },
  timeline: {
    type: String,
    enum: ['Immediate', '1-3 months', '3-6 months', '6+ months', 'Just exploring'],
    default: 'Just exploring',
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'in_progress', 'completed', 'rejected'],
    default: 'new',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ServiceEnquiry = mongoose.model('ServiceEnquiry', serviceEnquirySchema);
export default ServiceEnquiry;