import React, { useState, useContext } from "react";
import { IoBookSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthDataContext } from "../context/AuthContext.jsx";
import axios from "axios";
import { UserDataContext } from "../context/UserContext.jsx";

const OtpVerification = () => {
  const Navigate = useNavigate();
  const { serverUrl } = useContext(AuthDataContext);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false); // For Verify OTP
  const [isSending, setIsSending] = useState(false); // For Send OTP


  const handleSendOtp = async () => {
    setIsSending(true);
    try {
      const otpResult = await axios.post(
        
        serverUrl + "/api/auth/send-otp",
        {},
        { withCredentials: true }
      );
      console.log(otpResult);
      toast.success("OTP sent successfully!"); // Added success toast
    } catch (error) {
      console.error(error);
      toast.error("Failed to send OTP");
    } finally {
      setIsSending(false);
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }
    try {
      setLoading(true);
      const result = await axios.post(
        
        `${serverUrl}/api/auth/verify-otp`,
        { otp },
        { withCredentials: true }
      );

      console.log(result.data);
      toast.success("Account Created Successfully!");
      setOtp("");
    
      
      Navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Invalid or expired OTP");
    } finally {
      setLoading(false);
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
      <div className="w-[400px] h-auto md:w-[500px] bg-white rounded-lg shadow-md mt-8 py-8 px-6 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Verify OTP</h1>
        <p className="text-gray-600 mb-6">Create account for the Next Future</p>

        {/* Form starts here */}
        <form
          className="w-full flex flex-col items-center space-y-5"
          onSubmit={handleOtpVerification}
        >
          {/* OTP Input + Send Button Row */}
          <div className="w-full">
            <label
              htmlFor="otp"
              className="block text-left text-gray-600 text-sm font-medium mb-1"
            >
              OTP
            </label>
            
            {/* Flex container to hold input and button on a_
               same line */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                id="otp"
                value={otp} // Controlled input
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter otp must be 6 digit"
                className="flex-grow h-[45px] border border-gray-300 rounded-md px-3 focus:outline-none focus:border-[#8b5cf6]"
              />
              <button
                type="button" // <-- IMPORTANT: type="button" stops form submission
                disabled={isSending || loading}
                onClick={handleSendOtp}
                className="h-[45px] bg-[#8b5cf6] text-white px-4 rounded-md font-medium text-[16px] hover:bg-[#7c3aed] transition-all whitespace-nowrap"
              >
                {isSending ? "Sending..." : "Send OTP"}
              </button>
            </div>
          </div>

          {/* Verify Button (Submit) */}
          <button
            disabled={isSending || loading} // Disable if either action is in progress
            type="submit"
            className="w-full h-[45px] mt-4 bg-[#8b5cf6] text-white rounded-md font-medium text-[17px] hover:bg-[#7c3aed] transition-all"
          >
            {loading ? "Creating Account..." : "Verify Otp"}
          </button>

          <div>
            You have Wrong information ? Go Back{" "}
            <span
              className=" cursor-pointer text-[#8b5cf6]"
              onClick={() => Navigate("/register")}
            >
              Registration
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

export default OtpVerification;