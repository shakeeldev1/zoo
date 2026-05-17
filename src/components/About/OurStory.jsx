// OurStory.jsx
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Target, Heart, Zap, ChevronRight, Users } from 'lucide-react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import imagestory from '../../assets/About/storyimg.jpeg'
// Brand color mapping
const colorMap = {
  gold: {
    border: 'border-[#fdc500]',
    bg: 'bg-gradient-to-r from-[#fdc500]/20 to-[#064e3b]/20',
    text: 'text-[#064e3b] hover:text-[#fdc500]',
    badge: 'from-[#fdc500] to-[#064e3b] text-white'
  },
  green: {
    border: 'border-[#064e3b]',
    bg: 'bg-gradient-to-r from-[#064e3b]/20 to-[#fdc500]/20',
    text: 'text-[#064e3b] hover:text-[#fdc500]',
    badge: 'from-[#064e3b] to-[#fdc500] text-white'
  }
}

// Section Title Component
function SectionTitle ({ title, subtitle }) {
  return (
    <div className='text-center mb-16 sm:mb-20' data-aos='fade-up'>
      <h2 className='text-3xl sm:text-4xl font-extrabold text-[#064e3b] tracking-tight'>
        {title}
      </h2>
      <p className='text-base sm:text-lg text-[#064e3b]/70 mt-4 max-w-2xl mx-auto'>
        {subtitle}
      </p>
    </div>
  )
}

// Timeline events
const timeline = [
  {
    year: '1987',
    title: 'My Zoo Opens',
    text: 'Founded with 40 species and a bold vision for urban conservation.',
    icon: <Heart className='w-6 h-6' />,
    color: 'green'
  },
  {
    year: '2016',
    title: 'Wildlife Rescue Program',
    text: 'Expanded rehabilitation facilities for injured native animals.',
    icon: <Target className='w-6 h-6' />,
    color: 'gold'
  },
  {
    year: '2024',
    title: 'Net-Zero Initiative',
    text: 'Committed to renewable energy and zero-waste operations by 2030.',
    icon: <Zap className='w-6 h-6' />,
    color: 'gold'
  }
]

function OurStory () {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 })
  }, [])

  return (
    <section className='sm:py-24 bg-gradient-to-b from-white to-[#fdc500]/10 relative overflow-hidden'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Section Header */}
        <SectionTitle
          title='Our Story'
          subtitle='A journey of care, curiosity, and conservation spanning decades.'
        />

        {/* Timeline */}
        <div className='relative max-w-5xl mx-auto'>
          {/* Vertical Line */}
          <div className='absolute left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#064e3b]/40 via-[#fdc500]/40 to-transparent transform -translate-x-1/2' />
          <div className='space-y-16 sm:space-y-20 lg:space-y-24'>
            {timeline.map((event, i) => {
              const colors = colorMap[event.color]
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, delay: i * 0.25 }}
                  className={`relative flex flex-col lg:flex-row items-center ${
                    i % 2 === 0 ? 'lg:flex-row-reverse' : ''
                  }`}
                  data-aos='fade-up'
                >
                  {/* Connector Dot */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`absolute left-1/2 lg:left-1/2 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-4 ${colors.border} bg-white shadow-md z-10 transform -translate-x-1/2`}
                  />

                  {/* Year Badge */}
                  <div
                    className={`w-full  lg:w-1/2 mb-7 sm:mb-6 lg:mb-0 ${
                      i % 2 === 0 ? 'lg:pl-16 text-left' : 'lg:pr-16 text-right'
                    }`}
                  >
                    <span
                      className={`inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r ${colors.badge} font-semibold shadow text-xs sm:text-sm md:text-base`}
                    >
                      <Calendar className='w-4 h-4 mr-2' />
                      {event.year}
                    </span>
                  </div>

                  {/* Content Card */}
                  <div className='w-full lg:w-1/2'>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      className={`relative bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border ${colors.border} hover:shadow-2xl transition-all duration-500 p-4 sm:p-6 md:p-8`}
                    >
                      {/* Icon Badge */}
                      <div
                        className={`absolute -top-6 left-4 sm:left-6 inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${colors.bg} ${colors.text} shadow-lg`}
                      >
                        {event.icon}
                      </div>

                      <h4 className='text-base sm:text-lg md:text-xl font-bold text-[#064e3b] mt-6'>
                        {event.title}
                      </h4>
                      <p className='mt-2 sm:mt-3 text-[#064e3b]/70 text-sm sm:text-base md:text-lg'>
                        {event.text}
                      </p>
                      <button
                        className={`mt-4 sm:mt-5 inline-flex items-center ${colors.text} font-medium transition-colors text-sm sm:text-base`}
                      >
                        Learn More <ChevronRight className='w-4 h-4 ml-1' />
                      </button>
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Future Vision CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='mt-24 sm:mt-32 relative rounded-3xl overflow-hidden shadow-2xl'
          data-aos='fade-up'
        >
          {/* Background Image */}
          <div
            className='absolute inset-0 bg-cover bg-center h-screen'
           style={{
                       background:
                       `url(${imagestory})`,
                       backgroundSize: "cover",
                       backgroundPosition: "center",
                     }}
          />

          {/* Dark overlay */}
          <div className='absolute inset-0 bg-[#064e3b]/70' />

          {/* Content */}
          <div className='relative z-10 p-8 sm:p-12 text-center text-white'>
            <h3 className='text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 drop-shadow-md'>
              Our Future Vision
            </h3>
            <p className='text-white/90 text-base sm:text-lg mb-6 sm:mb-8 max-w-3xl mx-auto drop-shadow-sm'>
              We're expanding conservation efforts, pioneering new education
              programs, and designing sustainable habitats to protect wildlife
              for generations.
            </p>
            <button className='inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-[#fdc500] text-[#064e3b] font-semibold rounded-xl shadow-lg hover:bg-[#064e3b] hover:text-[#fdc500] transition-colors duration-300'>
              Support Our Mission
              <Heart className='w-5 h-5 ml-2' />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default OurStory
