import React, { useEffect } from "react";
import { FaPaw, FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from "react-router-dom";

const Footer = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  const quicklink = [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/about' },
    { name: 'Services', link: '/services' },
    { name: 'Events', link: '/events' }
  ];
  return (
    <footer className="bg-gradient-to-r from-green-800 to-emerald-800 text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-30"></div>

      {/* Main Footer Content */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        {/* Animated paw prints decoration */}
        <div className="absolute -top-4 -left-4 opacity-10" data-aos="fade-right">
          <FaPaw className="h-16 w-16 text-yellow-400 transform rotate-45" />
        </div>
        <div className="absolute -bottom-4 -right-4 opacity-10" data-aos="fade-left">
          <FaPaw className="h-16 w-16 text-yellow-400 transform -rotate-45" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">

          {/* Brand Column */}
          <div className="lg:col-span-1" data-aos="fade-up" data-aos-delay="100">
            <div className="flex items-center mb-6 transform hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-r from-emerald-600 to-green-700 p-2 rounded-lg mr-3 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <FaPaw className="h-7 w-7 text-white" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-400">
                City Zoo
              </span>
            </div>
            <p className="text-green-100 mb-6 leading-relaxed">
              Explore wildlife like never before. Join us in our mission to protect endangered species and provide education about the animal kingdom.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <FaFacebookF size={16} />, color: "hover:bg-blue-600" },
                { icon: <FaTwitter size={16} />, color: "hover:bg-blue-400" },
                { icon: <FaInstagram size={16} />, color: "hover:bg-pink-600" },
                { icon: <FaLinkedin size={16} />, color: "hover:bg-blue-700" }
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="bg-green-600 p-3 rounded-full transition-all duration-300 text-white transform hover:-translate-y-1 shadow-md hover:shadow-lg flex items-center justify-center 
                  group overflow-hidden relative"
                  data-aos="zoom-in"
                  data-aos-delay={200 + (index * 100)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative  z-10 group-hover:scale-110 transition-transform duration-300">
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div data-aos="fade-up" data-aos-delay="200">
            <h4 className="text-lg font-semibold mb-6 text-white relative inline-block after:absolute after:left-0 after:-bottom-2 after:h-1 after:w-10 after:bg-yellow-400 after:rounded-full">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quicklink.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.link}
                    className="text-green-100 hover:text-white transition-all duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div data-aos="fade-up" data-aos-delay="300">
            <h4 className="text-lg font-semibold mb-6 text-white relative inline-block after:absolute after:left-0 after:-bottom-2 after:h-1 after:w-10 after:bg-yellow-400 after:rounded-full">
              Resources
            </h4>
            <ul className="space-y-3">
              {['FAQ', 'Blog & News', 'Volunteer', 'Support Center'].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-green-100 hover:text-white transition-all duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div data-aos="fade-up" data-aos-delay="400">
            <h4 className="text-lg font-semibold mb-6 text-white relative inline-block after:absolute after:left-0 after:-bottom-2 after:h-1 after:w-10 after:bg-yellow-400 after:rounded-full">
              Contact Us
            </h4>
            <ul className="space-y-4 text-green-100">
              <li className="flex items-center group">
                <div className="bg-green-800 p-2 rounded-lg mr-3 group-hover:bg-yellow-400 group-hover:text-green-900 transition-all duration-300">
                  <FaMapMarkerAlt className="text-yellow-400 group-hover:text-green-900 transition-colors duration-300" />
                </div>
                <span className="group-hover:text-white transition-colors duration-300">123 Safari Lane, Animal City</span>
              </li>
              <li className="flex items-center group">
                <div className="bg-green-800 p-2 rounded-lg mr-3 group-hover:bg-yellow-400 group-hover:text-green-900 transition-all duration-300">
                  <FaPhoneAlt className="text-yellow-400 group-hover:text-green-900 transition-colors duration-300" />
                </div>
                <span className="group-hover:text-white transition-colors duration-300">+123 456 7890</span>
              </li>
              <li className="flex items-center group">
                <div className="bg-green-800 p-2 rounded-lg mr-3 group-hover:bg-yellow-400 group-hover:text-green-900 transition-all duration-300">
                  <FaEnvelope className="text-yellow-400 group-hover:text-green-900 transition-colors duration-300" />
                </div>
                <span className="group-hover:text-white transition-colors duration-300">info@zooworld.org</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-600 py-6 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-green-100 text-sm mb-4 md:mb-0" data-aos="">
            © {new Date().getFullYear()} Zoo City. All rights reserved.
          </p>
          <div className="flex space-x-6" data-aos="">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, index) => (
              <a
                key={index}
                href="#"
                className="text-green-100 hover:text-white text-sm transition-all duration-300 relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;