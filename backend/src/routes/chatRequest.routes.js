import express from 'express';
import { authenticateToken } from '../middleware/secureRoutes.js';
import { sendChatRequest, getIncomingRequests, respondToRequest, getSentRequests, getAcceptedChats } from '../controllers/chatRequest.controllers.js';

const router = express.Router();

router.use(authenticateToken);
router.post('/send', sendChatRequest);
router.get('/incoming', getIncomingRequests);
router.get('/sent', getSentRequests);
router.get('/accepted', getAcceptedChats);
router.post('/respond', respondToRequest);

export default router;
