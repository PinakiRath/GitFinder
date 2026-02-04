const express = require('express');
const path = require('path');
const { port } = require('./config/config');
const githubRoutes = require('./routes/github');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', githubRoutes);

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(port, function() {
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