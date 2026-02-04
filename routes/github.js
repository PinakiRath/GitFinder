const express = require('express');
const router = express.Router();
const { githubAPI } = require('../utils/githubHelper');
const errorHandler = require('../middleware/errorHandler');

// Get GitHub user
router.get('/users/:username', async (req, res) => {
    try {
        const { username } = req.params;
        console.log('Fetching user:', username);
        console.log('Using token:', process.env.GITHUB_TOKEN ? 'Yes' : 'No');
        
        const userData = await githubAPI.getUser(username);
        res.json(userData);
    } catch (error) {
        errorHandler(error, req, res);
    }
});

// Get user repositories
router.get('/users/:username/repos', async (req, res) => {
    try {
        const { username } = req.params;
        const reposData = await githubAPI.getUserRepos(username);
        res.json(reposData);
    } catch (error) {
        console.error('Repos Error:', error.response ? error.response.status : error.message);
        res.status(500).json({ error: 'Failed to fetch repositories' });
    }
});

// Check rate limit endpoint (useful for debugging)
router.get('/rate-limit', async (req, res) => {
    try {
        const rateLimitData = await githubAPI.getRateLimit();
        res.json(rateLimitData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to check rate limit' });
    }
});

module.exports = router;