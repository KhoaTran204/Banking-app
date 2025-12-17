const momgo = require("mongoose");
const { Schema } = momgo;

const currencySchema = new Schema(
  {
    currencyName: {
      type: String,
      unique: true,
    },
    key: String,
    currencyDesc: String,
  },
  { timestamps: true }
);

module.exports = momgo.model("branch", currencySchema);
