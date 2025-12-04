
import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
   
  name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,

  },
  password:{
    type:String,
    required:true,
  },
  profilePic:{
    type:String,
    default:"",  
},
  summary:{
    type:String,
    default:"",
  },
  location:{
    type:String,
    default:"",
  },
  otp: {
    type: Number,
    default: 0,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  otpExpires: {
    type: Date,
    default: function () {
      // Expire 2 minutes after generation
      return new Date(Date.now() + 2 * 60 * 1000);
    },
}
},{timestamps:true})  ;


export const User=mongoose.model("User",userSchema)