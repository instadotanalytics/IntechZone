import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
  },
  userAgent: {
    type: String,
    default: '',
  },
  page: {
    type: String,
    default: '/',
  },
  visitedAt: {
    type: Date,
    default: Date.now,
  },
});

visitorSchema.index({ visitedAt: -1 });

const Visitor = mongoose.model('Visitor', visitorSchema);
export default Visitor;