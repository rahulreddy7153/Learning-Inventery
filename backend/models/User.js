const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  password: String,
  username: String,
});

module.exports = mongoose.model("user", userSchema);
