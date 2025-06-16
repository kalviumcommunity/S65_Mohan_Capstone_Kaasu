import React from 'react'
import Graph from './chunks/Graph'
import Insights from './chunks/Insights'
import Navbar from './Navbar'

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