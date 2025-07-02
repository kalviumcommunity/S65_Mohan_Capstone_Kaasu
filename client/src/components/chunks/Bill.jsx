import React from 'react';
import { CheckCircle, CreditCard, Trash } from 'lucide-react';
import { axiosInstance } from '../../utils/axiosInstance';
import socket from '../../utils/socket';

const Bill = ({isLeader,id, name, price}) => {
    const deleteBill = async () => {
       try {
         let res = await axiosInstance.post('/family/delete-bill', {id})
        console.log(res)
        socket.emit("reload", true)
       } catch (error) {
        console.error(error.message)
       }    
    }
  return (
    <div className="max-w-sm bg-white rounded-2xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition duration-300">
      <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
        <CreditCard className="w-5 h-5 text-blue-500" />
        {name}
      </h2>

      <p className="text-2xl font-bold text-gray-900 mb-4">${price}</p>

      <div className="flex gap-3">
        <button className="flex-1 cursor-pointer bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition">
          Pay
        </button>
        <button className="flex-1 cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg transition flex items-center justify-center gap-1">
          <CheckCircle className="w-4 h-4" />
          Paid
        </button>
      </div>
      {isLeader && <button className='bg-red-500 p-2 rounded' onClick={deleteBill}><Trash /> </button>}
    </div>
  );
};

export default Bill;
