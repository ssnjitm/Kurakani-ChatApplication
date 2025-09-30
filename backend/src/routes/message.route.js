import express from 'express';
import { sendMessage, getMessages, getConversations } from '../controllers/message.controllers.js';
import { authenticateToken } from '../middleware/secureRoutes.js';

const router = express.Router();

// All message routes require authentication
router.use(authenticateToken);

router.post("/send/:id", sendMessage);
router.get("/:id", getMessages);
router.get("/", getConversations);

export default router;

