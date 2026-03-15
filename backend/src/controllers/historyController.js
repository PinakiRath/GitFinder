import SearchHistory from '../models/SearchHistory.model.js';
import logger from '../config/logger.js';

export const getHistory = async (req, res) => {
    try {
        const history = await SearchHistory.find({ userId: req.user.id })
            .sort({ searchDate: -1 })
            .limit(20);
        res.json({ success: true, data: history });
    } catch (err) {
        logger.error(`History Fetch Error: ${err.message}`);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const addHistory = async (req, res) => {
    try {
        const { username } = req.body;
        
        if (!username) {
            return res.status(400).json({ success: false, message: 'Please provide a username' });
        }

        const newEntry = new SearchHistory({
            userId: req.user.id,
            searchedUsername: username
        });

        const savedEntry = await newEntry.save();
        res.status(201).json({ success: true, data: savedEntry });
    } catch (err) {
        logger.error(`History Add Error: ${err.message}`);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
