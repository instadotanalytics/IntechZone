// backend/models/PartTimeApplication.js
import mongoose from 'mongoose';

const partTimeApplicationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  passingYear: {
    type: String,
    required: true
  },
  internshipRole: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    default: '3 months'
  },
  startDate: {
    type: String
  },
  skills: {
    type: String
  },
  portfolioUrl: {
    type: String
  },
  linkedinUrl: {
    type: String
  },
  whyJoin: {
    type: String
  },
  resume: {
    url: String,
    publicId: String,
    originalName: String,
    size: Number
  },
  status: {
    type: String,
    enum: ['new', 'reviewed', 'shortlisted', 'rejected', 'selected'],
    default: 'new'
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  reviewedAt: {
    type: Date
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

const PartTimeApplication = mongoose.model('PartTimeApplication', partTimeApplicationSchema);
export default PartTimeApplication;