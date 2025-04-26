// Generate statistics for dashboard
export const calculateStats = (orders, menuItems) => {
    // Total revenue
    const revenue = orders.reduce((total, order) => total + order.total, 0)
  
    // Order count
    const orderCount = orders.length
  
    // Active menu items
    const activeMenuItems = menuItems.filter((item) => item.isActive).length
  
    // Average delivery time (for delivered orders)
    const deliveredOrders = orders.filter((order) => order.status === "Delivered" && order.deliveredAt)
    let avgDeliveryTime = 0
  
    if (deliveredOrders.length > 0) {
      const totalMinutes = deliveredOrders.reduce((total, order) => {
        const deliveryTime = new Date(order.deliveredAt) - new Date(order.createdAt)
        return total + deliveryTime / (1000 * 60) // Convert to minutes
      }, 0)
      avgDeliveryTime = Math.round(totalMinutes / deliveredOrders.length)
    }
  
    // Weekly comparison for percentage changes
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  
    const currentWeekOrders = orders.filter((order) => new Date(order.createdAt) >= oneWeekAgo)
    const previousWeekOrders = orders.filter((order) => {
      const orderDate = new Date(order.createdAt)
      const twoWeeksAgo = new Date(oneWeekAgo)
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 7)
      return orderDate >= twoWeeksAgo && orderDate < oneWeekAgo
    })
  
    // Calculate percentage changes
    const currentWeekRevenue = currentWeekOrders.reduce((total, order) => total + order.total, 0)
    const previousWeekRevenue = previousWeekOrders.reduce((total, order) => total + order.total, 0)
  
    const revenueChange =
      previousWeekRevenue === 0
        ? 100
        : (((currentWeekRevenue - previousWeekRevenue) / previousWeekRevenue) * 100).toFixed(1)
  
    const orderChange =
      previousWeekOrders.length === 0
        ? 100
        : (((currentWeekOrders.length - previousWeekOrders.length) / previousWeekOrders.length) * 100).toFixed(1)
  
    // New menu items in the last week
    const newMenuItems = menuItems.filter((item) => new Date(item.createdAt) >= oneWeekAgo).length
  
    return {
      revenue: revenue.toFixed(2),
      orderCount,
      activeMenuItems,
      avgDeliveryTime,
      revenueChange,
      orderChange,
      newMenuItems,
    }
  }
  
  // Generate a formatted date string
  export const formatDate = (date) => {
    const d = new Date(date)
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }
  
  // Format time ago
  export const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000)
  
    let interval = seconds / 31536000
    if (interval > 1) return Math.floor(interval) + " years ago"
  
    interval = seconds / 2592000
    if (interval > 1) return Math.floor(interval) + " months ago"
  
    interval = seconds / 86400
    if (interval > 1) return Math.floor(interval) + " days ago"
  
    interval = seconds / 3600
    if (interval > 1) return Math.floor(interval) + " hours ago"
  
    interval = seconds / 60
    if (interval > 1) return Math.floor(interval) + " minutes ago"
  
    return Math.floor(seconds) + " seconds ago"
  }
  