import express from 'express';
import { loginAdmin, registerAdmin, logoutAdmin } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/logout', logoutAdmin);

// Allow admin registration only when explicitly enabled
if (process.env.ALLOW_ADMIN_REGISTER === 'true') {
  router.post('/register', registerAdmin);
} else {
  router.post('/register', protect, registerAdmin);
}

export default router;