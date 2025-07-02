import React from 'react'
import Graph from './chunks/Graph'
import Insights from './chunks/Insights'
import Navbar from './Navbar'
import { useEffect } from 'react'

const Dashboard = () => {

  return (
    <div>
      <Navbar />
      <Graph />
      <Insights />
    </div>
  )
}

export default Dashboard