import React, { useState, useEffect } from 'react' 
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom' 
import Landing from './components/Landing' 
import Register from './components/Register' 
import Login from './components/Login' 
import Dashboard from './components/Dashboard' 
import Profile from './components/Profile' 
import Transactions from './components/Transactions' 
import Family from './components/Family' 
import Loading from './components/chunks/Loading' 
import { axiosInstance } from './utils/axiosInstance' 
import toast from 'react-hot-toast' 
import socket from './utils/socket' 

// ProtectedRoute wrapper
const ProtectedRoute = ({ user, children }) => {
  if (!user) return <Navigate to="/login" /> 
  return children 
} 

// PublicRoute wrapper
const PublicRoute = ({ user, children }) => {
  if (user) return <Navigate to="/" /> 
  return children 
} 

const App = () => {
  const [user, setUser] = useState(null) 
  const [loading, setLoading] = useState(true) 
  const [onlineUsers, setOnlineUsers] = useState([]) 

  useEffect(() => {
    socket.on('online-users', (data) => {
      setOnlineUsers(data) 
    }) 
    return () => {
      socket.off('online-users') 
    } 
  }, []) 

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true) 
      try {
        const res = await axiosInstance.get('/auth/profile') 
        setUser(res.data.user) 
      } catch (error) {
        console.error(error) 
        toast.error('User not logged in') 
      } finally {
        setLoading(false) 
      }
    } 
    fetchUser() 
  }, []) 



  if (loading) return <Loading /> 
  
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <Landing user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute user={user}>
              <Profile user={user} setUser={setUser}/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute user={user}>
              <Transactions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/family"
          element={
            <ProtectedRoute user={user}>
              <Family user={user} onlineUsers={onlineUsers} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute user={user}>
              <Login setUser={setUser}/>
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute user={user}>
              <Register setUser={setUser}/>
            </PublicRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  ) 
} 

export default App 
