import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import bannerimg from '../assets/hero-bg.jpg';
import { motion } from "framer-motion";
import Navbar from "../components/Nav";
import { toast } from "react-toastify";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);
      // Example: connect to your backend later
      // await axios.post("/api/contact", { name, email, msg });

      toast.success("Message sent successfully!");
      setName("");
      setEmail("");
      setMsg("");

    } catch (error) {
      alert("Error sending message");
    }finally{
      setLoading(false)
    }
  };

  return (
<>
<Navbar/>

     <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className=" mx-auto bg-white shadow-2xl rounded-3xl border border-gray-100"
      >
    <div className="min-h-screen -mt-[45px] rounded-lg bg-gray-100 flex flex-col">

      {/* Hero Image */}
      <div className="w-full relative">
        <img
          src={bannerimg}
          alt="Contact Banner"
          className="w-full h-72 object-cover"
        />
        <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center">
          <h1 className="text-[50px] font-bold text-white">
             <span className="text-[#7B2FF7]"> Contact Us</span>
          </h1>
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 p-6 mt-10">

        {/* Left Side - Contact Info */}
        <div className="bg-white rounded-xl shadow-xl p-8 flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-[#7B2FF7] mb-3">
            Get in Touch
          </h2>

          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-[#7B2FF7] text-2xl" />
            <p>FixMyCity Headquarters, lucknow, India</p>
          </div>

          <div className="flex items-center gap-4">
            <FaPhone className="text-[#7B2FF7] text-2xl" />
            <p>+91 98765 43210</p>
          </div>

          <div className="flex items-center gap-4">
            <FaEnvelope className="text-[#7B2FF7] text-2xl" />
            <p>patelayush9554@gmail.com</p>
          </div>

          <p className="mt-50 text-gray-600">
            Our team is here to help with issues, complaints, and general
            support for improving civic infrastructure.
          </p>
        </div>

        {/* Right Side - Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-xl"
        >
          <h2 className="text-2xl font-bold text-[#7B2FF7] mb-6">
            Send Us a Message
          </h2>

          <label className="font-semibold">Your Name</label>
          <input
            type="text"
            className="w-full mt-1 p-3 border rounded-lg mb-4"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className="font-semibold">Email Address</label>
          <input
            type="email"
            className="w-full mt-1 p-3 border rounded-lg mb-4"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="font-semibold">Message</label>
          <textarea
            rows="4"
            className="w-full mt-1 p-3 border rounded-lg mb-6"
            placeholder="Write your message..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            required
          ></textarea>

          <button
          disabled={loading}
            type="submit"
            className="w-full bg-[#7B2FF7] text-white py-3 rounded-lg font-bold cursor-pointer text-lg hover:bg-[#6924d8] transition"
          >
          {loading? "Message Sending..":  "Send Message"}
          </button>
        </form>
      </div>
    </div>
    </motion.div>
    </>
  );
};

export default ContactUs;
