import React from 'react'
import Hero from './Hero'
import WhyChoose from './WhyChoose'
import BlueSection from './BlueSection'
import Footer from './Footer'
import Navbar from '../components/Nav'
import HowItWorks from './HowItWorks'
import { motion } from 'framer-motion'

const Home = () => {
  return (
      <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className=" mx-auto bg-white shadow-2xl rounded-3xl border border-gray-100"
          >
    <div> 
      <Navbar/>
    <Hero/>
  <WhyChoose/>
  <HowItWorks/>
  <BlueSection/>
  <Footer/>
    </div>
    </motion.div>
  )
}

export default Home
