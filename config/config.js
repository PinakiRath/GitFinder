require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    githubToken: process.env.GITHUB_TOKEN,
    githubApi: 'https://api.github.com'
};