import React from "react";

const Footer = () => {
  return (
    <footer className=" text-purple py-6 mt-20">
      <div className=" mx-auto flex flex-col md:flex-row justify-between items-center px-5">

        {/* Brand */}
        <h2 className="text-lg font-semibold">
          FixMyCity Admin Dashboard
        </h2>

        {/* Links */}
        <div className="flex gap-6 mt-3 md:mt-0">
          <a href="/" className="hover:text-purple">Home</a>
          <a href="/about" className="hover:text-purple">About</a>
          <a href="/contact" className="hover:text-purple">Contact</a>
        </div>

        {/* Copyright */}
        <p className="text-sm mt-3 md:mt-0">
          © {new Date().getFullYear()} Made By 
          <span className="text-blue-400 font-semibold"> Ayush Patel</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
