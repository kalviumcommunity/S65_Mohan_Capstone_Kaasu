import React, { useState } from 'react' 
import Popup from './chunks/Popup' 
import toast from 'react-hot-toast' 
import { axiosInstance } from '../utils/axiosInstance' 
import Navbar from './Navbar.jsx' 
import Bill from './chunks/Bill.jsx' 
import { ChartAreaIcon, ClipboardCopy, DoorOpen, MessageCircle, Plus, WifiLowIcon } from 'lucide-react' 
import CreateBill from './chunks/CreateBill.jsx' 
import { useEffect } from 'react'
import socket from '../utils/socket.js'
import Goal from './chunks/Goal.jsx'
import ChatBox from './chunks/ChatBox.jsx'

const Family = ({ user,onlineUsers }) => {
  const [currentUser, setCurrentUser] = useState(user)
  const [showJoinPopup, setShowJoinPopup] = useState(false)
  const [showCreatePopup, setShowCreatePopup] = useState(false)
  const [showCreateBill, setShowCreateBill] = useState(false)
  const [bills, setBills] = useState(currentUser.familyId?.bills || []);
  const [members, setMembers] = useState(currentUser.familyId?.members || [])
  const [messages, setMessages] = useState([])
  const [openChat, setOpenChat] = useState(false)

  useEffect(() => {
  socket.on("reload", (data) => {
    if (data) {
      setBills(data.bills)
      setMembers(data.members)
    };
  });

  getMessages()
  return () => {
    socket.off("reload");
  };
}, []);


  const handleCreateFamily = async (name) => {
    try {
      const res = await axiosInstance.post('/family/create', { name }) 
      toast.success(res.data.message) 
      socket.emit("join-family", res.data.family._id);
      socket.emit("family", res.data.family)
      window.location.reload()
      const userRes = await axiosInstance.get('/auth/profile') 
      setCurrentUser(userRes.data.user) 
      setShowCreatePopup(false) 
    } catch (error) {
      console.error(error.message)
      toast.error(error?.response?.data?.message) 
    }
  }

  const handleJoinFamily = async (code) => {
    try {
      const res = await axiosInstance.post('/family/join', { uniqueCode: code }) 
      toast.success(res.data.message) 

      const userRes = await axiosInstance.get('/auth/profile') 
      setCurrentUser(userRes.data.user) 
      socket.emit("join-family", res.data.family._id);
      socket.emit("family", res.data.family)
      setShowJoinPopup(false) 
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to join family') 
    }
  }

  const handleExit = async () => {
    try {
      const res = await axiosInstance.get('/family/exit')
      toast.success(res.data.message)
      socket.emit("family", res.data.family) 
      window.location.reload()
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to join family') 
    }
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    .then(() => {
      toast.success("Copied to Clipboard")
    })
    .catch(err => toast.error(err.message))
  }

    const getMessages = async () => {
          let res = await axiosInstance.get('/family/messages')
          setMessages(res.data.messages)
      }

  const family = currentUser.familyId
  const isLeader = family && family.members[0]._id == user._id

  
  return (
    <div>
      <Navbar />
      {!family ? (
        <div className="flex flex-col gap-3 items-center justify-center w-screen h-screen">
          <div className="flex flex-col max-w-100 gap-4">
            <button
              onClick={() => setShowJoinPopup(true)}
              className="btn bg-black text-white text-xl p-5"
            >
              Join Family
            </button>
            <button
              onClick={() => setShowCreatePopup(true)}
              className="btn border text-black text-xl p-5"
            >
              Create Family
            </button>
          </div>
          <p className='font-bold my-3 text-slate-800 text-md'>Use this code and join the Dummy Family - <strong>WCS9P</strong> </p>
        </div>
      ) : (
        <div className="p-4">
          <div className='flex items-center justify-between'>
            <div className='flex  items-center gap-5'>
              <h1 className="text-2xl font-bold">{family.name}'s Finance Overview</h1>
            <div className='flex items-center gap-2 bg-white border border-slate-300 shadow-2xs rounded-md w-fit p-1 '>
            <p className='font-bold text-md text-purple-900'>{family.uniqueCode}</p>
          <button onClick={() => handleCopy(family.uniqueCode)} className=' w-fit p-1 rounded-md cursor-pointer'> <ClipboardCopy size={20}/> </button>
          </div>
            </div>
          <button onClick={handleExit} className='bg-red-400 text-white p-2 cursor-pointer rounded-md'><DoorOpen /> </button>
          </div>
          
          <h1 className='m-2 text-xl font-bold'>Members</h1>
        <div className="flex items-center ">
  {members && members.map((el, i) =>  (
      <div
        key={i}
        className="flex items-center space-x-4 w-100 bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition duration-200"
      >
        <div className="relative">
          <img
            src={el.avatar}
            alt={el.username}
            className="w-12 h-12 rounded-full object-cover border border-gray-300"
          />
          <span
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${onlineUsers.find(user => user == el._id) ? 'bg-green-500' : 'bg-red-500'}`}
            title={'Online'}
          ></span>
        </div>

        <div className="flex-1">
          <h1 className="text-lg font-semibold text-gray-800 flex items-center gap-2">{el.username}{i==0 && <p className='text-sm text-gray-500'>· Head</p>} </h1>

          <p className="text-sm text-gray-500">{el.email}</p>
          <p
            className={`text-xs font-medium mt-1 ${onlineUsers.find(user => user == el._id) ? 'text-green-500' : 'text-red-500'}`}
          >
            {onlineUsers.find(user => user == el._id) ? 'Online' : 'Offline'}
          </p>
        </div>
      </div>
    )
  )}
</div>
        </div>
      )}

      {showJoinPopup && (
        <Popup
          heading="Join Family"
          onCancel={() => setShowJoinPopup(false)}
          onOk={handleJoinFamily}
        />
      )}
      {showCreatePopup && (
        <Popup
          heading="Create Family"
          onCancel={() => setShowCreatePopup(false)}
          onOk={handleCreateFamily}
        />
      )}

      {/* Goals Section */}
      <div>
        {/* <Goal /> */}
      </div>

      {/* Bills Section */}
        <div className='flex items-center'>
             <h1 className='text-3xl font-black px-5'>Bills</h1>
        {isLeader && <button className='m-5 border rounded-xl' onClick={() => setShowCreateBill(true)}><Plus /></button>}
        </div>
        {showCreateBill && <CreateBill setShowCreateBill={setShowCreateBill}/>}
      <div className='flex gap-5 p-5'>
        {bills && bills.map(el => ( 
          <Bill isLeader={isLeader} id={el._id} name={el.name} price={el.price} link={el.link}/> 
        ))}
      </div>
        {!openChat && <MessageCircle className='absolute bottom-10 right-10' onClick={() => setOpenChat(true)}/>}
      {openChat && <ChatBox  messages={messages} setMessages={setMessages} members={members} currentUser={currentUser} setOpenChat={setOpenChat}/>}
    </div>  
  ) 
} 

export default Family 
