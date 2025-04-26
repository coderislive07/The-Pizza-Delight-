import { NextResponse } from "next/server"
import connectDB from "../../../../../lib/mongodb"
import MenuItem from "../../../../../models/menu"

export async function GET(request, { params }) {
  try {
    await connectDB()

    const { id } = params

    const menuItem = await MenuItem.findById(id)

    if (!menuItem) {
      return NextResponse.json({ error: "Menu item not found" }, { status: 404 })
    }

    return NextResponse.json({
      id: menuItem._id,
      name: menuItem.name,
      description: menuItem.description,
      price: menuItem.price,
      category: menuItem.category,
      isActive: menuItem.isActive,
      image: menuItem.image,
      ingredients: menuItem.ingredients,
    })
  } catch (error) {
    console.error("Get Menu Item API Error:", error)
    return NextResponse.json({ error: "Failed to fetch menu item" }, { status: 500 })
  }
}

export async function PATCH(request, { params }) {
  try {
    await connectDB()

    const { id } = params
    const body = await request.json()

    const menuItem = await MenuItem.findById(id)

    if (!menuItem) {
      return NextResponse.json({ error: "Menu item not found" }, { status: 404 })
    }

    // Update fields
    if (body.name) menuItem.name = body.name
    if (body.description !== undefined) menuItem.description = body.description
    if (body.price !== undefined) menuItem.price = body.price
    if (body.category) menuItem.category = body.category
    if (body.isActive !== undefined) menuItem.isActive = body.isActive
    if (body.image !== undefined) menuItem.image = body.image
    if (body.ingredients) menuItem.ingredients = body.ingredients

    menuItem.updatedAt = new Date()

    await menuItem.save()

    return NextResponse.json({
      message: "Menu item updated successfully",
      menuItem: {
        id: menuItem._id,
        name: menuItem.name,
        price: menuItem.price,
        isActive: menuItem.isActive,
      },
    })
  } catch (error) {
    console.error("Update Menu Item API Error:", error)
    return NextResponse.json({ error: "Failed to update menu item" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB()

    const { id } = params

    const menuItem = await MenuItem.findById(id)

    if (!menuItem) {
      return NextResponse.json({ error: "Menu item not found" }, { status: 404 })
    }

    await menuItem.deleteOne()

    return NextResponse.json({
      message: "Menu item deleted successfully",
    })
  } catch (error) {
    console.error("Delete Menu Item API Error:", error)
    return NextResponse.json({ error: "Failed to delete menu item" }, { status: 500 })
  }
}
