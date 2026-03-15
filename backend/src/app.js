import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import githubRoutes from './routes/github.js';
import authRoutes from './routes/auth.js';
import historyRoutes from './routes/history.js';
import analyticsRoutes from './routes/analytics.js';
import aiRoutes from './routes/ai.js';
import compareRoutes from './routes/compare.js';
import logger from './config/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Log incoming requests using winston
app.use((req, res, next) => {
    logger.info(`Received ${req.method} request to ${req.url}`);
    next();
});

// Serve frontend dist files statically
app.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'dist')));

// Ensure endpoints exist
app.use('/api/github', githubRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/compare', compareRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// For all other routes, let standard React index handle it
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error(`App Error: ${err.message}`, { stack: err.stack });
    res.status(500).json({ msg: 'Server Error', error: err.message });
});

export default app;
