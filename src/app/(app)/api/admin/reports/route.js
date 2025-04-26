import { NextResponse } from "next/server"
import connectDB from "../../../../lib/mongodb"
import Order from "../../../../models/order"

export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "week" // week, month, year

    // Calculate date ranges based on period
    const endDate = new Date()
    const startDate = new Date()

    switch (period) {
      case "week":
        startDate.setDate(startDate.getDate() - 7)
        break
      case "month":
        startDate.setMonth(startDate.getMonth() - 1)
        break
      case "year":
        startDate.setFullYear(startDate.getFullYear() - 1)
        break
      default:
        startDate.setDate(startDate.getDate() - 7)
    }

    // Get orders within date range
    const orders = await Order.find({
      createdAt: { $gte: startDate, $lte: endDate },
    })

    // Revenue by day
    const revenueByDay = {}
    const ordersByDay = {}

    orders.forEach((order) => {
      const date = new Date(order.createdAt).toISOString().split("T")[0]

      if (!revenueByDay[date]) {
        revenueByDay[date] = 0
        ordersByDay[date] = 0
      }

      revenueByDay[date] += order.total
      ordersByDay[date] += 1
    })

    // Convert to arrays for charts
    const revenueData = Object.entries(revenueByDay).map(([date, amount]) => ({
      date,
      amount,
    }))

    const orderData = Object.entries(ordersByDay).map(([date, count]) => ({
      date,
      count,
    }))

    // Popular items
    const itemCounts = {}

    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (!itemCounts[item.name]) {
          itemCounts[item.name] = 0
        }
        itemCounts[item.name] += item.quantity
      })
    })

    const popularItems = Object.entries(itemCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    // Order status distribution
    const statusCounts = {
      Pending: 0,
      Preparing: 0,
      "In Transit": 0,
      Delivered: 0,
      Cancelled: 0,
    }

    orders.forEach((order) => {
      if (statusCounts[order.status] !== undefined) {
        statusCounts[order.status] += 1
      }
    })

    const statusData = Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count,
    }))

    return NextResponse.json({
      revenueData,
      orderData,
      popularItems,
      statusData,
      summary: {
        totalOrders: orders.length,
        totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
        averageOrderValue: orders.length > 0 ? orders.reduce((sum, order) => sum + order.total, 0) / orders.length : 0,
      },
    })
  } catch (error) {
    console.error("Reports API Error:", error)
    return NextResponse.json({ error: "Failed to generate reports" }, { status: 500 })
  }
}
