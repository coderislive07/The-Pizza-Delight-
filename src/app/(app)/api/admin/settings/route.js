import { NextResponse } from "next/server"
import connectDB from "../../../../lib/mongodb"
import fs from "fs/promises"
import path from "path"

// This would typically be stored in a database
// For simplicity, we're using a JSON file
const SETTINGS_FILE = path.join(process.cwd(), "data", "settings.json")

export async function GET() {
  try {
    await connectDB()

    // Create settings file if it doesn't exist
    try {
      await fs.access(SETTINGS_FILE)
    } catch (error) {
      // Ensure directory exists
      await fs.mkdir(path.dirname(SETTINGS_FILE), { recursive: true })

      // Create default settings
      const defaultSettings = {
        storeName: "The Pizza Delight",
        address: "123 Pizza Street, New York, NY 10001",
        phone: "(555) 123-4567",
        email: "contact@thepizzadelight.com",
        openingHours: {
          monday: "11:00 AM - 10:00 PM",
          tuesday: "11:00 AM - 10:00 PM",
          wednesday: "11:00 AM - 10:00 PM",
          thursday: "11:00 AM - 10:00 PM",
          friday: "11:00 AM - 11:00 PM",
          saturday: "11:00 AM - 11:00 PM",
          sunday: "12:00 PM - 9:00 PM",
        },
        deliveryFee: 3.99,
        taxRate: 8.875,
        minimumOrderAmount: 10.0,
        deliveryRadius: 5, // miles
        socialMedia: {
          facebook: "https://facebook.com/thepizzadelight",
          instagram: "https://instagram.com/thepizzadelight",
          twitter: "https://twitter.com/thepizzadelight",
        },
      }

      await fs.writeFile(SETTINGS_FILE, JSON.stringify(defaultSettings, null, 2))
    }

    // Read settings
    const settingsData = await fs.readFile(SETTINGS_FILE, "utf-8")
    const settings = JSON.parse(settingsData)

    return NextResponse.json(settings)
  } catch (error) {
    console.error("Settings API Error:", error)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function PATCH(request) {
  try {
    await connectDB()

    const updates = await request.json()

    // Read current settings
    const settingsData = await fs.readFile(SETTINGS_FILE, "utf-8")
    const currentSettings = JSON.parse(settingsData)

    // Update settings
    const updatedSettings = {
      ...currentSettings,
      ...updates,
    }

    // Save updated settings
    await fs.writeFile(SETTINGS_FILE, JSON.stringify(updatedSettings, null, 2))

    return NextResponse.json({
      message: "Settings updated successfully",
      settings: updatedSettings,
    })
  } catch (error) {
    console.error("Update Settings API Error:", error)
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}
