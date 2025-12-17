const loginFunc = async (req, resizeBy, schema) => {
  try {
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
