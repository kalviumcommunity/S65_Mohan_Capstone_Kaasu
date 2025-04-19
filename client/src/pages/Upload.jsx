import React from 'react'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'

const Upload = ({user, setReloadPopup}) => {
  return (
    <div style={{padding: '0 200px'}}>
        <Navbar user={user}/>
        <Hero setReloadPopup={setReloadPopup} user={user}/>
    </div>
  )
}

export default Upload 