const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true },
  Password: { type: String, required: true },
});
const UserModel = mongoose.model("mock_15_user", userSchema);

module.exports = { UserModel };
