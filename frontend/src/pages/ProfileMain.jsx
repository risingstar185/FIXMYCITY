import React, { useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import { AuthDataContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { userData,setUserData } = useContext(UserDataContext);
const {serverUrl} = useContext(AuthDataContext);

console.log("User Data in ProfileMain:", userData?.name);

  const [user, setUser] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    summary: userData?.summary || "",
    location: userData?.location || "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
const [loading, setLoading] = useState(false);
  // -------- IMAGE CHANGE ----------
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // preview
      setImageFile(file); // actual file for upload
    }
  };

  // --------- HANDLE INPUT ----------
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
const handleSubmit = async () => {
  const formData = new FormData();
 formData.append("userId", userData._id);  
 // VERY IMPORTANT
  formData.append("name", user.name);
  formData.append("email", user.email);
  formData.append("summary", user.summary);
  formData.append("location", user.location);

  if (imageFile) {
    formData.append("profile", imageFile); // match backend multer field
  }

  try {
    setLoading(true);
    const res = await axios.put(
      serverUrl + "/api/auth/upload-profile",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    // Update global user context
    setUserData(res.data.user);

    toast.success("Profile Updated Successfully!");
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong!");
  }finally {
    setLoading(false);
  }
};


  return (
    <div className="flex flex-col text-gray-800">
      <main className="flex-1 -mt-[50px] p-6 md:p-10">
        <div className="rounded-2xl p-6 w-full mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center md:text-left">
            Edit Profile
          </h1>

          {/* PROFILE IMAGE */}
          <div className="flex flex-col items-center gap-5 mb-10">
            <div className="relative">
              <img
                src={
                  selectedImage ||
                  userData?.profilePic ||
                  "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                }
                alt="Profile"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-[#7B2FF7] shadow"
              />

              <label className="absolute bottom-1 right-1 bg-blue-600 text-white text-sm px-3 py-1 rounded-full cursor-pointer shadow-md hover:bg-blue-700 transition">
                Upload
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>
            <p className="text-gray-500 text-sm">
              Upload your profile image (Max: 5MB)
            </p>
          </div>

          {/* FORM */}
          <form className="space-y-6">
            {/* NAME */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* SUMMARY */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Profile Summary
              </label>
              <textarea
                name="summary"
                value={user.summary}
                onChange={handleChange}
                rows="4"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* LOCATION */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={user.location}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* SAVE BUTTON */}
            <div className="text-center md:text-right">
              <button
              disabled={false}
                type="button"
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 cursor-pointer rounded-lg shadow-md transition font-medium"
              >
                {loading?"Saving..":"Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
