const {Server} = require('socket.io')
const http = require('http')
const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        credentials: true
    }
})

// const onlineUsers = new Map()
// let user = null
// io.use((socket, next) => {
//     const token = socket.handshake.headers.cookie.split("=")[1]
//     user = jwt.verify(token, process.env.JWT_SECRET)
//     onlineUsers.set(user.userId, socket.id )
//     next()
// })

// io.on("connection", (socket) => {
//     console.log("Connected",socket.id)
//     socket.emit("online-users", Array.from(onlineUsers.keys()))
//     socket.on("disconnect", () => {
//         onlineUsers.delete(user.userId)
//         console.log("Disconnected", socket.id)
//         socket.emit("online-users", Array.from(onlineUsers.keys()))
//     })
// })

module.exports = {io, app, server}