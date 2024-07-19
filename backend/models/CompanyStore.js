const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companystoreSchema = new mongoose.Schema({
  organizationId: {
    type: Schema.Types.ObjectId,
    ref: "companys",
  },
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

module.exports = mongoose.model("companystore", companystoreSchema);
