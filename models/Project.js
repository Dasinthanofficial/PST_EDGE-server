import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  challenge: {
    type: String,
    required: true
  },
  solution: {
    type: String,
    required: true
  },
  technologies: {
    type: [String],
    required: true
  },
  liveDemo: {
    type: String
  },
  githubLink: {
    type: String
  },
  screenshots: {
    type: [String]
  },
  testimonial: {
    quote: String,
    author: String
  }
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
