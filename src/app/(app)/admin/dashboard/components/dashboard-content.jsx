"use client"

import { useState, useEffect } from "react"
import { ShoppingBag, DollarSign, Utensils, Clock, TrendingUp } from "lucide-react"

export default function DashboardContent() {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("/api/admin/dashboard")
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data")
        }
        const data = await response.json()
        setDashboardData(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  // Use default data if API data is not available yet
  const stats = dashboardData?.stats || {
    revenue: "0.00",
    orderCount: 0,
    activeMenuItems: 0,
    avgDeliveryTime: 0,
    revenueChange: "0.0",
    orderChange: "0.0",
    newMenuItems: 0,
  }

  const recentOrders = dashboardData?.recentOrders || []

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stats cards */}
        <div className="bg-gray-800 rounded-lg p-6 border border-red-900/20 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Orders</p>
              <h3 className="text-2xl font-bold mt-1">{stats.orderCount}</h3>
              <p
                className={`${Number.parseFloat(stats.orderChange) >= 0 ? "text-green-500" : "text-red-500"} text-xs mt-2 flex items-center`}
              >
                <TrendingUp size={14} className="mr-1" /> {Number.parseFloat(stats.orderChange) >= 0 ? "+" : ""}
                {stats.orderChange}% from last week
              </p>
            </div>
            <div className="bg-red-900/30 p-3 rounded-lg">
              <ShoppingBag className="h-6 w-6 text-red-500" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-red-900/20 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Revenue</p>
              <h3 className="text-2xl font-bold mt-1">₹ {stats.revenue}</h3>
              <p
                className={`${Number.parseFloat(stats.revenueChange) >= 0 ? "text-green-500" : "text-red-500"} text-xs mt-2 flex items-center`}
              >
                <TrendingUp size={14} className="mr-1" /> {Number.parseFloat(stats.revenueChange) >= 0 ? "+" : ""}
                {stats.revenueChange}% from last week
              </p>
            </div>
            <div className="bg-red-900/30 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-red-500" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-red-900/20 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Menu Items</p>
              <h3 className="text-2xl font-bold mt-1">{stats.activeMenuItems}</h3>
              <p className="text-yellow-500 text-xs mt-2 flex items-center">
                <TrendingUp size={14} className="mr-1" /> +{stats.newMenuItems} new items
              </p>
            </div>
            <div className="bg-red-900/30 p-3 rounded-lg">
              <Utensils className="h-6 w-6 text-red-500" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-red-900/20 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Avg. Delivery Time</p>
              <h3 className="text-2xl font-bold mt-1">{stats.avgDeliveryTime} min</h3>
              <p className="text-green-500 text-xs mt-2 flex items-center">
                <TrendingUp size={14} className="mr-1" /> -2 min from last week
              </p>
            </div>
            <div className="bg-red-900/30 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-red-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="bg-gray-800 rounded-lg border border-red-900/20 shadow-lg overflow-hidden">
        <div className="p-6 border-b border-red-900/20">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-900">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {recentOrders.length > 0 ? (
                recentOrders.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{order.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{order.items}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{order.total}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          order.status === "Delivered"
                            ? "bg-green-900/30 text-green-400"
                            : order.status === "Preparing"
                              ? "bg-yellow-900/30 text-yellow-400"
                              : "bg-blue-900/30 text-blue-400"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{order.time}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-400">
                    No recent orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
