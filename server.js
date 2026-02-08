const express = require('express');
const cors = require('cors');
const path = require('path');
const { port } = require('./config/config');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/github', require('./routes/github'));
app.use('/api/auth', require('./routes/auth'));

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Handle 404 for undefined routes
app.use('*', (req, res) => {
    res.status(404).json({ msg: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ msg: 'Server Error' });
});

// Start server
const server = app.listen(port, function() {
    console.log('');
    console.log('\x1b[32m╔════════════════════════════════════════════════════════════╗\x1b[0m');
    console.log('\x1b[32m║\x1b[0m                                                            \x1b[32m║\x1b[0m');
    console.log('\x1b[32m║\x1b[0m   \x1b[32m🚀 GitFinder Server is Running!\x1b[0m                          \x1b[32m║\x1b[0m');
    console.log('\x1b[32m║\x1b[0m                                                            \x1b[32m║\x1b[0m');
    console.log('\x1b[36m║\x1b[0m   🌐 Open: http://localhost:' + port + '                           \x1b[32m║\x1b[0m');
    console.log('\x1b[32m║\x1b[0m                                                            \x1b[32m║\x1b[0m');
    console.log('\x1b[33m║\x1b[0m   ⚡ Terminal Theme Activated                              \x1b[32m║\x1b[0m');
    console.log('\x1b[32m║\x1b[0m                                                            \x1b[32m║\x1b[0m');
    console.log('\x1b[32m║\x1b[0m                                                            \x1b[32m║\x1b[0m');
    console.log('\x1b[32m╚════════════════════════════════════════════════════════════╝\x1b[0m');
    console.log('');
});

module.exports = server;