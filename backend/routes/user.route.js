import express from 'express';
import { signup, signin, getUserProfile, updateUserProfile, getAllUsers } from '../controllers/user.controllers.js';
import { authenticateToken } from '../middleware/secureRoutes.js';

const userRouter = express.Router();

// Public routes
userRouter.post('/signup', signup);
userRouter.post('/signin', signin);

// Protected routes
userRouter.use(authenticateToken);
userRouter.get('/profile', getUserProfile);
userRouter.put('/profile', updateUserProfile);
userRouter.get('/users', getAllUsers);

export default userRouter;