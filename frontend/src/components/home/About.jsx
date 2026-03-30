import React from 'react'
import 'aos/dist/aos.css'
import { FaLeaf } from 'react-icons/fa' // Leaf icon
import ostrich from "../../assets/commonimages/ostrich.jpeg" // Image of an ostrich
import { Link } from 'react-router-dom'
const AboutZoo = () => {
  return (
    <div className='w-full mx-auto py-16 px-6 md:px-10 lg:px-14 lg:py-16 box-border relative'>
      {/* Section Title */}
<div className='text-center lg:text-left'>
  <span
        className='inline-block text-lg font-semibold tracking-wider 
  text-green-800 uppercase bg-green-100 px-4 py-2 rounded-full  mb-3 md:mb-4
  shadow-inner'
      >
        Welcome to City Zoo
      </span>
</div>
    

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative overflow-hidden'>
        {/* Left Image */}
        <div
          data-aos='fade-right'
          data-aos-delay='200'
          className='relative flex justify-center'
        >
          <img
            className='w-full max-w-4xl rounded-2xl shadow-lg object-cover'
            src={ostrich}
            alt='Ostrich'
          />
        </div>

        {/* Right Content Card */}
        <div
          data-aos='fade-left'
          data-aos-delay='400'
          className='relative bg-green-900 text-white 
  p-6 sm:p-8 md:p-10 
  rounded-2xl shadow-xl z-10 
  max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-none 
  mx-auto lg:-ml-[67px]'
        >
          {/* Gradient Frame Border */}
          <div className='absolute inset-0 rounded-2xl -z-10 p-[4px] bg-gradient-to-r from-green-900 to-[#fdc500]'>
            <div className='w-full h-full bg-green-900 rounded-2xl'></div>
          </div>

          {/* Title */}
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 text-center lg:text-left'>
            Why You Should Visit Zoofari Park!
          </h1>

          {/* Description */}
          <p className='text-white/90 mb-6 leading-relaxed text-sm sm:text-base md:text-lg text-center lg:text-left'>
            At CityZoo, we are dedicated to creating a space where people of all
            ages can connect with nature and wildlife. Our mission is to provide
            not only entertainment but also education and awareness about animal
            care and conservation. With exciting exhibits, safe family
            facilities, and engaging activities, we strive to make every visit a
            joyful and meaningful experience for our guests.
          </p>

          {/* Features */}
          <div className=' hidden lg:flex lg:flex-col'>
            <h5 className='flex items-center'>
              <FaLeaf className='text-[#fdc500] mr-3' /> 180 acres area covered
            </h5>
            <h5 className='flex items-center'>
              <FaLeaf className='text-[#fdc500] mr-3' /> More Than 100 Types of
              Animals
            </h5>
            <h5 className='flex items-center'>
              <FaLeaf className='text-[#fdc500] mr-3' /> All Animals are Under
              Security
            </h5>
          </div>

          {/* Button */}
          <div className='mt-6 text-center lg:text-left'>
            <Link
              to='/about'
              className='inline-block bg-gradient-to-b from-green-900 to-[#fdc500] text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full shadow-md transition transform hover:-translate-y-1 hover:shadow-[0_0_15px_#fdc500]'
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutZoo
