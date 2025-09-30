// backend/src/sockets/chat.socket.js
import { verifyAccessToken } from '../utils/jwt.utils.js';
import Message from '../models/message.model.js';
import Conversation from '../models/conversation.model.js';

export function registerChatSockets(io) {
  io.on('connection', (socket) => {
    // Authenticate user
    let userId = null;
    try {
      const token = socket.handshake.auth?.token?.split(' ')[1];
      if (token) {
        const decoded = verifyAccessToken(token);
        userId = decoded.id;
      }
    } catch (e) {
      socket.emit('error', 'Invalid token');
      socket.disconnect();
      return;
    }
    if (!userId) {
      socket.emit('error', 'Authentication required');
      socket.disconnect();
      return;
    }
    socket.join(userId);

    // Listen for sending a message
    socket.on('send_message', async ({ to, text }) => {
      if (!to || !text) return;
      // Find or create conversation
      let conversation = await Conversation.findOne({
        participants: { $all: [userId, to] },
      });
      if (!conversation) {
        conversation = await Conversation.create({
          participants: [userId, to],
          messages: [],
        });
      }
      // Create message
      const message = await Message.create({ sender: userId, receiver: to, message: text });
      conversation.messages.push(message._id);
      await conversation.save();
      // Emit to both users
      io.to(userId).to(to).emit('receive_message', {
        _id: message._id,
        sender: userId,
        receiver: to,
        message: text,
        createdAt: message.createdAt,
      });
    });

    // Optionally: handle disconnect
    socket.on('disconnect', () => {
      // Cleanup if needed
    });
  });
}
