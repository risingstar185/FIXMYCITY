import bcrypt from "bcryptjs";
import { User } from "../model/userModel.js";
import validator from 'validator';
import { genToken,gentoken1 } from "../config/token.js";
import { generateOTP } from "../utils/otpGenerator.js";
import { sendOTPEmail } from "../services/Email.js";



export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    if(!name || !email || !password){
      return res.status(400).json({message:"All fields are required"});
    } 
  // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).send('Please enter a valid email');
    }
    if(password.length<6){
      return res.status(400).json({message:"Password must be at least 6 characters long"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    //generate token
 const token = await genToken(newUser?._id);

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
      res.cookie("email", email, {
      httpOnly: true,
      sameSite: "lax",
    });


    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error in user registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const loginUser=async(req,res)=>{
  try {
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
      return res.status(400).json({message:"Invalid email or password"});
    }
    const isPasswordValid=await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
      return res.status(400).json({message:"Invalid email or password"});
    }

        //generate token
 const token = await genToken(user?._id);

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({message:"Login successful"}); 

  } catch (error) {
    console.log("Error in user login:",error);
    res.status(500).json({message:"Internal server error"});
  }
}


export const logoutUser = async (req, res) => {
  try {
    const token = req.cookies?.token; // safe access

    if (!token) {
      return res.status(400).json({ message: "No token found" });
    }

    // clear cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("Logout error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const sendOtp = async (req, res) => {
  try {
    const email = req.cookies.email;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const otp = generateOTP(); // ✅ Generate once, use everywhere

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email });
    }

    user.otp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 mins
    await user.save(); // ✅ Save before sending email (optional but clean)

    // ✅ Send the same OTP which was saved
    await sendOTPEmail(email, otp);

    console.log("✅ OTP generated:", otp);

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("Error in sendOtp:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const email = req.cookies.email;

    if (!email) {
      return res.status(400).json({ message: "Email not found in cookies" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(`👉 User OTP: ${user.otp}, Input OTP: ${otp}`);

    // ✅ Compare directly (string == number works fine in JS)
    if (user.otp != otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error in verifyOtp:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


//reset password
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await
      User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } 
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const adminLogin=async(req,res)=>{
  try {
  const {email,password}=req.body;
  

  // inside adminLogin controller
if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
  return res.status(401).json({ message: "Invalid email or password" });
}

  if(email ===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
try {

 const token = await gentoken1(email);

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: 'Admin Login successfully', token });
    } catch (error) {
  console.log('password and email are wrong:',error)
}

  }
  } catch (error) {
     console.error("admin login error", error);
    res.status(400).json({ message: 'Invalid credentials' });
  }

}

export const getAllUsers=async(req,res)=>{
  try {
    const users=await User.find({});
    res.status(200).json({users});
  }
    catch (error) {
      console.error("Error in getAllUsers:", error);
      res.status(500).json({ message: "Internal server error" });
    }
}