import { ChevronDown, Cross, Send, User } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import socket from '../../utils/socket'
import { useEffect } from 'react'
import { axiosInstance } from '../../utils/axiosInstance'
import { useRef } from 'react'

const ChatBox = ({messages, setMessages, members, currentUser, setOpenChat}) => {
    const [message, setMessage] = useState("")
    const chatRef = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        socket.emit("message", message)
        await axiosInstance.post('/family/send-message', {msg: message})
        setMessage("")

    }
    useEffect(() => {
  if (chatRef.current) {
    chatRef.current.scrollTop = chatRef.current.scrollHeight
  }
}, [messages])

    useEffect(() => {
         socket.on("text", (data) => {
        setMessages(data)
  })


        return  () => {
            socket.off("text")
        }
    }, [setMessages])
   
  return (
    <div  className='w-100 h-150 bg-white border border-slate-300 rounded-2xl  overflow-auto absolute flex flex-col justify-between right-10 bottom-10'>
        <div className='bg-slate-200 w-full h-20 flex items-center justify-end p-3'>
            <ChevronDown className='cursor-pointer' onClick={() => setOpenChat(false)}/>
        </div>
        <ul ref={chatRef} className={`px-3 flex flex-col overflow-y-auto gap-3 py-10`}>
           {messages && messages.map((el, idx) => (
           <div className={`w-full flex ${currentUser._id == el?.user[0] ? 'justify-end' : 'justify-start'}`} >  
            <div className='flex w-fit gap-5 items-center  bg-slate-200 border border-slate-300 shadow-2xs p-1 pr-5 rounded-xl'>
                  <img
            src={members.filter(member => member._id == messages[idx]?.user[0])[0].avatar}
            alt={el.username}
            className="w-10 h-10 rounded-full object-cover border border-gray-300"
          />
                <li className='text-sm'>{el.msg}</li>
            </div></div>
           ))}
        </ul>
        <div>
            <form onSubmit={handleSubmit} className='flex items-center relative bottom-0 bg-white border border-slate-200 shadow-2xs px-2 m-3  rounded-2xl'>
                <input type="text" className='w-full text-md h-10 outline-none' placeholder='Enter your message' value={message} onChange={(e) => setMessage(e.target.value)}/>
                <button type="submit">
                <Send className='mx-3' />
                </button>

            </form>
        </div>
    </div>
  )
}

export default ChatBox