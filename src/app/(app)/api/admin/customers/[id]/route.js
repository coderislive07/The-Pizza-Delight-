import { NextResponse } from "next/server"
import connectDB from "../../../../../lib/mongodb"
import Customer from "../../../../../models/customer"
import Order from "../../../../../models/order"

export async function GET(request, { params }) {
  try {
    await connectDB()

    const { id } = params

    const customer = await Customer.findById(id)

    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    }

    // Get customer's orders
    const orders = await Order.find({
      "customer.email": customer.email,
    }).sort({ createdAt: -1 })

    // Calculate total spent
    const totalSpent = orders.reduce((total, order) => total + order.total, 0)

    // Format orders for response
    const formattedOrders = orders.map((order) => ({
      id: order.orderId,
      items: order.items.map((item) => item.name).join(", "),
      total: order.total,
      status: order.status,
      createdAt: order.createdAt,
    }))

    return NextResponse.json({
      customer: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        createdAt: customer.createdAt,
      },
      orders: formattedOrders,
      stats: {
        orderCount: orders.length,
        totalSpent,
      },
    })
  } catch (error) {
    console.error("Get Customer API Error:", error)
    return NextResponse.json({ error: "Failed to fetch customer" }, { status: 500 })
  }
}
