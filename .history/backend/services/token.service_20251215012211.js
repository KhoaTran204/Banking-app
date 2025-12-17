require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return {
      message: "There is no token !",
      isVerified: false,
    };
  }
  try {
    const decodes = await jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return {
      message: "There is no token !",
      isVerified: false,
      error,
    };
  }
};

module.exports = { verifyToken };
