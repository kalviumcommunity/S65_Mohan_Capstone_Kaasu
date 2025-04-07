import React, { useEffect } from 'react'
import FinancialChart from './FinancialChart'
import { useNavigate } from 'react-router-dom'
import userAuthStore from '../stores/userAuthStore'
import ReactMarkdown from 'react-markdown'
import { Plus, Wallet } from 'lucide-react'
import useTransactionStore from '../stores/useTransactionsStore'
import NewLoader from './NewLoader'

const Overview = ({currentView}) => {
  const navigate = useNavigate()
  const {user,isProfileLoading,getProfile} = userAuthStore()

  useEffect(() => {
    getProfile()
  }, [])
  // if(isProfileLoading){
  //   return <NewLoader />
  // }
  return (
    <div className="maincursor-pointer">
    <div className=" px-8 py-10 flex justify-start gap-10 items-center">
      <div className='bg-gray-100 w-52 p-3 rounded-lg border border-gray-300'>
        <p className='font-bold '>Balance</p>
        <h1 className='text-4xl text-center font-extrabold'>${user && user.balance}</h1>
        <p className='text-right text-sm'>recently</p>
      </div>
      <div className='bg-gray-100 w-52 p-3 rounded-lg border border-gray-300'>
        <p className='font-bold '>Expenses</p>
        <h1 className='text-4xl text-center font-extrabold'>${user && user.expenses}</h1>
        <p className='text-right text-sm'>recently</p>
      </div>
      <div className='bg-gray-100 w-52 p-3 rounded-lg border border-gray-300'>
        <p className='font-bold '>Total Savings</p>
        <h1 className='text-4xl text-center font-extrabold'>$0</h1>
        <p className='text-right text-sm'>.</p>
      </div>
      <div className="upload">
        <button onClick={() => navigate('/upload')} className='bg-black flex items-center gap-2 text-white px-3 py-2 text-lg rounded-lg items-end'><Plus /> Upload Your Bank Statement</button>
      </div>
    </div>
    <div className="main">
      <div className="graph">
        <FinancialChart currentView={currentView}/>
      </div>
    </div>
    <div className="bg-yellow-100 p-10 my-4 rounded-lg border border-2-yellow-700">
      <h1 className='text-2xl font-bold'>AI Insights</h1>
     <ul>
        <ReactMarkdown>{user&& user.insights}</ReactMarkdown>
      </ul>
    </div>
  </div>
  )
}

export default Overview