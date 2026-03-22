import Subscriber from '../models/Subscriber.js';

// @desc    Subscribe to newsletter
// @route   POST /api/subscribers
// @access  Public
export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const exists = await Subscriber.findOne({ email });
    if (exists) {
        return res.status(400).json({ message: 'You are already subscribed!' });
    }

    await Subscriber.create({ email });

    res.status(201).json({ message: 'Subscribed to newsletter successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all subscribers
// @route   GET /api/subscribers
// @access  Private/Admin
export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find({}).sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a subscriber
// @route   DELETE /api/subscribers/:id
// @access  Private/Admin
export const deleteSubscriber = async (req, res) => {
  try {
    const subscriber = await Subscriber.findById(req.params.id);
    if (subscriber) {
      await subscriber.deleteOne();
      res.json({ message: 'Subscriber removed' });
    } else {
      res.status(404).json({ message: 'Subscriber not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
