import express from 'express';
import { loginAdmin, logoutAdmin, getCurrentAdmin } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/logout', logoutAdmin);
router.get('/me', protect, getCurrentAdmin);

export default router;