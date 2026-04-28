import mongoose from 'mongoose';

const fullTimeJobApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true },
  position: { type: String, required: true },
  experience: { type: String, required: true },
  currentCompany: { type: String, default: '' },
  currentCTC: { type: String, default: '' },
  expectedCTC: { type: String, required: true },
  noticePeriod: { type: String, required: true },
  skills: { type: String, required: true },
  portfolioUrl: { type: String, default: '' },
  linkedinUrl: { type: String, default: '' },
  coverLetter: { type: String, default: '' },
  
  // ☁️ Cloudinary resume fields
  resume: {
    cloudinaryId: String,  // Cloudinary public_id
    url: String,           // Cloudinary secure URL
    filename: String,      // Cloudinary filename
    originalName: String,  // Original file name
    size: Number,          // File size in bytes
    mimetype: String       // File MIME type
  },
  
  status: {
    type: String,
    enum: ['new', 'reviewed', 'shortlisted', 'rejected', 'hired'],
    default: 'new'
  },
  notes: { type: String, default: '' }
}, { timestamps: true });

const FullTimeJobApplication = mongoose.model('FullTimeJobApplication', fullTimeJobApplicationSchema);

export default FullTimeJobApplication;