import React from "react";
import { FaPaw, FaUsers, FaCertificate, FaShieldAlt } from "react-icons/fa";
import sheeps from '../../assets/commonimages/sheeps.jpeg'
const ZooFacts = () => {
  const stats = [
    { icon: <FaPaw className="text-[#2EB872] text-5xl mb-3 transition-all duration-500 group-hover:text-white" />, number: 12345, label: "Total Animals" },
    { icon: <FaUsers className="text-[#2EB872] text-5xl mb-3 transition-all duration-500 group-hover:text-white" />, number: 6789, label: "Daily Visitors" },
    { icon: <FaCertificate className="text-[#2EB872] text-5xl mb-3 transition-all duration-500 group-hover:text-white" />, number: 2345, label: "Total Memberships" },
    { icon: <FaShieldAlt className="text-[#2EB872] text-5xl mb-3 transition-all duration-500 group-hover:text-white" />, number: 4567, label: "Save Wildlife" },
  ];

  return (
    <section className="relative">
      {/* Background with black overlay */}
      <div
        className="relative bg-cover bg-center bg-no-repeat py-16"
        style={{ backgroundImage: `url(${sheeps})`}}
      >
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black/75"></div>

        {/* Content */}
        <div className="relative container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {stats.map((state, index) => (
              <div
                key={index}
                className="relative group p-6 flex flex-col items-center justify-center 
                           rounded-xl transition-all duration-500 
                           hover:scale-105 cursor-pointer
            
                           hover:from-green-900 hover:to-[#fdc500]
                           shadow-lg hover:shadow-[0_0_25px_rgba(253,197,0,0.6)]"
                data-aos="zoom-in"
                data-aos-delay={index * 200}
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
              >
                {/* Icon */}
                <div className="flex justify-center">{state.icon}</div>

                {/* Number */}
                <h1 className="text-white text-4xl font-extrabold mt-2 mb-1 transition-all duration-500 group-hover:text-[#fdc500]">
                  {state.number.toLocaleString()}
                </h1>

                {/* Label */}
                <p className="text-gray-300 text-lg font-medium transition-all duration-500 group-hover:text-white">
                  {state.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZooFacts;
