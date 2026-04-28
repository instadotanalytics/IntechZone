import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
  },
  description: {
    type: String,
    default: '',  // Made optional with default value
  },
  category: {
    type: String,
    enum: ['web', 'app', 'cloud', 'consulting', 'marketing', 'cybersecurity'],
    default: 'web',
  },
  client: {
    type: String,
    default: '',
  },
  completionDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'planned'],
    default: 'completed',
  },
  imageUrl: {
    type: String,
    default: '',
  },
  technologies: [{
    type: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.model('Project', projectSchema);
export default Project;