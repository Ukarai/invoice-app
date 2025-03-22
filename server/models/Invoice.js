import mongoose from "mongoose";

// models/Invoice.js (extended)
const invoiceSchema = new mongoose.Schema(
  {
    invoiceReference: { type: String, unique: true, required: true },
    invoiceDate: { type: Date, required: true },
    invoiceStart: { type: Date, required: true },
    invoiceEnd: { type: Date, required: true },
    amount: { type: Number, required: true },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Invoice", invoiceSchema);
