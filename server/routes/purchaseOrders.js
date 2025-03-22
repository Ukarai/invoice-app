import express from "express";
import PurchaseOrder from "../models/PurchaseOrder.js";

const router = express.Router();

export default (io) => {
  router.post("/", async (req, res) => {
    try {
      const {
        orderNumber,
        vendor,
        description,
        orderDate,
        totalValue,
        startDate,
        endDate,
        status,
        attachments,
      } = req.body;

      if (!orderNumber || !vendor || !orderDate || !startDate || !endDate) {
        return res
          .status(400)
          .json({ success: false, error: "Missing required fields." });
      }

      const newPO = new PurchaseOrder({
        orderNumber,
        vendor,
        description,
        orderDate,
        totalValue,
        startDate,
        endDate,
        status,
        attachments,
      });

      const savedPO = await newPO.save();
      io.emit("new-purchase-order", savedPO); // Emit event for new purchase order
      res.status(201).json({ success: true, data: savedPO });
    } catch (error) {
      console.error("Error creating purchase order:", error);
      res.status(500).json({
        success: false,
        error: "Server error creating purchase order.",
      });
    }
  });

  router.get("/", async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query; // Default to page 1, limit 10
      const purchaseOrders = await PurchaseOrder.find({})
        .populate("vendor")
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
      const totalPOs = await PurchaseOrder.countDocuments();

      res.json({
        success: true,
        data: purchaseOrders,
        pagination: {
          total: totalPOs,
          page: parseInt(page),
          limit: parseInt(limit),
        },
      });
    } catch (error) {
      console.error("Error fetching purchase orders:", error);
      res.status(500).json({
        success: false,
        error: "Server error fetching purchase orders.",
      });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const purchaseOrder = await PurchaseOrder.findById(
        req.params.id
      ).populate("vendor");
      if (!purchaseOrder) {
        return res
          .status(404)
          .json({ success: false, error: "Purchase order not found." });
      }
      res.json({ success: true, data: purchaseOrder });
    } catch (error) {
      console.error("Error fetching purchase order:", error);
      res.status(500).json({
        success: false,
        error: "Server error fetching purchase order.",
      });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const updatedPO = await PurchaseOrder.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      ).populate("vendor");

      if (!updatedPO) {
        return res
          .status(404)
          .json({ success: false, error: "Purchase order not found." });
      }

      io.emit("update-purchase-order", updatedPO); // Emit event for updated purchase order
      res.json({ success: true, data: updatedPO });
    } catch (error) {
      console.error("Error updating purchase order:", error);
      res.status(500).json({
        success: false,
        error: "Server error updating purchase order.",
      });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const deletedPO = await PurchaseOrder.findByIdAndDelete(req.params.id);
      if (!deletedPO) {
        return res
          .status(404)
          .json({ success: false, error: "Purchase order not found." });
      }

      io.emit("delete-purchase-order", deletedPO);
      res.json({
        success: true,
        message: "Purchase order deleted.",
        data: deletedPO,
      });
    } catch (error) {
      console.error("Error deleting purchase order:", error);
      res.status(500).json({
        success: false,
        error: "Server error deleting purchase order.",
      });
    }
  });

  return router;
};
