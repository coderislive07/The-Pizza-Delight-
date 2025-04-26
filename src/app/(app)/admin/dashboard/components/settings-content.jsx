"use client"

import { useState, useEffect } from "react"
import { Save, RefreshCw } from "lucide-react"

export default function SettingsContent() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState({
    storeName: "",
    address: "",
    phone: "",
    email: "",
    openingHours: {
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
      sunday: "",
    },
    deliveryFee: 0,
    taxRate: 0,
    minimumOrderAmount: 0,
    deliveryRadius: 0,
    socialMedia: {
      facebook: "",
      instagram: "",
      twitter: "",
    },
  })

  // Fetch settings
  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/settings")
      if (!response.ok) {
        throw new Error("Failed to fetch settings")
      }

      const data = await response.json()
      setSettings(data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching settings:", error)
      setLoading(false)
    }
  }

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target

    // Handle nested properties
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setSettings({
        ...settings,
        [parent]: {
          ...settings[parent],
          [child]: value,
        },
      })
    } else {
      setSettings({
        ...settings,
        [name]: value,
      })
    }
  }

  // Handle number input changes
  const handleNumberChange = (e) => {
    const { name, value } = e.target
    setSettings({
      ...settings,
      [name]: Number.parseFloat(value),
    })
  }

  // Save settings
  const saveSettings = async () => {
    setSaving(true)
    try {
      const response = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      })

      if (!response.ok) {
        throw new Error("Failed to save settings")
      }

      alert("Settings saved successfully")
      setSaving(false)
    } catch (error) {
      console.error("Error saving settings:", error)
      alert("Failed to save settings")
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6 border border-red-900/20 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <h2 className="text-xl font-semibold">System Settings</h2>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchSettings}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              onClick={saveSettings}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
              disabled={saving || loading}
            >
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="bg-gray-800 rounded-lg p-8 border border-red-900/20 shadow-lg text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-red-600 border-r-2 border-red-600 border-b-2 border-transparent"></div>
          <p className="mt-2 text-gray-400">Loading settings...</p>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg border border-red-900/20 shadow-lg overflow-hidden">
          <div className="p-6 border-b border-red-900/20">
            <h3 className="font-medium">Store Information</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-400">Store Name</label>
                  <input
                    type="text"
                    name="storeName"
                    value={settings.storeName}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-400">Address</label>
                  <textarea
                    name="address"
                    value={settings.address}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-400">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={settings.phone}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-400">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={settings.email}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-400">Social Media</label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      name="socialMedia.facebook"
                      value={settings.socialMedia.facebook}
                      onChange={handleInputChange}
                      placeholder="Facebook URL"
                      className="w-full bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <input
                      type="text"
                      name="socialMedia.instagram"
                      value={settings.socialMedia.instagram}
                      onChange={handleInputChange}
                      placeholder="Instagram URL"
                      className="w-full bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <input
                      type="text"
                      name="socialMedia.twitter"
                      value={settings.socialMedia.twitter}
                      onChange={handleInputChange}
                      placeholder="Twitter URL"
                      className="w-full bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-700 pt-6">
              <h3 className="font-medium mb-4">Business Hours</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-400">Monday</label>
                  <input
                    type="text"
                    name="openingHours.monday"
                    value={settings.openingHours.monday}
                    onChange={handleInputChange}
                    placeholder="e.g. 11:00 AM - 10:00 PM"
                    className="w-full bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-400">Tuesday</label>
                  <input
                    type="text"
                    name="openingHours.tuesday"
                    value={settings.openingHours.tuesday}
                    onChange={handleInputChange}
                    placeholder="e.g. 11:00 AM - 10:00 PM"
                    className="w-full bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-400">Wednesday</label>
                  <input
                    type="text"
                    name="openingHours.wednesday"
                    value={settings.openingHours.wednesday}
                    onChange={handleInputChange}
                    placeholder="e.g. 11:00 AM - 10:00 PM"
                    className="w-full bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-400">Thursday</label>
                  <input
                    type="text"
                    name="openingHours.thursday"
                    value={settings.openingHours.thursday}
                    onChange={handleInputChange}
                    placeholder="e.g. 11:00 AM - 10:00 PM"
                    className="w-full bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-400">Friday</label>
                  <input
                    type="text"
                    name="openingHours.friday"
                    value={settings.openingHours.friday}
                    onChange={handleInputChange}
                    placeholder="e.g. 11:00 AM - 11:00 PM"
                    className="w-full bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-400">Saturday</label>
                  <input
                    type="text"
                    name="openingHours.saturday"
                    value={settings.openingHours.saturday}
                    onChange={handleInputChange}
                    placeholder="e.g. 11:00 AM - 11:00 PM"
                    className="w-full bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-400">Sunday</label>
                  <input
                    type="text"
                    name="openingHours.sunday"
                    value={settings.openingHours.sunday}
                    onChange={handleInputChange}
                    placeholder="e.g. 12:00 PM - 9:00 PM"
                    className="w-full bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-700 pt-6">
              <h3 className="font-medium mb-4">Delivery Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-400">Delivery Fee ($)</label>
                  <input
                    type="number"
                    name="deliveryFee"
                    value={settings.deliveryFee}
                    onChange={handleNumberChange}
                    step="0.01"
                    min="0"
                    className="w-full bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-400">Tax Rate (%)</label>
                  <input
                    type="number"
                    name="taxRate"
                    value={settings.taxRate}
                    onChange={handleNumberChange}
                    step="0.001"
                    min="0"
                    className="w-full bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-400">Minimum Order Amount ($)</label>
                  <input
                    type="number"
                    name="minimumOrderAmount"
                    value={settings.minimumOrderAmount}
                    onChange={handleNumberChange}
                    step="0.01"
                    min="0"
                    className="w-full bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-400">Delivery Radius (miles)</label>
                  <input
                    type="number"
                    name="deliveryRadius"
                    value={settings.deliveryRadius}
                    onChange={handleNumberChange}
                    step="0.1"
                    min="0"
                    className="w-full bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
