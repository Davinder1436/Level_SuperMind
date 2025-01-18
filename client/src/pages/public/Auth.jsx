// LoginPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import {
  Mail,
  Lock,
  ArrowRight,
  MapPin,
  AlertCircle,
  Sparkles,
} from "lucide-react";

const FormInput = ({ icon: Icon, label, error, ...props }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-[#151616]/70">{label}</label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2">
        <Icon className="w-5 h-5 text-[#151616]/40" />
      </div>
      <input
        className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 ${
          error ? "border-red-500" : "border-[#151616]"
        } focus:outline-none focus:ring-2 ring-[#D6F32F]`}
        {...props}
      />
    </div>
  </div>
);

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading, clearError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-[#151616]">Welcome Back</h2>
        <p className="text-[#151616]/70">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-[#151616] hover:text-[#151616]/70 
              underline decoration-[#D6F32F] decoration-2 underline-offset-2">
            Sign up here
          </Link>
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 p-4 bg-red-50 rounded-xl border-2 border-red-500">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-600">{error}</p>
          </motion.div>
        )}

        <div className="space-y-4">
          <FormInput
            icon={Mail}
            label="Email Address"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          <FormInput
            icon={Lock}
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-2 border-[#151616] 
                text-[#D6F32F] focus:ring-[#D6F32F]"
            />
            <span className="text-sm text-[#151616]/70">Remember me</span>
          </label>

          <Link
            to="/forgot-password"
            className="text-sm text-[#151616]/70 hover:text-[#151616]">
            Forgot password?
          </Link>
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-3 bg-[#D6F32F] rounded-xl border-2 border-[#151616] 
            shadow-[4px_4px_0px_0px_#151616] hover:shadow-[2px_2px_0px_0px_#151616] 
            hover:translate-x-[2px] hover:translate-y-[2px] transition-all
            flex items-center justify-center gap-2 font-bold disabled:opacity-70">
          {isLoading ? (
            <>
              <Sparkles className="w-5 h-5 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              Sign in
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

// RegisterPage.jsx
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    dob: "",
    time: "",
    gender: "",
    state: "",
    city: "",
  });

  const { register, error, isLoading, clearError } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    try {
      await register(formData);
      navigate("/dashboard");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-[#151616]">Create Account</h2>
        <p className="text-[#151616]/70">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-[#151616] hover:text-[#151616]/70 
              underline decoration-[#D6F32F] decoration-2 underline-offset-2">
            Sign in here
          </Link>
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 p-4 bg-red-50 rounded-xl border-2 border-red-500">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-600">{error}</p>
          </motion.div>
        )}

        <div className="space-y-4">
          <FormInput
            icon={Mail}
            label="Email Address"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          <FormInput
            icon={Lock}
            label="Password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#151616]/70">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                required
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-[#151616] 
                  focus:outline-none focus:ring-2 ring-[#D6F32F]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#151616]/70">
                Time of Birth
              </label>
              <input
                type="time"
                name="time"
                required
                value={formData.time}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-[#151616] 
                  focus:outline-none focus:ring-2 ring-[#D6F32F]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#151616]/70">
              Gender
            </label>
            <select
              name="gender"
              required
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border-2 border-[#151616] 
                focus:outline-none focus:ring-2 ring-[#D6F32F]">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              icon={MapPin}
              label="State"
              name="state"
              type="text"
              required
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter state"
            />

            <FormInput
              icon={MapPin}
              label="City"
              name="city"
              type="text"
              required
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-3 bg-[#D6F32F] rounded-xl border-2 border-[#151616] 
            shadow-[4px_4px_0px_0px_#151616] hover:shadow-[2px_2px_0px_0px_#151616] 
            hover:translate-x-[2px] hover:translate-y-[2px] transition-all
            flex items-center justify-center gap-2 font-bold disabled:opacity-70">
          {isLoading ? (
            <>
              <Sparkles className="w-5 h-5 animate-spin" />
              Creating Account...
            </>
          ) : (
            <>
              Create Account
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export { LoginPage, RegisterPage };
