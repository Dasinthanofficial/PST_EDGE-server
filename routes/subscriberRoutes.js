import express from 'express';
import { subscribeNewsletter, getSubscribers, deleteSubscriber } from '../controllers/subscriberController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', subscribeNewsletter);
router.get('/', protect, getSubscribers);
router.delete('/:id', protect, deleteSubscriber);

export default router;
