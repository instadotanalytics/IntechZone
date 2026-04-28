// models/Contact.js
import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    default: '',
  },
  service: {
    type: String,
    default: 'General Inquiry',
  },
  message: {
    type: String,
    required: [true, 'Please provide message'],
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'archived'],
    default: 'new',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;