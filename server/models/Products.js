import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  userId: String, // Firebase user UID
}, { timestamps: true });

export default mongoose.model("Product", productSchema);

