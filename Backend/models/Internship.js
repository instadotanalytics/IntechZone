// models/Internship.js
import mongoose from 'mongoose';

const internshipSchema = new mongoose.Schema({
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
  qualification: {
    type: String,
    required: [true, 'Qualification is required'],
  },
  course: {
    type: String,
    required: [true, 'Course/Stream is required'],
  },
  passingYear: {
    type: String,
    required: [true, 'Passing year is required'],
  },
  internshipRole: {
    type: String,
    required: [true, 'Internship role is required'],
    enum: ['Web Development', 'App Development', 'Digital Marketing', 'Graphic Design', 'Content Writing', 'SEO', 'Data Analytics', 'Cloud Computing', 'Cybersecurity', 'Other'],
  },
  duration: {
    type: String,
    default: '3 months',
  },
  startDate: {
    type: String,
    default: '',
  },
  skills: {
    type: String,
    default: '',
  },
  portfolioUrl: {
    type: String,
    default: '',
  },
  linkedinUrl: {
    type: String,
    default: '',
  },
  whyJoin: {
    type: String,
    default: '',
  },
  resume: {
    url: String,
    publicId: String,
    originalName: String,
    size: Number,
    mimetype: String,
  },
  status: {
    type: String,
    enum: ['new', 'reviewed', 'shortlisted', 'rejected', 'selected'],
    default: 'new',
  },
  interviewDate: {
    type: Date,
    default: null,
  },
  notes: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// ✅ FIXED pre-save middleware (without "next" parameter issue)
internshipSchema.pre('save', function() {
  this.updatedAt = Date.now();
});

const Internship = mongoose.model('Internship', internshipSchema);
export default Internship;