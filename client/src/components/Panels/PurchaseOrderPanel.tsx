// src/components/Panels/PurchaseOrderPanel.jsx
import PurchaseOrderForm from "../../components/PurchaseOrder/PurchaseOrderForm";
import CollapsiblePanel from "./CollapsiblePanel";

const PurchaseOrderPanel = ({ onSubmit }) => {
  return (
    <CollapsiblePanel title="Purchase Order Creation" defaultOpen={false}>
      <PurchaseOrderForm onSubmit={onSubmit} />
    </CollapsiblePanel>
  );
};

export default PurchaseOrderPanel;
