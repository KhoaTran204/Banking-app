require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = async (req) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return {
      isVerified: false,
      message: "No authorization header",
    };
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return {
      isVerified: false,
      message: "No token provided",
    };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return {
      isVerified: true,
      data: decoded,
    };
  } catch (error) {
    return {
      isVerified: false,
      message: error.message,
    };
  }
};

module.exports = { verifyToken };
