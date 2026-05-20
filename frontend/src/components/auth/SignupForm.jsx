import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";

import { useRegisterUserMutation } from "../../redux/api/AuthApi";

export default function SignupForm() {

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

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
  };

  // ================= VALIDATION =================
  const validate = () => {
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Enter valid email");
      return false;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const res = await registerUser(formData).unwrap();

      toast.success(res.message || "Account created successfully 🎉");

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (err) {
      toast.error(err?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24 bg-gradient-to-br from-[#f7fff7] to-[#e8f5e9]">

      {/* ================= CARD ================= */}
      <div className="w-full max-w-xl bg-white shadow-2xl rounded-2xl overflow-hidden border border-green-100">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-green-700 to-green-900 py-8 text-center">
          <h1 className="text-white text-3xl font-bold">
            Create Account
          </h1>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8">

          {/* NAME */}
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mb-4 border p-3 rounded"
          />

          {/* EMAIL */}
          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mb-4 border p-3 rounded"
          />

          {/* PASSWORD */}
          <div className="relative mb-6">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-green-700"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* BUTTON (NO TEXT CHANGE — ONLY SPINNER OVERLAY) */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-700 text-white font-bold py-3 rounded relative flex items-center justify-center"
          >
            Sign Up

            {isLoading && (
              <div className="absolute right-4">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </button>

          {/* LOGIN LINK */}
          <div className="mt-6 text-center">
            <span>Already have an account?</span>
            <Link to="/login" className="text-green-700 font-bold ml-2">
              Login
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
}