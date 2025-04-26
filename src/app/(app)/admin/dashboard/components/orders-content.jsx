"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Edit, Trash, RefreshCw } from "lucide-react"

export default function OrdersContent() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [status, setStatus] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Fetch orders
  useEffect(() => {
    fetchOrders()
  }, [page, status, searchTerm])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      let url = `/api/admin/orders?page=${page}&limit=10`
      if (status !== "All") {
        url += `&status=${status}`
      }
      if (searchTerm) {
        url += `&search=${searchTerm}`
      }

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("Failed to fetch orders")
      }

      const data = await response.json()
  
      setOrders(data.orders)
      setTotalPages(data.pagination.totalPages)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching orders:", error)
      setLoading(false)
    }
  }

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        throw new Error("Failed to update order status")
      }

      // Refresh orders
      fetchOrders()
    } catch (error) {
      console.error("Error updating order status:", error)
    }
  }

  // Delete order
  const deleteOrder = async (orderId) => {
    if (!confirm("Are you sure you want to delete this order?")) {
      return
    }

    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete order")
      }

      // Refresh orders
      fetchOrders()
    } catch (error) {
      console.error("Error deleting order:", error)
    }
  }

  // View order details
  const viewOrderDetails = async (orderId) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`)
      if (!response.ok) {
        throw new Error("Failed to fetch order details")
      }

      const data = await response.json()
      setSelectedOrder(data)
      setIsModalOpen(true)
    } catch (error) {
      console.error("Error fetching order details:", error)
    }
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      {/* Filters and search */}
      <div className="bg-gray-800 rounded-lg p-6 border border-red-900/20 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              className="bg-gray-7200 text-black rounded-md px-3 py-2 border bg-gray-600  border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="All">All Orders</option>
              <option   value="Pending">Pending</option>
              <option value="Preparing">Preparing</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-9 pr-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            onClick={fetchOrders}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Orders table */}
      <div className="bg-gray-800 rounded-lg border border-red-900/20 shadow-lg overflow-hidden">
        <div className="p-6 border-b border-red-900/20">
          <h2 className="text-xl font-semibold">Orders</h2>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-red-600 border-r-2 border-red-600 border-b-2 border-transparent"></div>
            <p className="mt-2 text-gray-400">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <p>No orders found</p>
          </div>
        ) : (
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
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button onClick={() => viewOrderDetails(order.id)} className="text-blue-400 hover:text-blue-300">
                        {order.id}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{order.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{formatDate(order.createdAt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">₹{order.total.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <select
                        className={`px-2 py-1 rounded text-xs border ${
                          order.status === "Delivered"
                            ? "bg-green-900/30 text-white border-green-800"
                            : order.status === "Preparing"
                              ? "bg-yellow-900/30 text-white border-yellow-800"
                              : order.status === "In Transit"
                                ? "bg-blue-900/30 text-white border-blue-800"
                                : order.status === "Cancelled"
                                  ? "bg-red-900/30 text-black border-red-800"
                                  : "bg-gray-900/100 text-white border-gray-800"
                        }`}
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Preparing">Preparing</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => viewOrderDetails(order.id)}
                          className="text-blue-500 hover:text-blue-400"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button onClick={() => deleteOrder(order.id)} className="text-red-500 hover:text-red-400">
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="px-6 py-4 bg-gray-900 border-t border-red-900/20 flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Showing page {page} of {totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className={`px-3 py-1 rounded-md ${
                page === 1 ? "bg-gray-700 text-gray-500 cursor-not-allowed" : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className={`px-3 py-1 rounded-md ${
                page === totalPages
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg border border-red-900/20 shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-red-900/20 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Order Details: {selectedOrder.orderId}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Customer Information</h3>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <p>
                      <span className="text-gray-400">Name:</span> {selectedOrder.customer.name}
                    </p>
                    <p>
                      <span className="text-gray-400">Email:</span> {selectedOrder.customer.email}
                    </p>
                    <p>
                      <span className="text-gray-400">Phone:</span> {selectedOrder.customer.phone}
                    </p>
                    <p>
                      <span className="text-gray-400">Address:</span> {selectedOrder.customer.address}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Order Information</h3>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <p>
                      <span className="text-gray-400">Date:</span> {formatDate(selectedOrder.createdAt)}
                    </p>
                    <p>
                      <span className="text-gray-400">Status:</span>{" "}
                      <span
                        className={`px-2 py-0.5 rounded text-xs ${
                          selectedOrder.status === "Delivered"
                            ? "bg-green-900/30 text-green-400"
                            : selectedOrder.status === "Preparing"
                              ? "bg-yellow-900/30 text-yellow-400"
                              : selectedOrder.status === "In Transit"
                                ? "bg-blue-900/30 text-blue-400"
                                : selectedOrder.status === "Cancelled"
                                  ? "bg-red-900/30 text-red-400"
                                  : "bg-gray-900/30 text-gray-400"
                        }`}
                      >
                        {selectedOrder.status}
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-400">Payment Method:</span> {selectedOrder.paymentMethod}
                    </p>
                    <p>
                      <span className="text-gray-400">Payment Status:</span>{" "}
                      <span
                        className={`px-2 py-0.5 rounded text-xs ${
                          selectedOrder.paymentStatus === "Paid"
                            ? "bg-green-900/30 text-green-400"
                            : "bg-yellow-900/30 text-yellow-400"
                        }`}
                      >
                        {selectedOrder.paymentStatus}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Order Items</h3>
                <div className="bg-gray-700 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-800">
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Item
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-600">
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">{item.name}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">{item.quantity}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">${item.price.toFixed(2)}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">
                          ₹{(item.price * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-800">
                      <tr>
                        <td colSpan={3} className="px-4 py-2 text-right font-medium">
                          Total:
                        </td>
                        <td className="px-4 py-2 font-bold">₹{selectedOrder.total.toFixed(2)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-gray-700">
                <div className="flex space-x-2">
                  <select
                    className="bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={selectedOrder.status}
                    onChange={(e) => {
                      const newStatus = e.target.value
                      updateOrderStatus(selectedOrder.orderId, newStatus)
                      setSelectedOrder({ ...selectedOrder, status: newStatus })
                    }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Preparing">Preparing</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>

                  <select
                    className="bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={selectedOrder.paymentStatus}
                    onChange={(e) => {
                      const newPaymentStatus = e.target.value
                      fetch(`/api/admin/orders/${selectedOrder.orderId}`, {
                        method: "PATCH",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ paymentStatus: newPaymentStatus }),
                      })
                        .then((response) => {
                          if (response.ok) {
                            setSelectedOrder({
                              ...selectedOrder,
                              paymentStatus: newPaymentStatus,
                            })
                          }
                        })
                        .catch((error) => {
                          console.error("Error updating payment status:", error)
                        })
                    }}
                  >
                    <option value="Pending">Payment Pending</option>
                    <option value="Paid">Payment Received</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    deleteOrder(selectedOrder.orderId)
                    setIsModalOpen(false)
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                >
                  Delete Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
