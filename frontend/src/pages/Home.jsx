import React from 'react'
import VideoSwiper from '../components/home/Swiper/Swiper'
import AboutZoo from '../components/home/About'
import Services from '../components/home/Services'
import ZooFacts from '../components/home/ZooFacts'
import ZooGallery from '../components/home/Gallery'
import TestimonialSwiper from '../components/home/Testimonial'
import FAQSection from '../components/home/FAQ'
import Visits from '../components/home/Visits'


const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <VideoSwiper/>
      <AboutZoo/>
      <Services/>
      <ZooFacts/>
      <Visits/>
      <ZooGallery/>
      <TestimonialSwiper/>
      <FAQSection/>
     

    </div>
  )
}

export default Home