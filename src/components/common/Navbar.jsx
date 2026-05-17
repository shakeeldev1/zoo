import React, { useState, useEffect } from "react";
import Model from "../common/Model";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaPaw, FaShoppingCart, FaTimes, FaBars, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
import AOS from "aos";
import "aos/dist/aos.css";

const Navbar = ({ openCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isLanguageHovered, setIsLanguageHovered] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const cartCount = useSelector((state) =>
    state.cart.cartItems.reduce((sum, item) => sum + item.cartQuantity, 0)
  );

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Events", path: "/events" },
    { name: "Buy Animal", path: "/buyanimal" },
    { name: "Contact", path: "/contact" },
  ];

  const languages = [
    { code: "en", name: "English" },
    { code: "ar", name: "Arabic" }
  ];

  const handleLanguageChange = (languageCode) => {
    // Implement language change logic here
    console.log(`Language changed to: ${languageCode}`);
    setIsLanguageDropdownOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-gradient-to-r from-green-800 to-emerald-800 py-1 shadow-md">
        <div className="max-w-8xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Model isOpen={showModal}  onClose={()=>setShowModal(false)}/>
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center transform hover:scale-105 transition-transform duration-300"
            >
              <div className="bg-gradient-to-r from-emerald-600 to-green-700 p-2 rounded-lg mr-3 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <FaPaw className="h-7 w-7 text-white" />
              </div>
              <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-500">
                City Zoo
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-3">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className="relative px-4 py-2 rounded-md text-sm font-medium text-white group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-yellow-400 rounded-md transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out"></div>
                    <span className="relative text-[18px] z-10 group-hover:text-green-900 transition-colors duration-300">
                      {item.name}
                    </span>
                  </Link>
                ))}
                
                {/* Language Selector */}
                <div 
                  className="relative"
                  onMouseEnter={() => {
                    setIsLanguageHovered(true);
                    setIsLanguageDropdownOpen(true);
                  }}
                  onMouseLeave={() => {
                    setIsLanguageHovered(false);
                    setIsLanguageDropdownOpen(false);
                  }}
                >
                  <button className="flex items-center px-4 py-2 rounded-md text-sm font-medium text-white group overflow-hidden relative">
                    <div className="absolute inset-0 bg-yellow-400 rounded-md transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out"></div>
                    <span className="relative text-[18px] z-10 group-hover:text-green-900 transition-colors duration-300 flex items-center">
                      Languages
                      {/* Show different icon based on hover state */}
                      {isLanguageHovered ? (
                        <FaChevronUp className="ml-2 text-sm" />
                      ) : (
                        <FaChevronDown className="ml-2 text-sm" />
                      )}
                    </span>
                  </button>
                  
                  {/* Language Dropdown */}
                  {isLanguageDropdownOpen && (
                    <div className="absolute left-0 mt-1.5 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      {languages.map((language) => (
                        <button
                          key={language.code}
                          onClick={() => handleLanguageChange(language.code)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-100 hover:text-green-900 transition-colors duration-200"
                        >
                          {language.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <Link
                to="/buyanimal"
                className="flex items-center text-[18px] px-4 py-2 bg-white text-green-700 font-medium rounded-md shadow hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                Buy Animals
              </Link>
              <button
                onClick={openCart}
                className="relative flex items-center text-[18px] px-4 py-2 bg-yellow-400 text-green-900 font-semibold rounded-md shadow-md hover:bg-yellow-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                <FaShoppingCart className="mr-2 text-[18px]" />
                Cart
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 inline-flex h-6 min-w-[24px] items-center justify-center rounded-full bg-red-600 px-2 text-sm font-semibold text-white">
                    {cartCount}
                  </span>
                )}
              </button>
              <Link
                to="/login"
                className="flex items-center text-[18px] px-4 py-2 bg-white text-green-700 font-medium rounded-md shadow hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                <IoMdLogIn className="mr-2 text-[18px] transform group-hover:scale-110 transition-transform duration-300" />
                Login
              </Link>
            </div>

            {/* Mobile Menu */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-green-800 focus:outline-none transition-colors duration-300"
              >
                {isOpen ? (
                  <FaTimes className="h-6 w-6" />
                ) : (
                  <FaBars className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out  ${
            isOpen
              ? "max-h-[80vh] opacity-100 visible"
              : "max-h-0 opacity-0 invisible"
          } bg-gradient-to-b from-green-700 to-emerald-800 shadow-xl`}
        >
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="block px-3 py-3 text-center rounded-md text-base font-medium text-white hover:bg-green-800 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Language Options for Mobile */}
            <div className="px-3 py-3 text-center">
              <div className="text-white font-medium mb-2">Languages</div>
              <div className="flex justify-center space-x-4">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => {
                      handleLanguageChange(language.code);
                      setIsOpen(false);
                    }}
                    className="px-4 py-2 bg-white text-green-700 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors duration-300"
                  >
                    {language.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="pt-4 border-t border-green-600 mt-2 space-y-3">
              <Link
                to="/buyanimal"
                className="block px-4 py-3 bg-white text-green-700 font-medium rounded-md shadow hover:bg-gray-100 transition-colors duration-300 text-center"
                onClick={() => setIsOpen(false)}
              >
                Buy Animals
              </Link>
              <button
                onClick={() => {
                  setIsOpen(false);
                  openCart();
                }}
                className="w-full px-4 py-3 bg-yellow-400 text-green-900 font-semibold rounded-md shadow hover:bg-yellow-500 transition-colors duration-300"
              >
                <FaShoppingCart className="inline mr-2" /> Cart
                {cartCount > 0 && (
                  <span className="ml-2 inline-flex h-6 min-w-[24px] items-center justify-center rounded-full bg-red-600 px-2 text-sm font-semibold text-white">
                    {cartCount}
                  </span>
                )}
              </button>
              <Link
                to="/login"
                className="flex items-center justify-center px-4 py-3 bg-white text-green-700 font-medium rounded-md shadow hover:bg-gray-100 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                <IoMdLogIn className="mr-2" /> Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      
    </>
  );
};

export default Navbar;