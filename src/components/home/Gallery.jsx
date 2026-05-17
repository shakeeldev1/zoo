import React from 'react'
import { Link } from 'react-router-dom'
import camle from '../../assets/commonimages/camle.jpeg'
import animal from '../../assets/commonimages/animal.jpeg'
import dear from '../../assets/commonimages/dear.jpeg'
import dears from '../../assets/commonimages/dears.jpeg'
import duck from '../../assets/commonimages/duck.jpeg'
import oxe1 from '../../assets/commonimages/oxeo.jpeg'
import oxe2 from '../../assets/commonimages/oxea.jpeg'
import oxe3 from '../../assets/commonimages/oxe (3).jpeg'

const animals = [
  { src: camle,  },
  { src: animal,  },
  { src: dear,  },
  { src: dears, },
  { src: duck,  },
  { src: oxe1, },
  { src: oxe2,  },
  { src: oxe3,  }
]

const ZooGallery = () => {
  return (
    <section className='py-2 bg-gray-50 lg:mt-16'>
      {/* Heading */}
      <div className='max-w-7xl mx-auto mb-16 px-6 md:px-12 lg:px-20 lg:text-left text-center'>
        <span
          className='inline-block text-lg font-semibold tracking-wider 
  text-green-800 uppercase bg-green-100 px-4 py-2 rounded-full  mb-3
  shadow-inner'
        >
          Gallery
        </span>
        <h1 className='text-4xl font-extrabold text-green-900 mb-4'>
          Explore Our Animal Gallery
        </h1>
        <p className='text-gray-600 max-w-2xl mx-auto lg:mx-0'>
          Step into the wild and discover the beauty of nature’s most
          fascinating creatures. Our gallery showcases animals from across the
          world, each captured in stunning detail to bring their charm and
          character closer to you.
        </p>
      </div>

      {/* Gallery Layout: 3 cols → (3 | 2 | 3) */}
      <div className='max-w-7xl mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-6'>
        {/* Left Column: 3 images */}
        <div className='flex flex-col gap-6'>
          {animals.slice(0, 3).map((animal, index) => (
            <div
              key={index}
              className='relative group overflow-hidden rounded-2xl shadow-xl'
            >
              <img
                src={animal.src}
                alt={animal.name}
                className='w-full h-64 object-cover transform group-hover:scale-110 transition duration-500'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end'>
                <h2 className='text-white text-lg font-semibold p-4'>
                  {animal.name}
                </h2>
              </div>
            </div>
          ))}
        </div>

        {/* Center Column: 2 images */}
        <div className='flex flex-col gap-6 justify-center'>
          {animals.slice(3, 5).map((animal, index) => (
            <div
              key={index}
              className='relative group overflow-hidden rounded-2xl shadow-xl'
            >
              <img
                src={animal.src}
                alt={animal.name}
                className='w-full h-72 object-cover transform group-hover:scale-110 transition duration-500'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end'>
                <h2 className='text-white text-lg font-semibold p-4'>
                  {animal.name}
                </h2>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: 3 images */}
        <div className='flex flex-col gap-6'>
          {animals.slice(5, 8).map((animal, index) => (
            <div
              key={index}
              className='relative group overflow-hidden rounded-2xl shadow-xl'
            >
              <img
                src={animal.src}
                alt={animal.name}
                className='w-full h-64 object-cover transform group-hover:scale-110 transition duration-500'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end'>
                <h2 className='text-white text-lg font-semibold p-4'>
                  {animal.name}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Load More Button */}
      <div className='text-center mt-16'>
        <Link
          to='/services'
          className='inline-block bg-gradient-to-b from-green-900 to-[#fdc500] text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full shadow-md transition transform hover:-translate-y-1 hover:shadow-[0_0_18px_#fdc500]'
        >
          Load More
        </Link>
      </div>
    </section>
  )
}

export default ZooGallery
