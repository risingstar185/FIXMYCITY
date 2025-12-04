import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const genToken=async(userId)=>{
  try {
    const token=await jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'7d'});

    return token
  } catch (error) {
    console.log("Error in generating token:", error);
    return null;
  }
}

export const gentoken1=async (email)=>{
try {
  let token=await jwt.sign({email}, process.env.JWT_SECRET,{expiresIn:'7d'})
  return token;
} catch (error) {
  console.log('token error',error)
}
}

