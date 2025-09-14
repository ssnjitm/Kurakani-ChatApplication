
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.utils.js';

dotenv.config();

export const signup = asyncHandler(async (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body;
    if (!username || !email || !password || !confirmPassword) {
        return next(new ApiError(400, 'All fields are required'));
    }
    if (password !== confirmPassword) {
        return next(new ApiError(400, 'Passwords do not match'));
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(new ApiError(400, 'Email already exists'));
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    return res.status(201).json(new ApiResponse(201, { user: newUser }, 'User registered successfully'));
});


export const signin = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ApiError(400, 'All fields are required'));
    }
    const user = await User.findOne({ email });
    if (!user) {
        return next(new ApiError(400, 'Invalid credentials'));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return next(new ApiError(400, 'Invalid credentials'));
    }
    const payload = { id: user._id, username: user.username };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    return res.status(200).json(
        new ApiResponse(200, {
            accessToken: 'Bearer ' + accessToken,
            refreshToken: 'Bearer ' + refreshToken
        }, 'Login successful')
    );
});

export const getUserProfile = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');   
    if (!user) {
        return next(new ApiError(404, 'User not found'));
    }
    return res.status(200).json(
        new ApiResponse(200, { user }, 'User profile fetched successfully')
    );
});
export const updateUserProfile = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { username, email, password } = req.body;
    const user = await User.findById(userId);
    if (!user) {
        return next(new ApiError(404, 'User not found'));
    }   
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
    }   
    await user.save();
    return res.status(200).json(
        new ApiResponse(200, { user }, 'User profile updated successfully')
    );
});

export const getAllUsers = asyncHandler(async (req, res, next) => {
    const currentUserId = req.user.id;
    const { search } = req.query;
    
    let query = { _id: { $ne: currentUserId } }; // Exclude current user
    
    if (search) {
        query.$or = [
            { username: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
        ];
    }
    
    const users = await User.find(query).select('-password -confirmPassword');
    
    return res.status(200).json(
        new ApiResponse(200, { users }, 'Users retrieved successfully')
    );
});
