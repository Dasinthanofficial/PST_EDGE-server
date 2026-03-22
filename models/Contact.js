import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  service: {
    type: String,
    required: true
  },
  projectDescription: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Contact', contactSchema);
