import AIInsights from '../models/AIInsights.model.js';
import { aiAnalysisQueue } from '../jobs/aiQueue.js';
import logger from '../config/logger.js';

export const analyzeRepo = async (req, res) => {
    try {
        const { repoName, owner } = req.body;
        
        if (!repoName || !owner) {
            return res.status(400).json({ success: false, message: 'Please provide repoName and owner' });
        }

        const fullRepoName = `${owner}/${repoName}`;

        // Check if analysis already exists
        const existingInsight = await AIInsights.findOne({ repoName: fullRepoName });
        if (existingInsight) {
            return res.status(200).json({ success: true, data: existingInsight, status: 'completed' });
        }

        // Add to BullMQ for background processing
        await aiAnalysisQueue.add('analyzeRepoJob', { repoName, owner });

        res.status(202).json({ 
            success: true, 
            message: "Analysis queued successfully. Please check back later.",
            status: 'processing'
        });

    } catch (err) {
        logger.error(`AI Analytics queue error: ${err.message}`);
        res.status(500).json({ success: false, message: 'Server Error Generating Insights' });
    }
};
