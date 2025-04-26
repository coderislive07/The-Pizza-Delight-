"use client"

import { useState, useEffect } from "react"
import { Home, PieChart, Users, ShoppingBag, Settings, LogOut, Menu, X, Bell, Pizza } from "lucide-react"
import { useRouter } from "next/navigation"

import "./dashboard.css"
import DashboardContent from "./components/dashboard-content"
import OrdersContent from "./components/orders-content"
import MenuContent from "./components/menu-content"
import CustomersContent from "./components/customers-content"
import AnalyticsContent from "./components/analytics-content"
import SettingsContent from "./components/settings-content"
import PizzaSpinner from "./components/pizza-spinner"

import { useUserStore } from "@/store"

const PizzaLoader = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/80 z-50">
    <PizzaSpinner size="xl" className="mb-4" />
    <div className="text-white text-xl font-medium">Loading...</div>
  </div>
)

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [authChecked, setAuthChecked] = useState(false)
  const user = useUserStore((state) => state.user)
  const router = useRouter()
  const setUser = useUserStore((state) => state.setUser)

  // Authentication check
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Make a request to verify if user is still authenticated
        const response = await fetch("/api/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (response.ok) {
          // User is authenticated, update user in store if needed
          const userData = await response.json()
          if (!user) {
            setUser(userData)
          }
          setLoading(false)
        } else {
          // User is not authenticated, redirect to login
          router.push("/auth")
        }
      } catch (error) {
        console.error("Auth check error:", error)
        router.push("/auth")
      } finally {
        setAuthChecked(true)
      }
    }

    checkAuthStatus()
  }, [router, setUser, user])

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        setUser(null)
        router.push("/auth")
      } else {
        console.error("Failed to logout")
      }
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "menu", label: "Menu Items", icon: Pizza },
    { id: "customers", label: "Customers", icon: Users },
    { id: "analytics", label: "Analytics", icon: PieChart },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent />
      case "orders":
        return <OrdersContent />
      case "menu":
        return <MenuContent />
      case "customers":
        return <CustomersContent />
      case "analytics":
        return <AnalyticsContent />
      case "settings":
        return <SettingsContent />
      default:
        return <DashboardContent />
    }
  }

  // Show loading state while checking authentication
  if (loading) {
    return <PizzaLoader />
  }

  return (
    <>
      <div className="flex h-screen bg-gray-700 text-white overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-red-900/30 transition-transform duration-300 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:relative lg:translate-x-0 bg-cover bg-center relative overflow-hidden`}
          style={{
            backgroundImage:
              "url('https://img.freepik.com/premium-photo/pizza-with-slice-being-dropped-into-it_84130-10974.jpg?ga=GA1.1.530211128.1745586258&semt=ais_hybrid&w=740')",
          }}
        >
          <div className="absolute inset-0 backdrop-blur-[2px] bg-black/40 z-0"></div>

          {/* Logo */}
          <div className="flex relative items-center justify-between h-16 px-4 border-b border-red-900/30">
            <div className="flex relative items-center">
              <Pizza className="h-8 w-8 text-red-600" />
              <div className="ml-2">
                <div className="text-xl font-bold text-white">The Pizza Delight</div>
                <div className="text-xs text-red-500">Admin Portal</div>
              </div>
            </div>
            <button onClick={toggleSidebar} className="lg:hidden text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="mt-5 px-2 relative">
            <div className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                    activeTab === item.id
                      ? "bg-red-900/30 text-white"
                      : "text-white font-bold hover:bg-gray-800/60 hover:text-white"
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </button>
              ))}
            </div>
          </nav>

          {/* Logout */}
          <div className="relative bottom-0 w-full p-4 border-t border-red-900/30">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm font-bold text-red-500/90 rounded-md hover:bg-gray-800/40 hover:text-white transition-colors"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-gray-900 border-b border-red-900/30">
            <div className="flex items-center justify-between h-16 px-6">
              <div className="flex items-center">
                <button onClick={toggleSidebar} className="text-gray-400 hover:text-white lg:hidden">
                  <Menu size={24} />
                </button>
                <h1 className="ml-4 text-xl font-semibold text-white">
                  {navItems.find((item) => item.id === activeTab)?.label || "Dashboard"}
                </h1>
              </div>
              <div className="flex items-center space-x-4  ">
                <button className="text-gray-400 hover:text-white relative">
                  <Bell size={20} />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-600"></span>
                </button>
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center">
                    {user?.email ? user.email[0].toUpperCase() : "A"}
                  </div>
                  <div>{user?.email ? user.email.split("@")[0] : "Admin"}</div>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto bg-gray-900 p-6">{renderContent()}</main>
        </div>
      </div>

      {mobileMenuOpen && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={toggleMobileMenu}></div>}
    </>
  )
}
