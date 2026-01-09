import React from 'react'
import FeaturesGrid from '../components/FeatureCard'
import ContactUs from '../components/ContactUs'
import VirtualCarePlatform from '../components/VirtualCarePlatform'
import SequenceAnimation from '../components/DoctorPageAnimation'

const Doctors = () => {
  return (
    <>
    <VirtualCarePlatform/>    
    <SequenceAnimation/>
    <FeaturesGrid/> 
    <ContactUs/>
    </>
  )
}

export default Doctors