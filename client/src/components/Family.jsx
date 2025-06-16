import React, { useEffect, useState } from 'react';
import Popup from './chunks/Popup';
import toast from 'react-hot-toast';
import { axiosInstance } from '../utils/axiosInstance';
import socket from '../utils/socket.js'
import Navbar from './Navbar.jsx';

const Family = ({ user }) => {
  const [currentUser, setCurrentUser] = useState(user);
  const [showJoinPopup, setShowJoinPopup] = useState(false);
  const [showCreatePopup, setShowCreatePopup] = useState(false);


  useEffect(() => {
    
    socket.on('connection', () => {
      console.log("Connected ..")
    })
    return () => {
      socket.off('connection');
    };
  }, []);



  const handleCreateFamily = async (name) => {
    try {
      const res = await axiosInstance.post('/family/create', { name });
      toast.success(res.data.message);

      const userRes = await axiosInstance.get('/auth/profile');
      setCurrentUser(userRes.data.user);

      setShowCreatePopup(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to create family');
    }
  };

  const handleJoinFamily = async (code) => {
    try {
      const res = await axiosInstance.post('/family/join', { uniqueCode: code });
      toast.success(res.data.message);

      const userRes = await axiosInstance.get('/auth/profile');
      setCurrentUser(userRes.data.user);

      setShowJoinPopup(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to join family');
    }
  };

  const family = currentUser.familyId;
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
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
              'bg-green-500'
            }`}
            title={'Online'}
          ></span>
        </div>

        <div className="flex-1">
          <h1 className="text-lg font-semibold text-gray-800">{el.username}</h1>
          <p className="text-sm text-gray-500">{el.email}</p>
          <p
            className={`text-xs font-medium mt-1 ${
              'text-green-600'
            }`}
          >
            Online
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
    </div>
  );
};

export default Family;
