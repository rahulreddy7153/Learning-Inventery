const mongoose = require("mongoose");
const materialSchema = new mongoose.Schema({
  name: String,
  code: String,
  description: String,
  measurement: String,
  remark: String,
  serialno: String,
});

module.exports = mongoose.model("material", materialSchema);
