const GitHubUser = require('../models/GitHubUser');
const User = require('../models/User');
const { githubAPI } = require('../utils/githubHelper');

// @desc    Get GitHub user profile
// @route   GET /api/github/users/:username
// @access  Public
const getGitHubUser = async (req, res) => {
  try {
    const { username } = req.params;
    
    // First check if user exists in our database
    let dbUser = await GitHubUser.findOne({ login: username });
    
    if (dbUser) {
      // Update the search count and last accessed time
      dbUser.searchCount += 1;
      dbUser.lastAccessed = Date.now();
      await dbUser.save();
      
      // Return cached data
      return res.json(dbUser);
    }
    
    // If not in DB, fetch from GitHub API
    const githubUserData = await githubAPI.getUser(username);
    
    // Save to database
    dbUser = new GitHubUser({
      githubId: githubUserData.id,
      login: githubUserData.login,
      name: githubUserData.name,
      avatar_url: githubUserData.avatar_url,
      bio: githubUserData.bio,
      location: githubUserData.location,
      company: githubUserData.company,
      blog: githubUserData.blog,
      twitter_username: githubUserData.twitter_username,
      public_repos: githubUserData.public_repos,
      followers: githubUserData.followers,
      following: githubUserData.following,
      public_gists: githubUserData.public_gists,
      created_at: githubUserData.created_at,
      updated_at: githubUserData.updated_at,
      searchCount: 1,
      lastAccessed: Date.now()
    });
    
    await dbUser.save();
    
    res.json(dbUser);
  } catch (error) {
    console.error('Error fetching GitHub user:', error);
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (error.response && error.response.status === 403) {
      return res.status(403).json({ error: 'API rate limit exceeded' });
    }
    if (error.response && error.response.status === 401) {
      return res.status(401).json({ error: 'Invalid GitHub token' });
    }
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
};

// @desc    Get user repositories
// @route   GET /api/github/users/:username/repos
// @access  Public
const getUserRepos = async (req, res) => {
  try {
    const { username } = req.params;
    const reposData = await githubAPI.getUserRepos(username);
    res.json(reposData);
  } catch (error) {
    console.error('Repos Error:', error.response ? error.response.status : error.message);
    res.status(500).json({ error: 'Failed to fetch repositories' });
  }
};

// @desc    Add GitHub username to user profile
// @route   PUT /api/github/link
// @access  Private
const linkGitHubAccount = async (req, res) => {
  try {
    const { githubUsername } = req.body;
    
    // Update user's GitHub username
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { githubUsername },
      { new: true }
    ).select('-password');
    
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Add search to user history
// @route   POST /api/github/history
// @access  Private
const addToSearchHistory = async (req, res) => {
  try {
    const { username, result } = req.body;
    
    // Update user's search history
    const user = await User.findById(req.user.id);
    
    // Add to search history (limit to last 20 searches)
    user.searchHistory.unshift({ username, result });
    if (user.searchHistory.length > 20) {
      user.searchHistory.pop();
    }
    
    await user.save();
    
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Get user search history
// @route   GET /api/github/history
// @access  Private
const getSearchHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('searchHistory');
    res.json(user.searchHistory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Get trending GitHub users
// @route   GET /api/github/trending
// @access  Public
const getTrendingUsers = async (req, res) => {
  try {
    const trendingUsers = await GitHubUser.find({})
      .sort({ searchCount: -1 })
      .limit(10);
    
    res.json(trendingUsers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getGitHubUser,
  getUserRepos,
  linkGitHubAccount,
  addToSearchHistory,
  getSearchHistory,
  getTrendingUsers
};