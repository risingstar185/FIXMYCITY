import express from "express";
import { logoutUser, registerUser, sendOtp, verifyOtp,adminLogin,getAllUsers } from "../controller/authController.js";
import { loginUser } from "../controller/authController.js";
import upload from "../config/multer.js";
import uploadOnCloudinary from "../config/cloudinary.js";
import {User} from "../model/userModel.js";


export const authRoute = express.Router();

authRoute.post("/registration",registerUser);

authRoute.post("/login",loginUser);

authRoute.post('/send-otp',sendOtp);
authRoute.post('/verify-otp',verifyOtp);

authRoute.put(
  "/upload-profile",
  upload.single("profile"),
  async (req, res) => {
    try {

      const userId = req.body.userId; 

      const {name, email, summary, location } = req.body;

      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      let profileUrl = null;

      // If new image uploaded
      if (req.file) {
        profileUrl = await uploadOnCloudinary(req.file.path);
        if (!profileUrl) {
          return res.status(500).json({ message: "Image upload failed" });
        }
      }

      // Build update data object
      const updateData = {
        name,
        email,
        summary,
        location,
      };

      if (profileUrl) updateData.profilePic = profileUrl;

      // Update user
      const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
      });

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({
        message: "Profile updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      console.error("Error in profile update:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);


authRoute.post('/logout',logoutUser);

authRoute.post('/admin-login',adminLogin)


authRoute.post('/get-allUsers',getAllUsers)