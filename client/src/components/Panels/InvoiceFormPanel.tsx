import InvoiceForm from "../../components/Invoice/InvoiceForm";

const InvoiceFormPanel = ({ onInvoiceCreated }) => {
  return (
    <>
      <h2>Enter Invoice Details</h2>
      <InvoiceForm onInvoiceCreated={onInvoiceCreated} />
    </>
  );
};

export default InvoiceFormPanel;
