import express from 'express';
import { getStats, createStat, updateStat, deleteStat } from '../controllers/statsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getStats);
router.post('/', protect, createStat);
router.put('/:id', protect, updateStat);
router.delete('/:id', protect, deleteStat);

export default router;
