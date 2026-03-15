import dotenv from 'dotenv';
dotenv.config();

export default {
    port: process.env.PORT || 5000,
    githubToken: process.env.GITHUB_TOKEN,
    githubApi: 'https://api.github.com'
};
