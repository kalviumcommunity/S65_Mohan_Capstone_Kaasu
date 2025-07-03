import React from 'react'
import { useState } from 'react'
import { axiosInstance } from '../../utils/axiosInstance'
import socket from '../../utils/socket'
import { CreditCard, IndianRupee, Link } from 'lucide-react'

const CreateBill = ({setShowCreateBill}) => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [link, setLink] = useState('')

    const handleSubmit = async () => {
    try {
        const res = await axiosInstance.post('/family/create-bill', { name, price, link });

        setName('');
        setPrice('');
        setLink('')
        setShowCreateBill(false);
        socket.emit("family", res.data.family)

    } catch (error) {
        console.error(error.message);
    }
};


  return (
   <div className='absolute top-0 w-screen flex items-center justify-center h-screen bg-gray-50/50'>
     <div className='bg-white w-md border border-slate-200 shadow-xs flex flex-col items-center gap-3 p-4 rounded-md'>
        <h1 className='text-xl font-black'>Create Bill</h1>


        <div className='flex items-center border w-full border-slate-400 shadow-2xs rounded-md px-2 py-2 gap-2'>
            <CreditCard size={20} className='m-1 text-slate-600 text-md'/>
            <input type="text" placeholder='Enter the Bill Name' className=' outline-none w-full' value={name} onChange={(e) => setName(e.target.value)}/>
        </div>

<div className='flex items-center border border-slate-400 shadow-2xs rounded-md px-2 gap-2 w-full py-2'>
<IndianRupee size={20} className='m-1 text-slate-600 text-md'/>
        <input type="number" className='outline-none w-full' placeholder='Enter the price..' value={price} onChange={(e) => setPrice(e.target.value)}/>
</div>
    <div className='flex items-center border border-slate-400 shadow-2xs rounded-md px-2 gap-2 w-full py-2'>
<Link size={20} className='m-1 text-slate-600 text-md'/>
        <input type="text" className='outline-none w-full' placeholder='Site Link..' value={link} onChange={(e) => setLink(e.target.value)}/>
</div>
       <div className='flex justify-between gap-2 w-full'>
         <button className='bg-red-500 p-1 w-full rounded-md text-white' onClick={() => setShowCreateBill(false)}>Cancel</button>
        <button className='bg-black w-full text-white p-2 rounded' onClick={handleSubmit}>Submit</button>
       </div>
    </div>
   </div>
  )
}

export default CreateBill