import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    quote: {
      type: String,
      trim: true
    },
    author: {
      type: String,
      trim: true
    }
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format']
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    thumbnail: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    challenge: {
      type: String,
      required: true,
      trim: true
    },
    solution: {
      type: String,
      required: true,
      trim: true
    },
    technologies: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: 'At least one technology is required'
      }
    },
    liveDemo: {
      type: String,
      trim: true,
      default: ''
    },
    githubLink: {
      type: String,
      trim: true,
      default: ''
    },
    screenshots: {
      type: [String],
      default: []
    },
    testimonial: {
      type: testimonialSchema,
      default: undefined
    }
  },
  { timestamps: true }
);

projectSchema.pre('save', function (next) {
  if (Array.isArray(this.technologies)) {
    this.technologies = this.technologies
      .map((tech) => String(tech).trim())
      .filter(Boolean);
  }

  if (Array.isArray(this.screenshots)) {
    this.screenshots = this.screenshots
      .map((shot) => String(shot).trim())
      .filter(Boolean);
  }

  if (
    this.testimonial &&
    !this.testimonial.quote &&
    !this.testimonial.author
  ) {
    this.testimonial = undefined;
  }

  next();
});

export default mongoose.model('Project', projectSchema);