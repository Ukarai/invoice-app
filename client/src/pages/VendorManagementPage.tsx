import { useState } from "react";
import VendorList from "../components/Vendor/VendorList";
import VendorForm from "../components/Vendor/VendorForm";

const VendorManagementPage = () => {
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleCreate = () => {
    setSelectedVendor(null);
    setShowForm(true);
  };

  const handleEdit = (vendor) => {
    setSelectedVendor(vendor);
    setShowForm(true);
  };

  const handleSubmit = async (formData) => {
    try {
      const method = selectedVendor ? "PUT" : "POST";
      const url = selectedVendor
        ? `http://localhost:8080/vendors/${selectedVendor._id}`
        : "http://localhost:8080/vendors";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save vendor.");
      }

      setShowForm(false);
      setSelectedVendor(null);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {showForm ? (
        <VendorForm
          initialData={selectedVendor}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <>
          <button
            onClick={handleCreate}
            className="mb-4 px-4 py-2 bg-teal-500 text-white rounded"
          >
            Create Vendor
          </button>
          <VendorList onEdit={handleEdit} />
        </>
      )}
    </div>
  );
};

export default VendorManagementPage;
