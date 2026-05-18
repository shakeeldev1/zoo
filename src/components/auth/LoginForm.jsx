import {
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
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
  const { setIsLogin } = useAppContext();

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

      // LOGIN API
      const res = await loginUser({
        email,
        password,
      }).unwrap();

      // SUCCESS MESSAGE
      toast.success(res?.message || "OTP sent successfully");

      // OPEN OTP MODAL
      setShowOtpModal(true);
    } catch (err) {
      toast.error(err?.data?.message || "Login failed");
    }
  };

  // ================= VERIFY OTP =================
  const handleVerifyOtp = async () => {
    try {
      if (!otp) {
        return toast.error("Please enter OTP");
      }

      // VERIFY API
      const res = await verifyOtp({
        email,
        otp,
      }).unwrap();

      // TOKEN STORE
      localStorage.setItem("token", res?.token);

      // LOGIN STATE TRUE
      setIsLogin(true);

      // SUCCESS TOAST
      toast.success("Login successful 🎉");

      // CLOSE MODAL
      setShowOtpModal(false);

      // NAVIGATE
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      toast.error(err?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-4 py-20">

      {/* TOAST */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* MAIN CARD */}
      <div
        data-aos="zoom-in"
        className="w-full max-w-5xl bg-white shadow-2xl rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2"
      >

        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-green-700 to-green-900 text-white p-12 relative overflow-hidden">

          <div className="absolute w-72 h-72 bg-white/10 rounded-full -top-20 -left-20"></div>

          <div className="absolute w-52 h-52 bg-white/10 rounded-full bottom-0 right-0"></div>

          <div className="relative z-10">

            <div className="flex items-center gap-3 mb-6">
              <FaShieldAlt className="text-4xl" />

              <h1 className="text-4xl font-extrabold">
                Welcome Back
              </h1>
            </div>

            <p className="text-lg leading-8 text-green-100">
              Login securely into your account and continue your
              journey with our modern authentication system.
            </p>

            <div className="mt-10 space-y-4">

              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-white"></div>

                <p>Secure OTP Verification</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-white"></div>

                <p>Fast Authentication Process</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-white"></div>

                <p>Protected User Sessions</p>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
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
                className="w-full border border-gray-300 focus:border-green-700 focus:ring-2 focus:ring-green-200 outline-none rounded-xl py-3 pl-12 pr-4 transition-all duration-300"
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
                className="w-full border border-gray-300 focus:border-green-700 focus:ring-2 focus:ring-green-200 outline-none rounded-xl py-3 pl-12 pr-12 transition-all duration-300"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-4 text-green-700"
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>
          </div>

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-700 to-green-900 hover:scale-[1.02] transition-all duration-300 text-white font-bold py-3 rounded-xl shadow-lg"
          >
            {isLoading ? "Sending OTP..." : "Login"}
          </button>

        </div>
      </div>

      {/* ================= OTP MODAL ================= */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">

          <div
            data-aos="zoom-in"
            className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl"
          >

            {/* ICON */}
            <div className="flex justify-center mb-5">

              <div className="bg-green-100 p-5 rounded-full">
                <FaShieldAlt className="text-4xl text-green-700" />
              </div>

            </div>

            {/* TITLE */}
            <div className="text-center mb-6">

              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Verify OTP
              </h2>

              <p className="text-gray-500">
                Enter the OTP sent to your email
              </p>

            </div>

            {/* OTP INPUT */}
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-300 focus:border-green-700 focus:ring-2 focus:ring-green-200 outline-none rounded-xl py-3 px-4 text-center tracking-[10px] text-xl font-bold mb-6"
            />

            {/* VERIFY BUTTON */}
            <button
              onClick={handleVerifyOtp}
              disabled={otpLoading}
              className="w-full bg-gradient-to-r from-green-700 to-green-900 hover:scale-[1.02] transition-all duration-300 text-white font-bold py-3 rounded-xl shadow-lg"
            >
              {otpLoading
                ? "Verifying OTP..."
                : "Verify OTP"}
            </button>

          </div>
        </div>
      )}
    </div>
  );
}