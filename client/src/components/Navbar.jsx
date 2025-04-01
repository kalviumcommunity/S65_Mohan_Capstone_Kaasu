import { Bell, Settings, User } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';


const Navbar = ({user}) => {
  const navigate = useNavigate()
  return (
    <div className="bg-white">
      <div className="mt-10 flex justify-between px-10 py-4 items-center">
        <div className="flex gap-6 items-center">
            <h1 className='text-2xl font-extrabold'>Logo</h1>
           {user && <h2 className='font-semibold text-md text-green-500 cursor-pointer' onClick={() => navigate('/')}>Dashboard</h2>}
        </div>
       {user ? (<div className="flex gap-6">
          <div className="relative">
          <Bell />
          </div>
          <Settings />
          <User className='cursor-pointer' onClick={() => navigate('/profile')}/>
        </div>) : (
          <button onClick={() => navigate('/login')} className='bg-black text-white px-3 py-2 rounded-lg text-md font-semibold'>Login</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;