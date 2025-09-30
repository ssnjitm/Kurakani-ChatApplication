import express from 'express';
import { getAllUsers, getUserProfile, updateUserProfile, changePassword } from '../controllers/user.controllers.js';
import { authenticateToken } from '../middleware/secureRoutes.js';

const router = express.Router();


router.use(authenticateToken);
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.post('/change-password', changePassword);
router.get('/', getAllUsers);

export default router;
