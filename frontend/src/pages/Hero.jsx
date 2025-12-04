import React from "react";
import heroImage from "../assets/hero-bg.jpg";
import { useNavigate } from "react-router-dom";
import ViewAllIssues from "./ViewAllIssues";

const Hero = () => {
const Navigate = useNavigate();
  return (
    <div className="w-full h-[600px] relative bg-cover bg-center flex flex-col items-center justify-center text-center px-6"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Dark overlay to reduce background opacity */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content above overlay */}
      <div className="relative z-10">
        <h1 className="text-white text-5xl md:text-7xl font-bold mb-10 drop-shadow-lg">
       Empower Your Community,
One Report at a Time
        </h1>

        <p className="text-white text-[25px] mb-10 drop-shadow-md ml-[30px]">
         Report civic problems, track their resolution, and help build a better city together.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button onClick={()=>Navigate('/Report-an-Issue')}
            className="px-6 py-3 rounded-full text-white font-medium 
            bg-gradient-to-r from-[#7B2FF7] to-[#00C6FF] hover:opacity-90 transition-all"
          >
          Report an Issue
          </button>

          <button onClick={()=>Navigate('/ViewAllIssues')}
            className="px-6 py-3 rounded-full text-black font-medium 
            bg-white border border-gray-300 hover:bg-gray-100 transition-all"
          >
         View Reported Issues
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
