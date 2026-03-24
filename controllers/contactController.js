import mongoose from 'mongoose';
import Contact from '../models/Contact.js';

// @desc    Submit a contact form
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req, res) => {
  try {
    const businessName = req.body.businessName?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const phone = req.body.phone?.trim();
    const service = req.body.service?.trim();
    const projectDescription = req.body.projectDescription?.trim();

    if (!businessName || !email || !phone || !service || !projectDescription) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const contact = new Contact({
      businessName,
      email,
      phone,
      service,
      projectDescription
    });

    await contact.save();

    res.status(201).json({
      message: 'Message sent successfully. We will get back to you soon!'
    });
  } catch (error) {
    console.error('Error in submitContact:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private/Admin
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error('Error in getContacts:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a contact message
// @route   DELETE /api/contact/:id
// @access  Private/Admin
export const deleteContact = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid message ID' });
    }

    const contact = await Contact.findById(req.params.id);

    if (contact) {
      await contact.deleteOne();
      res.json({ message: 'Message removed' });
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    console.error('Error in deleteContact:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};