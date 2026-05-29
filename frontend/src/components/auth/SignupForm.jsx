import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaSpinner,
} from "react-icons/fa";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";

import { useRegisterUserMutation } from "../../redux/api/AuthApi";

export default function SignupForm() {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validationErrors, setValidationErrors] = useState({});

  const navigate = useNavigate();

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (validationErrors[e.target.name]) {
      setValidationErrors(prev => ({ ...prev, [e.target.name]: null }));
    }
  };

  const validate = () => {
    const errors = {};
    
    if (!formData.name || formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }
    
    if (!formData.email) {
      errors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = "Enter valid email address";
      }
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const res = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }).unwrap();

      toast.success(res.message || "Account created successfully! 🎉");

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      toast.error(err?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24 bg-gradient-to-br from-[#f7fff7] to-[#e8f5e9]">

      <div 
        data-aos="zoom-in"
        className="w-full max-w-xl bg-white shadow-2xl rounded-3xl overflow-hidden border border-green-100"
      >

        <div className="bg-gradient-to-r from-[#00633E] to-[#10B981] py-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="w-40 h-40 bg-white rounded-full -top-20 -left-20"></div>
            <div className="w-32 h-32 bg-white rounded-full bottom-0 right-0"></div>
          </div>
          <h1 className="text-white text-3xl font-bold relative z-10">
            Create Account
          </h1>
          <p className="text-green-100 text-sm mt-2 relative z-10">
            Join our zoo management platform
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8">

          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-700">
              Full Name
            </label>
            <div className="relative">
              <FaUser className="absolute left-4 top-4 text-[#00633E]" />
              <input
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full border-2 ${validationErrors.name ? 'border-red-500' : 'border-gray-300 focus:border-[#00633E] focus:ring-2 focus:ring-[#00633E]/20'} outline-none rounded-xl py-3 pl-12 pr-4 transition-all duration-300`}
                disabled={isLoading}
              />
            </div>
            {validationErrors.name && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-4 text-[#00633E]" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full border-2 ${validationErrors.email ? 'border-red-500' : 'border-gray-300 focus:border-[#00633E] focus:ring-2 focus:ring-[#00633E]/20'} outline-none rounded-xl py-3 pl-12 pr-4 transition-all duration-300`}
                disabled={isLoading}
              />
            </div>
            {validationErrors.email && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-700">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-4 top-4 text-[#00633E]" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full border-2 ${validationErrors.password ? 'border-red-500' : 'border-gray-300 focus:border-[#00633E] focus:ring-2 focus:ring-[#00633E]/20'} outline-none rounded-xl py-3 pl-12 pr-12 transition-all duration-300`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-[#00633E] hover:text-[#004f2f] transition-colors"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {validationErrors.password && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.password}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-4 top-4 text-[#00633E]" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full border-2 ${validationErrors.confirmPassword ? 'border-red-500' : 'border-gray-300 focus:border-[#00633E] focus:ring-2 focus:ring-[#00633E]/20'} outline-none rounded-xl py-3 pl-12 pr-12 transition-all duration-300`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-4 text-[#00633E] hover:text-[#004f2f] transition-colors"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {validationErrors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#00633E] to-[#10B981] hover:scale-[1.02] transition-all duration-300 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>

          <div className="mt-6 text-center">
            <span className="text-gray-600">Already have an account?</span>
            <Link to="/login" className="text-[#00633E] font-semibold ml-2 hover:underline">
              Login
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
}