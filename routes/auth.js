import express from 'express';
import { registerUser, loginUser, getMe } from '../controllers/authController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', registerUser);

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', loginUser);

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
router.get('/me', auth, getMe);

export default router;