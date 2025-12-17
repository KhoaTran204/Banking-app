const momgo = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = momgo;

const brandingSchema = new Schema(
  {
    fullname: String,
    mobile: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    profile: String,
    key: String,
    address: String,
    userType: String,
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = momgo.model("user", brandingSchema);
