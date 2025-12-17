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

branchSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

module.exports = momgo.model("user", branchSchema);
