import React, { useState, useContext } from "react";
import { IoBookSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { AuthDataContext } from "../context/AuthContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import { UserDataContext } from "../context/UserContext.jsx";

const Login = () => {
  const { serverUrl } = useContext(AuthDataContext);
const {getCurrentUser}=useContext(UserDataContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return; // 🛑 Prevent double click login

    try {
      setLoading(true);

      const result = await axios.post(
        serverUrl + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      toast.success("Login Successful");
setTimeout(() => {
  getCurrentUser();
}, 500);

      setEmail("");
      setPassword("");
      

      Navigate("/"); //

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong during login");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="w-full h-screen bg-[#ebf2f9a2] flex flex-col justify-center items-center">
      <div className="flex justify-center items-center gap-2">
        <IoBookSharp className="text-[50px] text-[#8b5cf6] mt-2" />
        <h2 className="text-[32px] bg-gradient-to-r from-purple-500 to-violet-600 bg-clip-text text-transparent font-bold mt-2">
          FixMyCity
        </h2>
      </div>

      <div className="w-[400px] md:w-[500px] bg-white rounded-lg shadow-md mt-8 py-8 px-6 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome Back, Login</h1>
        <p className="text-gray-600">Login for the Next Future</p>

        <form className="w-full flex flex-col items-center space-y-5" onSubmit={handleLogin}>

          <div className="w-full">
            <label className="block text-left text-gray-600 text-sm font-medium mb-1">
              Email
            </label>
            <input
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter Your email"
              className="w-full h-[45px] border border-gray-300 rounded-md px-3"
            />
          </div>

          <div className="w-full relative">
            <label className="block text-left text-gray-600 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              required
              value={password}
              placeholder="Enter your strong password"
              className="w-full h-[45px] border border-gray-300 rounded-md px-3 pr-10"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-gray-600 cursor-pointer"
            >
              {showPassword ? <FaEye /> : <FaRegEyeSlash />}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full h-[45px] mt-4 rounded-md font-medium text-[17px] transition-all cursor-pointer
            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#8b5cf6] text-white hover:bg-[#7c3aed]"}`}
          >
            {loading ? "Loading..." : "Login"}
          </button>

          <div>
            You have no account?
            <span className="cursor-pointer text-[#8b5cf6]" onClick={() => Navigate("/register")}>
              Registration
            </span>
          </div>

          <div>
            <span className="cursor-pointer text-[#8b5cf6]" onClick={() => Navigate("/register")}>
              Forget Password?
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
