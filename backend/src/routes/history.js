import express from 'express';
import { getHistory, addHistory } from '../controllers/historyController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.use(protect); // All history routes are protected

// @route   GET /api/history
router.get('/', getHistory);

// @route   POST /api/history
router.post('/', addHistory);

export default router;
