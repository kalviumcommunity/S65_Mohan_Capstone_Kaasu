import React from 'react'
import { useState } from 'react'
import { axiosInstance } from '../../utils/axiosInstance'
import socket from '../../utils/socket'

const CreateBill = ({setShowCreateBill}) => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')

    const handleSubmit = async () => {
        try {
            let res = await axiosInstance.post('/family/create-bill', {name, price})
            console.log(res)
            setName('')
            setPrice('')
            setShowCreateBill(false)
            socket.emit("reload", true)
        } catch (error) {
            console.error(error.message)
        }
    }


  return (
   <div className='absolute top-0 w-screen flex items-center justify-center h-screen bg-gray-50/50'>
     <div className='bg-white border-gray-500 shadow-xl flex flex-col items-center gap-3 p-4 rounded-md'>
        <h1 className='text-xl font-black'>Create Bill</h1>
        <input type="text" className='border' value={name} onChange={(e) => setName(e.target.value)}/>
        <input type="number" className='border' value={price} onChange={(e) => setPrice(e.target.value)}/>
        <button className='bg-red-500 p-1 rounded-md text-white' onClick={() => setShowCreateBill(false)}>Cancel</button>
        <button className='bg-black text-white p-2 rounded' onClick={handleSubmit}>Submit</button>
    </div>
   </div>
  )
}

export default CreateBill