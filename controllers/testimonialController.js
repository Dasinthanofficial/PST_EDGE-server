import mongoose from 'mongoose';
import Testimonial from '../models/Testimonial.js';

const normalizeRating = (value) => {
  const parsed = Number(value);

  if (Number.isNaN(parsed)) return 5;
  if (parsed < 1) return 1;
  if (parsed > 5) return 5;

  return parsed;
};

export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    console.error('Error in getTestimonials:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createTestimonial = async (req, res) => {
  try {
    const name = req.body.name?.trim();
    const role = req.body.role?.trim();
    const quote = req.body.quote?.trim();
    const rating = normalizeRating(req.body.rating);

    if (!name || !role || !quote) {
      return res.status(400).json({ message: 'Name, role, and quote are required' });
    }

    const testimonial = new Testimonial({
      name,
      role,
      quote,
      rating
    });

    const createdTestimonial = await testimonial.save();
    res.status(201).json(createdTestimonial);
  } catch (error) {
    console.error('Error in createTestimonial:', error);
    res.status(400).json({ message: error.message || 'Failed to create testimonial' });
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid testimonial ID' });
    }

    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    if (req.body.name !== undefined) testimonial.name = req.body.name.trim();
    if (req.body.role !== undefined) testimonial.role = req.body.role.trim();
    if (req.body.quote !== undefined) testimonial.quote = req.body.quote.trim();
    if (req.body.rating !== undefined) testimonial.rating = normalizeRating(req.body.rating);

    if (!testimonial.name || !testimonial.role || !testimonial.quote) {
      return res.status(400).json({ message: 'Name, role, and quote are required' });
    }

    const updatedTestimonial = await testimonial.save();
    res.json(updatedTestimonial);
  } catch (error) {
    console.error('Error in updateTestimonial:', error);
    res.status(400).json({ message: error.message || 'Failed to update testimonial' });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid testimonial ID' });
    }

    const testimonial = await Testimonial.findById(req.params.id);

    if (testimonial) {
      await testimonial.deleteOne();
      res.json({ message: 'Testimonial removed' });
    } else {
      res.status(404).json({ message: 'Testimonial not found' });
    }
  } catch (error) {
    console.error('Error in deleteTestimonial:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};