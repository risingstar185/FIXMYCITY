import React from "react";
import {useNavigate} from 'react-router-dom';

const BlueSection = () => {
  const navigate=useNavigate()
  return (
    <section className="bg-[#6824ddc6] text-white py-16 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Ready to Make a Difference?
        </h2>
        <p className="text-lg md:text-xl mb-6">
       Join thousands of citizens working together to improve urban infrastructure
       
        </p>
        <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full hover:bg-blue-100 transition" onClick={()=>navigate('/Report-an-Issue')}>
          Ready for oneStep →
        </button>
      </div>
    </section>
  );
};

export default BlueSection;
