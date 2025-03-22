import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import VendorManagementPage from "./pages/VendorManagementPage.tsx";
import InvoiceManagementPage from "./pages/InvoiceManagementPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <div className="max-h-screen min-w-screen">
        <nav className="flex flex-row gap-4 items-start">
          <Link to="/">Home</Link>
          <Link to="/vendors">Vendors</Link>
          <Link to="/invoices">Invoices</Link>
          <Link to="/">Purchase Orders</Link>
        </nav>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/invoices" element={<InvoiceManagementPage />} />
          <Route path="/vendors" element={<VendorManagementPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  </StrictMode>
);
