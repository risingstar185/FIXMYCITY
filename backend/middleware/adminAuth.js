import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized access — token missing" });
    }

    // Verify token
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!verifyToken) {
      return res.status(403).json({ message: "Invalid token" });
    }

    // Attach decoded info or admin email to request
    req.adminEmail = process.env.ADMIN_EMAIL; // or verifyToken.email if token contains it

    next(); // ✅ allow next middleware/controller to run
  } catch (error) {
    console.error("adminAuth error:", error);
    return res.status(500).json({ message: `Token verification failed: ${error.message}` });
  }
};

export default adminAuth;