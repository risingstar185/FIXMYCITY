import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.userId) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // Attach userId to request
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("❌ Error in isAuth middleware:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



