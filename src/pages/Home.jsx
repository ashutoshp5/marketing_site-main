import React from 'react'
import ContactUs from '../components/ContactUs'
import Footer from '../components/Footer'
import HomeSection from '../components/HomeSection'
import KidneyCareEcosystem from '../components/KidneyCareEcosystem'
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

    <SupportAndEducation/>
    <RecognizedBy/>
    <ContactUs/>
    <Footer/>
    </>

   )
}

export default Home