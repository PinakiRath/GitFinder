import axios from 'axios';

// @desc    Compare two GitHub users
// @route   POST /api/compare
// @access  Private
export const compareUsers = async (req, res) => {
    try {
        const { username1, username2 } = req.body;
        
        if (!username1 || !username2) {
            return res.status(400).json({ success: false, message: 'Please provide both username1 and username2' });
        }

        const headers = {
            'User-Agent': 'GitFinder-Pro'
        };

        if (process.env.GITHUB_TOKEN) {
            headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
        }

        const fetchUserMetrics = async (username) => {
            const userRes = await axios.get(`https://api.github.com/users/${username}`, { headers });
            const userData = userRes.data;
            
            // Get limited repos instead of all to save rate limits
            const reposRes = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100`, { headers });
            const repos = reposRes.data;

            let totalStars = 0;
            const languages = {};
            
            repos.forEach(repo => {
                totalStars += repo.stargazers_count;
                if (repo.language) {
                    if (languages[repo.language]) {
                        languages[repo.language]++;
                    } else {
                        languages[repo.language] = 1;
                    }
                }
            });

            // Convert languages to sorted array
            const topLanguages = Object.keys(languages)
                .map(key => ({ language: key, count: languages[key] }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 3);

            return {
                username,
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
        console.error(err.response?.data?.message || err.message);
        res.status(500).json({ success: false, message: 'Server Error Comparing Users' });
    }
};
