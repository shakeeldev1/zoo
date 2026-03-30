// src/components/Event/EventsCards.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import lion from "../../assets/EventsImages/lion.jpg";
import penguin3 from "../../assets/EventsImages/penguin3.avif";
import funfair from "../../assets/EventsImages/funfair.jpg";
import giraffe from "../../assets/EventsImages/giraffe.jpg";
import Model from "../common/Model";
import birdWatching from "../../assets/EventsImages/birdWatching.webp"
import train from "../../assets/EventsImages/train.jpg"
import museum from "../../assets/EventsImages/museum.jpg"
import baladna from "../../assets/EventsImages/baladna.jpg"
import panda from "../../assets/EventsImages/panda.webp"


export default function EventsCards() {

  const upcomingEvent = {
    title: "Zoo Funfair & Carnival",
    subTitle: "2025",
    desc: "Join us for a full day of fun rides, animal shows, food stalls, and live performances!",
    date: "2025-10-05T10:00:00",
  };


  const [isOpen, setIsOpen] = useState(false);

  //events data
  const allEvents = [
    {
      id: 1,
      title: "Penguin Feeding Show",
      subTitle: "Live Performance",
      desc: "Watch adorable penguins being fed by our zookeepers. Fun for all ages!",
      date: "Sep 15, 2025",
      category: "Shows",
      image: penguin3,
    },

    {
      id: 2,
      title: "Lion Roar Experience",
      subTitle: "Close-Up Adventure",
      desc: "Get close to the King of the Jungle in a safe, thrilling environment.",
      date: "Sep 20, 2025",
      category: "Animal Encounters",
      image: lion,
    },
    {
      id: 3,
      title: "Giraffe Meet & Greet",
      subTitle: "Family Fun",
      desc: "Feed and interact with our friendly giraffes. A perfect photo opportunity!",
      date: "Sep 25, 2025",
      category: "Animal Encounters",
      image: giraffe,
    },
    {
      id: 5,
      title: "Aviary Bird Watching",
      subTitle: "Al Khor Park",
      desc: "Explore an expansive aviary featuring peacocks, lovebirds, flamingos, parrots, and geese—a birdwatcher’s paradise!",
      date: "Oct 10, 2025",
      category: "Animal Encounters",
      image: birdWatching,
    },
    {
      id: 9,
      title: "Panda House Visit",
      subTitle: "Special Exhibit",
      desc: "Meet Suhail & Thuraya, Qatar’s first giant pandas at Al Khor—an exclusive and unforgettable experience.",
      date: "Oct 25, 2025",
      category: "Animal Encounters",
      image: panda,
    },

    {
      id: 4,
      title: "Zoo Funfair & Carnival ",
      subTitle: "Stalls, Rides & Games",
      desc: "A full-day festival with food stalls, rides, live music, and clowns!",
      date: "Oct 5, 2025",
      category: "Carnivals",
      image: funfair,
    },
    {
      id: 6,
      title: "Miniature Train Ride",
      subTitle: "Family Fun",
      desc: "Ride through beautiful green landscapes of Al Khor Park & Zoo on a charming mini train—perfect for families.",
      date: "Oct 12, 2025",
      category: "Carnivals",
      image: train,
    },
    {
      id: 7,
      title: "Zoo Museum Tour",
      subTitle: "Educational Exhibit",
      desc: "Tour the on-site museum at Al Khor Park to learn about local wildlife, conservation efforts, and the region’s ecosystem.",
      date: "Oct 15, 2025",
      category: "Carnivals",
      image: '/eventpic/tour.jpeg',
    },
    {
      id: 8,
      title: "Baladna Farm Adventure",
      subTitle: "Animal Farm Experience",
      desc: "Visit Baladna Park to meet cows, emus, wallabies, peacocks, and enjoy activities like ziplining, go-karts, and archery.",
      date: "Oct 20, 2025",
      category: "Carnivals",
      image: baladna,
    },
  ];



  const categories = ["All", "Shows", "Animal Encounters", "Carnivals"];
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredEvents, setFilteredEvents] = useState(allEvents);

  const handleFilter = (category) => {
    setActiveCategory(category);
    setFilteredEvents(category === "All" ? allEvents : allEvents.filter((event) => event.category === category));
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(upcomingEvent.date));

  function calculateTimeLeft(eventDateStr) {
    const eventDate = new Date(eventDateStr);
    const now = new Date();
    const diff = eventDate - now;
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(upcomingEvent.date));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-gradient-to-b from-emerald-50 to-white min-h-screen pb-16">
      {/* 🎨 Upcoming Event Banner */}
      <div className="relative w-full h-[400px] sm:h-[500px] bg-gradient-to-br from-green-900 via-[#026b02] to-[#fdc600de] overflow-hidden flex flex-col justify-center items-center text-center text-white px-3 sm:px-4 shadow-lg"
        style={{
          'background': 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url(/eventpic/event.jpeg)', // Adds a 40% black overlay
          'backgroundSize': 'cover',
          'backgroundPosition': 'center', // Added for better image positioning
        }}>
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4zIj48cGF0aCBkPSJNMzAgMTVjLTguMjg0IDAtMTUgNi43MTYtMTUgMTVzNi43MTYgMTUgMTUgMTUgMTUtNi43MTYgMTUtMTUtNi43MTYtMTUtMTUtMTV6Ii8+PHBhdGggZD0iTTMwIDIwYy01LjUyMyAwLTEwIDQuNDc3LTEwIDEwczQuNDc3IDEwIDEwIDEwIDEwLTQuNDc3IDEwLTEwLTQuNDc3LTEwLTEwLTEweiIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjUiLz48L2c+PC9zdmc+')]"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-2 sm:px-4">
          <span className="inline-block bg-amber-400 text-emerald-900 px-3 py-1 rounded-full text-xs sm:text-sm font-bold mb-2 animate-bounce" data-aos="fade-down">
            UPCOMING EVENT
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold mb-3" data-aos="fade-down">
            {upcomingEvent.title} <span className="text-amber-300">{upcomingEvent.subTitle}</span>
          </h1>
          <p className="text-sm sm:text-lg text-emerald-100 mb-5" data-aos="zoom-in">{upcomingEvent.desc}</p>

          {/* Countdown */}
          <div className="flex justify-center gap-2 sm:gap-4 flex-wrap mb-6" data-aos="fade-up">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="bg-white/15 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg min-w-[60px] sm:min-w-[70px] border border-white/20">
                <p className="text-lg sm:text-2xl font-bold">{value}</p>
                <p className="uppercase text-xs text-amber-100">{unit}</p>
              </div>
            ))}
          </div>

          <button onClick={() => setIsOpen(true)} className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-emerald-900 px-5 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-lg font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl" data-aos="zoom-out">
            Get Tickets Now
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="w-full mx-auto px-2 sm:px-4 mt-4 sm:mt-8 relative z-20 overflow-x-auto">
        <div
          className="rounded-xl p-2 sm:p-4 flex justify-center  gap-2 sm:gap-3 flex-nowrap"
          data-aos="zoom-in"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              className={`px-2 sm:px-4 py-2 sm:py-2 border rounded-full text-[12px] xs:text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 whitespace-nowrap shadow ${activeCategory === cat
                ? "bg-green-900 text-white shadow-md"
                : "bg-transparent text-emerald-900 hover:bg-emerald-200"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>



      <div className="max-w-[1450px] mx-auto px-2 sm:px-3 mt-6 sm:mt-16">
        <h2
          className="text-2xl sm:text-5xl font-bold text-green-800 text-center mb-8 sm:mb-12"
          data-aos="fade-up"
        >
          Our <span className="text-amber-500">Exciting Events</span>
        </h2>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-emerald-700 text-lg">
              No events found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-12">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group border border-emerald-100" data-aos="fade-up"
              >
                {/* Image */}
                <div className="relative h-48 sm:h-60 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3 bg-green-800 text-[#fdc500] px-2 py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase">
                    {event.category}
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="text-amber-300 text-sm font-bold">
                      {event.date}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="py-4 sm:py-5 px-3 sm:px-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-green-900 mb-1 group-hover:text-emerald-700 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-green-600 text-xs sm:text-sm mb-2">
                    {event.subTitle}
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base mb-4">
                    {event.desc}
                  </p>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => setIsOpen(true)}
                      className="bg-gradient-to-r from-[#085D2D] via-[green] to-[#fdc500] hover:bg-emerald-700 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-base font-medium transition-all duration-300 hover:shadow-md flex items-center"
                    >
                      Get Tickets
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 sm:h-4 sm:w-4 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                    <span className="text-xs sm:text-sm text-gray-500 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 sm:h-4 sm:w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      2 hours
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      <Model isOpen={isOpen} onClose={() => setIsOpen(false)}></Model>
    </div>
  );
}
