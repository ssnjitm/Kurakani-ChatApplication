
import express from 'express';
import { authenticateToken } from '../middleware/secureRoutes.js';
import { getMessages } from '../controllers/chats.controllers.js';

const router = express.Router();


// Get all messages between current user and another user
router.get('/messages/:userId', authenticateToken, getMessages);

export default router;
