import 'dotenv/config';
import app from './src/app.js';
import connectDB from './src/config/db.js';
import { connectRedis } from './src/config/redis.js';
import logger from './src/config/logger.js';
import config from './src/config/config.js';

const startServer = async () => {
    try {
        await connectDB();
        await connectRedis();

        const port = process.env.PORT || 5000;
        
        app.listen(port, () => {
            logger.info(`Server effectively bound to Port ${port}`);
            console.log('');
            console.log('\x1b[32m╔════════════════════════════════════════════════════════════╗\x1b[0m');
            console.log('\x1b[32m║\x1b[0m                                                            \x1b[32m║\x1b[0m');
            console.log('\x1b[32m║\x1b[0m   \x1b[32m🚀 GitFinder Pro Advanced API is Active!\x1b[0m                 \x1b[32m║\x1b[0m');
            console.log('\x1b[32m║\x1b[0m                                                            \x1b[32m║\x1b[0m');
            console.log('\x1b[36m║\x1b[0m   🌐 Open: http://localhost:' + port + '                           \x1b[32m║\x1b[0m');
            console.log('\x1b[32m║\x1b[0m                                                            \x1b[32m║\x1b[0m');
            console.log('\x1b[32m╚════════════════════════════════════════════════════════════╝\x1b[0m');
            console.log('');
        });
    } catch (err) {
        logger.error('Failed to start server:', err);
        process.exit(1);
    }
};

startServer();
