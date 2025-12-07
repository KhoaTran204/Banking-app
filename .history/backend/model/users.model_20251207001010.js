const momgo = require("mongoose");
const { Schema } = momgo;

const usersSchema = new Schema(
  {
    fullname: String,
    mobile: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    profile: String,
    address: String,
    userType: String,
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = momgo.model("user", usersSchema);
