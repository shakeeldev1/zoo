import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Heart, MapPin, Utensils, AlertCircle } from 'lucide-react'
import oxe10 from '../../assets/commonimages/oxe (10).jpeg'
import oxe11 from '../../assets/commonimages/oxe (11).jpeg'
import oxe12 from '../../assets/commonimages/oxe (12).jpeg'
import oxe13 from '../../assets/commonimages/oxe (13).jpeg'
import oxe14 from '../../assets/commonimages/oxe (14).jpeg'
import oxe15 from '../../assets/commonimages/oxe (15).jpeg'
import oxe16 from '../../assets/commonimages/oxe (16).jpeg'
import oxe3 from '../../assets/commonimages/oxe (3).jpeg'

// Section title component
function SectionTitle ({ title, subtitle }) {
  return (
    <div className='text-center mb-12' data-aos='fade-up'>
      <h2 className='text-3xl md:text-4xl font-extrabold text-green-900'>
        {title}
      </h2>
      <p className='text-lg text-slate-600 mt-2 max-w-3xl mx-auto'>
        {subtitle}
      </p>
    </div>
  )
}

// Status badge component
function StatusBadge ({ status }) {
  const statusColors = {
    Vulnerable: 'bg-yellow-700 text-white',
    Endangered: 'bg-red-800 text-white',
    'Least Concern': 'bg-green-900 text-white',
    'Near Threatened': 'bg-blue-800 text-white',
    Domesticated: 'bg-gray-800 text-white'
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold shadow-sm ${statusColors[status]}`}
    >
      <AlertCircle className='w-4 h-4 mr-1' aria-hidden='true' />
      {status}
    </span>
  )
}

// Main component
function MeetAnimals () {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      offset: 120
    })
  }, [])

  const animals = [
    {
      name: 'Dear',
      img: oxe10,
      habitat: 'Deserts and arid regions',
      diet: 'Herbivore',
      status: 'Least Concern',
      description:
        'Dear are desert-adapted animals known for their ability to survive long periods without water and carry heavy loads across harsh terrains.'
    },
    {
      name: 'Ostrich',
      img: oxe11,
      habitat: 'Forests and grasslands',
      diet: 'Herbivore',
      status: 'Least Concern',
      description:
        'Ostrich are graceful animals recognized for their speed and agility, often found grazing peacefully in forests and open fields.'
    },
    {
      name: 'Dear',
      img: oxe12,
      habitat: 'Grasslands and farms',
      diet: 'Herbivore',
      status: 'Domesticated',
      description:
        'Dear are strong and intelligent animals widely used for transportation, farming, and sports, known for their loyalty and endurance.'
    },
    {
      name: 'Peacock',
      img: oxe13,
      habitat: 'Farms and rural areas',
      diet: 'Herbivore',
      status: 'Domesticated',
      description:
        'Peacocks are essential livestock animals providing milk and meat, playing a major role in agriculture and rural economies.'
    },
    {
      name: 'Dear',
      img: oxe14,
      habitat: 'Mountains and farms',
      diet: 'Herbivore',
      status: 'Least Concern',
      description:
        'Dear are highly adaptable animals known for their climbing ability and are commonly raised for milk, meat, and fiber.'
    },
    {
      name: 'Dear',
      img: oxe15,
      habitat: 'Grasslands and farms',
      diet: 'Herbivore',
      status: 'Domesticated',
      description:
        'Dear are gentle animals raised for wool, meat, and milk, known for their flocking behavior and calm nature.'
    },
    {
      name: 'Dear',
      img: oxe16,
      habitat: 'Wetlands and farms',
      diet: 'Herbivore',
      status: 'Near Threatened',
      description:
        'Dear are powerful animals often found near water sources, widely used in farming and valued for their strength and milk production.'
    },
    {
      name: 'Ox',
      img: oxe3,
      habitat: 'Farms and agricultural lands',
      diet: 'Herbivore',
      status: 'Domesticated',
      description:
        'Ox are trained cattle used for plowing and transport, known for their strength, endurance, and importance in traditional farming.'
    }
  ]

  const stats = [
    { value: '120+', label: 'Animal Species' },
    { value: '15', label: 'Conservation Programs' },
    { value: '98%', label: 'Visitor Satisfaction' },
    { value: '2000+', label: 'Animals Rescued' }
  ]

  const cardVariants = {
    offscreen: { y: 40, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', bounce: 0.3, duration: 0.6 }
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-white to-slate-100 '>
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <SectionTitle
          title='Meet Our Animals'
          subtitle="From majestic animals to friendly farm species—get to know our residents and learn how we're protecting their future."
        />

        {/* Animal Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8'>
          {animals.map((animal, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              initial='offscreen'
              whileInView='onscreen'
              viewport={{ once: true, amount: 0.4 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className='group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-md hover:shadow-2xl hover:shadow-[#fdc500]/30 ring-1 ring-slate-200 hover:ring-[#fdc500] transition-all duration-500'
              data-aos='zoom-in'
              data-aos-delay={i * 100}
            >
              <div className='aspect-[4/3]  overflow-hidden relative'>
                <img
                  src={animal.img}
                  alt={`Photo of ${animal.name}`}
                  loading='lazy'
                  className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-green-900/70 to-[#fdc500]/30 opacity-0 group-hover:opacity-90 transition-opacity duration-500' />
                <div className='absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700' />
                <div className='absolute top-3 right-3 sm:top-4 sm:right-4'>
                  <StatusBadge status={animal.status} />
                </div>
              </div>

              <div className='p-4 sm:p-5 relative z-10'>
                <h4 className='text-lg sm:text-xl font-bold text-slate-900 mb-2 group-hover:text-green-900 transition-colors duration-500'>
                  {animal.name}
                </h4>
                <p className='text-slate-600 text-sm sm:text-base mb-3 group-hover:text-green-900 transition-colors duration-500'>
                  {animal.description}
                </p>
                <div className='mt-2 sm:mt-3 text-sm text-slate-700 space-y-1.5 sm:space-y-2'>
                  <div className='flex items-center'>
                    <MapPin className='w-4 h-4 mr-2 text-[#fdc500] group-hover:text-green-900 transition-colors duration-500' />
                    <span>{animal.habitat}</span>
                  </div>
                  <div className='flex items-center'>
                    <Utensils className='w-4 h-4 mr-2 text-green-900 group-hover:text-[#fdc500] transition-colors duration-500' />
                    <span>{animal.diet}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.25 }
            }
          }}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-16 sm:mt-20'
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ scale: 1.07, y: -6 }}
              className='relative bg-white p-6 sm:p-8 rounded-2xl text-center shadow-md border border-slate-100 transition-all duration-500 group overflow-hidden'
              data-aos='zoom-in'
              data-aos-delay={i * 150}
            >
              <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-green-900 to-[#fdc500] opacity-0 group-hover:opacity-100 transition duration-500'></div>
              <div className='relative z-10'>
                <div className='text-3xl sm:text-4xl font-extrabold text-green-900 group-hover:text-white mb-2 transition-colors duration-500'>
                  {stat.value}
                </div>
                <div className='text-slate-600 font-medium text-sm sm:text-base group-hover:text-white transition-colors duration-500'>
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  )
}

export default MeetAnimals