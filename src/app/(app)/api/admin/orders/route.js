import { NextResponse } from "next/server"
import connectDB from "../../../../lib/mongodb"
import Order from "../../../../models/order"
import Customer from "../../../../models/customer"


export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page")) || 1
    const limit = Number.parseInt(searchParams.get("limit")) || 10
    const status = searchParams.get("status")
    const search = searchParams.get("search")

    const skip = (page - 1) * limit

    // Build query
    let query = {}

    if (status && status !== "All") {
      query.status = status
    }

    if (search) {
      query = {
        ...query,
        $or: [
          { orderId: { $regex: search, $options: "i" } },
          { "customer.name": { $regex: search, $options: "i" } },
          { "customer.email": { $regex: search, $options: "i" } },
        ],
      }
    }

    // Get total count for pagination
    const total = await Order.countDocuments(query)

    // Get orders
    const orders = await Order.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit)

    // Format orders for response
    const formattedOrders = orders.map((order) => ({
      id: order.orderId,
      customer: order.customer.name,
      email: order.customer.email,
      phone: order.customer.phone,
      address: order.customer.address,
      items: order.items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: order.total,
      status: order.status,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      deliveredAt: order.deliveredAt,
    }))

    return NextResponse.json({
      orders: formattedOrders,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Orders API Error:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    await connectDB()

    const body = await request.json()

    // 1. Check if customer already exists
    let customer = await Customer.findOne({ email: body.customer.email })

    if (!customer) {
      // 2. Create a new customer if not exists
      customer = new Customer({
        name: body.customer.name,
        email: body.customer.email,
        phone: body.customer.phone,
        address: body.customer.address,
      })
      await customer.save()
    } else {
      // Optional: update existing customer's phone/address if changed
      customer.name = body.customer.name
      customer.phone = body.customer.phone
      customer.address = body.customer.address
      await customer.save()
    }

    // 3. Create new order
    const newOrder = new Order({
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
      },
      items: body.items.map((item) => ({
        menuItem: item.menuItemId,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: body.total,
      status: body.status || "Pending",
      paymentMethod: body.paymentMethod || "Cash",
      paymentStatus: body.paymentStatus || "Pending",
    })

    await newOrder.save()

    // 4. Push the order into customer's order list
    customer.orders.push(newOrder._id)
    await customer.save()

    return NextResponse.json(
      {
        message: "Order created successfully",
        order: {
          id: newOrder.orderId,
          customer: newOrder.customer.name,
          total: newOrder.total,
          status: newOrder.status,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create Order API Error:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}