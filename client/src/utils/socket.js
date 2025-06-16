import {io} from 'socket.io-client'

const socket = io(import.meta.env.VITE_API_BACKEND_URL, {
    withCredentials: true
})
socket.on('connection', () => {
    console.log("connected", socket.id)
})
socket.on("online-users", users => {
    console.log(users)
})

export default socket