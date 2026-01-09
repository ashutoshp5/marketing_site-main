import React from 'react'
import ContactUs from '../components/ContactUs'
import HomeSection from '../components/HomeSection'
import KidneyCareEcosystem from '../components/KidneyCareEcosystem'
import Partners from '../components/Partners'
import RecognizedBy from '../components/RecognizedBy'
import ReviewSlider from '../components/ReviewSlider'
import SupportAndEducation from '../components/SupportAndEducation '
import WhyChooseKifayti from '../components/WhyChooseKifayti'

const Home = () => {
  return (
    <>   
    <HomeSection/>
    <KidneyCareEcosystem/>
    <WhyChooseKifayti/>
    <ReviewSlider/>
    <Partners/>
    <SupportAndEducation/>
    <RecognizedBy/>    
    <ContactUs/>
    </>
   )
}

export default Home