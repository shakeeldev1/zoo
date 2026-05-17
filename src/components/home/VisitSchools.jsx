import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { FaSearch } from 'react-icons/fa'

import visita1 from '../../assets/VisitingImages/visita (1).jpeg'
import visita2 from '../../assets/VisitingImages/visita (2).jpeg'
import visita3 from '../../assets/VisitingImages/visita (3).jpeg'
import visita4 from '../../assets/VisitingImages/visita (4).jpeg'
import visita5 from '../../assets/VisitingImages/visita (5).jpeg'
import visita6 from '../../assets/VisitingImages/visita (6).jpeg'
import visita7 from '../../assets/VisitingImages/visita (7).jpeg'
import visita8 from '../../assets/VisitingImages/visita (8).jpeg'
import visita9 from '../../assets/VisitingImages/visita (9).jpeg'
import visita10 from '../../assets/VisitingImages/visita (10).jpeg'
import visita11 from '../../assets/VisitingImages/visita (11).jpeg'
import visita13 from '../../assets/VisitingImages/visita (13).jpeg'
import visita14 from '../../assets/VisitingImages/visita (14).jpeg'
import visita15 from '../../assets/VisitingImages/visita (15).jpeg'
import visita16 from '../../assets/VisitingImages/visita (16).jpeg'

function VisitSchools() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")

  // Professional categorized data
  const visits = [
    { id: 1, img: visita1, category: "Tour", title: "Guided Zoo Tour" },
    { id: 2, img: visita2, category: "Learning", title: "Interactive Session" },
    { id: 3, img: visita3, category: "Observation", title: "Animal Observation" },
    { id: 4, img: visita4, category: "Activity", title: "Group Activities" },
    { id: 5, img: visita5, category: "Nature", title: "Outdoor Learning" },
    { id: 6, img: visita6, category: "Awareness", title: "Wildlife Awareness" },
    { id: 7, img: visita7, category: "Tour", title: "Student Exploration" },
    { id: 8, img: visita8, category: "Learning", title: "Zoo Education Program" },
    { id: 9, img: visita9, category: "Observation", title: "Live Animal Study" },
    { id: 10, img: visita10, category: "Activity", title: "Fun Learning Games" },
    { id: 11, img: visita11, category: "Nature", title: "Eco Exploration" },
    { id: 13, img: visita13, category: "Tour", title: "Guided Walk" },
    { id: 14, img: visita14, category: "Learning", title: "Educational Workshop" },
    { id: 15, img: visita15, category: "Observation", title: "Wildlife Study" },
    { id: 16, img: visita16, category: "Activity", title: "Student Engagement" },
  ]

  const categories = ["All", ...new Set(visits.map(v => v.category))]

  const filteredData = useMemo(() => {
    return visits.filter(item => {
      const matchSearch = item.title.toLowerCase().includes(search.toLowerCase())
      const matchFilter = filter === "All" || item.category === filter
      return matchSearch && matchFilter
    })
  }, [search, filter])

  return (
    <section className="w-full py-24 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-[#0D542B]">
            School Visit Gallery
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Explore real moments from our educational school visits — where learning meets nature.
          </p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">

          {/* Search */}
          <div className="relative w-full md:w-1/2">
            <FaSearch className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search experience..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border focus:ring-2 focus:ring-[#0D542B] outline-none"
            />
          </div>

          {/* Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm transition ${
                  filter === cat
                    ? "bg-[#0D542B] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-green-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="group relative rounded-xl overflow-hidden shadow-lg cursor-pointer"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-[#0D542B]/70 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-4">
                <h3 className="text-white font-bold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-200">{item.category}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="text-center mt-10 text-gray-500">
            No results found
          </div>
        )}

      </div>
    </section>
  )
}

export default VisitSchools