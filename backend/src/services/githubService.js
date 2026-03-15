import axios from 'axios';
import { getCache, setCache } from '../config/redis.js';

class GitHubService {
    async getProfile(username) {
        const cacheKey = `github_profile:${username}`;
        
        // Check Redis cache first
        const cachedData = await getCache(cacheKey);
        if (cachedData) {
            return cachedData; // Cache hit logged inside getCache
        }

        // Cache missing -> fetch from GitHub API
        const headers = process.env.GITHUB_TOKEN ? { Authorization: `token ${process.env.GITHUB_TOKEN}` } : {};
        const response = await axios.get(`https://api.github.com/users/${username}`, { headers });
        
        // Store result with 1 hour (3600 seconds) expiration
        await setCache(cacheKey, response.data, 3600); 
        return response.data;
    }

    async getRepos(username) {
        const cacheKey = `github_repos:${username}`;
        
        const cachedData = await getCache(cacheKey);
        if (cachedData) {
            return cachedData;
        }

        const headers = process.env.GITHUB_TOKEN ? { Authorization: `token ${process.env.GITHUB_TOKEN}` } : {};
        const response = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers });
        
        await setCache(cacheKey, response.data, 3600); 
        return response.data;
    }

    calculateDeveloperScore(stars, followers, repoCount) {
        return (stars * 2) + (followers * 3) + (repoCount * 1);
    }
}

export default new GitHubService();
