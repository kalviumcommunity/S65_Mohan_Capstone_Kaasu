import React from 'react'
import {BrowserRouter, Routes, Route, useNavigate, Navigate} from 'react-router-dom'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import { useState } from 'react'
import { useEffect } from 'react'
import { axiosInstance } from './utils/axiosInstance'
import Profile from './components/Profile'
import Transactions from './components/Transactions'
import Family from './components/Family'
import toast from 'react-hot-toast'
import Loading from './components/chunks/Loading'
import socket from './utils/socket'

const App = () => {
  const [user,setUser] = useState(null)
  const [loading ,setLoading] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState([])
    useEffect(() => {
    console.log("dai",socket)
    socket.on("online-users", data => {
      console.log("data",data)
      setOnlineUsers(data)
    })

    return () => {
      socket.off("online-users")
    }
  }, []);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      try {
        let res = await axiosInstance.get('/auth/profile')
        setUser(res.data.user)
      } catch (error) {
        toast.error("User not Logged In")
      }
      finally{
        setLoading(false)
      }
    }
    fetch()
  }, [])

  if (loading){
    return <Loading />
  }

  return (  
    <BrowserRouter>
    <Routes>
      <Route path='/' index element={user ? <Landing user={user}/> : <Login />} />
      <Route path='/dashboard'  element={user ? <Dashboard /> : <Login />} />
      <Route path='/profile'  element={user && <Profile user={user}/>} />
      <Route path='/transactions'  element={user && <Transactions/>} />
      <Route path='/family'  element={user ? <Family onlineUsers={onlineUsers} user={user}/> : <Login />} />
      <Route path='/register'  element={<Register />} />
      <Route path='/login' element={<Login />} /> 
    </Routes>
    </BrowserRouter>
  )
}

export default App