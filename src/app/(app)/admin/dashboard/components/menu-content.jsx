"use client"

import { useState, useEffect } from "react"
import { Search, Plus, Edit, Trash, RefreshCw, X, Check } from "lucide-react"

export default function MenuContent() {
  const [menuItems, setMenuItems] = useState([])
  const [groupedItems, setGroupedItems] = useState({})
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    isActive: true,
    image: "",
    ingredients: "",
  })

  // Fetch menu items
  useEffect(() => {
    fetchMenuItems()
  }, [categoryFilter, activeFilter, searchTerm])

  const fetchMenuItems = async () => {
    setLoading(true)
    try {
      let url = "/api/admin/menu?"

      if (categoryFilter) {
        url += `category=${categoryFilter}&`
      }

      if (activeFilter !== "all") {
        url += `isActive=${activeFilter === "active"}&`
      }

      if (searchTerm) {
        url += `search=${searchTerm}`
      }

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("Failed to fetch menu items")
      }

      const data = await response.json()
      setMenuItems(data.menuItems)
      setGroupedItems(data.groupedItems)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching menu items:", error)
      setLoading(false)
    }
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      isActive: true,
      image: "",
      ingredients: "",
    })
    setEditingItem(null)
  }

  // Open modal for adding new item
  const openAddModal = () => {
    resetForm()
    setIsModalOpen(true)
  }

  // Open modal for editing item
  const openEditModal = (item) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      description: item.description || "",
      price: item.price.toString(),
      category: item.category,
      isActive: item.isActive,
      image: item.image || "",
      ingredients: item.ingredients ? item.ingredients.join(", ") : "",
    })
    setIsModalOpen(true)
  }

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    if (!formData.name || !formData.price || !formData.category) {
      alert("Please fill in all required fields")
      return
    }

    try {
      const itemData = {
        name: formData.name,
        description: formData.description,
        price: Number.parseFloat(formData.price),
        category: formData.category,
        isActive: formData.isActive,
        image: formData.image,
        ingredients: formData.ingredients ? formData.ingredients.split(",").map((i) => i.trim()) : [],
      }

      let response

      if (editingItem) {
        // Update existing item
        response = await fetch(`/api/admin/menu/${editingItem.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itemData),
        })
      } else {
        // Create new item
        response = await fetch("/api/admin/menu", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itemData),
        })
      }

      if (!response.ok) {
        throw new Error("Failed to save menu item")
      }

      // Close modal and refresh list
      setIsModalOpen(false)
      resetForm()
      fetchMenuItems()
    } catch (error) {
      console.error("Error saving menu item:", error)
      alert("Failed to save menu item")
    }
  }

  // Delete menu item
  const deleteMenuItem = async (id) => {
    if (!confirm("Are you sure you want to delete this menu item?")) {
      return
    }

    try {
      const response = await fetch(`/api/admin/menu/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete menu item")
      }

      // Refresh list
      fetchMenuItems()
    } catch (error) {
      console.error("Error deleting menu item:", error)
      alert("Failed to delete menu item")
    }
  }

  // Toggle item active status
  const toggleItemStatus = async (id, currentStatus) => {
    try {
      const response = await fetch(`/api/admin/menu/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      })

      if (!response.ok) {
        throw new Error("Failed to update menu item status")
      }

      // Refresh list
      fetchMenuItems()
    } catch (error) {
      console.error("Error updating menu item status:", error)
    }
  }

  // Get unique categories
  const categories = [...new Set(menuItems.map((item) => item.category))].sort()

  return (
    <div className="space-y-6">
      {/* Filters and search */}
      <div className="bg-gray-800 rounded-lg p-6 border border-red-900/20 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex items-center gap-2">
            <select
              className="bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              className="bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
            >
              <option value="all">All Items</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>

          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search menu items..."
              className="pl-9 pr-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchMenuItems}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>

            <button
              onClick={openAddModal}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Item
            </button>
          </div>
        </div>
      </div>

      {/* Menu items */}
      <div className="bg-gray-800 rounded-lg border border-red-900/20 shadow-lg overflow-hidden">
        <div className="p-6 border-b border-red-900/20">
          <h2 className="text-xl font-semibold">Menu Items</h2>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-red-600 border-r-2 border-red-600 border-b-2 border-transparent"></div>
            <p className="mt-2 text-gray-400">Loading menu items...</p>
          </div>
        ) : menuItems.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <p>No menu items found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {menuItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{item.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">₹{item.price.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => toggleItemStatus(item.id, item.isActive)}
                        className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${
                          item.isActive
                            ? "bg-green-900/30 text-green-400 border border-green-800"
                            : "bg-red-900/30 text-red-400 border border-red-800"
                        }`}
                      >
                        {item.isActive ? (
                          <>
                            <Check className="h-3 w-3" /> Active
                          </>
                        ) : (
                          <>
                            <X className="h-3 w-3" /> Inactive
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center space-x-2">
                        <button onClick={() => openEditModal(item)} className="text-blue-500 hover:text-blue-400">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button onClick={() => deleteMenuItem(item.id)} className="text-red-500 hover:text-red-400">
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
      </div>

      {/* Add/Edit Menu Item Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg border border-red-900/20 shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-red-900/20 flex justify-between items-center">
              <h2 className="text-xl font-semibold">{editingItem ? "Edit Menu Item" : "Add New Menu Item"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-400">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-400">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                    list="categories"
                  />
                  <datalist id="categories">
                    {categories.map((category) => (
                      <option key={category} value={category} />
                    ))}
                  </datalist>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-400">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-400">$</span>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 text-white rounded-md pl-7 pr-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-400">Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">Ingredients (comma separated)</label>
                <input
                  type="text"
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="e.g. Tomato, Cheese, Basil"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-gray-600 text-red-600 focus:ring-red-500 bg-gray-700"
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-300">
                  Active (available for ordering)
                </label>
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t border-gray-700">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">
                  {editingItem ? "Update Item" : "Add Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
