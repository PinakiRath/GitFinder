import githubService from '../services/githubService.js';
import logger from '../config/logger.js';

export const compareUsers = async (req, res) => {
    try {
        const { username1, username2 } = req.body;
        
        if (!username1 || !username2) {
            return res.status(400).json({ success: false, message: 'Please provide both username1 and username2' });
        }

        const fetchUserMetrics = async (username) => {
            const userData = await githubService.getProfile(username);
            const repos = await githubService.getRepos(username);

            let totalStars = 0;
            const languages = {};
            
            repos.forEach(repo => {
                totalStars += repo.stargazers_count;
                if (repo.language) {
                    languages[repo.language] = (languages[repo.language] || 0) + 1;
                }
            });

            const topLanguages = Object.keys(languages)
                .map(key => ({ language: key, count: languages[key] }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 3);

            return {
                username: userData.login,
                avatar_url: userData.avatar_url,
                repoCount: userData.public_repos,
                followers: userData.followers,
                totalStars,
                topLanguages
            };
        };

        const [user1Data, user2Data] = await Promise.all([
            fetchUserMetrics(username1),
            fetchUserMetrics(username2)
        ]);

        res.json({
            success: true,
            data: {
                user1: user1Data,
                user2: user2Data
            }
        });

    } catch (err) {
        logger.error(`Compare Users Error: ${err.message}`);
        res.status(500).json({ success: false, message: 'Server Error Comparing Users' });
    }
};
