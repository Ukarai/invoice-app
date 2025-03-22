// src/components/PurchaseOrder/PurchaseOrderForm.jsx
import React, { useState } from "react";
import DatePickerInput from "../../components/Utils/DatePicker";

function PurchaseOrderForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    orderNumber: "",
    vendorNumber: "",
    description: "",
    orderDate: new Date(),
    totalValue: "",
    startDate: null,
    endDate: null,
    status: "Draft",
    attachments: [],
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.orderNumber.trim()) {
      errs.orderNumber = "Order number is required.";
    }
    if (!formData.vendorNumber.trim()) {
      errs.vendorNumber = "Vendor number is required.";
    }
    if (!formData.startDate) {
      errs.startDate = "Start date is required.";
    }
    if (!formData.endDate) {
      errs.endDate = "End date is required.";
    }
    if (
      formData.startDate &&
      formData.endDate &&
      new Date(formData.startDate) > new Date(formData.endDate)
    ) {
      errs.date = "Start date must be before end date.";
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, date) => {
    setFormData((prev) => ({ ...prev, [name]: date }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Order Number:</label>
        <input
          type="text"
          name="orderNumber"
          value={formData.orderNumber}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        {errors.orderNumber && (
          <p className="text-red-600 text-sm">{errors.orderNumber}</p>
        )}
      </div>
      <div>
        <label>Vendor Number:</label>
        <input
          type="text"
          name="vendorNumber"
          value={formData.vendorNumber}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        {errors.vendorNumber && (
          <p className="text-red-600 text-sm">{errors.vendorNumber}</p>
        )}
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="flex flex-col sm:flex-row sm:gap-4">
        <div className="w-full">
          <label>Order Date:</label>
          <DatePickerInput
            selected={formData.orderDate}
            onChange={(date) => handleDateChange("orderDate", date)}
            placeholderText="Order Date"
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div className="w-full">
          <label>Total Value:</label>
          <input
            type="number"
            name="totalValue"
            value={formData.totalValue}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:gap-4">
        <div className="w-full">
          <label>Start Date:</label>
          <DatePickerInput
            selected={formData.startDate}
            onChange={(date) => handleDateChange("startDate", date)}
            placeholderText="Start Date"
            dateFormat="dd/MM/yyyy"
          />
          {errors.startDate && (
            <p className="text-red-600 text-sm">{errors.startDate}</p>
          )}
        </div>
        <div className="w-full">
          <label>End Date:</label>
          <DatePickerInput
            selected={formData.endDate}
            onChange={(date) => handleDateChange("endDate", date)}
            placeholderText="End Date"
            dateFormat="dd/MM/yyyy"
          />
          {errors.endDate && (
            <p className="text-red-600 text-sm">{errors.endDate}</p>
          )}
        </div>
      </div>
      {errors.date && <p className="text-red-600 text-sm">{errors.date}</p>}
      <button
        type="submit"
        className="px-4 py-2 bg-teal-500 text-white rounded"
      >
        Save Purchase Order
      </button>
    </form>
  );
}

export default PurchaseOrderForm;
