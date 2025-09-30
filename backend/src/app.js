import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";
import chatsRoutes from "./routes/chats.routes.js";
import chatRequestRoutes from "./routes/chatRequest.routes.js";
import { errorHandler } from "./middleware/error.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(",") ?? ["http://localhost:5173"], credentials: true }));
app.use(express.json({ limit: "2mb" }));
app.use(morgan("dev"));
app.use(rateLimit({ windowMs: 60_000, max: 200 }));


app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/chats", chatsRoutes);
app.use("/api/chat-requests", chatRequestRoutes);

app.use(errorHandler);
export default app;
