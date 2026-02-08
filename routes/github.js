import express from 'express';
import {
    getGitHubUser,
    getUserRepos,
    linkGitHubAccount,
    addToSearchHistory,
    getSearchHistory,
    getTrendingUsers
} from '../controllers/githubController.js';
import auth from '../middleware/auth.js';
import errorHandler from '../middleware/errorHandler.js';
import { githubAPI } from '../utils/githubHelper.js';

const router = express.Router();

// Get GitHub user
router.get('/users/:username', getGitHubUser);

// Get user repositories
router.get('/users/:username/repos', getUserRepos);

// Link GitHub account to user profile (requires authentication)
router.put('/link', auth, linkGitHubAccount);

// Add search to user history (requires authentication)
router.post('/history', auth, addToSearchHistory);

// Get user search history (requires authentication)
router.get('/history', auth, getSearchHistory);

// Get trending GitHub users
router.get('/trending', getTrendingUsers);

// Check rate limit endpoint (useful for debugging)
router.get('/rate-limit', async (req, res) => {
    try {
        const rateLimitData = await githubAPI.getRateLimit();
        res.json(rateLimitData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to check rate limit' });
    }
});

export default router;