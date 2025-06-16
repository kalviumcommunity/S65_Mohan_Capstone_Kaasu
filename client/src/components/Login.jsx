import React, { useState } from 'react';
import { axiosInstance } from '../utils/axiosInstance';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/auth/login', user);
      console.log(res);
      toast.success(res.data.message);
      navigate('/dashboard');
    } catch (error) {
      console.log(error.response);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  return (
     <div className="flex flex-col md:flex-row h-screen">

    


      <div className="w-full h-screen md:w-1/2 flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-[90%] max-w-md flex flex-col gap-4"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

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
        <div className="hidden md:block md:w-1/2 bg-blue-600"></div>
    </div>
  );
};

export default Login;
