const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    accountNo: {
      type: Number,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("otp", otpSchema);
