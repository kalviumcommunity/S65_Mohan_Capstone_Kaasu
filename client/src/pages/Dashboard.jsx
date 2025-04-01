import { Bell, Settings, User } from 'lucide-react'
import React, { useState } from 'react'
import Overview from '../components/Overview'
import Transactions from '../components/Transactions'
import Family from '../components/Family'

const Dashboard = () => {
    const [currentView, setCurrentView] = useState("Dashboard")
  return (
    <div className='' style={{padding: '0 200px'}}>
      <div className="mt-10 flex justify-between px-10 py-4 items-center">
        <div className="flex gap-6 items-center">
            <h1 className='text-2xl font-extrabold'>Logo</h1>
            <h2 className='font-semibold text-md text-green-500'>Dashboard</h2>
        </div>
        <div className="flex gap-6">
          <div className="relative">
          <Bell />
          </div>
          <Settings />
          <User />
        </div>
      </div>
      <div className="border-b-2 flex px-10 gap-6 ">
        <h1 onClick={() => setCurrentView("Dashboard")} className={currentView == "Dashboard" ? 'text-green-600 cursor-pointer  border-b-4 border-green-500' : 'cursor-pointer'} >Dashboard</h1>
        <h1 onClick={() => setCurrentView("Transactions")} className={currentView == "Transactions" ? 'text-green-600 cursor-pointer  border-b-4 border-green-500' : 'cursor-pointer'}>Transactions</h1>
        <h1 onClick={() => setCurrentView("Family")} className={currentView == "Family" ? 'text-green-600  border-b-4 cursor-pointer border-green-500' : 'cursor-pointer'}>Family</h1>
      </div>
      {currentView == "Dashboard" ? (
        <Overview />
      ) : currentView == "Transactions" ? (
        <Transactions />
      ): <Family /> }
    </div>
  )
}

export default Dashboard