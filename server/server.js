import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import "dotenv/config";
import mongoose from "mongoose";

//import routes
import purchaseOrderRoutes from "./routes/purchaseOrders.js";
import vendorRoutes from "./routes/vendors.js";
import invoiceRoutes from "./routes/invoices.js";

const app = express();
const port = process.env.PORT || 8080;
const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
const corsOptions = {
  origin: frontendOrigin,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [frontendOrigin],
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/purchase-orders", purchaseOrderRoutes);
app.use("/vendors", vendorRoutes);
app.use("/invoices", invoiceRoutes(io));

server.listen(port, () => {
  console.log(`Server running with Socket IO at http://localhost:${port}`);
});

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on("disconnect", (reason) => {
    console.log(`Client disconnected: ${socket.id}, Reason: ${reason}`);
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });
});
