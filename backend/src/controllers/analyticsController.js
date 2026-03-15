import githubService from '../services/githubService.js';
import RepositoryAnalytics from '../models/RepositoryAnalytics.model.js';
import logger from '../config/logger.js';

export const getAnalytics = async (req, res) => {
    try {
        const { username } = req.params;
        
        // Use Github Service for cached API requests
        const userData = await githubService.getProfile(username);
        const reposData = await githubService.getRepos(username);

        let totalStars = 0;
        let totalForks = 0;
        const languages = {};
        
        reposData.forEach(repo => {
            totalStars += repo.stargazers_count;
            totalForks += repo.forks_count;
            
            if (repo.language) {
                languages[repo.language] = (languages[repo.language] || 0) + 1;
            }
        });

        const topLanguages = Object.keys(languages)
            .map(key => ({ language: key, count: languages[key] }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);

        // Standard developer score formula: (stars * 2) + (followers * 3) + (repoCount * 1)
        const popularityScore = githubService.calculateDeveloperScore(totalStars, userData.followers, userData.public_repos);

        // Async save summary to repo analytics DB
        if (req.user) {
            const mostPopularRepo = [...reposData].sort((a, b) => b.stargazers_count - a.stargazers_count)[0];
            if (mostPopularRepo) {
                RepositoryAnalytics.findOneAndUpdate(
                    { userId: req.user.id, repoName: mostPopularRepo.name },
                    {
                        userId: req.user.id,
                        username: userData.login,
                        repoName: mostPopularRepo.name,
                        stars: mostPopularRepo.stargazers_count,
                        forks: mostPopularRepo.forks_count,
                        language: mostPopularRepo.language,
                        popularityScore
                    },
                    { upsert: true }
                ).catch(err => logger.error('Analytics save error:', err));
            }
        }

        res.json({
            success: true,
            data: {
                totalRepositories: userData.public_repos,
                followers: userData.followers,
                following: userData.following,
                totalStars,
                totalForks,
                topLanguages,
                popularityScore
            }
        });

    } catch (err) {
        logger.error(`Analytics Error for ${req.params.username}: ${err.message}`);
        res.status(500).json({ success: false, message: 'Server Error Fetching Analytics' });
    }
};
