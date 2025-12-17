const dbService = require("../services/db.service");
const loginFunc = async (req, res, schema) => {
  try {
    const { email, password } = req.body;
    const query = {
      email,
    };
    const dbRes = await dbService.findOneRecord(query, schema);
    if (dbRes) {
    } else {
      return res.status(200).json({
        message: "Data found !",
        isLogged: true,
        data: dbRes,
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
