import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Heart, MapPin, Utensils, AlertCircle } from 'lucide-react'
import animal1 from '../../assets/About/animal1.jpeg'
import animal2 from '../../assets/About/animal2.jpeg'
import animal3 from '../../assets/About/animal3.jpeg'
import animal4 from '../../assets/About/animal4.jpg'
import animal5 from '../../assets/About/animal5.jpeg'
import animal6 from '../../assets/About/animal6.jpeg'
import animal7 from '../../assets/About/animal7.jpeg'
import animal8 from '../../assets/About/animal8.jpeg'
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
    'Near Threatened': 'bg-blue-800 text-white'
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
      name: 'African Lion',
      img:animal1,
      habitat: 'Savannahs and grasslands',
      diet: 'Carnivore',
      status: 'Vulnerable',
      description:
        'The majestic king of the savannah, known for its impressive mane and powerful roar.'
    },
    {
      name: 'Asian Elephant',
      img: animal2,
      habitat: 'Forests and grasslands',
      diet: 'Herbivore',
      status: 'Endangered',
      description:
        'Highly intelligent and social creatures with strong family bonds and excellent memory.'
    },
    {
      name: 'Macaw Parrot',
      img: animal3,
      habitat: 'Rainforests',
      diet: 'Omnivore',
      status: 'Least Concern',
      description:
        'Vibrantly colored birds known for their intelligence and ability to mimic human speech.'
    },
    {
      name: 'Gentoo Penguin',
      img: animal4,
      habitat: 'Antarctic regions',
      diet: 'Carnivore',
      status: 'Near Threatened',
      description:
        'The fastest swimming penguins, capable of reaching speeds up to 36 km/h underwater.'
    },
    {
      name: 'Giant Panda',
      img: animal5,
      habitat: 'Temperate forests in China',
      diet: 'Herbivore (mainly bamboo)',
      status: 'Vulnerable',
      description:
        'Known for their distinctive black-and-white fur and bamboo diet, pandas are a global conservation icon.'
    },
    {
      name: 'Komodo Dragon',
      img: animal6,
      habitat: 'Indonesian islands',
      diet: 'Carnivore',
      status: 'Endangered',
      description:
        "The world's largest lizard, capable of hunting large prey with venomous bites."
    },
    {
      name: 'Blue Whale',
      img: animal7,
      habitat: 'Oceans worldwide',
      diet: 'Carnivore (krill)',
      status: 'Endangered',
      description:
        'The largest animal ever known to have lived on Earth, reaching up to 30 meters in length.'
    },
    {
      name: 'Rabit',
      img: animal8,
      habitat: 'Australian deserts and grasslands',
      diet: 'Herbivore',
      status: 'Least Concern',
      description:
        'The largest marsupial, known for its powerful hind legs and ability to leap great distances.'
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
    <div className='min-h-screen bg-gradient-to-b from-white to-slate-100 pb-16'>
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <SectionTitle
          title='Meet Our Animals'
          subtitle="From majestic lions to playful penguins—get to know our residents and learn how we're protecting their future."
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
              {/* Image with overlay + shine effect */}
              <div className='aspect-[4/3] sm:aspect-square overflow-hidden relative'>
                <img
                  src={animal.img}
                  alt={`Photo of ${animal.name}`}
                  loading='lazy'
                  className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                />
                {/* gradient overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-green-900/70 to-[#fdc500]/30 opacity-0 group-hover:opacity-90 transition-opacity duration-500' />
                {/* shine sweep */}
                <div className='absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700' />
                <div className='absolute top-3 right-3 sm:top-4 sm:right-4'>
                  <StatusBadge status={animal.status} />
                </div>
              </div>

              {/* Content */}
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
              className='relative bg-white p-6 sm:p-8 rounded-2xl text-center shadow-md border border-slate-100 
       transition-all duration-500 group overflow-hidden'
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
