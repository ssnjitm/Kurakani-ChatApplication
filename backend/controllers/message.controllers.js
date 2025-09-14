import Message from '../models/message.model.js';
import Conversation from '../models/conversation.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const sendMessage = asyncHandler(async (req, res) => {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.id;

    if (!message || !receiverId) {
        throw new ApiError(400, 'Message and receiver ID are required');
    }

    // Find or create conversation
    let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] }
    });

    if (!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, receiverId]
        });
    }

    // Create new message
    const newMessage = await Message.create({
        sender: senderId,
        receiver: receiverId,
        message: message
    });

    // Add message to conversation
    conversation.messages.push(newMessage._id);
    await conversation.save();

    // Populate sender and receiver details
    const populatedMessage = await Message.findById(newMessage._id)
        .populate('sender', 'username email')
        .populate('receiver', 'username email');

    return res.status(201).json(
        new ApiResponse(201, { message: populatedMessage }, 'Message sent successfully')
    );
});

export const getMessages = asyncHandler(async (req, res) => {
    const { id: receiverId } = req.params;
    const senderId = req.user.id;

    // Find conversation between users
    const conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] }
    }).populate({
        path: 'messages',
        populate: {
            path: 'sender receiver',
            select: 'username email'
        }
    });

    if (!conversation) {
        return res.status(200).json(
            new ApiResponse(200, { messages: [] }, 'No messages found')
        );
    }

    return res.status(200).json(
        new ApiResponse(200, { messages: conversation.messages }, 'Messages retrieved successfully')
    );
});

export const getConversations = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const conversations = await Conversation.find({
        participants: userId
    })
    .populate('participants', 'username email')
    .populate({
        path: 'messages',
        options: { sort: { createdAt: -1 }, limit: 1 },
        populate: {
            path: 'sender',
            select: 'username'
        }
    })
    .sort({ updatedAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, { conversations }, 'Conversations retrieved successfully')
    );
});