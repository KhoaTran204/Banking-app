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
};

module.exports = { verifyToken };
