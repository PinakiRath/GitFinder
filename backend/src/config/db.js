import mongoose from 'mongoose';
import logger from './logger.js';

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        logger.info(`MongoDB Connected: ${connect.connection.host}`);
    } catch (error) {
        logger.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
