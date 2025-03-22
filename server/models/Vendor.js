import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String },
    email: { type: String },
    phone: { type: String },
    taxId: { type: String }, // e.g., tax identification number
    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Vendor", vendorSchema);
