import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { axiosInstance } from '../utils/axiosInstance'
import Navbar from './Navbar'

const Transactions = () => {
  const [transactions, setTransactions] = useState([])

  const fetch = async () => {
    try {
      const res = await axiosInstance.get('/transaction/all')
      setTransactions(res.data.transactions)
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to get Transactions')
    }
  }

  useEffect(() => {
    fetch()
  }, []) 
  console.log(transactions);
  

  const incomeTransactions = transactions.filter((t) => t.credit)
  const spendingTransactions = transactions.filter((t) => t.debit)

  return (
    <div>
      <Navbar />
    <div className='flex flex-col lg:flex-row gap-6 p-6 bg-gray-100 min-h-screen'>
      <TransactionList
        title='Income'
        transactions={incomeTransactions}
        type='credit'
        bgColor='bg-green-100'
        accent='text-green-700'
      />
      <TransactionList
        title='Spendings'
        transactions={spendingTransactions}
        type='debit'
        bgColor='bg-red-100'
        accent='text-red-700'
      />
    </div>
    </div>
  )
}

const TransactionList = ({ title, transactions, type, bgColor, accent }) => (
  <div className='w-full lg:w-1/2 bg-white rounded-xl shadow-md p-6'>
    <h2 className={`text-2xl font-semibold mb-4 ${accent}`}>{title}</h2>
    {transactions.length === 0 ? (
      <p className='text-gray-500 italic'>No {title.toLowerCase()} transactions.</p>
    ) : (
      <ul className='space-y-3'>
        {transactions.map((el, idx) => (
          <li
            key={idx}
            className={`p-4 rounded-lg ${bgColor} hover:brightness-95 transition duration-200 shadow-sm`}
          >
            <div className='font-medium text-lg'>₹{el[type]}</div>
            <div className='text-sm text-gray-700'>
              {el.description || 'No description'}
            </div>
            <div className='text-xs text-gray-500'>{el.date}</div>
          </li>
        ))}
      </ul>
    )}
  </div>
)

export default Transactions
