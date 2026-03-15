import express from 'express';
import { analyzeRepo } from '../controllers/aiController.js';
import { protect } from '../middlewares/auth.js';
import { checkUsageLimits } from '../middlewares/usageLimit.js';
import { apiLimiter } from '../middlewares/rateLimiter.js';

const router = express.Router();

router.post('/analyze-repo', protect, apiLimiter, checkUsageLimits, analyzeRepo);

export default router;
