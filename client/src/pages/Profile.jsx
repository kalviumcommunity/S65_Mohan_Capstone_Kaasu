import { User } from 'lucide-react';
import React, { useEffect } from 'react';
import userAuthStore from '../stores/userAuthStore';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Profile = () => {

    const {getProfile,logout, user} = userAuthStore()
    const navigate = useNavigate()
    const handleLogout = () => {
        logout()
        location.reload()
        navigate('/')
    }

    useEffect(() => {
        getProfile()
    }, [getProfile])

  return (
    <div style={{padding: '0 200px'}}>
        <Navbar user={user}/>
    <div className="flex justify-center items-center h-screen ">
      {user && (
        <div className="bg-white rounded-2xl p-6 w-80 text-center border border-gray-200">
        <User size={32} className=' w-full'/>
        <h2 className="text-xl font-semibold mt-4">{user.name}</h2>
        <p className="text-gray-500">Financial Overview</p>
        {/* <div className="mt-4">
          <p className="text-lg font-medium">Balance: <span className="text-green-600">$500</span></p>
          <p className="text-lg font-medium">Expense: <span className="text-red-500">$100</span></p>
          <p className="text-lg font-medium">Savings: <span className="text-blue-500">$2000</span></p>
        </div> */}
        <p className='flex gap-2 justify-start px-10'>Email: <p>{user.email}</p> </p>
        <p className='flex gap-2 justify-start px-10'>Role: <p>{user.role}</p> </p>

        <button onClick={handleLogout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
          Logout
        </button>
      </div>
      )}
    </div>
    </div>
  );
};

export default Profile;