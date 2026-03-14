import { createClient } from 'redis';
import logger from './logger.js';

const redisClient = createClient({ 
    url: process.env.REDIS_URI || 'redis://localhost:6379'
});

redisClient.on('error', (err) => logger.error('Redis Client Error', err));

export const connectRedis = async () => {
    try {
        await redisClient.connect();
        logger.info('Redis Connected');
    } catch (err) {
        logger.error('Redis connection failed:', err);
    }
};

export const getCache = async (key) => {
    try {
        if (!redisClient.isReady) return null;
        const data = await redisClient.get(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        logger.error('Redis GET Error', e);
        return null;
    }
};

export const setCache = async (key, value, expireInSeconds = 3600) => {
    try {
        if (!redisClient.isReady) return;
        await redisClient.setEx(key, expireInSeconds, JSON.stringify(value));
    } catch (e) {
        logger.error('Redis SET Error', e);
    }
};

export default redisClient;
