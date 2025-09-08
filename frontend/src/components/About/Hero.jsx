// File: HeroSection.jsx
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Ticket, ArrowRight, Heart, Users, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import Model from '../common/Model'
import { useState } from 'react'




export default function HeroSection () {
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      offset: 100,
      easing: 'ease-in-out-cubic'
    })
    setTimeout(() => AOS.refresh(), 500)
  }, [])

  const blobs = [
    {
      color: 'bg-green-900',
      style: { top: '10%', left: '5%' },
      delay: 100,
      animation: 'fade-down'
    },
    {
      color: 'bg-[#fdc500]',
      style: { top: '5%', right: '10%' },
      delay: 300,
      animation: 'fade-down'
    },
    {
      color: 'bg-emerald-600',
      style: { bottom: '10%', left: '20%' },
      delay: 500,
      animation: 'fade-up'
    }
  ]

  return (
    <>
    <header
      className='relative overflow-hidden 
                 bg-gradient-to-br from-green-900 via-green-800 to-[#fdc500] 
                 py-14 sm:py-20 md:py-28 top-[40px]'
      aria-label='Hero section for Wildlife Sanctuary'
    >
      {/* Background blobs */}
      <div className='absolute inset-0 opacity-25'>
        {blobs.map((blob, i) => (
          <div
            key={i}
            className={`absolute w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 ${blob.color} 
                        rounded-full mix-blend-multiply filter blur-2xl`}
            style={blob.style}
            data-aos={blob.animation}
            data-aos-delay={blob.delay}
          ></div>
        ))}
      </div>

      {/* Content */}
      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        {/* Title */}
        <h1
          className='text-3xl sm:text-4xl md:text-6xl font-extrabold 
                     text-white mb-4 sm:mb-6 leading-snug sm:leading-tight drop-shadow-md'
          data-aos='zoom-in-up'
        >
          Welcome to{' '}
          <span className='text-[#fdc500] relative'>
            Wildlife
            <span className='absolute -top-4 -right-6 hidden sm:inline-block'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                className='w-6 h-6 sm:w-8 sm:h-8'
                data-aos='fade-down'
                data-aos-delay='400'
              >
                <path
                  fill='#fdc500'
                  d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
         2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 
         14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 
         11.54L12 21.35z'
                />
              </svg>
            </span>
          </span>{' '}
          <span className='text-green-100'>Zoo</span>
        </h1>

        {/* Subtitle */}
        <p
          className='mt-3 text-base sm:text-lg md:text-xl text-white/90 
                     max-w-xl sm:max-w-2xl mx-auto leading-relaxed'
          data-aos='fade-up'
          data-aos-delay='200'
        >
          Discover the wonder of wildlife, conservation, and family adventure in
          the heart of the city.
        </p>

        {/* Stats */}
        <div
          className='my-6 sm:my-8 flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6'
          data-aos='fade-up'
          data-aos-delay='400'
        >
          {[
            { icon: Users, value: '200+', label: 'Animal Species' },
            { icon: Star, value: '37', label: 'Years of Care' },
            { icon: Heart, value: '98%', label: 'Visitor Satisfaction' }
          ].map((stat, i) => (
            <div
              key={i}
              className='flex items-center bg-white/80 backdrop-blur-sm rounded-xl px-3 py-2 sm:px-4 sm:py-2 shadow-sm'
              data-aos='zoom-in'
              data-aos-delay={300 + i * 150}
            >
              <stat.icon className='w-5 h-5 text-green-900 mr-2' />
              <span className='font-bold text-slate-900 text-sm sm:text-base'>
                {stat.value}
              </span>
              <span className='ml-1 text-slate-600 text-xs sm:text-sm'>
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div
          className='mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4'
          data-aos='flip-up'
          data-aos-delay='600'
        >
          <button
          onClick={()=>setIsOpen(true)}
            className='inline-flex items-center justify-center gap-2 rounded-xl 
                       bg-green-900 hover:bg-green-950 px-6 py-3 sm:px-7 sm:py-4 
                       font-semibold text-white shadow-lg hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] 
                       transform hover:scale-105 transition-all duration-300'
          >
            <Ticket className='w-5 h-5' /> Buy Tickets
          </button>

          <Link
          to="/services"
            className='inline-flex items-center justify-center gap-2 rounded-xl 
                       bg-[#fdc500] hover:bg-yellow-400 px-6 py-3 sm:px-7 sm:py-4 
                       font-semibold text-slate-900 shadow-lg hover:shadow-[0_0_20px_rgba(253,199,0,0.5)] 
                       transform hover:scale-105 transition-all duration-300'
          >
            <Heart className='w-5 h-5' /> Adopt an Animal
          </Link>

          
        </div>
      </div>
    </header>

    <Model isOpen={isOpen} onClose={()=>setIsOpen(false)}/>
    </>
  )
}
