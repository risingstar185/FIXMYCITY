import React, { useContext, useState } from "react";
import { IoBookSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthDataContext } from "../context/AuthContext.jsx";
import axios from "axios";
import { UserDataContext } from "../context/UserContext.jsx";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { serverUrl } = useContext(AuthDataContext); // ✅ correct usage
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
const { getCurrentUser } = useContext(UserDataContext);
  //console.log("serverUrl from context:", serverUrl);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        serverUrl +'/api/auth/registration',
        { name, email, password },
        { withCredentials: true }
      );

      setName("");
      setEmail("");
      setPassword("");

      console.log(result.data);
      toast.success("congrats! one step complete");
      getCurrentUser();
      navigate("/otpverification");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in form");
    }
  };

  return (
    <div className="w-full h-screen bg-[#ebf2f9a2] flex flex-col justify-center items-center">
      {/* --- Logo + Title --- */}
      <div className="flex justify-center items-center gap-2">
        <IoBookSharp className="text-[50px] text-[#8b5cf6] mt-2" />
        <h2 className="text-[32px] bg-gradient-to-r from-purple-500 to-violet-600 bg-clip-text text-transparent font-bold mt-2">
          NoteHub
        </h2>
      </div>

      {/* --- Registration Box --- */}
      <div className="w-[400px] md:w-[500px] bg-white rounded-lg shadow-md mt-8 py-8 px-6 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Registration</h1>
        <p className="text-gray-600">
          Sign in to your account or create a new one
        </p>

        <form
          onSubmit={handleSignup}
          className="w-full flex flex-col items-center space-y-5"
        >
          {/* Username */}
          <div className="w-full">
            <label
              htmlFor="username"
              className="block text-left text-gray-600 text-sm font-medium mb-1"
            >
              Username
            </label>
            <input
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your username"
              className="w-full h-[45px] border border-gray-300 rounded-md px-3 focus:outline-none focus:border-[#8b5cf6]"
            />
          </div>

          {/* Email */}
          <div className="w-full">
            <label
              htmlFor="email"
              className="block text-left text-gray-600 text-sm font-medium mb-1"
            >
              Email
            </label>
            <input
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full h-[45px] border border-gray-300 rounded-md px-3 focus:outline-none focus:border-[#8b5cf6]"
            />
          </div>

          {/* Password */}
          <div className="w-full relative">
            <label
              htmlFor="password"
              className="block text-left text-gray-600 text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              value={password}
              type={showPassword ? "text" : "password"}
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your strong password"
              className="w-full h-[45px] border border-gray-300 rounded-md px-3 pr-10 focus:outline-none focus:border-[#8b5cf6]"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] text-gray-600 cursor-pointer"
            >
              {showPassword ? <FaEye /> : <FaRegEyeSlash />}
            </span>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-[100%] h-[45px] mt-4 bg-[#8b5cf6] text-white text-[17px] rounded-md font-medium hover:bg-[#7c3aed] transition-all"
          >
            Next Step 
          </button>
          <div>
            Already have an account?{" "}
            <span
              className="cursor-pointer text-[#8b5cf6]"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </div>
        </form>
      </div>

      {/* Terms */}
      <p className="text-gray-500 text-sm mt-6 text-center">
        By continuing, you agree to our{" "}
        <a href="#" className="text-[#8b5cf6] hover:underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-[#8b5cf6] hover:underline">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
};

export default Registration;
