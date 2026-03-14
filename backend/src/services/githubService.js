import axios from 'axios';
import { getCache, setCache } from '../config/redis.js';

class GitHubService {
    async getProfile(username) {
        const cacheKey = `github_profile:${username}`;
        const cachedData = await getCache(cacheKey);
        if (cachedData) return cachedData;

        const headers = process.env.GITHUB_TOKEN ? { Authorization: `token ${process.env.GITHUB_TOKEN}` } : {};
        const response = await axios.get(`https://api.github.com/users/${username}`, { headers });
        
        await setCache(cacheKey, response.data, 3600); // Cache for 1 hour
        return response.data;
    }

    async getRepos(username) {
        const cacheKey = `github_repos:${username}`;
        const cachedData = await getCache(cacheKey);
        if (cachedData) return cachedData;

        const headers = process.env.GITHUB_TOKEN ? { Authorization: `token ${process.env.GITHUB_TOKEN}` } : {};
        const response = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers });
        
        await setCache(cacheKey, response.data, 3600); // Cache for 1 hour
        return response.data;
    }

    calculateDeveloperScore(stars, followers, repoCount) {
        return (stars * 2) + (followers * 3) + (repoCount * 1);
    }
}

export default new GitHubService();
