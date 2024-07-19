const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CreateMRFSchema = new mongoose.Schema({
  contractorName: String,
  contractorStoreName: String,
  companyStoreName: { type: Schema.Types.ObjectId, ref: "companystore" },
  projectname: { type: Schema.Types.ObjectId, ref: "products" },
  workOrderNo: String,
  remark_: String,

  created_by: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  created_at: String,
  updated_at: String,
  document_number: { type: Number, default: 0 },
});

// Counter schema for maintaining sequence
const CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const counter = mongoose.model("counter1", CounterSchema);

// Pre-save hook for CreateGRNSchema to increment document_number
CreateMRFSchema.pre("save", async function (next) {
  try {
    const counterDoc = await counter.findByIdAndUpdate(
      { _id: "document_number" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.document_number = counterDoc.seq;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("RequestDetails", CreateMRFSchema);
