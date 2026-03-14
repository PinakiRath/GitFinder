import mongoose from 'mongoose';

const aiInsightsSchema = new mongoose.Schema({
    repoName: { 
        type: String, 
        required: true 
    },
    summary: { 
        type: String, 
        required: true 
    },
    complexityScore: { 
        type: Number, 
        min: 1, 
        max: 10 
    }
}, { timestamps: true });

export const AIInsights = mongoose.model('AIInsights', aiInsightsSchema);
export default AIInsights;
