import express from "express";
import Vendor from "../models/Vendor.js";

const router = express.Router();

export default (io) => {
  router.post("/", async (req, res) => {
    try {
      const { name, address, email, phone, taxId, status } = req.body;

      if (!name) {
        return res
          .status(400)
          .json({ success: false, error: "Vendor name is required." });
      }

      const newVendor = new Vendor({
        name,
        address,
        email,
        phone,
        taxId,
        status,
      });

      const savedVendor = await newVendor.save();
      if (io) io.emit("new-vendor", savedVendor); // Emit event for new vendor
      res.status(201).json({ success: true, data: savedVendor });
    } catch (error) {
      console.error("Error creating vendor:", error);
      res
        .status(500)
        .json({ success: false, error: "Server error creating vendor." });
    }
  });

  router.get("/", async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query; // Default to page 1, limit 10
      const vendors = await Vendor.find({})
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
      const totalVendors = await Vendor.countDocuments();

      res.json({
        success: true,
        data: vendors,
        pagination: {
          total: totalVendors,
          page: parseInt(page),
          limit: parseInt(limit),
        },
      });
    } catch (error) {
      console.error("Error fetching vendors:", error);
      res
        .status(500)
        .json({ success: false, error: "Server error fetching vendors." });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const vendor = await Vendor.findById(req.params.id);
      if (!vendor) {
        return res
          .status(404)
          .json({ success: false, error: "Vendor not found." });
      }
      res.json({ success: true, data: vendor });
    } catch (error) {
      console.error("Error fetching vendor:", error);
      res
        .status(500)
        .json({ success: false, error: "Server error fetching vendor." });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const { name, address, email, phone, taxId, status } = req.body;
      const updatedVendor = await Vendor.findByIdAndUpdate(
        req.params.id,
        { name, address, email, phone, taxId, status },
        { new: true, runValidators: true }
      );

      if (!updatedVendor) {
        return res
          .status(404)
          .json({ success: false, error: "Vendor not found." });
      }

      if (io) io.emit("update-vendor", updatedVendor); // Emit event for updated vendor
      res.json({ success: true, data: updatedVendor });
    } catch (error) {
      console.error("Error updating vendor:", error);
      res
        .status(500)
        .json({ success: false, error: "Server error updating vendor." });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const deletedVendor = await Vendor.findByIdAndDelete(req.params.id);
      if (!deletedVendor) {
        return res
          .status(404)
          .json({ success: false, error: "Vendor not found." });
      }

      if (io) io.emit("delete-vendor", deletedVendor); // Emit event for deleted vendor
      res.json({
        success: true,
        message: "Vendor deleted.",
        data: deletedVendor,
      });
    } catch (error) {
      console.error("Error deleting vendor:", error);
      res
        .status(500)
        .json({ success: false, error: "Server error deleting vendor." });
    }
  });

  return router;
};
