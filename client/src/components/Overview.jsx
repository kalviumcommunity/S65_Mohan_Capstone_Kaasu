import React from 'react'
import FinancialChart from './FinancialChart'


const Overview = () => {

  return (
    <div className="maincursor-pointer">
    <div className=" px-8 py-10 flex justify-start gap-10 items-center">
      <div className='bg-gray-100 w-52 p-3 rounded-lg border border-gray-300'>
        <p className='font-medium '>Total Balance</p>
        <h1 className='text-4xl text-center font-extrabold'>$3,000</h1>
        <p className='text-right text-sm'>this month</p>
      </div>
      <div className='bg-gray-100 w-52 p-3 rounded-lg border border-gray-300'>
        <p className='font-medium '>Total Balance</p>
        <h1 className='text-4xl text-center font-extrabold'>$3,000</h1>
        <p className='text-right text-sm'>this month</p>
      </div>
      <div className='bg-gray-100 w-52 p-3 rounded-lg border border-gray-300'>
        <p className='font-medium '>Total Balance</p>
        <h1 className='text-4xl text-center font-extrabold'>$3,000</h1>
        <p className='text-right text-sm'>this month</p>
      </div>
      <div className="upload">
        <button className='bg-black text-white px-3 py-2 text-lg rounded-lg items-end'>Upload</button>
      </div>
    </div>
    <div className="main">
      <div className="graph">
        <FinancialChart />
      </div>
    </div>
    <div className="bg-yellow-100 p-10 my-4 rounded-lg border border-2-yellow-700">
      <h1 className='text-2xl font-bold'>AI Insights</h1>
     <ul>
        <li>You are Spent a lot this month so adjust your spending ...</li>
        <li>You are Spent a lot this month so adjust your spending ...</li>
        <li>You are Spent a lot this month so adjust your spending ...</li>
      </ul>
    </div>
  </div>
  )
}

export default Overview