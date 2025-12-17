const dbService = require("../services/db.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginFunc = async (req, res, schema) => {
  try {
    const { email, password } = req.body;
    const query = {
      email,
    };
    const dbRes = await dbService.findOneRecord(query, schema);
    if (dbRes) {
      const isMatch = await bcrypt.compare(password, dbRes.password);
      if (isMatch) {
        if (dbRes.isActive) {
          return res.status(200).json({
            message: "Data found !",
            isLogged: true,
          });
        }
      } else {
        return res.status(401).json({
          message: "Invalid credencials !",
          isLogged: false,
        });
      }
    } else {
      return res.status(401).json({
        message: "Invalid credencials !",
        isLogged: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error  !",
      isLogged: false,
      error,
    });
  }
};
module.exports = {
  loginFunc,
};
