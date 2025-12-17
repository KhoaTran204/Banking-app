require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res) => {
  const token = req.headers.authorization.split(" ");
  console.log(token);
};

module.exports = { verifyToken };
