import express from 'express';
import { compareUsers } from '../controllers/compareController.js';
import { protect } from '../middlewares/auth.js';
import { checkUsageLimits } from '../middlewares/usageLimit.js';
import { apiLimiter } from '../middlewares/rateLimiter.js';

const router = express.Router();

router.post('/', protect, apiLimiter, checkUsageLimits, compareUsers);

export default router;
