import React from 'react'
import {
  FaParking,
  FaCamera,
  FaMapMarkedAlt,
  FaUtensils,
  FaShoppingBag,
  FaWifi,
  FaFutbol,
  FaHotel
} from 'react-icons/fa'
import ostrichlarge from '../../assets/commonimages/ostrichlarge.jpeg'
const Services = () => {
  const leftServices = [
    {
      icon: FaParking,
      title: 'Car Parking',
      desc: 'Safe & spacious parking.',
      position: 'lg:mr-[-140px]',
      aos: 'fade-right'
    },
    {
      icon: FaCamera,
      title: 'Animal Photos',
      desc: 'Capture zoo memories.',
      position: 'lg:mr-[-50px]',
      aos: 'fade-right'
    },
    {
      icon: FaMapMarkedAlt,
      title: 'Guide Services',
      desc: 'Professional guides available.',
      position: 'lg:mr-[-50px]',
      aos: 'fade-right'
    },
    {
      icon: FaUtensils,
      title: 'Food & Beverages',
      desc: 'Delicious meals & drinks.',
      position: 'lg:mr-[-140px]',
      aos: 'fade-right'
    }
  ]

  const rightServices = [
    {
      icon: FaShoppingBag,
      title: 'Zoo Shopping',
      desc: 'Souvenirs, toys, and more.',
      position: 'lg:ml-[-140px]',
      aos: 'fade-left'
    },
    {
      icon: FaWifi,
      title: 'Free Hi-Speed WiFi',
      desc: 'Stay connected anytime.',
      position: 'lg:ml-[-50px]',
      aos: 'fade-left'
    },
    {
      icon: FaFutbol,
      title: 'Playground',
      desc: 'Fun play area for children.',
      position: 'lg:ml-[-50px]',
      aos: 'fade-left'
    },
    {
      icon: FaHotel,
      title: 'Rest House',
      desc: 'Relax & refresh comfortably.',
      position: 'lg:ml-[-140px]',
      aos: 'fade-left'
    }
  ]

  const ServiceCard = ({ service, side }) => (
    <div
      data-aos={service.aos}
      data-aos-duration='1000'
      className={`
    w-full sm:w-full lg:w-[400px] group bg-white relative rounded-lg lg:rounded-xl p-5 shadow-md border border-gray-100
    transition-all duration-500 ease-in-out transform hover:-translate-y-2
    ${service.position} ${
        side === 'left' ? 'lg:rounded-r-full' : 'lg:rounded-l-full'
      }
    hover:bg-gradient-to-r hover:from-green-900 hover:via-green-900 hover:to-[#fdc500] 
    hover:shadow-[inset_0_0_25px_rgba(34,197,94,0.4)]
  `}
    >
      <div className='flex items-center space-x-4 mb-2'>
        {/* Icon wrapper */}
        <div
          className='
        bg-green-100 p-3 rounded-full transition-all duration-500 ease-in-out 
        group-hover:bg-gradient-to-r group-hover:from-green-900 group-hover:to-[#fdc500]
        group-hover:shadow-[0_0_20px_rgba(253,197,0,0.6)]
      '
        >
          <service.icon className='text-green-700 text-xl transition-all duration-500 ease-in-out group-hover:text-white' />
        </div>

        {/* Title */}
        <h2
          className='
        text-lg font-semibold text-green-900 transition-all duration-500 ease-in-out 
        group-hover:text-[#fdc500]
      '
        >
          {service.title}
        </h2>
      </div>

      {/* Description */}
      <p
        className={`text-gray-600 transition-all duration-500 ease-in-out group-hover:text-white
      ${side === 'right' ? 'lg:pl-10 sm:pl-0' : 'lg:pr-10 sm:pr-0'}
    `}
      >
        {service.desc}
      </p>
    </div>
  )

  return (
    <div className='w-full bg-gray-50 py-7 px-6 md:px-12 lg:px-20 overflow-hidden '>
      {/* Heading */}
      <div className='max-w-7xl mx-auto mb-12 text-center lg:text-left'>
        <span
          className='inline-block text-lg font-semibold tracking-wider 
  text-green-800 uppercase bg-green-100 px-4 py-2 rounded-full  mb-3
  shadow-inner'
        >
          Our Services
        </span>
        <h1 className='text-4xl font-extrabold text-green-900 mb-4'>
          Explore Our Facilities
        </h1>
        <p className='text-gray-600 max-w-2xl mx-auto lg:mx-0'>
          We provide top-notch services to make your visit comfortable,
          enjoyable, and memorable.
        </p>
      </div>

      {/* Main Layout */}
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-7xl mx-auto '>
        {/* Left column */}
        <div className='lg:col-span-4 md:grid-cols-2 flex flex-col gap-5 items-center lg:items-end'>
          {leftServices.map((s, i) => (
            <ServiceCard key={i} service={s} side='left' />
          ))}
        </div>

        {/* Center Image */}
        <div
          data-aos='zoom-in'
          data-aos-duration='1200'
          className='lg:col-span-4 flex justify-center'
        >
          <div className='relative w-72 h-72 sm:w-72 sm:h-72 md:w-72 md:h-72 lg:w-80 lg:h-80 transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-[0_0_35px_rgba(34,197,94,0.5)] rounded-full'>
            <img
              src={ostrichlarge}
              alt='service'
              className='w-full h-full rounded-full object-cover shadow-xl border-8 border-white'
            />
          </div>
        </div>

        {/* Right column */}
        <div className='lg:col-span-4 flex flex-col gap-5 items-center lg:items-start'>
          {rightServices.map((s, i) => (
            <ServiceCard key={i} service={s} side='right' />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Services
