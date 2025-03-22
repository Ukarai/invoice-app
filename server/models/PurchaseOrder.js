import mongoose from "mongoose";

const purchaseOrderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    description: { type: String },
    orderDate: { type: Date, required: true },
    totalValue: { type: Number },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Draft", "Submitted", "Approved", "Rejected"],
      default: "Draft",
    },
    attachments: [String], // Optional attachments URLs or file references.
  },
  { timestamps: true }
);

export default mongoose.model("PurchaseOrder", purchaseOrderSchema);
