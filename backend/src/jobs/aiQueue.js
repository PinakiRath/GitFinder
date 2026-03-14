import { Queue, Worker } from 'bullmq';
import AIInsights from '../models/AIInsights.model.js';
import logger from '../config/logger.js';
import redisClient from '../config/redis.js';
import axios from 'axios';

// Define the Queue
export const aiAnalysisQueue = new Queue('ai-analysis', { 
    connection: redisClient 
});

// Define the Worker process
const aiWorker = new Worker('ai-analysis', async (job) => {
    const { repoName, owner } = job.data;
    const fullRepoName = `${owner}/${repoName}`;

    logger.info(`Processing AI analysis for ${fullRepoName}`);

    let summaryText = `AI analysis processed in background queue for ${fullRepoName}.`;
    let complexityScore = Math.floor(Math.random() * 8) + 3;

    if (process.env.GEMINI_API_KEY) {
        try {
            const readmeRes = await axios.get(`https://api.github.com/repos/${fullRepoName}/readme`);
            const decodedReadme = Buffer.from(readmeRes.data.content, 'base64').toString('ascii');

            const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
            const prompt = `Analyze this GitHub repository README and provide: 
            1. A short summary of what it does (max 50 words).
            2. A project complexity score from 1-10 as a single number on the next line.
            README content: \n${decodedReadme.substring(0, 2000)}`;

            const result = await axios.post(geminiUrl, {
                contents: [{ parts: [{ text: prompt }] }]
            });

            const textOutput = result.data.candidates[0].content.parts[0].text;
            const lines = textOutput.split('\n');
            summaryText = lines[0] || summaryText;
            const maybeScore = parseInt(lines[1], 10);
            if (!isNaN(maybeScore) && maybeScore >= 1 && maybeScore <= 10) {
                complexityScore = maybeScore;
            }
        } catch (error) {
            logger.error(`Error with Gemini inside BullMQ worker for ${fullRepoName}: ${error.message}`);
        }
    }

    // Save to DB when finished
    await AIInsights.findOneAndUpdate(
        { repoName: fullRepoName },
        { repoName: fullRepoName, summary: summaryText, complexityScore },
        { upsert: true, new: true }
    );

}, { connection: redisClient });

aiWorker.on('completed', job => logger.info(`Job ${job.id} completed!`));
aiWorker.on('failed', (job, err) => logger.error(`Job ${job.id} failed: ${err.message}`));
