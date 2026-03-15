import githubService from '../services/githubService.js';
import SearchHistory from '../models/SearchHistory.model.js';
import logger from '../config/logger.js';

export const getGitHubUser = async (req, res, next) => {
    try {
        const { username } = req.params;
        const profileData = await githubService.getProfile(username);
        
        // Asynchronously save to history if user is authenticated
        if (req.user) {
            SearchHistory.create({ userId: req.user.id, searchedUsername: username })
                .catch(err => logger.error('History Save Error', err));
        }

        res.status(200).json(profileData);
    } catch (error) {
        logger.error(`GitHub API Failure for profile ${req.params.username}: ${error.message}`);
        res.status(error.response?.status || 500).json({ error: error.message || 'Failed to fetch user data' });
    }
};

export const getUserRepos = async (req, res, next) => {
    try {
        const { username } = req.params;
        const reposData = await githubService.getRepos(username);
        res.status(200).json(reposData);
    } catch (error) {
        logger.error(`GitHub API Failure for repos ${req.params.username}: ${error.message}`);
        res.status(error.response?.status || 500).json({ error: 'Failed to fetch repositories' });
    }
};
