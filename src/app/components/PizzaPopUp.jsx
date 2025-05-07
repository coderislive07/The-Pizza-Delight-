"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import PropTypes from "prop-types"

// Move the PropTypes declaration after the component definition
const PizzaPopup = ({ pizza, isOpen, onClose, onAddToCart, onNavigate }) => {
  const [selectedSize, setSelectedSize] = useState("XL")
  const [selectedBase, setSelectedBase] = useState("CLASSIC CRUST")
  const [activeTab, setActiveTab] = useState("SIZE")
  const [activeCategoryTab, setActiveCategoryTab] = useState("")
  const [selectedToppings, setSelectedToppings] = useState({})
  const [quantity, setQuantity] = useState(1)
  const [specialInstructions, setSpecialInstructions] = useState("")
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    setTotalPrice(calculateTotal())
  }, [selectedSize, selectedBase, selectedToppings, quantity])

  if (!isOpen) return null

  const sizes = [
    { name: "XL", price: 0 },
    { name: "DOUBLE XL", price: 2.0 },
  ]

  const bases = [
    { name: "CLASSIC CRUST", price: 0 },
    { name: "THIN CRUST", price: 1.0 },
    { name: "WHOLE WHEAT CRUST", price: 1.5 },
    { name: "CHEESE BURST BASE", price: 2.5 },
    { name: "GLUTEN-FREE BASE", price: 2.0 },
  ]

  const categories = {
    meats: [
      { name: "HAM", price: 1.0 },
      { name: "BACON", price: 1.0 },
      { name: "STREAKY BACON", price: 1.0 },
      { name: "BACON FLAKES", price: 1.0 },
      { name: "5-PEPPER PEPPERONI", price: 1.0 },
      { name: "SALAMI", price: 1.0 },
      { name: "CHORIZO", price: 1.0 },
      { name: "BEEF", price: 1.5 },
      { name: "MARINATED BAKED CHICKEN", price: 2.5 },
      { name: "BBQ CHICKEN", price: 2.5 },
      { name: "TANDOORI CHICKEN", price: 2.5 },
      { name: "CHICKEN SEEKH KEBAB", price: 2.5 },
      { name: "PRAWNS", price: 3.0 },
      { name: "ANCHOVIES", price: 1.0 },
      { name: "SMOKED SALMON", price: 3.0 },
    ],
    vegetarianProteins: [
      { name: "PANEER CUBES", price: 1.5 },
      { name: "SOYA CHAAP (TANDOORI)", price: 1.5 },
    ],
    cheese: [
      { name: "EXTRA MOZZARELLA", price: 1.0 },
      { name: "CHEDDAR", price: 1.0 },
      { name: "FETA", price: 1.5 },
      { name: "BLUE CHEESE", price: 1.5 },
      { name: "PARMESAN", price: 1.0 },
    ],
    sauces: [
      { name: "CLASSIC TOMATO SAUCE", price: 0 },
      { name: "SPICY TOMATO SAUCE", price: 0.5 },
      { name: "WHITE GARLIC SAUCE", price: 0.75 },
      { name: "BBQ SAUCE", price: 0.75 },
      { name: "BUFFALO SAUCE", price: 0.75 },
    ],
    herbsAndSeasonings: [
      { name: "BASIL", price: 0.5 },
      { name: "OREGANO", price: 0.5 },
      { name: "CHILI FLAKES", price: 0.5 },
      { name: "GARLIC", price: 0.5 },
      { name: "ROSEMARY", price: 0.5 },
    ],
    vegetables: [
      { name: "ONION", price: 0.75 },
      { name: "CAPSICUM", price: 0.75 },
      { name: "TOMATO", price: 0.75 },
      { name: "CORN", price: 0.75 },
      { name: "OLIVES", price: 1.0 },
      { name: "MUSHROOM", price: 1.0 },
      { name: "JALAPENOS", price: 0.75 },
      { name: "PINEAPPLE", price: 0.75 },
    ],
  }

  const handleAddToCart = () => {
    // Get selected toppings as an array
    const toppingsArray = Object.entries(selectedToppings)
      .filter(([_, isSelected]) => isSelected)
      .map(([name]) => name)

    const options = {
      size: selectedSize,
      base: selectedBase,
      toppings: toppingsArray,
      quantity: quantity,
      specialInstructions: specialInstructions,
    }

    onAddToCart(pizza, options)
    onClose()
  }

  const calculateTotal = () => {
    // Base price (assuming pizza has a base price)
    let total = pizza.price || 0

    // Add size price
    const selectedSizeObj = sizes.find((s) => s.name === selectedSize)
    if (selectedSizeObj) total += selectedSizeObj.price

    // Add base price
    const selectedBaseObj = bases.find((b) => b.name === selectedBase)
    if (selectedBaseObj) total += selectedBaseObj.price

    // Add toppings price
    Object.entries(selectedToppings)
      .filter(([_, isSelected]) => isSelected)
      .forEach(([name]) => {
        // Find the topping in all categories
        for (const category in categories) {
          const topping = categories[category].find((t) => t.name === name)
          if (topping) {
            total += topping.price
            break
          }
        }
      })

    // Multiply by quantity
    total *= quantity

    return total.toFixed(2)
  }

  // Helper function for conditional class names
  const cn = (...classes) => {
    return classes.filter(Boolean).join(" ")
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white border  rounded-lg w-full max-w-md relative max-h-[90vh] overflow-hidden flex flex-col">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-2 right-2 z-10 bg-white rounded-full text-[#663300] border-[#663300] border p-1" aria-label="Close">
          <X size={12} />
        </button>

        {/* Pizza name header */}
        <div className="bg-[#663300] w-fit px-4 mx-auto  text-center py-2  rounded-full my-4">
          <h2 className="font-bold">{pizza.name}</h2>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between z-50 px-4 py-2 w-full top-56 absolute p-4 pr-6">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onNavigate && onNavigate("prev")
            }}
            className="px-2 py-1 text-xs  border bg-white text-black rounded-full"
          >
            {"<"}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onNavigate && onNavigate("next")
            }}
            className="px-2 py-1 text-xs border bg-white text-black rounded-full"
          >
           {">"}
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {/* Pizza image - reduced height */}
          <div className="w-full  p-4 relative">
            <img src={pizza.image.src || "/placeholder.svg"} alt={pizza.name} className="w-full h-full object-cover" />
          </div>

          {/* Pizza description */}
          <div className="p-4 text-sm text-[#663300]">{pizza.description}</div>

          {/* Tabs for customization */}
          <div className="px-4 pb-4">
            <div className="flex flex-col space-y-2">
              {/* Size selector */}
              <div
                className=" border-b-[#663300] rounded-md overflow-hidden"
                onClick={() => setActiveTab(activeTab === "SIZE" ? "" : "SIZE")}
              >
                <div className="flex justify-between items-center p-3 cursor-pointer ">
                  <span className="font-medium text-[#663300] ">SIZE</span>
                  <span className="text-[#663300]">{activeTab === "SIZE" ? "▼" : "►"}</span>
                </div>

                {activeTab === "SIZE" && (
                  <div className="p-3 border-t">
                    <div className="space-y-2 text-[#663300]">
                      {sizes.map((size) => (
                        <div key={size.name} className="flex items-center">
                          <div
                            className={cn(
                              "w-5 h-5 rounded-full border flex items-center justify-center mr-2",
                              selectedSize === size.name ? "border-[#663300]" : "border-gray-300",
                            )}
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedSize(size.name)
                            }}
                          >
                            {selectedSize === size.name && <div className="w-3 h-3 rounded-full bg-[#663300]"></div>}
                          </div>
                          <span className="flex-1">{size.name}</span>
                          {size.price > 0 && <span className="text-[#663300]">+${size.price.toFixed(2)}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Base selector */}
              <div
                className=" rounded-md overflow-hidden"
                onClick={() => setActiveTab(activeTab === "BASE" ? "" : "BASE")}
              >
                <div className="flex justify-between items-center p-3 cursor-pointer ">
                  <span className="font-medium text-[#663300]">BASE</span>
                  <span className="text-[#663300]">{activeTab === "BASE" ? "▼" : "►"}</span>
                </div>

                {activeTab === "BASE" && (
                  <div className="p-3 ">
                    <div className="space-y-2">
                      {bases.map((base) => (
                        <div key={base.name} className="flex text-[#663300] items-center">
                          <div
                            className={cn(
                              "w-5 h-5 rounded-full border flex  items-center justify-center mr-2",
                              selectedBase === base.name ? "border-[#663300]" : "border-gray-300",
                            )}
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedBase(base.name)
                            }}
                          >
                            {selectedBase === base.name && <div className="w-3 h-3 rounded-full bg-[#663300]"></div>}
                          </div>
                          <span className="flex-1">{base.name}</span>
                          {base.price > 0 && <span className="text-[#663300]">+${base.price.toFixed(2)}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Customize selector */}
              <div
                className=" rounded-md overflow-hidden"
                onClick={() => setActiveTab(activeTab === "CUSTOMISE" ? "" : "CUSTOMISE")}
              >
                <div className="flex justify-between items-center p-3 cursor-pointer ">
                  <span className="font-medium text-[#663300]">CUSTOMISE</span>
                  <span className="text-[#663300]">{activeTab === "CUSTOMISE" ? "▼" : "►"}</span>
                </div>

                {activeTab === "CUSTOMISE" && (
                  <div className="">
                    {/* Meats Category */}
                    <div
                      className="border-b"
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveCategoryTab(activeCategoryTab === "MEATS" ? "" : "MEATS")
                      }}
                    >
                      <div className="flex justify-between items-center p-3 cursor-pointer">
                        <span className="font-medium text-[#663300]">MEATS</span>
                        <span className="text-[#663300]">{activeCategoryTab === "MEATS" ? "▼" : "►"}</span>
                      </div>

                      {activeCategoryTab === "MEATS" && !pizza.isVeg && (
                        <div className="p-3 space-y-2 max-h-40 overflow-y-auto">
                          {categories.meats.map((item) => (
                            <div key={item.name} className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div
                                  className={cn(
                                    "w-5 h-5 rounded-full border flex items-center justify-center mr-2",
                                    selectedToppings[item.name] ? "border-[#663300]" : "border-gray-300",
                                  )}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedToppings((prev) => ({
                                      ...prev,
                                      [item.name]: !prev[item.name],
                                    }))
                                  }}
                                >
                                  {selectedToppings[item.name] && (
                                    <div className="w-3 h-3 rounded-full bg-[#663300]"></div>
                                  )}
                                </div>
                                <span>{item.name}</span>
                              </div>
                              <span className="text-[#663300]">${item.price.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {activeCategoryTab === "MEATS" && pizza.isVeg && (
                        <div className="p-3">
                          <p className="text-sm text-[#663300]">Not available for vegetarian pizzas</p>
                        </div>
                      )}
                    </div>

                    {/* Vegetarian Proteins */}
                    <div
                      className="border-b"
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveCategoryTab(activeCategoryTab === "VEGETARIAN_PROTEINS" ? "" : "VEGETARIAN_PROTEINS")
                      }}
                    >
                      <div className="flex justify-between items-center p-3 cursor-pointer">
                        <div className="flex items-center">
                          <span className="font-medium text-[#663300]">VEGETARIAN PROTEINS</span>
                          <div className="ml-2 w-4 h-4 border border-green-600 flex items-center justify-center">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          </div>
                        </div>
                        <span className="text-[#663300]">
                          {activeCategoryTab === "VEGETARIAN_PROTEINS" ? "▼" : "►"}
                        </span>
                      </div>

                      {activeCategoryTab === "VEGETARIAN_PROTEINS" && (
                        <div className="p-3 space-y-2 text-[#663300]">
                          {categories.vegetarianProteins.map((item) => (
                            <div key={item.name} className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div
                                  className={cn(
                                    "w-5 h-5 rounded-full border flex items-center justify-center mr-2",
                                    selectedToppings[item.name] ? "border-[#663300]" : "border-gray-300",
                                  )}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedToppings((prev) => ({
                                      ...prev,
                                      [item.name]: !prev[item.name],
                                    }))
                                  }}
                                >
                                  {selectedToppings[item.name] && (
                                    <div className="w-3 h-3 rounded-full bg-[#663300]"></div>
                                  )}
                                </div>
                                <span>{item.name}</span>
                              </div>
                              <span className="text-[#663300]">${item.price.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Cheese Category */}
                    <div
                      className="border-b"
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveCategoryTab(activeCategoryTab === "CHEESE" ? "" : "CHEESE")
                      }}
                    >
                      <div className="flex justify-between items-center p-3 cursor-pointer">
                        <span className="font-medium text-[#663300]">CHEESE</span>
                        <span className="text-[#663300]">{activeCategoryTab === "CHEESE" ? "▼" : "►"}</span>
                      </div>

                      {activeCategoryTab === "CHEESE" && (
                        <div className="p-3 space-y-2 text-[#663300]">
                          {categories.cheese.map((item) => (
                            <div key={item.name} className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div
                                  className={cn(
                                    "w-5 h-5 rounded-full border flex items-center justify-center mr-2",
                                    selectedToppings[item.name] ? "border-[#663300]" : "border-gray-300",
                                  )}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedToppings((prev) => ({
                                      ...prev,
                                      [item.name]: !prev[item.name],
                                    }))
                                  }}
                                >
                                  {selectedToppings[item.name] && (
                                    <div className="w-3 h-3 rounded-full bg-[#663300]"></div>
                                  )}
                                </div>
                                <span>{item.name}</span>
                              </div>
                              <span className="text-[#663300]">${item.price.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Sauces Category */}
                    <div
                      className="border-b"
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveCategoryTab(activeCategoryTab === "SAUCES" ? "" : "SAUCES")
                      }}
                    >
                      <div className="flex justify-between items-center p-3 cursor-pointer">
                        <span className="font-medium text-[#663300]">SAUCES</span>
                        <span className="ordertext-[#663300]">{activeCategoryTab === "SAUCES" ? "▼" : "►"}</span>
                      </div>

                      {activeCategoryTab === "SAUCES" && (
                        <div className="p-3 space-y-2 text-[#663300]">
                          {categories.sauces.map((item) => (
                            <div key={item.name} className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div
                                  className={cn(
                                    "w-5 h-5 rounded-full border flex items-center justify-center mr-2",
                                    selectedToppings[item.name] ? "border-[#663300]" : "border-gray-300",
                                  )}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedToppings((prev) => ({
                                      ...prev,
                                      [item.name]: !prev[item.name],
                                    }))
                                  }}
                                >
                                  {selectedToppings[item.name] && (
                                    <div className="w-3 h-3 rounded-full bg-[#663300]"></div>
                                  )}
                                </div>
                                <span>{item.name}</span>
                              </div>
                              <span className="text-[#663300]">${item.price.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Herbs & Seasonings Category */}
                    <div
                      className="border-b"
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveCategoryTab(activeCategoryTab === "HERBS" ? "" : "HERBS")
                      }}
                    >
                      <div className="flex justify-between items-center p-3 cursor-pointer">
                        <span className="font-medium text-[#663300]">HERBS & SEASONINGS</span>
                        <span className="text-[#663300]">{activeCategoryTab === "HERBS" ? "▼" : "►"}</span>
                      </div>

                      {activeCategoryTab === "HERBS" && (
                        <div className="p-3 space-y-2 text-[#663300]">
                          {categories.herbsAndSeasonings.map((item) => (
                            <div key={item.name} className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div
                                  className={cn(
                                    "w-5 h-5 rounded-full border flex items-center justify-center mr-2",
                                    selectedToppings[item.name] ? "border-[#663300]" : "border-gray-300",
                                  )}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedToppings((prev) => ({
                                      ...prev,
                                      [item.name]: !prev[item.name],
                                    }))
                                  }}
                                >
                                  {selectedToppings[item.name] && (
                                    <div className="w-3 h-3 rounded-full bg-[#663300]"></div>
                                  )}
                                </div>
                                <span>{item.name}</span>
                              </div>
                              <span className="text-[#663300]">${item.price.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Vegetables Category */}
                    <div
                      className="border-b"
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveCategoryTab(activeCategoryTab === "VEGETABLES" ? "" : "VEGETABLES")
                      }}
                    >
                      <div className="flex justify-between items-center p-3 cursor-pointer">
                        <span className="font-medium text-[#663300]">VEGETABLES</span>
                        <span className="text-[#663300]">{activeCategoryTab === "VEGETABLES" ? "▼" : "►"}</span>
                      </div>

                      {activeCategoryTab === "VEGETABLES" && (
                        <div className="p-3 space-y-2 text-[#663300]">
                          {categories.vegetables.map((item) => (
                            <div key={item.name} className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div
                                  className={cn(
                                    "w-5 h-5 rounded-full border flex items-center justify-center mr-2",
                                    selectedToppings[item.name] ? "border-[#663300]" : "border-gray-300",
                                  )}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedToppings((prev) => ({
                                      ...prev,
                                      [item.name]: !prev[item.name],
                                    }))
                                  }}
                                >
                                  {selectedToppings[item.name] && (
                                    <div className="w-3 h-3 rounded-full bg-[#663300]"></div>
                                  )}
                                </div>
                                <span>{item.name}</span>
                              </div>
                              <span className="text-[#663300]">${item.price.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Allergies information */}
              <div
                className="rounded-md overflow-hidden"
                onClick={() => setActiveTab(activeTab === "ALLERGIES" ? "" : "ALLERGIES")}
              >
                <div className="flex justify-between items-center p-3 cursor-pointer">
                  <span className="font-medium text-[#663300]">ALLERGIES OR DIETARY REQUIREMENTS</span>
                  <span className="text-[#663300]">{activeTab === "ALLERGIES" ? "▼" : "►"}</span>
                </div>

                {activeTab === "ALLERGIES" && (
                  <div className="p-3 border-t">
                    <p className="text-sm text-[#663300] mb-3">
                      This product may contain gluten, dairy, and other allergens. Please ask our staff for more
                      information if you have specific dietary concerns or allergies.
                    </p>
                    <div className="border border-[#663300] rounded-md p-2 mb-3">
                      <textarea
                        placeholder="ADD SPECIAL INSTRUCTIONS"
                        className="w-full h-20 resize-none outline-none text-[#663300]"
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quantity controls */}
        <div className="flex items-center justify-center my-4">
          <button
            className="w-8 h-8 rounded-full bg-[#f8f8f8] border border-[#663300] flex items-center justify-center text-[#663300]"
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
          >
            -
          </button>
          <span className="mx-4 text-[#663300]">{quantity}</span>
          <button
            className="w-8 h-8 rounded-full bg-[#f8f8f8] border border-[#663300] flex items-center justify-center text-[#663300]"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>

        {/* Add to cart button - fixed at bottom */}
        <div className="p-4 border-t bg-white">
          <button className="w-full bg-[#663300] text-white py-3 rounded-md font-bold" onClick={handleAddToCart}>
            ADD TO CART - ${totalPrice}
          </button>
        </div>
      </div>
    </div>
  )
}

// Define PropTypes after the component
PizzaPopup.propTypes = {
  pizza: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    isVeg: PropTypes.bool.isRequired,
    image: PropTypes.shape({
      src: PropTypes.string.isRequired,
    }).isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onNavigate: PropTypes.func,
}

export default PizzaPopup
