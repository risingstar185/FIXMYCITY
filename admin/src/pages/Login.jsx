import React, {useState} from "react";
import { IoBookSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useContext } from "react";
import { AuthDataContext } from "../context/AuthDataContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";


const Login = () => {
const {serverUrl} =useContext(AuthDataContext);
const[email,setEmail]=useState("");
const[password,setPassword]=useState("");
 const Navigate = useNavigate();
  const [showPassword, setShowPassword] =useState(false);
  const[loading,setLoading]=useState(false);

const handleLogin=async(e)=>{
e.preventDefault();
try {
  setLoading(true);
  const result=await axios.post(serverUrl+'/api/auth/admin-login',{
    email,
    password
  },{withCredentials:true});

  console.log(result.data);
  toast.success("Login Successful");
  setEmail('')
  setPassword('')

  Navigate('/');

} catch (error) {
  console.log(error);
  toast.error("Something went wrong during login");
}
}



 
  return (
    <div className="w-full h-screen bg-[#ebf2f9a2] flex flex-col justify-center items-center">
      {/* --- Logo + Title --- */}
      <div className="flex justify-center items-center gap-2">
        <IoBookSharp className="text-[50px] text-[#8b5cf6] mt-2" />
        <h2 className="text-[32px] bg-gradient-to-r from-purple-500 to-violet-600 bg-clip-text text-transparent font-bold mt-2">
        FixMyCity
        </h2>
      </div>

      {/* --- Registration Box --- */}
      <div className="w-[400px] md:w-[500px] bg-white rounded-lg shadow-md mt-8 py-8 px-6 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome Back, Login</h1>
<p className="text-gray-600 ">Login for the Next Future</p>
        <form className="w-full flex flex-col items-center  space-y-5" onSubmit={handleLogin}>
       

          {/* Email */}
          <div className="w-full">
            <label htmlFor="email" className="block text-left text-gray-600 text-sm font-medium mb-1">
              Email
            </label>
            <input
            value={email}
              type="email" 
              onChange={(e) => setEmail(e.target.value)} required  
              placeholder="Enter Your email"
              className="w-full h-[45px] border border-gray-300 rounded-md px-3 focus:outline-none focus:border-[#8b5cf6]"
            />
          </div>

         <div className="w-full relative">
      <label
        htmlFor="password"
        className="block text-left text-gray-600 text-sm font-medium mb-1"
      >
        Password
      </label>
      <input
        type={showPassword ? "text" : "password"}
        id="password"  onChange={(e) => setPassword(e.target.value)} required value={password}
        placeholder="Enter your strong password"
        className="w-full h-[45px] border border-gray-300 rounded-md px-3 pr-10 focus:outline-none focus:border-[#8b5cf6]"
      />

      {/* Eye toggle icon */}
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
            className="w-[100%] h-[45px] mt-4 bg-[#8b5cf6] text-white rounded-md font-medium text-[17px] hover:bg-[#7c3aed] transition-all"
          >{loading ? "Loading..." : "Login"}
          </button>
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

export default Login;

