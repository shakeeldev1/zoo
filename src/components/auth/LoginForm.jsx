import {
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaArrowLeft,
  FaSpinner,
} from "react-icons/fa";

import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { useAppContext } from "../../context/ContextApi";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  useLoginUserMutation,
  useVerifyOtpMutation,
} from "../../redux/api/AuthApi";

import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { setIsLogin, loginUserWithUser, user } = useAppContext();

  const navigate = useNavigate();

  // ================= STATES =================
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");

  // STEP CONTROL
  const [showOtpModal, setShowOtpModal] = useState(false);

  // API
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const [verifyOtp, { isLoading: otpLoading }] =
    useVerifyOtpMutation();

  // ================= AOS =================
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  // ================= LOGIN =================
  const handleLogin = async () => {
    try {
      // VALIDATION
      if (!email || !password) {
        return toast.error("Please fill all fields");
      }

      // EMAIL VALIDATION
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return toast.error("Please enter a valid email address");
      }

      // PASSWORD VALIDATION
      if (password.length < 6) {
        return toast.error("Password must be at least 6 characters");
      }

      // LOGIN API
      const res = await loginUser({
        email,
        password,
      }).unwrap();

      // SUCCESS MESSAGE
      toast.success(res?.message || "OTP sent successfully to your email");

      // OPEN OTP MODAL (Login form will be hidden behind modal overlay)
      setShowOtpModal(true);
      
      // Clear OTP input for fresh entry
      setOtp("");
      
    } catch (err) {
      toast.error(err?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  // ================= VERIFY OTP =================
  const handleVerifyOtp = async () => {
    try {
      if (!otp) {
        return toast.error("Please enter the verification code");
      }

      // OTP VALIDATION (assuming 6-digit)
      if (otp.length !== 6 || !/^\d+$/.test(otp)) {
        return toast.error("Please enter a valid 6-digit OTP");
      }

      // VERIFY API
      const res = await verifyOtp({
        email,
        otp,
      }).unwrap();

      // ONLY STORE TOKEN AFTER OTP IS VERIFIED SUCCESSFULLY
      if (res?.token) {
        loginUserWithUser(res?.token, res?.user || null);
        setShowOtpModal(false); // Close the modal
        
        // SUCCESS TOAST WITH AUTO-NAVIGATION AFTER DELAY
        toast.success("Login successful! Redirecting...", {
          autoClose: 1500,
          onClose: () => {
            if (res?.user?.role === 'admin') {
              navigate("/dashboard");
            } else {
              navigate("/");
            }
          }
        });
      } else {
        throw new Error("No token received");
      }
      
    } catch (err) {
      toast.error(err?.data?.message || "Invalid OTP. Please try again.");
      // Clear OTP on error for better UX
      setOtp("");
    }
  };

  // ================= CLOSE MODAL =================
  const handleCloseModal = () => {
    setShowOtpModal(false);
    setOtp("");
    // Optional: Ask user if they want to retry
    toast.info("OTP verification cancelled");
  };

  // ================= RESEND OTP =================
  const handleResendOtp = async () => {
    try {
      toast.info("Resending OTP...");
      
      const res = await loginUser({
        email,
        password,
      }).unwrap();
      
      toast.success(res?.message || "New OTP sent successfully");
      setOtp("");
      
    } catch (err) {
      toast.error(err?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <>
      <ToastContainer 
        position="top-right" 
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* MAIN LOGIN FORM - Hidden when OTP modal is open */}
      <div className={`min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-4 py-20 transition-all duration-500 ${
        showOtpModal ? 'blur-sm scale-95' : ''
      }`}>
        
        {/* MAIN CARD */}
        <div
          data-aos="zoom-in"
          className="w-full max-w-5xl bg-white shadow-2xl rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2"
        >
          
          {/* LEFT SIDE - Branding */}
          <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-green-700 to-green-900 text-white p-12 relative overflow-hidden">
            
            {/* Animated Background Circles */}
            <div className="absolute w-72 h-72 bg-white/10 rounded-full -top-20 -left-20 animate-pulse"></div>
            <div className="absolute w-52 h-52 bg-white/10 rounded-full bottom-0 right-0 animate-pulse delay-1000"></div>
            <div className="absolute w-40 h-40 bg-white/5 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="relative z-10">
              
              <div className="flex items-center gap-3 mb-6">
                <FaShieldAlt className="text-4xl animate-bounce" />
                <h1 className="text-4xl font-extrabold">
                  Welcome Back
                </h1>
              </div>
              
              <p className="text-lg leading-8 text-green-100">
                Login securely into your account and continue your
                journey with our modern authentication system.
              </p>
              
              <div className="mt-10 space-y-4">
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-3 h-3 rounded-full bg-white group-hover:scale-125 transition-transform"></div>
                  <p className="group-hover:translate-x-1 transition-transform">Secure OTP Verification</p>
                </div>
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-3 h-3 rounded-full bg-white group-hover:scale-125 transition-transform"></div>
                  <p className="group-hover:translate-x-1 transition-transform">Fast Authentication Process</p>
                </div>
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-3 h-3 rounded-full bg-white group-hover:scale-125 transition-transform"></div>
                  <p className="group-hover:translate-x-1 transition-transform">Protected User Sessions</p>
                </div>
                
              </div>
              
            </div>
          </div>
          
          {/* RIGHT SIDE - Login Form */}
          <div className="p-8 sm:p-12">
            
            {/* TOP */}
            <div className="mb-10 text-center">
              <h2 className="text-4xl font-extrabold text-gray-800 mb-3">
                Login Account
              </h2>
              <p className="text-gray-500">
                Enter your credentials to continue
              </p>
            </div>
            
            {/* EMAIL */}
            <div className="mb-6">
              <label className="block mb-2 font-semibold text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-4 text-green-700" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  className="w-full border border-gray-300 focus:border-green-700 focus:ring-2 focus:ring-green-200 outline-none rounded-xl py-3 pl-12 pr-4 transition-all duration-300"
                  disabled={isLoading}
                />
              </div>
            </div>
            
            {/* PASSWORD */}
            <div className="mb-8">
              <label className="block mb-2 font-semibold text-gray-700">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-4 text-green-700" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  className="w-full border border-gray-300 focus:border-green-700 focus:ring-2 focus:ring-green-200 outline-none rounded-xl py-3 pl-12 pr-12 transition-all duration-300"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-green-700 hover:text-green-900 transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            
            {/* LOGIN BUTTON */}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-700 to-green-900 hover:scale-[1.02] transition-all duration-300 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <FaSpinner className="animate-spin" />
                  Sending OTP...
                </span>
              ) : (
                "Login"
              )}
            </button>
            
            {/* Additional Links */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Don't have an account?{' '}
                <button
                  onClick={() => navigate('/signup')}
                  className="text-green-700 font-semibold hover:text-green-900 transition-colors"
                >
                  Sign up here
                </button>
              </p>
            </div>
            
          </div>
        </div>
      </div>

      {/* ================= OTP MODAL - Overlay Effect ================= */}
      {showOtpModal && (
        <>
          {/* Backdrop with blur */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 px-4 animate-fadeIn"
            onClick={handleCloseModal}
          />
          
          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center z-50 px-4 pointer-events-none">
            <div
              data-aos="zoom-in"
              className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl pointer-events-auto animate-slideUp"
            >
              
              {/* Back Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaArrowLeft className="text-xl" />
              </button>
              
              {/* ICON */}
              <div className="flex justify-center mb-5">
                <div className="bg-gradient-to-br from-green-100 to-green-200 p-5 rounded-full animate-pulse">
                  <FaShieldAlt className="text-4xl text-green-700" />
                </div>
              </div>
              
              {/* TITLE */}
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Verify OTP
                </h2>
                <p className="text-gray-500">
                  Enter the 6-digit verification code sent to
                </p>
                <p className="text-green-700 font-semibold mt-1">
                  {email}
                </p>
              </div>
              
              {/* OTP INPUT */}
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => {
                  // Only allow numbers and limit to 6 digits
                  const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                  setOtp(value);
                }}
                className="w-full border-2 border-gray-300 focus:border-green-700 focus:ring-2 focus:ring-green-200 outline-none rounded-xl py-3 px-4 text-center tracking-[10px] text-xl font-bold mb-4 transition-all duration-300"
                autoFocus
                maxLength={6}
              />
              
              {/* Resend OTP Link */}
              <div className="text-center mb-6">
                <button
                  onClick={handleResendOtp}
                  disabled={otpLoading}
                  className="text-sm text-green-700 hover:text-green-900 font-semibold transition-colors disabled:opacity-50"
                >
                  Didn't receive the code? Resend OTP
                </button>
              </div>
              
              {/* VERIFY BUTTON */}
              <button
                onClick={handleVerifyOtp}
                disabled={otpLoading}
                className="w-full bg-gradient-to-r from-green-700 to-green-900 hover:scale-[1.02] transition-all duration-300 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {otpLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <FaSpinner className="animate-spin" />
                    Verifying OTP...
                  </span>
                ) : (
                  "Verify & Login"
                )}
              </button>
              
              {/* Note */}
              <p className="text-xs text-gray-400 text-center mt-4">
                The OTP is valid for 10 minutes
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}