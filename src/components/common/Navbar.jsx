import React, { useState, useEffect } from "react";
import Model from "../common/Model";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaPaw,
  FaShoppingCart,
  FaTimes,
  FaBars,
  FaTicketAlt,
} from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
import { HiOutlineUserAdd } from "react-icons/hi";
import AOS from "aos";
import "aos/dist/aos.css";

const Navbar = ({ openCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const cartCount = useSelector((state) =>
    state.cart.cartItems.reduce(
      (sum, item) => sum + item.cartQuantity,
      0
    )
  );

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    {name:"Buy-Animal", path:"/buyanimal"},
    { name: "Events", path: "/events" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#0f172a] via-[#14532d] to-[#064e3b] backdrop-blur-lg shadow-2xl border-b border-white/10">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[78px]">

            <Model
              isOpen={showModal}
              onClose={() => setShowModal(false)}
            />

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 group flex-shrink-0"
            >
          
            </Link>
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-2">

              {/* Nav Links */}
              <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full px-3 py-2 border border-white/10 shadow-inner">
                {navItems.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.path}
                    className={({ isActive }) =>
                      `relative px-5 py-2 rounded-full text-[16px] font-semibold whitespace-nowrap transition-all duration-300
                      ${
                        isActive
                          ? "bg-yellow-400 text-green-950 shadow-lg"
                          : "text-white hover:bg-white/10 hover:text-yellow-300"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>

              {/* Right Buttons */}
              <div className="flex items-center gap-3 ml-4">

                {/* Ticket Button */}
                <Link
                  to="/tickets"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 border border-white/10 text-white font-semibold hover:bg-yellow-400 hover:text-green-950 transition-all duration-300 hover:-translate-y-1 shadow-lg whitespace-nowrap">
                  <FaTicketAlt className="text-lg" />
                  Tickets
                </Link>

                {/* Cart Button */}
                <button
                  onClick={openCart}
                  className="relative flex items-center gap-2 px-5 py-3 rounded-xl bg-yellow-400 text-green-950 font-bold hover:bg-yellow-300 transition-all duration-300 hover:-translate-y-1 shadow-xl whitespace-nowrap"
                >
                  <FaShoppingCart className="text-lg" />
                  Cart

                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-[26px] h-[26px] px-2 rounded-full bg-red-600 text-white text-xs font-bold border-2 border-white shadow-md">
                      {cartCount}
                    </span>
                  )}
                </button>

                {/* Login */}
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-green-900 font-semibold hover:bg-gray-100 transition-all duration-300 hover:-translate-y-1 shadow-lg whitespace-nowrap"
                >
                  <IoMdLogIn className="text-xl" />
                  Login
                </Link>

                {/* Signup */}
                <Link
                  to="/signup"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FDC700] text-black font-bold hover:bg-[#EAA500] transition-all duration-300 hover:-translate-y-1 shadow-xl whitespace-nowrap"
                >
                  <HiOutlineUserAdd className="text-xl" />
                  Sign Up
                </Link>

              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
              >
                {isOpen ? (
                  <FaTimes className="text-xl" />
                ) : (
                  <FaBars className="text-xl" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            isOpen
              ? "max-h-[700px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-5 pb-6 pt-2 bg-gradient-to-b from-[#14532d] to-[#052e16] border-t border-white/10">

            {/* Mobile Links */}
            <div className="flex flex-col gap-3">
              {navItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `text-center py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap
                    ${
                      isActive
                        ? "bg-yellow-400 text-green-950"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* Mobile Buttons */}
            <div className="mt-5 flex flex-col gap-3">

              {/* Tickets */}
              <Link
                to="/tickets"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-yellow-400 hover:text-green-950 transition-all duration-300"
              >
                <FaTicketAlt />
                Tickets
              </Link>

              {/* Cart */}
              <button
                onClick={() => {
                  openCart();
                  setIsOpen(false);
                }}
                className="relative flex items-center justify-center gap-2 py-3 rounded-xl bg-yellow-400 text-green-950 font-bold hover:bg-yellow-300 transition-all duration-300"
              >
                <FaShoppingCart />
                Cart

                {cartCount > 0 && (
                  <span className="absolute right-4 flex items-center justify-center min-w-[24px] h-[24px] px-2 rounded-full bg-red-600 text-white text-xs font-bold">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Login */}
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-green-900 font-semibold hover:bg-gray-100 transition-all duration-300"
              >
                <IoMdLogIn />
                Login
              </Link>

              {/* Signup */}
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold hover:from-emerald-400 hover:to-green-500 transition-all duration-300"
              >
                <HiOutlineUserAdd />
                Sign Up
              </Link>

            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;