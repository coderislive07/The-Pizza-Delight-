import { NextResponse } from "next/server"
import connectDB from "../../../../lib/mongodb"
import MenuItem from "../../../../models/menu"

export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const isActive = searchParams.get("isActive")
    const search = searchParams.get("search")

    // Build query
    let query = {}

    if (category) {
      query.category = category
    }

    if (isActive !== null && isActive !== undefined) {
      query.isActive = isActive === "true"
    }

    if (search) {
      query = {
        ...query,
        $or: [{ name: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }],
      }
    }

    // Get menu items
    const menuItems = await MenuItem.find(query).sort({ category: 1, name: 1 })

    // Group by category
    const groupedItems = menuItems.reduce((acc, item) => {
      const category = item.category || "Uncategorized"
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push({
        id: item._id,
        name: item.name,
        description: item.description,
        price: item.price,
        isActive: item.isActive,
        image: item.image,
        ingredients: item.ingredients,
        category: item.category,
      })
      return acc
    }, {})

    return NextResponse.json({
      menuItems: menuItems.map((item) => ({
        id: item._id,
        name: item.name,
        description: item.description,
        price: item.price,
        isActive: item.isActive,
        image: item.image,
        ingredients: item.ingredients,
        category: item.category,
      })),
      groupedItems,
    })
  } catch (error) {
    console.error("Menu API Error:", error)
    return NextResponse.json({ error: "Failed to fetch menu items" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    await connectDB()

    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.price || !body.category) {
      return NextResponse.json({ error: "Name, price, and category are required" }, { status: 400 })
    }

    // Create new menu item
    const newMenuItem = new MenuItem({
      name: body.name,
      description: body.description || "",
      price: body.price,
      category: body.category,
      isActive: body.isActive !== undefined ? body.isActive : true,
      image: body.image || "",
      ingredients: body.ingredients || [],
    })

    await newMenuItem.save()

    return NextResponse.json(
      {
        message: "Menu item created successfully",
        menuItem: {
          id: newMenuItem._id,
          name: newMenuItem.name,
          price: newMenuItem.price,
          category: newMenuItem.category,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create Menu Item API Error:", error)
    return NextResponse.json({ error: "Failed to create menu item" }, { status: 500 })
  }
}
