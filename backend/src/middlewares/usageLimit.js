import User from '../models/User.model.js';

export const checkUsageLimits = async (req, res, next) => {
    try {
        const user = req.user;
        
        if (!user) {
            return res.status(401).json({ success: false, message: 'User not authenticated' });
        }

        if (user.plan === 'pro') {
            return next();
        }

        // Reset daily usage if last reset was more than 24 hours ago
        const now = new Date();
        const lastReset = user.dailyUsage.lastReset;
        
        if (now - lastReset > 24 * 60 * 60 * 1000) {
            user.dailyUsage.count = 0;
            user.dailyUsage.lastReset = now;
        }

        if (user.dailyUsage.count >= 10) {
            return res.status(429).json({ 
                success: false, 
                message: 'Daily limit reached. Upgrade to Pro for unlimited searches.' 
            });
        }

        // Increment usage
        user.dailyUsage.count += 1;
        await user.save();
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error checking limits' });
    }
};
