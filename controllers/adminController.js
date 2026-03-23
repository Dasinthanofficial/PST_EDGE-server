import Project from '../models/Project.js';
import Contact from '../models/Contact.js';

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getStats = async (req, res) => {
  try {
    const projectCount = await Project.countDocuments();
    const contactCount = await Contact.countDocuments();

    res.json({
      projects: projectCount,
      contacts: contactCount
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};