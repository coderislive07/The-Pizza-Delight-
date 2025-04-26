import { NextResponse } from "next/server"
import connectDB from "../../../../../lib/mongodb"
import Order from "../../../.../../../../models/order"


export async function GET(request, { params }) {
  try {
    await connectDB()

    const { id } = params

    // Find order by ID or orderId
    const order = await Order.findOne({
      $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { orderId: id }],
    }).populate("items.menuItem")

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error("Get Order API Error:", error)
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 })
  }
}

export async function PATCH(request, { params }) {
  try {
    await connectDB()

    const { id } = params
    const body = await request.json()

    // Find order by ID or orderId
    const order = await Order.findOne({
      $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { orderId: id }],
    })

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Update order fields
    if (body.status) {
      order.status = body.status

      // If status is changed to Delivered, set deliveredAt
      if (body.status === "Delivered" && !order.deliveredAt) {
        order.deliveredAt = new Date()
      }
    }

    if (body.paymentStatus) {
      order.paymentStatus = body.paymentStatus
    }

    order.updatedAt = new Date()

    await order.save()

    return NextResponse.json({
      message: "Order updated successfully",
      order: {
        id: order.orderId,
        status: order.status,
        paymentStatus: order.paymentStatus,
      },
    })
  } catch (error) {
    console.error("Update Order API Error:", error)
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB()

    const { id } = params

    // Find order by ID or orderId
    const order = await Order.findOne({
      $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { orderId: id }],
    })

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    await order.deleteOne()

    return NextResponse.json({
      message: "Order deleted successfully",
    })
  } catch (error) {
    console.error("Delete Order API Error:", error)
    return NextResponse.json({ error: "Failed to delete order" }, { status: 500 })
  }
}
