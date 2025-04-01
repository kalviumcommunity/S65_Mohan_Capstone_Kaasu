import React from 'react'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'

const Upload = ({user}) => {
  return (
    <div style={{padding: '0 200px'}}>
        <Navbar user={user}/>
        <Hero user={user}/>
    </div>
  )
}

export default Upload 