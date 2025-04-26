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
    const search = searchParams.get("search")

    const skip = (page - 1) * limit

    // Build query
    let query = {}

    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
        ],
      }
    }

    // Get total count for pagination
    const total = await Customer.countDocuments(query)

    // Get customers
    const customers = await Customer.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit)

    // Get order counts for each customer
    const customerIds = customers.map((customer) => customer._id)
    const orderCounts = await Order.aggregate([
      {
        $match: {
          "customer.email": { $in: customers.map((c) => c.email) },
        },
      },
      {
        $group: {
          _id: "$customer.email",
          count: { $sum: 1 },
          totalSpent: { $sum: "$total" },
        },
      },
    ])

    // Create a map of email to order count and total spent
    const orderCountMap = orderCounts.reduce((acc, curr) => {
      acc[curr._id] = {
        count: curr.count,
        totalSpent: curr.totalSpent,
      }
      return acc
    }, {})

    // Format customers for response
    const formattedCustomers = customers.map((customer) => ({
      id: customer._id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      orderCount: orderCountMap[customer.email]?.count || 0,
      totalSpent: orderCountMap[customer.email]?.totalSpent || 0,
      createdAt: customer.createdAt,
    }))

    return NextResponse.json({
      customers: formattedCustomers,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Customers API Error:", error)
    return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 })
  }
}
