import InvoiceRow from "./InvoiceRow";

function InvoiceTable({ invoices, onSort, sortField, sortOrder }) {
  return (
    <div className="overflow-x-auto grow-100">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              onClick={() => onSort("invoiceReference")}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            >
              Reference{" "}
              {sortField === "invoiceReference"
                ? sortOrder === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th
              onClick={() => onSort("invoiceDate")}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            >
              Date{" "}
              {sortField === "invoiceDate"
                ? sortOrder === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th
              onClick={() => onSort("invoiceStart")}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            >
              Start{" "}
              {sortField === "invoiceStart"
                ? sortOrder === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th
              onClick={() => onSort("invoiceEnd")}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            >
              End{" "}
              {sortField === "invoiceEnd"
                ? sortOrder === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th
              onClick={() => onSort("amount")}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            >
              Amount{" "}
              {sortField === "amount" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {invoices.map((invoice, idx) => (
            <InvoiceRow
              key={invoice.invoiceReference + invoice.amount}
              invoice={invoice}
              idx={idx}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InvoiceTable;
