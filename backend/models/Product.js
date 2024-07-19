const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: String,
  code: String,
  orderno: String,
  startdate: Date,
  signeddate: Date,
  enddate: Date,
  userid: String,
});

module.exports = mongoose.model("products", productSchema);
