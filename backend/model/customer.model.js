const momgo = require("mongoose");
const { Schema } = momgo;

const customersSchema = new Schema(
  {
    // ===== THÔNG TIN TÀI KHOẢN =====
    accountNo: Number,
    bankCardNo: {
      type: String,
      unique: true,
      required: true,
    },

    brandingId: {
      type: Schema.Types.ObjectId,
      ref: "branding",
      required: true,
    },

    // ===== THÔNG TIN CÁ NHÂN =====
    fullname: String,
    mobile: String,
    fathername: String,

    email: {
      type: String,
      unique: true,
    },

    dob: String,
    gender: String,
    currency: String,

    // ===== FILE & HÌNH ẢNH =====
    profile: String,
    signature: String,
    document: String,

    // ===== HỆ THỐNG =====
    key: String,

    finalBalance: {
      type: Number,
      default: 0,
    },

    address: String,
    userType: String,
    branch: String,
    createdBy: String,

    customerLoginId: String,

    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = momgo.model("customer", customersSchema);
