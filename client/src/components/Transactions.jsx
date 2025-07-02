import React from 'react'
import Layout1 from './Transactions/Layout1'
import { Columns2, Rows2 } from 'lucide-react'
import Navbar from './Navbar'
import { useState } from 'react'
import Layout2 from './Transactions/Layout2'
import toast from 'react-hot-toast'
import { axiosInstance } from '../utils/axiosInstance'
import { useEffect } from 'react'

const Transactions = () => {
  const [layout, setLayout] = useState('layout1')

    const [transactions, setTransactions] = useState([])

  const fetch = async () => {
    try {
      const res = await axiosInstance.get('/transaction/all')
      setTransactions(res.data.transactions)
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to get Transactions')
    }
  }
  const deleteTransaction = async(id) => {
    try {
      const res = await axiosInstance.delete(`/transaction/delete/${id}`)
      toast.success(res.data.message)
      fetch()
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to get Transactions')
    }
  }
  useEffect(() => {
    fetch()
  }, [layout]) 
  
  return (
    <div>
      <Navbar />
      <div className=' flex justify-end gap-2 m-5 '>
        <Columns2 className='cursor-pointer' onClick={() => setLayout('layout1')}/>
        <Rows2 className='cursor-pointer' onClick={() => setLayout('layout2')}/>
      </div>

      {layout == "layout1"  ? <Layout1 transactions={transactions}  deleteTransaction={deleteTransaction}/> : <Layout2 transactions={transactions}  deleteTransaction={deleteTransaction}/>}
    </div>
  )
}

export default Transactions