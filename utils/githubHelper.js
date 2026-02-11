import axios from 'axios';
import config from '../config/config.js';

const { githubToken, githubApi } = config;

// Helper function to get headers with token (like async handler)
export const getGitHubHeaders = () => {
    const headers = {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'GitFinder-App'
    };

    // Add authorization if token exists
    if (githubToken) {
        headers['Authorization'] = 'token ' + githubToken;
    }

    return headers;
};

// GitHub API helper functions
export const githubAPI = {
    getUser: async (username) => {
        const response = await axios.get(`${githubApi}/users/${username}`, {
            headers: getGitHubHeaders()
        });
        return response.data;
    },

    getUserRepos: async (username) => {
        const response = await axios.get(`${githubApi}/users/${username}/repos`, {
            headers: getGitHubHeaders(),
            params: {
                sort: 'updated',
                per_page: 6,
                direction: 'desc'
            }
        });
        return response.data;
    },

    getRateLimit: async () => {
        const response = await axios.get(`${githubApi}/rate_limit`, {
            headers: getGitHubHeaders()
        });
        return response.data;
    }
};