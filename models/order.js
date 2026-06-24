import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: String,
  title: String,
  price: Number,
  quantity: Number,
});

const orderSchema = new mongoose.Schema({
  items: [orderItemSchema],
  name: String,
  contact: String,
  address: String,
  details: String,
  total: Number,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
