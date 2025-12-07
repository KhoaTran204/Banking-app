const createData = (req, res, schema) => {
  try {
    const data = req.body;
    res.status(200).json({
      message: "Data received",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

module.exports = {
  createData,
};
