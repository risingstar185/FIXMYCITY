import React, { useContext } from "react";
import { IoBookSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
//import { MdShoppingCart } from "react-icons/md";
import { UserDataContext } from "../context/UserContext";
import { MdOutlineLocationCity } from "react-icons/md";

const Navbar = () => {

  const navigate = useNavigate();
  const {userData}=useContext(UserDataContext)


  const showProfile = true; // Replace with actual logic to determine if profile image should be shown
  return (
    <nav className="sticky top-0 bg-transparent shadow-md backdrop-blur-lg shadow-sm flex items-center justify-between px-6 md:px-12 z-50 py-2">

      {/* Left: Logo + Name */}
      <div className="flex items-center gap-2 cursor-pointer">
        <MdOutlineLocationCity className="text-[35px] text-[#8b5cf6]" />
        <h2 className="text-[26px] bg-gradient-to-r from-purple-500 to-violet-600 bg-clip-text text-transparent font-bold" onClick={()=>navigate('/')}>
         FixMyCity
        </h2>
      </div>

<div className="hidden md:flex items-center gap-8 text-gray-800 font-medium cursor-pointer">
  <ul className="flex gap-8">
    <li>
      <Link
        to="/"   className="hover:text-[#8b5cf6] transition-all duration-200"
      >  Home  </Link>
    </li>
     <li>
      <Link
        to="/Report-an-Issue"   className="hover:text-[#8b5cf6] transition-all duration-200"
      >  Report an Issue   </Link>
    </li>
    <li>
      <Link to="/about" className="hover:text-[#8b5cf6] transition-all duration-200"> About  </Link>
    </li>
    <li>
      <Link  to="/contactinfo"   className="hover:text-[#8b5cf6] transition-all duration-200">
        Contact
      </Link>
    </li>
  </ul>
</div>


      {/* Right: Buttons */}
      <div className="flex items-center gap-4">
        {/* Login Button */}
    

        {/* Profile Section */}
        <Link
          to="/profilesetting"
          className="flex items-center gap-2 px-3 py-2  rounded-full hover:bg-gray-200 transition-all"
        >
          <img
            src={showProfile ? userData&&userData.profilePic :"https://cdn-icons-png.flaticon.com/512/149/149071.png"
              
            }
            alt="profile"
            className="w-8 h-8 rounded-full"  /> </Link>

        {/* Get Started Button */}
        <Link
          to="/profilesetting"
          className="px-5 py-2 bg-[#8b5cf6] text-white rounded-lg font-semibold hover:bg-[#7c3aed] transition-all"
        >
          {userData ? "Dashboard" : "Get Started"}

        </Link>
{/*<MdShoppingCart className="w-[38px] h-[38px]  " onClick={()=>navigate('/addtocart')}/>
<p className="-mt-[30px] text-black -ml-[28px]">10</p>*/}
        
      </div>
    </nav>
  );
};

export default Navbar;
