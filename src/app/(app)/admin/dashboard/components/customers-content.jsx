"use client"

import { useState, useEffect } from "react"
import { Search, RefreshCw, User, Mail, Phone, MapPin, ShoppingBag, DollarSign } from "lucide-react"

export default function CustomersContent() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [customerDetails, setCustomerDetails] = useState(null)
  const [detailsLoading, setDetailsLoading] = useState(false)

  // Fetch customers
  useEffect(() => {
    fetchCustomers()
  }, [page, searchTerm])

  const fetchCustomers = async () => {
    setLoading(true)
    try {
      let url = `/api/admin/customers?page=₹{page}&limit=10`
      if (searchTerm) {
        url += `&search=₹{searchTerm}`
      }

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("Failed to fetch customers")
      }

      const data = await response.json()

      setCustomers(data.customers)
      setTotalPages(data.pagination.totalPages)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching customers:", error)
      setLoading(false)
    }
  }

  // Fetch customer details
  const fetchCustomerDetails = async (customerId) => {
    setDetailsLoading(true)
    try {
      const response = await fetch(`/api/admin/customers/${customerId}`)
      if (!response.ok) {
        throw new Error("Failed to fetch customer details")
      }

      const data = await response.json()
      console.log(data);
      setCustomerDetails(data)

      setDetailsLoading(false)
    } catch (error) {
      console.error("Error fetching customer details:", error)
      setDetailsLoading(false)
    }
  }

  // View customer details
  const viewCustomerDetails = (customer) => {
    setSelectedCustomer(customer)
    fetchCustomerDetails(customer.id)
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="bg-gray-800 rounded-lg p-6 border border-red-900/20 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <h2 className="text-xl font-semibold">Customer Management</h2>

          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers..."
              className="pl-9 pr-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            onClick={fetchCustomers}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customers list */}
        <div className="lg:col-span-1 bg-gray-800 rounded-lg border border-red-900/20 shadow-lg overflow-hidden">
          <div className="p-4 border-b border-red-900/20">
            <h3 className="font-medium">Customers</h3>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2  border-r-2 border-red-600 border-b-2 "></div>
              <p className="mt-2 text-gray-400">Loading customers...</p>
            </div>
          ) : customers.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              <p>No customers found</p>
            </div>
          ) : (
            <div className="overflow-y-auto max-h-[70vh]">
              <ul className="divide-y divide-gray-700">
                {customers.map((customer) => (
                  <li key={customer.id}>
                    <button
                      onClick={() => viewCustomerDetails(customer)}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors ₹{
                        selectedCustomer?.id === customer.id ? "bg-gray-700" : ""
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-red-600/20 flex items-center justify-center text-red-400">
                          {customer.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-3">
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-gray-400">{customer.email}</p>
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Pagination */}
          <div className="px-4 py-3 bg-gray-900 border-t border-red-900/20 flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Page {page} of {totalPages}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className={`px-3 py-1 rounded-md ₹{
                  page === 1
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                Previous
              </button>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className={`px-3 py-1 rounded-md ₹{
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

        {/* Customer details */}
        <div className="lg:col-span-2 bg-gray-800 rounded-lg border border-red-900/20 shadow-lg overflow-hidden">
          {!selectedCustomer ? (
            <div className="p-8 text-center text-gray-400 h-full flex items-center justify-center">
              <div>
                <User className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p>Select a customer to view details</p>
              </div>
            </div>
          ) : detailsLoading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-red-600 border-r-2 border-red-600 border-b-2 border-transparent"></div>
              <p className="mt-2 text-gray-400">Loading customer details...</p>
            </div>
          ) : (
            <>
              <div className="p-6 border-b border-red-900/20">
                <h3 className="text-lg font-medium">Customer Details</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Customer info */}
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="h-16 w-16 rounded-full bg-red-600/20 flex items-center justify-center text-red-400 text-2xl">
                        {selectedCustomer.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <h4 className="text-xl font-medium">{selectedCustomer.name}</h4>
                        <p className="text-gray-400">Customer since {formatDate(selectedCustomer.createdAt)}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-gray-300">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        {selectedCustomer.email}
                      </div>
                      {selectedCustomer.phone && (
                        <div className="flex items-center text-gray-300">
                          <Phone className="h-4 w-4 mr-2 text-gray-400" />
                          {selectedCustomer.phone}
                        </div>
                      )}
                      {selectedCustomer.address && (
                        <div className="flex items-start text-gray-300">
                          <MapPin className="h-4 w-4 mr-2 mt-1 text-gray-400" />
                          <span>{selectedCustomer.address}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Customer stats */}
                  <div className="bg-gray-700 rounded-lg p-4 space-y-4">
                    <h4 className="font-medium">Customer Statistics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-800 rounded-lg p-3">
                        <div className="flex items-center text-gray-400 text-sm mb-1">
                          <ShoppingBag className="h-4 w-4 mr-1" /> Total Orders
                        </div>
                        <div className="text-xl font-bold">{selectedCustomer.orderCount|| 0}</div>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-3">
                        <div className="flex items-center text-gray-400 text-sm mb-1">
                          <DollarSign className="h-4 w-4 mr-1" /> Total Spent
                        </div>
                        <div className="text-xl font-bold">
                          ₹{selectedCustomer.totalSpent.toFixed(2) || "0.00"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order history */}
                <div className="mt-6">
                  <h4 className="font-medium mb-3">Order History</h4>
                  {customerDetails?.orders.length === 0 ? (
                    <div className="bg-gray-700 rounded-lg p-4 text-center text-gray-400">
                      No orders found for this customer
                    </div>
                  ) : (
                    <div className="bg-gray-700 rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-800">
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                              Order ID  
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                              Items
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                              Total
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-600">
                          {customerDetails?.orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-600">
                              <td className="px-4 py-2 whitespace-nowrap text-sm">{order.id }|| 0</td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm">{formatDate(order.createdAt)}</td>
                              <td className="px-4 py-2 text-sm">{order.items}</td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm">₹{order.total.toFixed(2)}</td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm">
                                <span
                                  className={`px-2 py-0.5 rounded-full text-xs ₹{
                                    order.status === "Delivered"
                                      ? "bg-green-900/30 text-green-400"
                                      : order.status === "Preparing"
                                        ? "bg-yellow-900/30 text-yellow-400"
                                        : order.status === "In Transit"
                                          ? "bg-blue-900/30 text-blue-400"
                                          : order.status === "Cancelled"
                                            ? "bg-red-900/30 text-red-400"
                                            : "bg-gray-900/30 text-gray-400"
                                  }`}
                                >
                                  {order.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
