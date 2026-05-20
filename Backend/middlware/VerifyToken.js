import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized please login first" });
  }
  
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // IMPORTANT: Check what field name is in your token
    req.userId = decoded.userId || decoded.id || decoded._id;
    
    next();
  } catch (err) {
    console.log("Token verification error:", err.message); 
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};