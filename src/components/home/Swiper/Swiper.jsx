import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Navigation } from 'swiper/modules'
import { FaTicketAlt, FaInfoCircle } from 'react-icons/fa'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './Swiper.css'
import { Link } from 'react-router-dom'
import Model from '../../common/Model'
import { useState } from 'react'

const VideoSwiper = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Zoo-specific unique content
  const slides = [
    {
      title: 'Discover the Wild at City Zoo',
      text: 'From roaring tigers to playful monkeys, explore the beauty and diversity of wildlife up close.'
    },
    {
      title: 'An Adventure Beyond Imagination',
      text: 'Stroll through lush habitats, encounter exotic animals, and learn about their fascinating worlds.'
    },
    {
      title: 'Join Our Mission for Nature',
      text: 'Be part of conservation efforts that protect endangered species while creating lasting memories.'
    }
  ]

  return (
    <div className='relative w-full h-screen custom-swiper overflow-hidden'>
      {/* One common video background */}
      <video
        className='absolute top-0 left-0 w-full h-full object-cover'
        src='./videos/tiger.mp4'
        autoPlay
        loop
        muted
        playsInline
        poster='./images/tiger.png'
      />

      {/* Gradient Overlay */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent'></div>

      {/* Swiper */}
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={true}
        className='h-full relative z-10'
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className='relative flex justify-center items-center h-screen text-center text-white px-4'
          >
            <div className='max-w-3xl  mx-auto mt-[240px]  md:mt-[400px] lg:mt-[220px] text-center px-4'>
              {/* Title */}
              <div className='flex justify-center px-2 sm:px-4 '>
                <h1
                  className='text-2xl sm:text-4xl md:text-[43px] lg:text-6xl 
               font-extrabold mb-4 
               bg-gradient-to-r from-green-400 to-yellow-300 
               text-transparent bg-clip-text drop-shadow-lg
               leading-tight text-center 
               md:whitespace-nowrap'
                  data-aos='fade-up'
                  data-aos-delay='300'
                >
                  {slide.title}
                </h1>
              </div>

              {/* Subtitle */}
              <p
                className='text-base sm:text-lg md:text-xl leading-relaxed mb-8 
               text-gray-100 md:text-gray-200 max-w-2xl mx-auto md:px-[10px]'
                data-aos='fade-up'
                data-aos-delay='600'
              >
                {slide.text}
              </p>

              {/* Buttons Row */}
              <div
                className='flex flex-wrap justify-center gap-3 sm:gap-4'
                data-aos='fade-up'
                data-aos-delay='900'
              >
                {/* Buy Tickets */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className='bg-green-800 text-white flex items-center justify-center gap-2
                 px-4 py-2 text-sm sm:text-base md:text-lg
                 rounded-lg shadow-md font-semibold
                 hover:bg-green-900 hover:scale-105 
                 hover:shadow-[0_0_20px_rgba(34,197,94,0.6)] 
                 transition-all duration-300'
                >
                  <FaTicketAlt /> Buy Tickets
                </button>

                {/* Explore More */}
                <Link
                  to='/about'
                  className='bg-yellow-400 text-black flex items-center justify-center gap-2
                 px-4 py-2 text-sm sm:text-base md:text-lg
                 rounded-lg shadow-md font-semibold
                 hover:bg-yellow-500 hover:scale-105 
                 hover:shadow-[0_0_20px_rgba(253,224,71,0.6)] 
                 transition-all duration-300'
                >
                  <FaInfoCircle /> Explore More
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal */}
      <Model isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

export default VideoSwiper
