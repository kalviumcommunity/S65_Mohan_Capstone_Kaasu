import React from 'react';
import { CheckCircle, CreditCard, Trash } from 'lucide-react';
import { axiosInstance } from '../../utils/axiosInstance';
import socket from '../../utils/socket';

const Bill = ({isLeader,id, name, price, link}) => {
    const deleteBill = async () => {
       try {
         let res = await axiosInstance.post('/family/delete-bill', {id})
        console.log(res)
        socket.emit("family", res.data.family)
       } catch (error) {
        console.error(error.message)
       }    
    }
  return (
    <div className="w-sm bg-white rounded-2xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition duration-300">
      <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2  justify-between ">
        <div className='flex gap-2 items-center'>
          <CreditCard className="w-5 h-5 text-blue-500" />
        {name}
        </div>
        {isLeader && <button className='bg-red-400 text-white p-2 rounded cursor-pointer hover:shadow-2xl transition-all' onClick={deleteBill}><Trash  size={16}/> </button>}
      </h2>

      <p className="text-2xl font-bold text-gray-900 mb-4">${price}</p>

      <div className="flex gap-3">
        <a href={link} target='_blank' className="flex-1 text-center cursor-pointer bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition">
          Pay
        </a>
        <button className="flex-1 cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg transition flex items-center justify-center gap-1">
          <CheckCircle className="w-4 h-4" />
          Paid
        </button>
      </div>
      
    </div>
  );
};

export default Bill;
