import DatePickerInput from "../../components/Utils/DatePicker";
import InvoiceTable from "../../components/Invoice/InvoiceTable";
import Pagination from "../../components/Utils/Pagination";

const InvoiceStreamPanel = ({
  filterTerm,
  setFilterTerm,
  filterStartDate,
  setFilterStartDate,
  filterEndDate,
  setFilterEndDate,
  paginatedInvoices,
  handleSort,
  sortField,
  sortOrder,
  currentPage,
  totalPages,
  onPageChange,
  loading,
  error,
}) => {
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center p-4">
          <p>Loading invoices...</p>
        </div>
      ) : error ? (
        <div className="p-4 text-center text-red-600">
          <p>{error}</p>
        </div>
      ) : (
        <div className="min-h-full flex flex-col">
          <div className="mb-4 space-y-2 flex gap-2">
            <input
              type="text"
              placeholder="Filter by reference"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={filterTerm}
              onChange={(e) => setFilterTerm(e.target.value)}
            />
            <DatePickerInput
              selected={filterStartDate}
              onChange={setFilterStartDate}
              placeholderText="Start Date"
            />
            <DatePickerInput
              selected={filterEndDate}
              onChange={setFilterEndDate}
              placeholderText="End Date"
            />
          </div>
          <InvoiceTable
            invoices={paginatedInvoices}
            onSort={handleSort}
            sortField={sortField}
            sortOrder={sortOrder}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </>
  );
};

export default InvoiceStreamPanel;
