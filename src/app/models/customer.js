import mongoose from "mongoose"

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  address: { type: String },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Customer || mongoose.model("Customer", customerSchema)
