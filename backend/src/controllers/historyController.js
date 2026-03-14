import SearchHistory from '../models/SearchHistory.model.js';

// @desc    Get search history
// @route   GET /api/history
// @access  Private
export const getHistory = async (req, res) => {
    try {
        const history = await SearchHistory.find({ userId: req.user.id })
            .sort({ searchDate: -1 })
            .limit(20);
        res.json({ success: true, data: history });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Add to search history
// @route   POST /api/history
// @access  Private
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
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
