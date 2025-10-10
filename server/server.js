import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js"; // 👈 Add this

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch(err => console.log("❌ MongoDB connection failed:", err.message));

app.use("/api/products", productRoutes); // 👈 Mount routes here

app.get("/", (req, res) => {
  res.send("Server is running and MongoDB is connected!");
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

