import React, { useState } from 'react' 
import Popup from './chunks/Popup' 
import toast from 'react-hot-toast' 
import { axiosInstance } from '../utils/axiosInstance' 
import Navbar from './Navbar.jsx' 
import Bill from './chunks/Bill.jsx' 
import { Plus } from 'lucide-react' 
import CreateBill from './chunks/CreateBill.jsx' 
import { useEffect } from 'react'
import socket from '../utils/socket.js'

const Family = ({ user,onlineUsers }) => {
  const [currentUser, setCurrentUser] = useState(user)
  const [showJoinPopup, setShowJoinPopup] = useState(false)
  const [showCreatePopup, setShowCreatePopup] = useState(false)
  const [showCreateBill, setShowCreateBill] = useState(false)


    useEffect(() => {
      socket.on("reload", (data) => {
        if(data){
          window.location.reload()
        }
      })
    }, [])

  const handleCreateFamily = async (name) => {
    try {
      const res = await axiosInstance.post('/family/create', { name }) 
      toast.success(res.data.message) 

      const userRes = await axiosInstance.get('/auth/profile') 
      setCurrentUser(userRes.data.user) 

      setShowCreatePopup(false) 
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to create family') 
    }
  }

  const handleJoinFamily = async (code) => {
    try {
      const res = await axiosInstance.post('/family/join', { uniqueCode: code }) 
      toast.success(res.data.message) 

      const userRes = await axiosInstance.get('/auth/profile') 
      setCurrentUser(userRes.data.user) 

      setShowJoinPopup(false) 
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to join family') 
    }
  }

  const family = currentUser.familyId
  const isLeader = family && family.members[0]._id == user._id
  return (
    <div>
      <Navbar />
      {!family ? (
        <div className="flex items-center justify-center w-screen h-screen">
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
        </div>
      ) : (
        <div className="p-4">
          <h1 className="text-2xl font-bold">{family.name}'s Finance Overview</h1>
          <p>{family.uniqueCode}</p>
          <h1 className='m-2 text-xl font-bold'>Members</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  {family.members && family.members.map((el, i) =>  (
      <div
        key={i}
        className="flex items-center space-x-4 bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition duration-200"
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
      {/* Bills Section */}
        <h1 className='text-3xl font-black px-5'>Bills</h1>
        {isLeader && <button className='m-5 border rounded-xl' onClick={() => setShowCreateBill(true)}><Plus /></button>}
        {showCreateBill && <CreateBill setShowCreateBill={setShowCreateBill}/>}
      <div className='flex gap-5 p-5'>
        {family && family.bills.map(el => ( 
          <Bill isLeader={isLeader} id={el._id} name={el.name} price={el.price} /> 
        ))}
      </div>
    </div>
  ) 
} 

export default Family 
