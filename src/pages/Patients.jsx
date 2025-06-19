import React from 'react'
import HowItWorks from '../components/HowItWorks'
import AnotherContact from '../components/AnotherContact'
import Footer from '../components/Footer'
import CommunitySupport from '../components/CommunitySupport'
import ServicesSection from '../components/ServicesSection'
import KidneyCareSection from '../components/KidneyCareSection'
import ScrollableMobileSection from '../components/ScrollableMobileSection'
import backgroundImage from '../assets/figma images/how.png';
import MobileSequenceAnimation from './MobileSequenceAnimation'

const Patients = () => {
  return (
    <>  
    <MobileSequenceAnimation/>
    <KidneyCareSection/>
    
    <div
      className="bg-gradient-to-b from-blue-50/90 to-blue-50/70  w-full flex justify-center items-center overflow-x-hidden py-20"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >      <ServicesSection/>
    </div>
    <div
      className="bg-gradient-to-b from-blue-50/90 to-blue-50/70  w-full flex justify-center items-center overflow-x-hidden py-20"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >        <CommunitySupport/>
    </div>

    <div
    
    >  
    <HowItWorks/>
    </div>

    <AnotherContact/>
    <Footer/>
    </>
  )
}

export default Patients