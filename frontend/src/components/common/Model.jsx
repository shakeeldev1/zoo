import React, { useState }  from 'react'
import { FaPaw, FaTicketAlt, FaTimes, FaBars, FaChevronDown, FaChevronUp } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";


const Model = ({isOpen,onClose}) => {
    if(!isOpen) return
      
  return (
    <div className=''>
      {/* Tickets Modal */}
    
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div
            data-aos="zoom-in"
            className="bg-white w-full md:w-[50%] rounded-2xl shadow-2xl p-3 relative animate-fadeIn"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
            >
              <FaTimes size={22} />
            </button>

            {/* Header */}
            <div className="flex flex-col items-center text-center mb-2">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#2D6A4F]/100 hover:bg-yellow-400 shadow-md mb-3">
                <FaPaw className="text-white text-2xl" />
              </div>
              <h2 className="text-xl md:text-3xl font-extrabold text-green-800">
                Book Your Tickets
              </h2>
              <p className="text-gray-600 md:mt-2 text-sm">
                Experience a day full of adventure and wildlife at City Zoo
              </p>
            </div>

            {/* Form */}
            <form className="md:space-y-6">
              <div>
                <label className="block text-green-900 font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 focus:outline-none shadow-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-green-900 font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 focus:outline-none shadow-sm transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-green-900 font-semibold mb-2">
                    Tickets
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder="e.g. 2"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 focus:outline-none shadow-sm transition-all"
                  />
                </div>
                <div>
                  <label className="block text-green-900 font-semibold mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 focus:outline-none shadow-sm transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-4 bg-gradient-to-r from-green-800 to-emerald-900 text-white text-lg font-bold rounded-xl shadow-lg hover:from-green-900 hover:to-emerald-800 transform hover:-translate-y-1 transition-all duration-300"
              >
                Confirm Purchase
              </button>
            </form>
          </div>
        </div>
    
    </div>
  )
}

export default Model
