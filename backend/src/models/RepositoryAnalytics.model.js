import mongoose from 'mongoose';

const repositoryAnalyticsSchema = new mongoose.Schema({
    repoName: { 
        type: String, 
        required: true 
    },
    stars: { 
        type: Number, 
        default: 0 
    },
    forks: { 
        type: Number, 
        default: 0 
    },
    language: { 
        type: String 
    },
    popularityScore: { 
        type: Number, 
        default: 0 
    }
}, { timestamps: true });

export const RepositoryAnalytics = mongoose.model('RepositoryAnalytics', repositoryAnalyticsSchema);
export default RepositoryAnalytics;
