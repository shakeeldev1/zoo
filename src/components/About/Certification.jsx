import React from 'react';
import { motion } from 'framer-motion';

const certificates = [
  {
    id: 1,
    image: "/about/iran.jpeg",
    title: "Iranian Embassy Recognition",
    description: "Appreciation for excellence in hosting diplomatic visitors and environmental preservation."
  },
  {
    id: 2,
    image: "/about/Libyan.jpeg",
    title: "Libyan Embassy Appreciation",
    description: "Commendation for hospitality and the protection of wildlife within the State of Qatar."
  },
  {
    id: 3,
    image: "/about/Bangladesh.jpeg",
    title: "Bangladesh Embassy Honor",
    description: "Recognized for dedication to educational outreach and building a world-class zoo facility."
  },
  {
    id: 4,
    image: "/about/eritrea.jpeg",
    title: "Embassy of the State of Eritrea",
    description: "Commendation from the Ambassador's Office for outstanding achievements in environmental leadership and international ISO certification."
  },
  {
    id: 5,
    image: "/about/nepal.jpeg",
    title: "Embassy of Nepal Letters",
    description: "Letter of Thanks for the warm hospitality extended to the Embassy family and for supporting the Nepali community in Qatar."
  },
  {
    id: 6,
    image: "/about/turkey.jpeg",
    title: "Military Attaché Office, Turkey",
    description: "Recognition from the Turkish Armed Forces for providing vital environmental awareness and education to the younger generation."
  }
];

export default function Certification() {
  return (
    <section className="py-10 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
          >
            Our <span className="bg-gradient-to-r from-green-900 to-[#fdc500] bg-clip-text text-transparent">Certifications</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 max-w-2xl mx-auto text-lg"
          >
            A legacy of excellence recognized by international embassies and global institutions
            for our commitment to education and environmental conservation.
          </motion.p>
        </div>

        {/* 3 Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group bg-white p-4 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-slate-100"
            >
              {/* Frame Style Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-slate-200 shadow-inner">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Text Content */}
              <div className="mt-6 text-center">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-green-900 transition-colors">
                  {cert.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {cert.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* See More Button */}
        {/* <div className="mt-16 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-slate-900 text-white rounded-full font-bold shadow-xl hover:bg-[#2DA3B4] transition-all flex items-center gap-3 mx-auto"
          >
            Explore All Honors
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.button>
        </div> */}

      </div>
    </section>
  );
}