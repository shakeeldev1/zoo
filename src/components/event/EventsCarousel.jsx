// src/components/Event/EventsCarousel.jsx
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Model from "../common/Model";

import penguin3 from "../../assets/EventsImages/penguin3.avif";
import lion from "../../assets/EventsImages/lion.jpg";
import giraffe from "../../assets/EventsImages/giraffe.jpg";
import funfair from "../../assets/EventsImages/funfair.jpg";

const events = [
    {
        id: 1,
        title: "Penguin Feeding Show",
        subTitle: "Live Performance",
        desc: "Watch adorable penguins being fed by our zookeepers. Fun for all ages!",
        date: "Sep 15, 2025",
        image: penguin3,
    },
    {
        id: 2,
        title: "Lion Roar Experience",
        subTitle: "Close-Up Adventure",
        desc: "Get close to the King of the Jungle in a safe, thrilling environment.",
        date: "Sep 20, 2025",
        image: lion,
    },
    {
        id: 3,
        title: "Giraffe Meet & Greet",
        subTitle: "Family Fun",
        desc: "Feed and interact with our friendly giraffes. A perfect photo opportunity!",
        date: "Sep 25, 2025",
        image: giraffe,
    },
    {
        id: 4,
        title: "Zoo Funfair & Carnival",
        subTitle: "Stalls, Rides & Games",
        desc: "A full-day festival with food stalls, rides, live music, and clowns!",
        date: "Oct 5, 2025",
        image: funfair,
    },
];

export default function EventsCarousel() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full mb-4">
            <Swiper
                modules={[Autoplay, Pagination, Scrollbar, A11y]}
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 6000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                className="w-full"
            >
                {events.map((event) => (
                    <SwiperSlide key={event.id}>
                        <div className="relative h-[400px] md:h-[600px] ">
                            <img
                                src={event.image}
                                alt="Event"
                                className="w-full h-full object-cover"
                            />

                            {/* Overlay */}
                            <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex flex-col justify-center items-center text-white text-center px-4">
                                <h1
                                    className="text-2xl sm:pt-10 sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3"
                                    data-aos="fade-down"
                                >
                                    {event.title}{" "}
                                    <span className="text-green-600">{event.subTitle}</span>
                                </h1>

                                <p
                                    className="text-sm sm:text-base sm:text-justify md:text-lg lg:text-2xl max-w-[95%] md:max-w-[900px] mb-6 "
                                    data-aos="fade-down"
                                >
                                    {event.desc}
                                </p>

                                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#fdc500] font-semibold mb-5">
                                    {event.date}
                                </p>

                                <div className="flex flex-wrap justify-center gap-3">
                                    <button
                                        onClick={() => setIsOpen(true)}
                                        className="bg-gradient-to-r from-[#085D2D] via-green-600 to-[#fdc500] hover:bg-green-700 px-4 sm:px-5 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base md:text-lg transition-all duration-700 hover:scale-105"
                                    >
                                        Get Tickets
                                    </button>

                                    <Link
                                        to="/contact"
                                        className="border-2 border-white px-4 sm:px-5 py-2 sm:py-3 rounded-full hover:bg-white hover:text-black font-semibold text-sm sm:text-base md:text-lg transition-all duration-700 hover:scale-105"
                                    >
                                        Contact Us
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <Model isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    );
}
