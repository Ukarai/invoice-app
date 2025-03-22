import { useEffect, useState, useMemo } from "react";
import { io } from "socket.io-client";
import InvoiceStreamPanel from "../components/Panels/InvoiceStreamPanel";
import InvoiceFormPanel from "../components/Panels/InvoiceFormPanel";

function InvoiceManagementPage() {
  const [invoices, setInvoices] = useState([]);
  const [filterTerm, setFilterTerm] = useState("");
  const [filterStartDate, setFilterStartDate] = useState(null);
  const [filterEndDate, setFilterEndDate] = useState(null);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const invoicesPerPage = 5;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchInvoices = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8080/invoices/");
      if (!response.ok) {
        throw new Error("Server error: " + response.statusText);
      }
      const data = await response.json();
      setInvoices(data.data);
    } catch (err) {
      console.error("Error fetching invoices:", err);

      setError("Unable to load invoices. Please check connection to database");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
    const socket = io("http://localhost:8080");
    socket.on("new-invoice", fetchInvoices);
    return () => {
      socket.off("new-invoice", fetchInvoices);
      socket.disconnect();
    };
  }, []);

  const handleInvoiceCreated = () => {
    fetchInvoices();
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Filtering and sorting logic.
  const filteredAndSortedInvoices = useMemo(() => {
    let filtered = [...invoices];

    // Apply filtering
    if (filterTerm.trim() !== "") {
      filtered = filtered.filter((invoice) =>
        invoice.invoiceReference
          .toLowerCase()
          .includes(filterTerm.toLowerCase())
      );
    }

    if (filterStartDate) {
      filtered = filtered.filter(
        (invoice) => new Date(invoice.invoiceStart) >= filterStartDate
      );
    }
    if (filterEndDate) {
      filtered = filtered.filter(
        (invoice) => new Date(invoice.invoiceStart) <= filterEndDate
      );
    }

    // Default sort by createdAt if no sort field is selected. Otherwise sort as before
    if (sortField) {
      filtered.sort((a, b) => {
        let aVal = a[sortField];
        let bVal = b[sortField];
        if (["invoiceDate", "invoiceStart", "invoiceEnd"].includes(sortField)) {
          aVal = new Date(aVal);
          bVal = new Date(bVal);
        }
        if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
        if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    } else {
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    return filtered;
  }, [
    invoices,
    filterTerm,
    filterStartDate,
    filterEndDate,
    sortField,
    sortOrder,
  ]);

  const totalPages = Math.ceil(
    filteredAndSortedInvoices.length / invoicesPerPage
  );
  const paginatedInvoices = useMemo(() => {
    const startIndex = (currentPage - 1) * invoicesPerPage;
    return filteredAndSortedInvoices.slice(
      startIndex,
      startIndex + invoicesPerPage
    );
  }, [filteredAndSortedInvoices, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterTerm, filterStartDate, filterEndDate, sortField, sortOrder]);

  return (
    <div className="min-h-screen min-w-screen bg-white flex flex-row flex-nowrap">
      <div className="pl-4 min-w-1/2 max-w-1/2">
        <InvoiceStreamPanel
          filterTerm={filterTerm}
          setFilterTerm={setFilterTerm}
          filterStartDate={filterStartDate}
          setFilterStartDate={setFilterStartDate}
          filterEndDate={filterEndDate}
          setFilterEndDate={setFilterEndDate}
          paginatedInvoices={paginatedInvoices}
          handleSort={handleSort}
          sortField={sortField}
          sortOrder={sortOrder}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          loading={loading}
          error={error}
        />
      </div>
      <div className="w-full">
        <InvoiceFormPanel onInvoiceCreated={handleInvoiceCreated} />
      </div>
    </div>
  );
}

export default InvoiceManagementPage;
