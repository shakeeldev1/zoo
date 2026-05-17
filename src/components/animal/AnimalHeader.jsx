import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function AnimalHeader() {

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });
  }, []);

  return (

    <div className="w-full bg-gradient-to-r from-[#00633E] to-[#014d31] overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div data-aos="fade-right">

            <div className="inline-block bg-[#F8BE00] text-[#00633E] px-5 py-2 rounded-full font-semibold shadow-lg mb-6">
              Trusted Animal Marketplace
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">

              Buy & Sell Healthy
              <span className="text-[#F8BE00]">
                {" "}Animals
              </span>
              {" "}With Confidence
            </h1>

            <p className="text-gray-200 text-lg mt-6 leading-8 max-w-xl">

              Discover premium quality animals from trusted sellers.
              Secure deals, verified listings, and smooth communication
              all in one powerful platform.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">

              <button className="bg-[#F8BE00] hover:bg-yellow-400 text-[#00633E] font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-xl hover:scale-105">

                Explore Animals

              </button>

              <button className="border-2 border-white text-white hover:bg-white hover:text-[#00633E] font-semibold px-8 py-4 rounded-xl transition-all duration-300">

                Sell Your Animal

              </button>

            </div>

            {/* STATS */}
            <div className="flex flex-wrap gap-10 mt-12">

              <div>
                <h2 className="text-3xl font-bold text-[#F8BE00]">
                  500+
                </h2>

                <p className="text-gray-200 mt-1">
                  Active Listings
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-[#F8BE00]">
                  1K+
                </h2>

                <p className="text-gray-200 mt-1">
                  Trusted Users
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-[#F8BE00]">
                  24/7
                </h2>

                <p className="text-gray-200 mt-1">
                  Support
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT IMAGE */}
          <div
            className="relative flex justify-center"
            data-aos="fade-left"
          >

            {/* BACKGROUND CIRCLE */}
            <div className="absolute w-[320px] h-[320px] md:w-[450px] md:h-[450px] bg-[#F8BE00] rounded-full blur-3xl opacity-20"></div>

            {/* IMAGE CARD */}
            <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-[40px] p-5 shadow-2xl">

              <img
                src="https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=1200&auto=format&fit=crop"
                alt="Animal"
                className="w-full max-w-lg h-[500px] object-cover rounded-[30px]"
              />

              {/* FLOATING CARD */}
              <div className="absolute -bottom-8 -left-6 bg-white p-5 rounded-2xl shadow-2xl">

                <h3 className="text-[#00633E] text-2xl font-bold">
                  Premium Breeds
                </h3>

                <p className="text-gray-600 mt-2">
                  Verified healthy animals
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AnimalHeader;