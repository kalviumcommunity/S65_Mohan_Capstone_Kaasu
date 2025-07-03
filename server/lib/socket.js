const { Server } = require('socket.io');
const http = require('http');
const express = require('express');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    // origin: "http://localhost:5173",
    origin: "https://s65-mohan-capstone-kaasu-1.onrender.com",
    credentials: true,
  },
});

const onlineUsers = new Map();      // socket.id -> userId
const familyUsers = new Map();      // familyId -> Set of userIds

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  try {
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");
    const token = cookies.token;

    if (!token) {
      console.log("No token provided in cookies.");
      socket.disconnect();
      return;
    }

    const user = jwt.verify(token, process.env.JWT_SECRET); // contains userId, familyId, username
    const { userId, familyId, username } = user;

    // Map socket.id to userId
    onlineUsers.set(socket.id, userId);

    // Automatically join user's family room
    socket.join(familyId);
    socket.familyId = familyId;
    socket.userId = userId;


    if (!familyUsers.has(familyId)) {
      familyUsers.set(familyId, new Set());
    }
    familyUsers.get(familyId).add(userId);


    io.emit("online-users", Array.from(onlineUsers.values()));



    socket.on("family", (data) => {
      if (data) {
        console.log(data)
        io.to(familyId).emit("reload", data);
      }
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${username}`);
      onlineUsers.delete(socket.id);

      const familySet = familyUsers.get(familyId);
      if (familySet) {
        familySet.delete(userId);
        if (familySet.size === 0) {
          familyUsers.delete(familyId);
        }
      }

      io.emit("online-users", Array.from(onlineUsers.values()));
    });

  } catch (err) {
    console.error("Socket auth error:", err.message);
    socket.disconnect();
  }
});

module.exports = { io, app, server };
