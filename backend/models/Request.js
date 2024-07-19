const mongoose = require("mongoose");
const MRFmaterialListSchema = new mongoose.Schema({
  materiallist: String,
  name: String,
  code: String,
  quantity: String,
  uom: String,
  created_by: String,
  created_at: String,
  updated_at: String,
  request_detail_id: String,
  document_number: Number, // Ensure the type matches
});

module.exports = mongoose.model("Request", MRFmaterialListSchema);
