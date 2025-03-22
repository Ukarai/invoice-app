function InvoiceRow({ invoice, idx }) {
  if (!invoice) return null;

  return (
    <tr
      className={`${
        idx % 2 === 0 ? "bg-gray-50" : "bg-white"
      } hover:bg-blue-50 transition-colors`}
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {invoice.invoiceReference}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(invoice.invoiceDate).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(invoice.invoiceStart).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(invoice.invoiceEnd).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        £{invoice.amount}
      </td>
    </tr>
  );
}

export default InvoiceRow;
