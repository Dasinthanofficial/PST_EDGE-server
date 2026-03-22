import Blog from '../models/Blog.js';
import Project from '../models/Project.js';
import Service from '../models/Service.js';
import Contact from '../models/Contact.js';
import Subscriber from '../models/Subscriber.js';

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getStats = async (req, res) => {
  try {
    const blogCount = await Blog.countDocuments();
    const projectCount = await Project.countDocuments();
    const serviceCount = await Service.countDocuments();
    const contactCount = await Contact.countDocuments();
    const subscriberCount = await Subscriber.countDocuments();

    res.json({
      blogs: blogCount,
      projects: projectCount,
      services: serviceCount,
      contacts: contactCount,
      subscribers: subscriberCount
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
