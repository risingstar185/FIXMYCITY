import React, { useContext, useState } from "react";
import axios from "axios";
import { FaCamera, FaMapMarkerAlt, FaUser, FaPhone } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Nav";
import { UserDataContext } from "../context/UserContext";
import { AuthDataContext } from "../context/AuthContext";



const ReportIssue = () => {
  // --- Form States ---
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [location, setLocation] = useState({ lat: "", lng: "" });
const [loading,setLoading]=useState(false)

  // NEW: Added states for required fields from your schema
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const {serverUrl}=useContext(AuthDataContext)

  const {userData}=useContext(UserDataContext)

  const Navigate=useNavigate()
  // NEW: Added state for the address object
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  // --- Handlers ---

  const userId=userData?._id;
  if(!userId){
    console.log("User ID in error  ReportIssue:");
  }
  // Image preview
  const handleImageChange = (e) => {
    const profile = e.target.files[0];
    if (profile) {
      setImage(profile);
      setPreview(URL.createObjectURL(profile));
    }
  };

  // Auto Detect Location
  const detectLocation = () => {

    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
          setLoading(false);
        },
            
        (err) => {
          console.error(err);
          alert("Could not get location. Please enable permissions.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // NEW: Handler for address fields
  const handleAddressChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // NEW: Added validation for new required fields
    if (!name || !mobile || !title || !category || !image) {
      return alert("Please fill in all required fields: Name, Mobile, Title, Category, and Image.");
    }

    const formData = new FormData();

    // UPDATED: Keys now match your Mongoose schema
    formData.append("userId", userId);
    formData.append("issueTitle", title);
    formData.append("issueDescription", desc);
    formData.append("issueType", category);
    formData.append("lat", location.lat);
    formData.append("lng", location.lng);
    formData.append("profile", image); // Your server will handle this file and create the `imageUrl`

    // NEW: Appending new required fields
    formData.append("name", name);
    formData.append("mobile", mobile);

    // NEW: Appending address fields
    // Your server will need to construct the `address: {}` object from these
    formData.append("street", address.street);
    formData.append("city", address.city);
    formData.append("state", address.state);
    formData.append("pincode", address.pincode);

    try {
    setLoading(true);
      const res = await axios.post(serverUrl +"/api/complaint/complaints", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true, // This is good, it will send the cookie for `userId`
      });

      toast.success("Issue reported successfully!");
      Navigate('/ViewAllIssues'); // Redirect to profile or another page after submission
      console.log(res.data);
      // TODO: Reset form state here
    } catch (error) {
      console.error(error);
      alert("Error reporting issue: " + (error.response?.data?.message || error.message));
    }finally{
      setLoading(false);
    }
  };

  // --- JSX ---
  return (
  <>
    <Navbar/>

    <div className="min-h-screen w-full flex justify-center   p-6">
    
      <form
        onSubmit={handleSubmit}
        className="bg-[#f0e9e9af] rounded-xl shadow-2xl p-8 w-full "
      >
        <h2 className="text-[40px] font-bold text-center text-[#7B2FF7] mb-6">
          Report Civic Issue
        </h2>

        {/* --- NEW: Personal Details --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="font-semibold">Your Name</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="font-semibold">Mobile Number</label>
            <input
              type="tel"
              className="w-full p-3 border rounded-lg"
              placeholder="Enter mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>
        </div>

        {/* --- Issue Details --- */}
        <label className="font-semibold">Issue Title</label>
        <input
          type="text"
          className="w-full p-3 border rounded-lg mb-4"
          placeholder="Ex: Pothole on road"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label className="font-semibold">Description</label>
        <textarea
          className="w-full p-3 border rounded-lg mb-4"
          rows="3"
          placeholder="Describe the issue..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>

        <label className="font-semibold">Category</label>
        <select
          className="w-full p-3 border rounded-lg mb-4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="Road">Road</option>
          <option value="Garbage">Garbage</option>
          <option value="Streetlight">Streetlight</option>
          <option value="Water Leakage">Water Leakage</option>
           <option value="Water Leakage">Transportation</option>
        </select>

        {/* Image Upload */}
        <label className="font-semibold">Upload Issue Image</label>
        <label
          htmlFor="imgUpload" // Make the whole box clickable
          className="w-full border-2 border-dashed border-gray-300 p-4 rounded-xl flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 mb-4 cursor-pointer"
        >
          <FaCamera className="text-4xl text-gray-500 mb-2" />
          <p className="text-gray-600">
            {image ? image.name : "Click to upload image"}
          </p>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="imgUpload"
            onChange={handleImageChange}
          />
        </label>

        {/* Preview */}
        {preview && (
          <img
  crossOrigin="anonymous"
  referrerPolicy="no-referrer"
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg mb-4 shadow-lg"
          />
        )}

        {/* --- NEW: Address Fields --- */}
        <label className="font-semibold">Address (Optional)</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 mt-2">
          <input
            type="text"
            name="street"
            className="w-full p-3 border rounded-lg"
            placeholder="Street / Area"
            value={address.street}
            onChange={handleAddressChange}
          />
          <input
            type="text"
            name="city"
            className="w-full p-3 border rounded-lg"
            placeholder="City"
            value={address.city}
            onChange={handleAddressChange}
          />
          <input
            type="text"
            name="state"
            className="w-full p-3 border rounded-lg"
            placeholder="State"
            value={address.state}
            onChange={handleAddressChange}
          />
          <input
            type="text"
            name="pincode"
            className="w-full p-3 border rounded-lg"
            placeholder="Pincode"
            value={address.pincode}
            onChange={handleAddressChange}
          />
        </div>
  <iframe
          title="OneCart Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.839054218844!2d72.87765597498884!3d19.118719551977578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8723b60b6cf%3A0x96c4b1a72d8ad11a!2sMumbai%20India!5e0!3m2!1sen!2sin!4v1699092906183!5m2!1sen!2sin"
          className="w-full h-[300px] rounded-lg border border-white/30 shadow-lg"
          loading="lazy"
        ></iframe>
        {/* Location */}
        <label className="font-semibold">Location (Required)</label>
        <div className="flex gap-3 mt-2">
          <button
          
            type="button"
            onClick={detectLocation}
            className="bg-[#7B2FF7] text-white px-4 py-2 rounded-md flex items-center  cursor-pointer gap-2 hover:bg-[#6a27d9]"
          >
            <FaMapMarkerAlt />  {loading?"Detecting...":"Detect Location"}
          </button>
        </div>

        {location.lat && (
          <p className="text-sm mt-2 text-green-600">
            ✔ Location captured: {Number(location.lat).toFixed(3)},{" "}
            {Number(location.lng).toFixed(3)}
          </p>
        )}

        {/* Submit */}
        <button
        
          type="submit"
          className="w-full mt-6 bg-[#7B2FF7] text-white py-3 rounded-lg font-bold text-lg cursor-pointer transition-colors"
        >{loading ? "Submitting..." : "Submit Your Issue"}
      
        </button>
      </form>
    </div>
      </>
  );
};

export default ReportIssue;