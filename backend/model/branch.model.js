const momgo = require("mongoose");
const { Schema } = momgo;

const branchSchema = new Schema(
  {
    branchName: {
      type: String,
      unique: true,
    },
    key: String,
    branchAddress: String,
  },
  { timestamps: true }
);

module.exports = momgo.model("branch", branchSchema);
