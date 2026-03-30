import React from 'react'
import { motion } from 'framer-motion'
import { FaSchool, FaBus, FaChalkboardTeacher, FaLeaf } from 'react-icons/fa'

import visit1 from '../../assets/VisitingImages/visit (1).jpeg'
import visit2 from '../../assets/VisitingImages/visit (2).jpeg'
import visit3 from '../../assets/VisitingImages/visit (3).jpeg'
import visit4 from '../../assets/VisitingImages/visit (4).jpeg'
import visit5 from '../../assets/VisitingImages/visit (5).jpeg'
import visit6 from '../../assets/VisitingImages/visit (6).jpeg'
import { Link } from 'react-router-dom'

function Visits() {
  const visits = [
    {
      id: 1,
      img: visit1,
      title: "Guided Zoo Exploration",
      subtitle: "Students explore wildlife with expert guides",
      badge: "Educational Tour"
    },
    {
      id: 2,
      img: visit2,
      title: "Interactive Learning Sessions",
      subtitle: "Engaging sessions about animals & conservation",
      badge: "Learning Activity"
    },
    {
      id: 3,
      img: visit3,
      title: "Animal Observation Experience",
      subtitle: "Close observation of different species",
      badge: "Practical Learning"
    },
    {
      id: 4,
      img: visit4,
      title: "Group Educational Activities",
      subtitle: "Students participate in fun learning tasks",
      badge: "Team Activity"
    },
    {
      id: 5,
      img: visit6,
      title: "Outdoor Nature Exploration",
      subtitle: "Learning beyond classrooms in natural environment",
      badge: "Nature Visit"
    },
    {
      id: 6,
      img: visit5,
      title: "Wildlife Awareness Program",
      subtitle: "Understanding conservation and ecosystem",
      badge: "Awareness"
    }
  ]

  return (
    <section className="w-full bg-gradient-to-b from-white to-green-50 py-14">
      
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D542B]">
            School Visit Experiences
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-sm md:text-base">
            Our zoo visits provide a perfect blend of education, exploration, and fun.
            Students gain real-world knowledge about wildlife and environmental conservation.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visits.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ scale: 1.04 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden group  transition"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D542B]/70 to-transparent"></div>

                {/* Badge */}
                <div className="absolute bottom-3 left-3 bg-white/90 text-[#0D542B] text-xs px-3 py-1 rounded-full font-semibold">
                  {item.badge}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#0D542B] transition">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-600 mt-2">
                  {item.subtitle}
                </p>

                {/* Features */}
                <div className="mt-4 space-y-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <FaSchool className="text-[#0D542B]" />
                    Educational Visit
                  </div>
                  <div className="flex items-center gap-2">
                    <FaBus className="text-[#0D542B]" />
                    Transport Facility Available
                  </div>
                  <div className="flex items-center gap-2">
                    <FaChalkboardTeacher className="text-[#0D542B]" />
                    Guided Learning Sessions
                  </div>
                  <div className="flex items-center gap-2">
                    <FaLeaf className="text-[#0D542B]" />
                    Wildlife Awareness
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Explore More */}
        <div className="text-center mt-12">
          <Link to="/visitschool" className="px-6 py-3 bg-[#0D542B] cursor-pointer text-white rounded-lg hover:bg-green-800 transition shadow-md">
            Explore More
          </Link>
        </div>

      </div>
    </section>
  )
}

export default Visits