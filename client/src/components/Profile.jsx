import React from 'react'
import toast from 'react-hot-toast'
import { axiosInstance } from '../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

const Profile = ({user, setUser}) => {
    const navigate = useNavigate()
    const logout = async() => {
        try {
            const res = await axiosInstance.get('/auth/logout')
            setUser(null)
            toast.success(res.data.message)
            navigate('/')
        } catch (error) {
            console.error(error.response);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
}
  return (
    <div>
      {user && <Navbar />}
     <div className='flex flex-col items-center p-6 bg-white border border-gray-200 rounded-lg shadow-md max-w-sm mx-auto my-10'>

      <div className='relative w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-gray-300'>
        <img
          src={user.avatar}
          alt={`${user.username}'s avatar`}
          className='absolute inset-0 w-full h-full object-cover'
        />
      </div>


      <h1 className='text-2xl font-semibold text-gray-800 mb-2'>
        <span className='font-normal text-gray-600'>Username:</span> {user.username}
      </h1>
      <p className='text-gray-600 mb-1'>
        <span className='font-medium'>Email:</span> {user.email}
      </p>
      <p className='text-gray-600 mb-1'>
        <span className='font-medium'>Balance:</span> ${user.balance.toFixed(2)}
      </p>
      <p className='text-gray-600 mb-1'>
        <span className='font-medium'>Expenses:</span> ${user.expenses.toFixed(2)}
      </p>
      <p className='text-gray-600 mb-4'>
        <span className='font-medium'>Savings:</span> ${user.savings.toFixed(2)}
      </p>


      <button
        onClick={logout}
        className='w-full py-2 px-4 rounded-md bg-gray-800 text-white font-semibold hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-300 ease-in-out'
      >
        Logout
      </button>
    </div>
    </div>
  )
}

export default Profile