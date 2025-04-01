import { Bell, Settings, User } from 'lucide-react'
import React, { useState } from 'react'
import Overview from '../components/Overview'
import Transactions from '../components/Transactions'
import Family from '../components/Family'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'


const Dashboard = ({user}) => {
    const [currentView, setCurrentView] = useState("Dashboard")
  return (
    <div className='' style={{padding: '0 200px'}}>
     <Navbar user={user}/>
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