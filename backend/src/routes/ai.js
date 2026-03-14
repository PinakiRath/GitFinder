import express from 'express';
import { analyzeRepo } from '../controllers/aiController.js';
import { protect } from '../middlewares/auth.js';
import { checkUsageLimits } from '../middlewares/usageLimit.js';

const router = express.Router();

// @route   POST /api/ai/analyze-repo
router.post('/analyze-repo', protect, checkUsageLimits, analyzeRepo);

export default router;
