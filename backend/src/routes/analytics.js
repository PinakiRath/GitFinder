import express from 'express';
import { getAnalytics } from '../controllers/analyticsController.js';
import { protect } from '../middlewares/auth.js';
import { apiLimiter } from '../middlewares/rateLimiter.js';
import { checkUsageLimits } from '../middlewares/usageLimit.js';

const router = express.Router();

router.get('/:username', protect, apiLimiter, checkUsageLimits, getAnalytics);

export default router;
