import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
orderId: { type: String, unique: true, required: false },
  customer: {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    address: { type: String, required: true },
  },
  items: [
    {
      menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MenuItem",
      },
      name: String,
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Pending", "Preparing", "In Transit", "Delivered", "Cancelled"],
    default: "Pending",
  },
  paymentMethod: { type: String, default: "Cash" },
  paymentStatus: { type: String, enum: ["Pending", "Paid"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deliveredAt: { type: Date },
})

// Generate a unique order ID before saving
orderSchema.pre("save", async function (next) {
  if (!this.orderId) {
    // Get the count of all orders and add 1 to create a new order number
    const count = await mongoose.models.Order.countDocuments()
    this.orderId = `ORD-${5290 + count}`
  }
  next()
})

export default mongoose.models.Order || mongoose.model("Order", orderSchema)
