// src/components/InvoiceForm.jsx
import { useState } from "react";
import DatePickerInput from "../Utils/DatePicker";

function InvoiceForm({ onInvoiceCreated }) {
  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [PO, setPO] = useState(-1);
  const [submitPO, setSubmitPO] = useState(false);

  const [formData, setFormData] = useState({
    invoiceReference: "",
    invoiceDate: "",
    invoiceStart: "",
    invoiceEnd: "",
    amount: "",
  });

  const validate = () => {
    const errors = {};
    if (!formData.invoiceReference.trim())
      errors.invoiceReference = "Reference is required";
    if (!formData.invoiceDate) errors.invoiceDate = "Invoice date is required";
    if (!formData.invoiceStart)
      errors.invoiceStart = "Period start is required";
    if (!formData.invoiceEnd) errors.invoiceEnd = "Period end is required";
    if (!formData.amount || isNaN(formData.amount))
      errors.amount = "Enter a valid amount";
    if (formData.invoiceStart > formData.invoiceEnd)
      errors.invoiceEnd = "End must be on or after start date";

    return errors;
  };

  const handleSubmitPO = (e) => {
    e.preventDefault();

    if (PO > 0) {
      setSubmitPO(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);

    try {
      const response = await fetch("http://localhost:8080/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount),
        }),
      });

      if (response.ok) {
        const newInvoice = await response.json();
        onInvoiceCreated(newInvoice);
        setFormData({
          invoiceReference: "",
          invoiceDate: "",
          invoiceStart: "",
          invoiceEnd: "",
          amount: "",
        });
      } else {
        console.error("Failed to create invoice");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for field on change.
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="bg-white shadow-md rounded p-6">
      {PO != -1 && submitPO ? (
        <>
          <h2 className="text-2xl font-semibold mb-4">Enter Invoice Details</h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div className="flex flex-col">
              <label htmlFor="invoiceReference" className="mb-1">
                Reference:
              </label>
              <input
                id="invoiceReference"
                type="text"
                name="invoiceReference"
                value={formData.invoiceReference}
                onChange={handleInputChange}
                placeholder="Invoice Reference"
                className="border rounded p-2"
                required
              />
              {formErrors.invoiceReference && (
                <span className="text-red-500 text-sm">
                  {formErrors.invoiceReference}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="invoiceDate" className="mb-1">
                Invoice Date:
              </label>
              <DatePickerInput
                selected={formData.invoiceDate}
                required
                onChange={(date) =>
                  setFormData((prev) => ({ ...prev, invoiceDate: date }))
                }
                placeholderText="Invoice Date"
              />
              {formErrors.invoiceDate && (
                <span className="text-red-500 text-sm">
                  {formErrors.invoiceDate}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="invoiceStart" className="mb-1">
                Period Start:
              </label>

              <DatePickerInput
                selected={formData.invoiceStart}
                required
                onChange={(date) =>
                  setFormData((prev) => ({ ...prev, invoiceStart: date }))
                }
                placeholderText="Start Date"
              />
              {formErrors.invoiceStart && (
                <span className="text-red-500 text-sm">
                  {formErrors.invoiceStart}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="invoiceEnd" className="mb-1">
                Period End:
              </label>
              <DatePickerInput
                selected={formData.invoiceEnd}
                required
                onChange={(date) =>
                  setFormData((prev) => ({ ...prev, invoiceEnd: date }))
                }
                placeholderText="End Date"
              />
              {formErrors.invoiceEnd && (
                <span className="text-red-500 text-sm">
                  {formErrors.invoiceEnd}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="amount" className="mb-1">
                Amount:
              </label>
              <input
                id="amount"
                type="number"
                step="0.01"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                className="border rounded p-2"
                required
              />
              {formErrors.amount && (
                <span className="text-red-500 text-sm">
                  {formErrors.amount}
                </span>
              )}
            </div>

            <div className="sm:col-span-2 flex justify-end mt-4">
              <button
                type="submit"
                disabled={submitting}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Create Invoice"}
              </button>
            </div>
          </form>
        </>
      ) : (
        <div>
          <form onSubmit={handleSubmitPO}>
            <label>
              PO:{" "}
              <input
                type="number"
                onChange={(e) => setPO(+e.currentTarget.value)}
                required
                className="border rounded p-2"
              />
            </label>
          </form>
        </div>
      )}
    </div>
  );
}

export default InvoiceForm;
