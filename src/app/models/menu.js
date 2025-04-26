import mongoose from "mongoose"

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true }, // e.g., Pizza, Sides, Beverages
  isActive: { type: Boolean, default: true },
  image: { type: String }, // URL to image
  ingredients: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export default mongoose.models.MenuItem || mongoose.model("MenuItem", menuItemSchema)
