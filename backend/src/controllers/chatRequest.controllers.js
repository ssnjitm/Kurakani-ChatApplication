// List accepted chat partners
export const getAcceptedChats = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  // Find all accepted requests where user is from or to
  const accepted = await ChatRequest.find({
    $or: [
      { from: userId, status: 'accepted' },
      { to: userId, status: 'accepted' }
    ]
  }).populate('from to', 'username email avatar');
  // Map to unique chat partners (other user)
  const chats = accepted.map(r => {
    const other = r.from._id.toString() === userId ? r.to : r.from;
    return {
      _id: other._id,
      username: other.username,
      email: other.email,
      avatar: other.avatar
    };
  });
  // Remove duplicates
  const uniqueChats = Array.from(new Map(chats.map(u => [u._id.toString(), u])).values());
  res.json(new ApiResponse(200, { chats: uniqueChats }, 'Accepted chats'));
});
// List sent chat requests
export const getSentRequests = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const requests = await ChatRequest.find({ from: userId }).populate('to', 'username email');
  res.json(new ApiResponse(200, { requests }, 'Sent requests'));
});
import ChatRequest from '../models/chatRequest.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

// Send a chat request
export const sendChatRequest = asyncHandler(async (req, res, next) => {
  const from = req.user.id;
  const { to } = req.body;
  if (!to) return next(new ApiError(400, 'Recipient user id required'));
  if (from === to) return next(new ApiError(400, 'Cannot send request to yourself'));
  // Prevent duplicate requests
  const existing = await ChatRequest.findOne({ from, to, status: 'pending' });
  if (existing) return next(new ApiError(400, 'Request already sent'));
  const request = await ChatRequest.create({ from, to });
  res.status(201).json(new ApiResponse(201, { request }, 'Chat request sent'));
});

// List incoming chat requests
export const getIncomingRequests = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const requests = await ChatRequest.find({ to: userId, status: 'pending' }).populate('from', 'username email');
  res.json(new ApiResponse(200, { requests }, 'Incoming requests'));
});

// Accept or reject a chat request
export const respondToRequest = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { requestId, action } = req.body; // action: 'accept' or 'reject'
  const request = await ChatRequest.findOne({ _id: requestId, to: userId, status: 'pending' });
  if (!request) return next(new ApiError(404, 'Request not found'));
  if (!['accept', 'reject'].includes(action)) return next(new ApiError(400, 'Invalid action'));
  request.status = action === 'accept' ? 'accepted' : 'rejected';
  await request.save();
  res.json(new ApiResponse(200, { request }, `Request ${action}ed`));
});
