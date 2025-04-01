import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Main from '../components/Main'
import Footer from '../components/Footer'

const Landing = ({user}) => {
  return (
    <div style={{padding: '0 200px'}}>
      <Navbar />
      <Hero user={user}/>
      <Main />
      <Footer />
    </div>
  )
}

export default Landing