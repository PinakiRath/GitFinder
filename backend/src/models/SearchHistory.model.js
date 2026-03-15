import mongoose from 'mongoose';

const searchHistorySchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    searchedUsername: { 
        type: String, 
        required: true 
    },
    searchDate: { 
        type: Date, 
        default: Date.now 
    }
});

export const SearchHistory = mongoose.model('SearchHistory', searchHistorySchema);
export default SearchHistory;
