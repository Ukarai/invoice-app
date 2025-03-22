import express from "express";
import Invoice from "../models/Invoice.js";

const router = express.Router();

export default (io) => {
  router.post("/", async (req, res) => {
    try {
      const {
        invoiceReference,
        invoiceDate,
        invoiceStart,
        invoiceEnd,
        amount,
      } = req.body;

      if (
        !invoiceReference ||
        !invoiceDate ||
        !invoiceStart ||
        !invoiceEnd ||
        amount === undefined
      ) {
        return res
          .status(400)
          .json({ success: false, error: "Missing required fields." });
      }

      const newInvoice = new Invoice({
        invoiceReference,
        invoiceDate,
        invoiceStart,
        invoiceEnd,
        amount,
      });

      const savedInvoice = await newInvoice.save();
      io.emit("new-invoice", savedInvoice); // Emit event for new invoice
      res.status(201).json({ success: true, data: savedInvoice });
    } catch (error) {
      console.error("Error creating invoice:", error);
      res
        .status(500)
        .json({ success: false, error: "Server error creating invoice." });
    }
  });

  router.get("/", async (req, res) => {
    try {
      const { page, limit } = req.query;
      const invoices = await Invoice.find({})
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
      const totalInvoices = await Invoice.countDocuments();

      res.json({
        success: true,
        data: invoices,
        pagination: {
          total: totalInvoices,
          page: parseInt(page),
          limit: parseInt(limit),
        },
      });
    } catch (error) {
      console.error("Error fetching invoices:", error);
      res
        .status(500)
        .json({ success: false, error: "Server error fetching invoices." });
    }
  });

  router.get("/:reference", async (req, res) => {
    try {
      const invoice = await Invoice.findOne({
        invoiceReference: req.params.reference,
      });
      if (!invoice) {
        return res
          .status(404)
          .json({ success: false, error: "Invoice not found." });
      }
      res.json({ success: true, data: invoice });
    } catch (error) {
      console.error("Error fetching invoice:", error);
      res
        .status(500)
        .json({ success: false, error: "Server error fetching invoice." });
    }
  });

  router.put("/:reference", async (req, res) => {
    try {
      const { invoiceDate, invoiceStart, invoiceEnd, amount } = req.body;
      const updatedInvoice = await Invoice.findOneAndUpdate(
        { invoiceReference: req.params.reference },
        { invoiceDate, invoiceStart, invoiceEnd, amount },
        { new: true, runValidators: true }
      );

      if (!updatedInvoice) {
        return res
          .status(404)
          .json({ success: false, error: "Invoice not found." });
      }

      io.emit("update-invoice", updatedInvoice); // Emit event for updated invoice
      res.json({ success: true, data: updatedInvoice });
    } catch (error) {
      console.error("Error updating invoice:", error);
      res
        .status(500)
        .json({ success: false, error: "Server error updating invoice." });
    }
  });

  router.delete("/:reference", async (req, res) => {
    try {
      const deletedInvoice = await Invoice.findOneAndDelete({
        invoiceReference: req.params.reference,
      });

      if (!deletedInvoice) {
        return res
          .status(404)
          .json({ success: false, error: "Invoice not found." });
      }

      io.emit("delete-invoice", deletedInvoice); // Emit event for deleted invoice
      res.json({
        success: true,
        message: "Invoice deleted.",
        data: deletedInvoice,
      });
    } catch (error) {
      console.error("Error deleting invoice:", error);
      res
        .status(500)
        .json({ success: false, error: "Server error deleting invoice." });
    }
  });

  return router;
};
