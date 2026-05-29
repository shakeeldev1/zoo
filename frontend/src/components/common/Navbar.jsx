import React, { useState, useEffect, useRef } from "react";
import Model from "../common/Model";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  FaShoppingCart,
  FaTimes,
  FaBars,
  FaTicketAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";

import { IoMdLogIn } from "react-icons/io";
import { HiOutlineUserAdd } from "react-icons/hi";

import AOS from "aos";
import "aos/dist/aos.css";

import { useAppContext } from "../../context/ContextApi";

const Navbar = ({ openCart, openTicketCart }) => {

  const [isOpen, setIsOpen] = useState(false);

  const [showModal, setShowModal] =
    useState(false);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '' });
  const profileDropdownRef = useRef(null);

  const { isLogin, logoutUser } =
    useAppContext();

  const navigate = useNavigate();

  // ================= AOS =================
  useEffect(() => {

    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });

  }, []);

  // ================= CART COUNT =================
  const cartCount = useSelector((state) =>
    state.cart.cartItems.reduce(
      (sum, item) =>
        sum + item.cartQuantity,
      0
    )
  );

  // ================= NAV ITEMS =================
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },

    ...(isLogin
      ? [
          {
            name: "Buy-Animal",
            path: "/buyanimal",
          },
          {
            name: "Buy-Ticket",
            path: "/buyticket",
          },
        ]

      : []),

    { name: "Events", path: "/events" },
    { name: "Contact", path: "/contact" },
  ];

  // ================= LOGOUT =================
  const handleLogout = () => {

    logoutUser();
    setIsOpen(false);

  };

  // ================= PROFILE HANDLERS =================
  const handleProfileClick = () => {
    navigate("/profile");
    setIsProfileOpen(false);
  };

  // ================= GET INITIALS =================
  const getInitials = (name) => {
    if (!name) return 'A'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  // ================= CLOSE DROPDOWN ON OUTSIDE CLICK =================
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target)) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // ================= LOAD USER DATA =================
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser))
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, [isLogin])

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-gradient-to-r from-[#0f172a] via-[#14532d] to-[#064e3b] shadow-2xl backdrop-blur-lg">

        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">

          <div className="flex h-[78px] items-center justify-between">

            {/* ================= MODAL ================= */}
            <Model
              isOpen={showModal}
              onClose={() =>
                setShowModal(false)
              }
            />

            {/* ================= LOGO ================= */}
            <Link
              to="/"
              className="group flex flex-shrink-0 items-center gap-3"
            >
              {/* Add Logo Here */}
            </Link>

            {/* ================= DESKTOP MENU ================= */}
            <div className="hidden items-center gap-2 lg:flex">

              {/* ================= NAV LINKS ================= */}
              <div className="flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-2 shadow-inner backdrop-blur-md">

                {navItems.map(
                  (item, index) => (
                    <NavLink
                      key={index}
                      to={item.path}
                      className={({
                        isActive,
                      }) =>
                        `relative whitespace-nowrap rounded-full px-5 py-2 text-[16px] font-semibold transition-all duration-300
                        ${
                          isActive
                            ? "bg-yellow-400 text-green-950 shadow-lg"
                            : "text-white hover:bg-white/10 hover:text-yellow-300"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  )
                )}
              </div>

              {/* ================= RIGHT BUTTONS ================= */}
              <div className="ml-4 flex items-center gap-3">

                {/* ================= TICKET CART BUTTON ================= */}
                {isLogin && (
                  <button
                    onClick={openTicketCart}
                    className="relative flex items-center gap-2 whitespace-nowrap rounded-xl border border-white/10 bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-3 font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:from-indigo-400 hover:to-purple-500"
                  >
                    <FaTicketAlt className="text-lg" />
                    Ticket Cart
                  </button>
                )}

                {/* ================= CART BUTTON ================= */}
                <button
                  onClick={openCart}
                  className="relative flex items-center gap-2 whitespace-nowrap rounded-xl bg-yellow-400 px-5 py-3 font-bold text-green-950 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-300"
                >

                  <FaShoppingCart className="text-lg" />

                  Cart

                  {cartCount > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-[26px] min-w-[26px] items-center justify-center rounded-full border-2 border-white bg-red-600 px-2 text-xs font-bold text-white shadow-md">
                      {cartCount}
                    </span>
                  )}
                </button>

                {/* ================= AUTH BUTTONS ================= */}
                {!isLogin ? (
                  <>
                    {/* LOGIN */}
                    <Link
                      to="/login"
                      className="flex items-center gap-2 whitespace-nowrap rounded-xl bg-white px-5 py-3 font-semibold text-green-900 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-gray-100"
                    >
                      <IoMdLogIn className="text-xl" />
                      Login
                    </Link>

                    {/* SIGNUP */}
                    <Link
                      to="/signup"
                      className="flex items-center gap-2 whitespace-nowrap rounded-xl bg-[#FDC700] px-5 py-3 font-bold text-black shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#EAA500]"
                    >
                      <HiOutlineUserAdd className="text-xl" />
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <>
                    {/* PROFILE DROPDOWN */}
                    <div className="relative" ref={profileDropdownRef}>
                      <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-2 whitespace-nowrap rounded-xl bg-white/10 px-3 py-2 text-white transition-all duration-300 hover:bg-white/20"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-green-600 flex items-center justify-center text-white font-bold text-xs">
                          {getInitials(userData?.name)}
                        </div>
                        <span className="hidden sm:inline-block text-sm font-medium">
                          {userData?.name?.split(' ')[0] || 'User'}
                        </span>
                      </button>

                      {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 overflow-hidden">
                          <div className="px-4 py-3 border-b border-gray-100">
                            <p className="text-sm font-semibold text-gray-800">{userData?.name}</p>
                            <p className="text-xs text-gray-500">{userData?.email}</p>
                          </div>
                          
                          <button
                            onClick={handleProfileClick}
                            className="w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 text-gray-700 font-medium"
                          >
                            <FaUser className="text-[#00633E]" />
                            My Profile
                          </button>
                          
                          <hr className="my-1" />
                          
                          <button
                            onClick={handleLogout}
                            className="w-full px-4 py-2.5 text-left hover:bg-red-50 transition-colors flex items-center gap-3 text-red-600 font-medium"
                          >
                            <FaSignOutAlt className="text-red-600" />
                            Logout
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* ================= MOBILE BUTTON ================= */}
            <div className="lg:hidden">

              <button
                onClick={() =>
                  setIsOpen(!isOpen)
                }
                className="rounded-xl bg-white/10 p-3 text-white transition-all duration-300 hover:bg-white/20"
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

        {/* ================= MOBILE MENU ================= */}
        <div
          className={`overflow-hidden transition-all duration-500 lg:hidden
          ${
            isOpen
              ? "max-h-[700px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >

          <div className="border-t border-white/10 bg-gradient-to-b from-[#14532d] to-[#052e16] px-5 pb-6 pt-2">

            {/* ================= MOBILE LINKS ================= */}
            <div className="flex flex-col gap-3">

              {navItems.map(
                (item, index) => (
                  <NavLink
                    key={index}
                    to={item.path}
                    onClick={() =>
                      setIsOpen(false)
                    }
                    className={({
                      isActive,
                    }) =>
                      `whitespace-nowrap rounded-xl py-3 text-center font-semibold transition-all duration-300
                      ${
                        isActive
                          ? "bg-yellow-400 text-green-950"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                )
              )}
            </div>

            {/* ================= MOBILE BUTTONS ================= */}
            <div className="mt-5 flex flex-col gap-3">

              {/* ================= TICKET CART ================= */}
              {isLogin && (
                <button
                  onClick={() => {
                    openTicketCart();
                    setIsOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3 font-bold text-white transition-all duration-300 hover:from-indigo-400 hover:to-purple-500"
                >
                  <FaTicketAlt />
                  Ticket Cart
                </button>
              )}

              {/* ================= CART ================= */}
              <button
                onClick={() => {
                  openCart();
                  setIsOpen(false);
                }}
                className="relative flex items-center justify-center gap-2 rounded-xl bg-yellow-400 py-3 font-bold text-green-950 transition-all duration-300 hover:bg-yellow-300"
              >

                <FaShoppingCart />

                Cart

                {cartCount > 0 && (
                  <span className="absolute right-4 flex h-[24px] min-w-[24px] items-center justify-center rounded-full bg-red-600 px-2 text-xs font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* ================= AUTH ================= */}
              {!isLogin ? (
                <>
                  {/* LOGIN */}
                  <Link
                    to="/login"
                    onClick={() =>
                      setIsOpen(false)
                    }
                    className="flex items-center justify-center gap-2 rounded-xl bg-white py-3 font-semibold text-green-900 transition-all duration-300 hover:bg-gray-100"
                  >
                    <IoMdLogIn />
                    Login
                  </Link>

                  {/* SIGNUP */}
                  <Link
                    to="/signup"
                    onClick={() =>
                      setIsOpen(false)
                    }
                    className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 py-3 font-bold text-white transition-all duration-300 hover:from-emerald-400 hover:to-green-500"
                  >
                    <HiOutlineUserAdd />
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  {/* PROFILE */}
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 rounded-xl bg-white/10 py-2 text-white"
                  >
                    <FaUser className="text-sm" />
                    My Profile
                  </button>

                  {/* LOGOUT */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold text-white transition-all duration-300 hover:bg-red-700"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;