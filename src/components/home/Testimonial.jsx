import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const testimonials = [
  {
    id: 1,
    name: 'David Chen',
    role: 'Wildlife Photographer',
    image: './images/testimonial-1.png',
    text: 'The safari zone was breathtaking! Watching lions roam freely felt like being transported straight to Africa. A must-visit for families.',
    rating: 5
  },
  {
    id: 2,
    name: 'Sophia Martinez',
    role: 'Tourist',
    image: './images/testimonial-2.jpg',
    text: 'The zoo is well maintained, animals look healthy and happy, and the staff is super friendly. My kids loved the giraffe feeding session!',
    rating: 5
  },
  {
    id: 3,
    name: 'Amira Hassan',
    role: 'Teacher',
    image: './images/testimonial-3.webp',
    text: 'Educational and fun! My students learned so much about conservation while enjoying the interactive exhibits and the flamingo sanctuary.',
    rating: 4
  }
]

const TestimonialSwiper = () => {
  return (
    <div className='w-full bg-gradient-to-br from-green-900 via-green-900 to-[#fdc500] pt-16 pb-12'>
      <div className='max-w-5xl mx-auto px-4'>
        <div className='text-center lg:text-left'>
          <span
            className='inline-block text-lg font-semibold tracking-wider 
  text-green-800 uppercase bg-green-100 px-4 py-2 rounded-full  mb-3
  shadow-inner'
          >
            Testimonials
          </span>
        </div>

        {/* Title */}
        <h2
          className='text-4xl font-bold text-white mb-3 tracking-tight text-center lg:text-left'
          data-aos='fade-up'
        >
          What Our Visitors Say
        </h2>

        {/* Swiper */}
        <div className='mt-12 w-full'>
          <div
            className='rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.2)] overflow-hidden bg-white'
            data-aos='fade-up'
            data-aos-delay='200'
          >
            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ el: '.custom-pagination', clickable: true }}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              loop={true}
              spaceBetween={30}
            >
              {testimonials.map(item => (
                <SwiperSlide key={item.id}>
                  <div className='p-8 flex flex-col md:flex-row items-center md:items-start gap-6'>
                    {/* Profile Image */}
                    <div className='flex-shrink-0 relative'>
                      <div className='w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-green-900 flex items-center justify-center'>
                        <img
                          src={item.image}
                          alt={item.name}
                          className='w-28 h-28 md:w-36 md:h-36 rounded-full object-cover shadow-md transition-transform duration-300 ease-in-out hover:scale-105'
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className='flex-1 text-center md:text-left'>
                      {/* Stars */}
                      <div className='flex justify-center md:justify-start mb-3 gap-1'>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            xmlns='http://www.w3.org/2000/svg'
                            fill='currentColor'
                            viewBox='0 0 24 24'
                            className={`w-5 h-5 transition-colors duration-300 ${
                              i < item.rating
                                ? 'text-[#fdc500]'
                                : 'text-gray-300'
                            }`}
                          >
                            <path d='M12 .587l3.668 7.425L24 9.75l-6 5.847L19.335 24 12 19.897 4.665 24 6 15.597 0 9.75l8.332-1.738z' />
                          </svg>
                        ))}
                      </div>

                      {/* Testimonial Text */}
                      <p className='text-gray-700 italic leading-relaxed mb-4 max-w-xl mx-auto md:mx-0'>
                        "{item.text}"
                      </p>

                      {/* Name & Role */}
                      <h4 className='font-semibold text-green-900 group-hover:text-[#fdc500] transition-colors duration-300'>
                        {item.name}
                      </h4>
                      <p className='text-sm text-green-700'>{item.role}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Custom Pagination */}
          <div className='custom-pagination flex justify-center gap-2 mt-6'>
            {/* Style for bullets */}
            <style jsx>{`
              .custom-pagination .swiper-pagination-bullet {
                width: 12px;
                height: 12px;
                background-color: #14532d;
                opacity: 0.6;
                transition: all 0.3s ease;
                border-radius: 50%;
              }
              .custom-pagination .swiper-pagination-bullet-active {
                background-color: #fdc500;
                transform: scale(1.2);
                opacity: 1;
              }
            `}</style>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestimonialSwiper
