import { Home, UploadCloud, Repeat, Users, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className=' sticky top-0 flex items-center justify-around py-3 m-2 border border-slate-200 rounded-2xl bg-white shadow-2xs z-8'>
     <div className='flex items-center gap-2'>
       <img src='/logo.png' className='w-10 h-10' />
      <h1 className='text-3xl font-bold'>Kaasu</h1>
     </div>
      <div className='flex items-center p-2 gap-4'>


        <Link to={"/dashboard"} className='flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 hover:bg-gray-100 cursor-pointer'>
          <Home size={20} />
          <p className='text-md'>Home</p>
        </Link>

        <Link to={"/"} className='flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 hover:bg-gray-100 cursor-pointer'>
          <UploadCloud size={20} />
          <p className='text-md'>Upload</p>
        </Link>

        <Link to={"/transactions"} className='flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 hover:bg-gray-100 cursor-pointer'>
          <Repeat size={20} />
          <p className='text-md'>Transactions</p>
        </Link>

        <Link to={"/family"} className='flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 hover:bg-gray-100 cursor-pointer'>
          <Users size={20} />
          <p className='text-md'>Family</p>
        </Link>

        <Link to={"/profile"} className='flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 hover:bg-gray-100 cursor-pointer'>
          <User size={20} />
          <p className='text-md'>Profile</p>
        </Link>

      </div>
    </div>
  );
};

export default Navbar;