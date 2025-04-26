"use client"

import { useState, useEffect } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Calendar, RefreshCw, TrendingUp, DollarSign, ShoppingBag } from "lucide-react"

export default function AnalyticsContent() {
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState("week")
  const [reportData, setReportData] = useState(null)

  // Fetch analytics data
  useEffect(() => {
    fetchReportData()
  }, [period])

  const fetchReportData = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/reports?period=${period}`)
      if (!response.ok) {
        throw new Error("Failed to fetch report data")
      }

      const data = await response.json()
      setReportData(data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching report data:", error)
      setLoading(false)
    }
  }

  // Colors for charts
  const COLORS = ["#FF6B6B", "#4ECDC4", "#FFD166", "#6A0572", "#AB83A1"]

  return (
    <div className="space-y-6">
      {/* Period selector */}
      <div className="bg-gray-800 rounded-lg p-6 border border-red-900/20 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <h2 className="text-xl font-semibold">Analytics & Reports</h2>

          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <select
              className="bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            >
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="year">Last 12 Months</option>
            </select>
          </div>

          <button
            onClick={fetchReportData}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <div className="bg-gray-800 rounded-lg p-8 border border-red-900/20 shadow-lg text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-red-600 border-r-2 border-red-600 border-b-2 border-transparent"></div>
          <p className="mt-2 text-gray-400">Loading analytics data...</p>
        </div>
      ) : (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-red-900/20 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Orders</p>
                  <h3 className="text-2xl font-bold mt-1">{reportData?.summary.totalOrders || 0}</h3>
                </div>
                <div className="bg-red-900/30 p-3 rounded-lg">
                  <ShoppingBag className="h-6 w-6 text-red-500" />
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-red-900/20 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Revenue</p>
                  <h3 className="text-2xl font-bold mt-1">${reportData?.summary.totalRevenue.toFixed(2) || "0.00"}</h3>
                </div>
                <div className="bg-red-900/30 p-3 rounded-lg">
                  <DollarSign className="h-6 w-6 text-red-500" />
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-red-900/20 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Average Order Value</p>
                  <h3 className="text-2xl font-bold mt-1">
                    ${reportData?.summary.averageOrderValue.toFixed(2) || "0.00"}
                  </h3>
                </div>
                <div className="bg-red-900/30 p-3 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-red-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <div className="bg-gray-800 rounded-lg p-6 border border-red-900/20 shadow-lg">
              <h3 className="text-lg font-medium mb-4">Revenue Trend</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={reportData?.revenueData || []} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="date" stroke="#999" />
                    <YAxis stroke="#999" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#333", border: "1px solid #555" }}
                      labelStyle={{ color: "#fff" }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      name="Revenue ($)"
                      stroke="#FF6B6B"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Orders Chart */}
            <div className="bg-gray-800 rounded-lg p-6 border border-red-900/20 shadow-lg">
              <h3 className="text-lg font-medium mb-4">Order Volume</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reportData?.orderData || []} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="date" stroke="#999" />
                    <YAxis stroke="#999" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#333", border: "1px solid #555" }}
                      labelStyle={{ color: "#fff" }}
                    />
                    <Legend />
                    <Bar dataKey="count" name="Orders" fill="#4ECDC4" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Popular Items */}
            <div className="bg-gray-800 rounded-lg p-6 border border-red-900/20 shadow-lg">
              <h3 className="text-lg font-medium mb-4">Popular Items</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={reportData?.popularItems || []}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis type="number" stroke="#999" />
                    <YAxis dataKey="name" type="category" stroke="#999" width={100} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#333", border: "1px solid #555" }}
                      labelStyle={{ color: "#fff" }}
                    />
                    <Legend />
                    <Bar dataKey="count" name="Orders" fill="#FFD166" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Order Status */}
            <div className="bg-gray-800 rounded-lg p-6 border border-red-900/20 shadow-lg">
              <h3 className="text-lg font-medium mb-4">Order Status Distribution</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={reportData?.statusData || []}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      nameKey="status"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {reportData?.statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: "#333", border: "1px solid #555" }}
                      labelStyle={{ color: "#fff" }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
