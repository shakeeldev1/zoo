import React, { useState, useEffect } from "react";
import Model from "../common/Model";
import { Link, NavLink } from "react-router-dom";
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

  const { isLogin, logoutUser } =
    useAppContext();

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
                    {/* LOGOUT */}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 whitespace-nowrap rounded-xl bg-red-600 px-5 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-red-700"
                    >
                      <FaSignOutAlt className="text-xl" />
                      Logout
                    </button>
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
                  {/* WELCOME */}
                  <div className="flex items-center justify-center gap-2 rounded-xl bg-white/10 py-2 text-white">

                    <FaUser className="text-sm" />

                    <span className="text-sm font-medium">
                      Welcome!
                    </span>

                  </div>

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