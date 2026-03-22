import express from 'express';
import { loginAdmin, registerAdmin, logoutAdmin } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/register', registerAdmin);
router.post('/logout', logoutAdmin);

export default router;
