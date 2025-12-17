const dbService = require("../services/db.service");
const loginFunc = async (req, res, schema) => {
  try {
    const { email, password } = req.body;
    const query = {
      email,
    };
    const dbRes = await dbService.findOneRecord(query, schema);
    console.log(dbRes);
    return resizeBy.status(500).json({
      message: "Internal server error  !",
      isLogged: false,
      error,
    });
  } catch (error) {
    return resizeBy.status(500).json({
      message: "Internal server error  !",
      isLogged: false,
      error,
    });
  }
};
module.exports = {
  loginFunc,
};
