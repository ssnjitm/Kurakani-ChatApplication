import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

// Get all messages between two users (or by conversationId)
export const getMessages = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { userId: otherUserId } = req.params;
  if (!otherUserId) return next(new ApiError(400, 'Other user id required'));
  // Find conversation
  let conversation = await Conversation.findOne({
    participants: { $all: [userId, otherUserId] },
  }).populate({
    path: 'messages',
    populate: { path: 'sender receiver', select: 'username email avatar' },
    options: { sort: { createdAt: 1 } },
  });
  if (!conversation) return res.json(new ApiResponse(200, { messages: [] }, 'No conversation yet'));
  // Format messages
  const messages = conversation.messages.map((msg) => ({
    _id: msg._id,
    text: msg.message,
    sender: msg.sender,
    receiver: msg.receiver,
    createdAt: msg.createdAt,
  }));
  res.json(new ApiResponse(200, { messages }, 'Messages fetched'));
});
