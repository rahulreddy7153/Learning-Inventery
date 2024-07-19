const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CreateGRNSchema = new mongoose.Schema({
  supplierName: {
    type: Schema.Types.ObjectId,
    ref: "suppliers",
  },
  projectname: {
    type: Schema.Types.ObjectId,
    ref: "products",
  },
  invoiceno: String,
  invoicedate: Date,
  pono: String,
  podate: Date,
  transportername: String,
  contactno: String,
  vehicleno: String,
  ewaybillno: String,
  ewaybilldate: Date,
  reciptdate: Date,
  expirydate: Date,
  created_by: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  created_at: String,
  updated_at: String,
  remark_: String,
  document_number: {
    type: String,
    default: "",
  },
  document_type: {
    type: String,
    enum: ["GRN", "MIN"],
    required: true,
  },
});
CreateGRNSchema.pre("save", async function (next) {
  const doc = this;
  doc.created_at = new Date().toISOString();

  if (doc.isNew) {
    try {
      const prefix = doc.document_type;
      const lastDoc = await mongoose
        .model("stockLedgerDetails")
        .findOne({ document_type: prefix })
        .sort({ created_at: -1 });

      if (lastDoc && lastDoc.document_number) {
        const lastDocNumber = parseInt(
          lastDoc.document_number.split("-")[1],
          10
        );
        if (!isNaN(lastDocNumber)) {
          doc.document_number = `${prefix}-${lastDocNumber + 1}`;
        } else {
          doc.document_number = `${prefix}-1`;
        }
      } else {
        doc.document_number = `${prefix}-1`;
      }
    } catch (error) {
      return next(error);
    }
  }
  next();
});
module.exports = mongoose.model("stockLedgerDetails", CreateGRNSchema);
