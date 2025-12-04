import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineLocationCity } from "react-icons/md";
import { HiMenu, HiX } from "react-icons/hi";
import axios from "axios";
import { AuthDataContext } from "../context/AuthDataContext.jsx";
import { toast } from "react-toastify";

const Navbar = () => {
  const { serverUrl } = useContext(AuthDataContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(`${serverUrl}/api/auth/logout`, {}, { withCredentials: true });
      toast.success("Logged out successfully!");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout error: Please try again later.");
    }
  };

  return (
    <nav className="sticky top-0 bg-white/40 backdrop-blur-lg shadow-md flex items-center justify-between px-5 md:px-12 py-3 z-50">

      {/* Left: Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <MdOutlineLocationCity className="text-[35px] text-[#8b5cf6]" />
        <h2 className="text-[24px] font-bold bg-gradient-to-r from-purple-500 to-violet-600 bg-clip-text text-transparent">
          FixMyCity
        </h2>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 font-medium">
        <li>
          <Link to="/sidebar" className="hover:text-[#8b5cf6] transition">Dashboard</Link>
        </li>
        <li>
          <Link to="/list" className="hover:text-[#8b5cf6] transition">View All Complaint</Link>
        </li>
        <li>
          <Link to="/Pending" className="hover:text-[#8b5cf6] transition">Pending Complaint</Link>
        </li>
      </ul>

      {/* Desktop Logout */}
      <div className="hidden md:flex">
        <button
          onClick={handleLogout}
          className="px-5 py-2 bg-[#8b5cf6] text-white rounded-lg font-semibold hover:bg-[#7c3aed] transition"
        >
          Logout
        </button>
      </div>

      {/* Mobile Menu Icon */}
      <button
        className="md:hidden text-3xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <HiX /> : <HiMenu />}
      </button>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="absolute top-16 right-0 w-56 bg-white shadow-lg rounded-lg py-5 px-4 md:hidden animate-slideDown">
          <ul className="flex flex-col gap-4 text-lg">
            <li>
              <Link
                to="/sidebar"
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#8b5cf6]"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/list"
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#8b5cf6]"
              >
                View All Complaint
              </Link>
            </li>
            <li>
              <Link
                to="/Pending"
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#8b5cf6]"
              >
                Pending Complaint
              </Link>
            </li>

            <button
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
              className="mt-3 px-4 py-2 bg-[#8b5cf6] text-white rounded-lg font-semibold"
            >
              Logout
            </button>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
