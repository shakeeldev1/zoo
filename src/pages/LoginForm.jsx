import { FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 py-22 ">
      {/* Zoo Card */}
      <div className="w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden border border-gray-900">
        
        {/* Zoo Header */}
        <div className="bg-green-100 py-6 px-4 sm:px-8 text-center">
          <h1
            className="text-gray-900  text-2xl sm:text-3xl font-bold"
            data-aos="zoom-out-up"
          >
            Join The Movement
          </h1>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8">
          {/* Email Field */}
          <div className="mb-4">
            <label
              className="block text-gray-900 font-semibold mb-2"
              data-aos="zoom-in-up"
            >
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900"
                size={18}
              />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-2 border border-gray-900 rounded-lg focus:ring-1 focus:ring-green-600 transition-all duration-200 outline-none"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label
              className="block text-gray-900 font-semibold mb-2"
              data-aos="zoom-in-up"
            >
              Password
            </label>
            <div className="relative">
              <FaLock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900"
                size={18}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full pl-10 pr-10 py-2 border border-gray-900 outline-none rounded-lg focus:ring-1 focus:ring-green-600 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-700"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right mb-6">
            <a
              href="/forgot-password"
              className="text-gray-900 hover:text-green-700 hover:underline text-sm"
            >
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button className="w-full bg-gradient-to-r from-green-700 to-green-800 text-white font-bold py-2 px-4 rounded transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            Login
          </button>

          {/* Signup Link */}
          <div className="mt-6 text-center text-gray-900">
            <span>Don’t have a Zoo Pass? </span>
            <a
              href="/signup"
              className="text-green-700 hover:underline font-medium"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
