const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const materialListSchema = new mongoose.Schema({
  materiallist: String,
  name: String,
  code: String,
  receivingstore: {
    type: Schema.Types.ObjectId,
    ref: "companystore",
  },
  quantity: String,
  uom: String,
  rate: String,
  tax: String,
  value: String,
  created_by: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  created_at: String,
  updated_at: String,
  stock_ledger_id: {
    type: Schema.Types.ObjectId,
    ref: "stockLedgerDetails",
  },
  document_number: String,
  document_type: String,
});

module.exports = mongoose.model("stockLedgers", materialListSchema);
