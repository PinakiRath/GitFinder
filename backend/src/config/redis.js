import Redis from 'ioredis';
import logger from './logger.js';

// Setup Redis Client. Use maxRetriesPerRequest: null for BullMQ compatibility.
const redisClient = new Redis(process.env.REDIS_URI || 'redis://localhost:6379', {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    retryStrategy(times) {
        // Retry connection logic. Don't let it crash the server if Redis goes down.
        const delay = Math.min(times * 50, 2000);
        return delay;
    }
});

redisClient.on('error', (err) => {
    logger.error(`Redis connection failed: ${err.message}`);
});

redisClient.on('ready', () => {
    console.log("Redis connected successfully");
    logger.info("Redis connected successfully");
});

export const connectRedis = async () => {
    // ioredis connects automatically. We just keep this export intact to avoid breaking index.js.
    try {
        if (redisClient.status === 'ready') {
            console.log("Redis connected successfully");
        }
    } catch (err) {
        logger.error(`Error confirming connectRedis: ${err.message}`);
    }
};

export const getCache = async (key) => {
    try {
        if (redisClient.status !== 'ready') return null;
        
        const data = await redisClient.get(key);
        if (data) {
            console.log("Cache hit");
            return JSON.parse(data);
        } else {
            console.log("Cache miss");
            return null;
        }
    } catch (e) {
        logger.error(`Redis GET Error: ${e.message}`);
        return null;
    }
};

export const setCache = async (key, value, expireInSeconds = 3600) => {
    try {
        if (redisClient.status !== 'ready') return;
        
        await redisClient.setex(key, expireInSeconds, JSON.stringify(value));
    } catch (e) {
        logger.error(`Redis SET Error: ${e.message}`);
    }
};

export default redisClient;
