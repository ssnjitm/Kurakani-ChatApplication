import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { registerChatSockets } from "./sockets/chat.socket.js";

const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.CORS_ORIGIN?.split(",") ?? ["http://localhost:5173"], credentials: true }
});

io.use(async (socket, next) => {
  // Optionally verify JWT passed as auth.token
  const token = socket.handshake.auth?.token;
  socket.userId = token ? token : null; // replace with real decode
  return next();
});

registerChatSockets(io);

(async () => {
  await connectDB();
  server.listen(port, () => console.log(`API + WS on :${port}`));
})();
