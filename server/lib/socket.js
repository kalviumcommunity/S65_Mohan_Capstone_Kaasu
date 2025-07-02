const {Server} = require('socket.io')
const http = require('http')
const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const cookie = require("cookie"); 
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "https://s65-mohan-capstone-kaasu-1.onrender.com",
        credentials: true
    }
})

const onlineUsers = new Map()

io.on("connection", (socket) => {
  console.log("User connected");

  try {
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");
    const token = cookies.token;

    if (!token) {
      console.log("No token provided in cookies.");
      socket.disconnect(); 
      return;
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Authenticated user:", user);
    onlineUsers.set(socket.id, user.userId)
    io.emit("online-users", Array.from(onlineUsers.values()))

    socket.on("reload", (data) => {
        io.emit("reload", data)
    })

    socket.on("disconnect", () => {
      console.log("User disconnected");
      onlineUsers.delete(socket.id)
      io.emit("online-users", Array.from(onlineUsers.values()))
    });

  } catch (err) {
    console.error("Socket auth error:", err.message);
    socket.disconnect();
  }
});


module.exports = {io, app, server}