import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 py-22 "
    >
      {/* Card */}
      <div className="w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden border border-gray-900">
        
        {/* Header */}
        <div className="bg-green-100 py-6 px-4 sm:px-8 text-center">
          <h1
            className="text-gray-900 font- text-2xl sm:text-3xl font-bold"
            data-aos="zoom-out-up"
          >
            Create Hope Today
          </h1>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8">
          
          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-gray-900 font-semibold mb-2" data-aos="zoom-in-up">
              Full Name
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900" size={18} />
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full pl-10 pr-4 py-2 border border-gray-900 rounded-lg focus:ring-1 focus:ring-[#494c52] transition-all duration-200 outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-900 font-semibold mb-2" data-aos="zoom-in-up">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900" size={18} />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-2 border border-gray-900 rounded-lg focus:ring-1 focus:ring-[#494c52] transition-all duration-200 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-900 font-semibold mb-2" data-aos="zoom-in-up">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full pl-10 pr-10 py-2 border border-gray-900 outline-none rounded-lg focus:ring-1 focus:ring-[#494c52] transition-all duration-200"
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

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-gray-900 font-semibold mb-2" data-aos="zoom-in-up">
              Confirm Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900" size={18} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="w-full pl-10 pr-10 py-2 border border-gray-900 outline-none rounded-lg focus:ring-1 focus:ring-[#494c52] transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-700"
              >
                {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>

          {/* Signup Button */}
          <button className="w-full bg-gradient-to-r from-green-700 to-green-800 text-white font-bold py-2 px-4 rounded transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            Sign Up
          </button>

          {/* Login Link */}
          <div className="mt-6 text-center text-gray-900">
            <span>Already have an account? </span>
            <a
              href="/login"
              className="text-green-700 hover:underline font-medium"
            >
              Login
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
