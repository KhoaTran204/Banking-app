const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/bankImages/");
  },
  filename: (req, file, cb) => {
    cb(null, Data.now() + path.extname());
  },
});

const uploadFile = (req, res) => {};
module.exports = {
  uploadFile,
};
