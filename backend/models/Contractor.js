const mongoose = require("mongoose");
const contractorSchema = new mongoose.Schema({
  name: String,
  code: String,
  email: String,
  mobileno: String,
  gstno: String,
  address: String,
  country: String,
  state: String,
  city: String,
  pincode: String,
});

module.exports = mongoose.model("contractor", contractorSchema);
