import express from 'express';
import { getGitHubUser, getUserRepos } from '../controllers/githubController.js';
import { protect } from '../middlewares/auth.js';
import { apiLimiter } from '../middlewares/rateLimiter.js';
import { checkUsageLimits } from '../middlewares/usageLimit.js';

const router = express.Router();

// Get GitHub user profile
router.get('/profile/:username', protect, apiLimiter, checkUsageLimits, getGitHubUser);
router.get('/users/:username', getGitHubUser); // Legacy support

// Get user repositories
router.get('/users/:username/repos', getUserRepos);

export default router;
