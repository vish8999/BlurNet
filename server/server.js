const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

// Socket.io setup with CORS
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI not found in .env file");
  process.exit(1);
}

// MongoDB Connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB connection failed (Server will continue running):", err.message);
  });

// Start the server regardless of Database status for Socket.io to work
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Test Route
app.get("/api/test", (req, res) => {
  res.json({ message: "API Working" });
});

// ── WebRTC Signaling via Socket.io (Room-Scoped) ──
io.on("connection", (socket) => {
  console.log("[Socket] Client connected:", socket.id);

  // Client joins a room
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    // Notify others in the room that a new user joined
    socket.to(roomId).emit("user-joined", socket.id);
    console.log(`[Socket] ${socket.id} joined room: ${roomId}`);
  });

  // A client's camera is ready — tell others in the room to create an offer
  socket.on("ready", (roomId) => {
    socket.to(roomId).emit("create-offer");
    console.log(`[Socket] ${socket.id} is ready in room: ${roomId}`);
  });

  // Relay offer to peers in the same room
  socket.on("offer", ({ offer, roomId }) => {
    console.log(`[Socket] Relaying offer from ${socket.id} to room: ${roomId}`);
    socket.to(roomId).emit("offer", offer);
  });

  // Relay answer to peers in the same room
  socket.on("answer", ({ answer, roomId }) => {
    console.log(`[Socket] Relaying answer from ${socket.id} to room: ${roomId}`);
    socket.to(roomId).emit("answer", answer);
  });

  // Relay ICE candidates to peers in the same room
  socket.on("ice-candidate", ({ candidate, roomId }) => {
    socket.to(roomId).emit("ice-candidate", candidate);
  });

  socket.on("disconnect", () => {
    console.log("[Socket] Client disconnected:", socket.id);
  });
});

