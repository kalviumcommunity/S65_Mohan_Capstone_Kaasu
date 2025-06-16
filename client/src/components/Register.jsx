import React, { useState } from 'react';
import { axiosInstance } from '../utils/axiosInstance';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({ username: '', email: '', password: '' });
  const navigae = useNavigate()
  const handleSubmit = async (e) => {
    try {
    e.preventDefault();
    const res = await axiosInstance.post('/auth/register', user)
    toast.success(res.data.message)
    navigae('/dashboard')
    } catch (error) {
        toast.error(error.response.data.message)
    }

  };

  return (
    <div className="flex flex-col md:flex-row h-screen">

      <div className="hidden md:block md:w-1/2 bg-blue-600"></div>


      <div className="w-full h-screen md:w-1/2 flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-[90%] max-w-md flex flex-col gap-4"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>

          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-700">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="px-3 py-2 border border-gray-300 rounded"
              value={user.username}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, username: e.target.value }))
              }
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 border border-gray-300 rounded"
              value={user.email}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="px-3 py-2 border border-gray-300 rounded"
              value={user.password}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
