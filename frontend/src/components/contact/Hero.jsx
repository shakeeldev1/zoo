import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaPaw,
  FaTicketAlt,
  FaCalendarAlt,
  FaArrowRight,
  FaLeaf,
  FaUser,
} from "react-icons/fa";

export default function Hero() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <section
      className="relative min-h-screen w-full flex items-center justify-center text-center text-white px-6 overflow-hidden pt-12"
      style={{
        backgroundImage: "url('./contact/hero1.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1B4332]/40 via-[#1B4332]/50 to-[#081C15]/40"></div>

      {/* Pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0zMCAzMGEyMCAyMCAwIDExLTQwIDAgMjAgMjAgMCAwMTQwIDB6IiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIGZpbGw9Im5vbmUiLz48L3N2Zz4=')] opacity-30 mix-blend-soft-light"></div>

      {/* Animated floating elements */}
      <div
        className="hidden md:block absolute top-22 left-10 opacity-20"
        data-aos="fade-down-right"
        data-aos-delay="800"
      >
        <FaPaw className="text-5xl text-yellow-400 animate-pulse" />
      </div>
      <div
        className="hidden md:block absolute bottom-20 right-10 opacity-20"
        data-aos="fade-up-left"
        data-aos-delay="900"
      >
        <FaPaw className="text-5xl text-yellow-400 animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-4 mt-16">
        {/* Main heading */}
        <h1
          className="text-3xl md:text-7xl font-bold leading-tight tracking-tight mb-2"
          data-aos="fade-up"
          style={{
            textShadow: "0 4px 12px rgba(0,0,0,0.4)",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Welcome to{" "}
          <span className="relative inline-block">
            <span className="text-[#F2EDE9] relative z-10">Wildlife Zoo</span>
          </span>
        </h1>

        {/* Separator */}
        <div
          className="w-25 sm:w-32 h-1.5 bg-gradient-to-r from-[#1B4332] via-[#2D6A4F] to-[#1B4332] mx-auto my-8 rounded-full"
          data-aos="fade-down"
          data-aos-delay="100"
        ></div>

        {/* Paragraph */}
        <p
          className="mt-3 text-lg md:text-2xl text-[#F2EDE9] leading-relaxed max-w-2xl mx-auto"
          data-aos="zoom-in-down"
          data-aos-delay="200"
        >
          Discover exotic animals, learn about conservation, and experience the
          beauty of wildlife up close.{" "}
          <span className="font-semibold text-[#95D5B2] bg-gradient-to-r from-[#2D6A4F]/30 to-[#1B4332]/10 px-2 py-1 rounded-md inline-flex items-center">
            Adventure awaits you!
            <FaPaw className="ml-2 text-yellow-400" />
          </span>
        </p>

        {/* Buttons */}
        <div
          className="mt-8 flex flex-row flex-wrap justify-center gap-4 sm:gap-6 items-center"
          data-aos="zoom-out-up"
          data-aos-delay="400"
        >
          {/* Primary Button */}
          <button
            type="button"
            className="relative bg-green-900 hover:bg-green-950 text-white px-6 py-3 sm:px-5 sm:py-4 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden flex items-center"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#154b33] to-[rgb(27,67,50)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 whitespace-nowrap flex items-center">
              <FaTicketAlt className="mr-2 sm:mr-3 transform group-hover:scale-110 transition-transform duration-300" />
              Explore Animal
            </span>
            <FaArrowRight className="ml-2 sm:ml-3 relative z-10 transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
          </button>

          {/* Secondary Button */}
          <button
            type="button"
            className="relative border-2 border-[#F2EDE9] text-white px-6 py-3 sm:px-5 sm:py-4 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-300 group overflow-hidden flex items-center"
          >
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 whitespace-nowrap flex items-center">
              <FaCalendarAlt className="mr-2 sm:mr-3 transform group-hover:scale-110 transition-transform duration-300" />
              Plan Your Visit
            </span>
            <FaArrowRight className="ml-2 sm:ml-3 relative z-10 transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
          </button>
        </div>

        {/* Stats */}
        <div className="mt-10 pb-5 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              number: "200+",
              label: "Animal Species",
              icon: FaPaw,
              delay: 600,
            },
            {
              number: "50+",
              label: "Conservation Programs",
              icon: FaLeaf,
              delay: 800,
            },
            {
              number: "1M+",
              label: "Visitors Yearly",
              icon: FaUser,
              delay: 1000,
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-[#1B4332]/50 to-[#081C15]/40 p-6 rounded-2xl backdrop-blur-md border border-[#2D6A4F]/60 transition-all duration-500 group shadow-lg hover:shadow-xl group-hover:scale-105 group-hover:border-yellow-400"
              data-aos="fade-up"
              data-aos-delay={stat.delay}
            >
              <div className="absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-r 
                          from-yellow-400/40 to-green-400/40 opacity-0 
                          group-hover:opacity-100 transition duration-500" />
                           <div
                className="flex justify-center mb-2"
                data-aos="zoom-in"
                data-aos-delay={stat.delay + 200}
              >
                <stat.icon className="text-4xl text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div
                className="text-4xl font-bold text-yellow-400 group-hover:scale-110 transition-transform duration-300 text-center"
                data-aos="zoom-in"
                data-aos-delay={stat.delay + 300}
              >
                {stat.number}
              </div>
              <div
                className="text-[#F2EDE9] mt-3 text-lg group-hover:text-white transition-colors duration-300 text-center"
                data-aos="fade-in"
                data-aos-delay={stat.delay + 400}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}