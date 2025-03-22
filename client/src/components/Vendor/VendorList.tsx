import { useEffect, useState } from "react";

const VendorList = ({ onEdit }) => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVendors = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:8080/vendors");
      if (!response.ok) {
        throw new Error("Failed to fetch vendors.");
      }
      const data = await response.json();
      setVendors(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  if (loading) return <p>Loading vendors...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Vendors</h2>
      <ul className="space-y-2">
        {vendors.map((vendor) => (
          <li
            key={vendor._id}
            className="p-4 border rounded flex justify-between items-center"
          >
            <div>
              <p className="font-bold">{vendor.name}</p>
              <p className="text-sm text-gray-600">{vendor.email}</p>
            </div>
            <button
              onClick={() => onEdit(vendor)}
              className="px-4 py-2 bg-teal-500 text-white rounded"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VendorList;
