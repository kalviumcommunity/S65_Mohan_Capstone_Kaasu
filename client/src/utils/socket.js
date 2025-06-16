import {io} from 'socket.io-client'

const socket = io("http://localhost:8080", {
    withCredentials: true
})
socket.on('connection', () => {
    console.log("connected", socket.id)
})
socket.on("online-users", users => {
    console.log(users)
})

export default socket