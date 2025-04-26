import { NextResponse } from "next/server"
import connectDB from "../../../../lib/mongodb"
import Order from "../../../../models/order"
import MenuItem from "../../../../models/menu"
import { calculateStats } from "../../../../lib/utils"

export async function GET() {
  try {
    await connectDB()

    // Get recent orders (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const orders = await Order.find({
      createdAt: { $gte: thirtyDaysAgo },
    }).sort({ createdAt: -1 })

    // Get all menu items
    const menuItems = await MenuItem.find()

    // Get recent orders for display (limit to 5)
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5).populate("items.menuItem")

    // Format recent orders for display
    const formattedRecentOrders = recentOrders.map((order) => {
      return {
        id: order.orderId,
        customer: order.customer.name,
        items: order.items.map((item) => item.name).join(", "),
        total: `₹${order.total.toFixed(2)}`,
        status: order.status,
        time: getTimeAgo(order.createdAt),
      }
    })

    // Calculate dashboard statistics
    const stats = calculateStats(orders, menuItems)

    return NextResponse.json({
      stats,
      recentOrders: formattedRecentOrders,
    })
  } catch (error) {
    console.error("Dashboard API Error:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 })
  }
}

// Helper function to calculate time ago
function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000)

  let interval = seconds / 3600
  if (interval < 1) {
    interval = seconds / 60
    return Math.floor(interval) + " min ago"
  }
  if (interval < 24) {
    return Math.floor(interval) + " hours ago"
  }
  interval = seconds / 86400
  return Math.floor(interval) + " days ago"
}
