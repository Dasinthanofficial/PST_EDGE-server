import Stats from '../models/Stats.js';

// @desc    Get all stats
// @route   GET /api/stats
// @access  Public
export const getStats = async (req, res) => {
  try {
    const stats = await Stats.find().sort({ order: 1 });
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a stat
// @route   POST /api/stats
// @access  Private/Admin
export const createStat = async (req, res) => {
  const { label, value, order } = req.body;
  try {
    const stat = await Stats.create({ label, value, order });
    res.status(201).json(stat);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a stat
// @route   PUT /api/stats/:id
// @access  Private/Admin
export const updateStat = async (req, res) => {
  try {
    const stat = await Stats.findById(req.params.id);
    if (!stat) return res.status(404).json({ message: 'Stat not found' });

    stat.label = req.body.label || stat.label;
    stat.value = req.body.value || stat.value;
    stat.order = req.body.order !== undefined ? req.body.order : stat.order;

    const updatedStat = await stat.save();
    res.json(updatedStat);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a stat
// @route   DELETE /api/stats/:id
// @access  Private/Admin
export const deleteStat = async (req, res) => {
  try {
    const stat = await Stats.findById(req.params.id);
    if (!stat) return res.status(404).json({ message: 'Stat not found' });

    await stat.deleteOne();
    res.json({ message: 'Stat removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
