const errorHandler = (error, req, res, next) => {
    console.error('Error:', error.response ? error.response.status : error.message);
    
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
};

module.exports = errorHandler;