import React from 'react'
import FeaturesGrid from '../components/FeatureCard'
import DoctorContact from '../components/DoctorContact'
import Footer from '../components/Footer'
import VirtualCarePlatform from '../components/VirtualCarePlatform'
import SequenceAnimation from './Animationtest'

const Doctors = () => {
  return (
    <>
    <VirtualCarePlatform/>
    <SequenceAnimation/>
    <FeaturesGrid/>
    <DoctorContact/>
    <Footer/>
    </>
  )
}

export default Doctors