import express from 'express';
import { compareUsers } from '../controllers/compareController.js';
import { protect } from '../middlewares/auth.js';
import { checkUsageLimits } from '../middlewares/usageLimit.js';

const router = express.Router();

// @route   POST /api/compare
router.post('/', protect, checkUsageLimits, compareUsers);

export default router;
