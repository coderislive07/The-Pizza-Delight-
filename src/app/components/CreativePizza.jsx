"use client"

import React, { useState } from "react"
import { Plus } from "lucide-react"
import Image from "next/image"
import PizzaModal from "./pizza-modal"
import img1 from "../../../public/pizza1 (1).png"
import img2 from "../../../public/pizza1 (2).png"
import img3 from "../../../public/pizza1 (3).png"
import img4 from "../../../public/pizza1 (4).png"
import img5 from "../../../public/pizza1 (5).png"
import img6 from "../../../public/pizza1 (6).png"
import img7 from "../../../public/pizza1 (7).png"
import img8 from "../../../public/pizza1 (8).png"
import img9 from "../../../public/pizza1 (9).png"
import img10 from "../../../public/pizza1 (10).png"
import img11 from "../../../public/pizza1 (11).png"
import img12 from "../../../public/pizza1 (12).png"
import img13 from "../../../public/pizza1 (13).png"
import img14 from "../../../public/pizza1 (5).png"

export default function CreativeDelightsMenu() {
  const [selectedItems, setSelectedItems] = useState({})
  const [activeIndex, setActiveIndex] = useState(null)
  const [cart, setCart] = useState([])

  const pizzaItems = [
    {
      name: "VEGGIE MAKHANI DELIGHT",
      description:
        "An Indian Fusion Twist: Creamy Makhani Base Topped With Pineapple, Mushrooms, Capsicum And Mozzarella With A Spiced Mayo Finish.",
      isVeg: true,
      image: img1,
    },
    {
      name: "TANDOORI CHAAP DELIGHT",
      description:
        "Fiery & Wholesome: Marinated Soy Chaap In Tandoori Sauce With Ginger, Garlic, Capsicum And Herbs On A Cheesy Base.",
      isVeg: true,
      image: img2,
    },
    {
      name: "TANDOORI PANEER AND CORNS DELIGHT",
      description:
        "A Crunchy, Cheesy Hit: Paneer, Corn, Mushrooms, And Capsicum In Smoky Tandoori Sauce, Finished With Mozzarella.",
      isVeg: true,
      image: img3,
    },
    {
      name: "CHILI PANEER DELIGHT",
      description:
        "Desi Street-Style Flavor: Schezwan-Marinated Paneer Cubes With Garlic, Onion, Capsicum And Coriander On A Cheesy Crust.",
      isVeg: true,
      image: img4,
    },
    {
      name: "CHILI MUSHROOM DELIGHT",
      description:
        "Spicy & Bold: Juicy Mushrooms In Schezwan Sauce With Garlic, Capsicum, And Onions Under Molten Mozzarella.",
      isVeg: true,
      image: img5,
    },
    {
      name: "CHILI CHICKEN DELIGHT",
      description:
        "Indo-Chinese Favorite: Chicken Chunks Tossed In Garlic-Ginger Schezwan Sauce With Onion, Capsicum And Melty Cheese.",
      isVeg: false,
      image: img6,
    },
    {
      name: "TANDOORI CHICKEN DELIGHT",
      description:
        "Smoked & Spiced: Tandoori-Marinated Chicken, Ginger-Garlic, Onion, And Capsicum Topped With Herbs And Mozzarella.",
      isVeg: false,
      image: img7,
    },
    {
      name: "BUTTER CHICKEN DELIGHT",
      description:
        "Creamy Indulgence: Buttery Chicken Chunks With Red Onions And Capsicum Under A Mozzarella-Rich Golden Melt.",
      isVeg: false,
      image: img9,
    },
    {
      name: "CHICKEN SEEKH KEBAB DELIGHT",
      description:
        "Chicken Kebab Pieces, Ginger, Garlic, Coriander, Homemade Tandoori Sauce, Onion, Capsicum, Mozzarella Topped With Homemade Spices.",
      isVeg: false,
      image: img10,
    },
    {
      name: "KADAHI CHICKEN DELIGHT",
      description:
        "Rich & Rustic: Kadahi-Style Chicken With Bold Ginger-Garlic Notes, Onions, Capsicum And Mozzarella Over Spicy Gravy.",
      isVeg: false,
      image: img11,
    },
    {
      name: "KADAHI PANEER DELIGHT",
      description:
        "A Dhaba-Style Winner: Paneer, Capsicum And Onions In Kadahi Gravy, Layered With Mozzarella And Coriander.",
      isVeg: true,
      image: img12,
    },
    {
      name: "INDIAN MAGGIE VEGGIE DELIGHT",
      description:
        "Fun Fusion: Classic Indian Masala Maggie With Cheese, Tomatoes, And Capsicum Baked On A Spicy Crust.",
      isVeg: true,
      image: img13,
    },
    {
      name: "INDIAN MAGGIE CHICKEN DELIGHT",
      description: "Desi Comfort Redefined: Spiced Maggie Noodles Loaded With Cheesy Chicken, Tomatoes And Capsicum.",
      isVeg: false,
      image: img14,
    },
    {
      name: "INDIAN MAGGIE BEEF DELIGHT",
      description:
        "Hearty & Bold: Indian Masala Maggie With Beef, Capsicum And Mozzarella, Finished With Indian Spices.",
      isVeg: false,
      image: img8,
    },
  ]

  const toggleSelection = (index) => {
    setSelectedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const handleAddToCart = (selections) => {
    // Add the selections to the cart
    setCart((prevCart) => [...prevCart, selections])
    // Close the modal
    setActiveIndex(null)
    // Show a confirmation message
    alert("Pizza added to cart!")
  }

  const renderPizzaItem = (item, index) => (
    <div key={index} className="flex justify-between items-start mb-8 relative">
      <div className="flex-1 pr-4 max-w-[400px]">
        <h2 className="text-lg font-bold text-[#663300] mb-1">{item.name}</h2>
        <p className="text-sm text-gray-700 mb-2">{item.description}</p>
        <div className="flex items-center">
          <div
            className={`w-5 h-5 border ${item.isVeg ? "border-green-600" : "border-red-500"} flex items-center justify-center`}
          >
            <div className={`w-3 h-3 ${item.isVeg ? "bg-green-600" : "bg-red-500"} rounded-full`}></div>
          </div>
          <span className="text-xs ml-1 text-gray-600">{item.isVeg ? "100% VEG" : "NON VEG"}</span>
        </div>
      </div>

      <div className="relative">
        <button onClick={() => setActiveIndex(index)}>
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            width={96}
            height={96}
            className="w-30 h-30 object-cover rounded-md"
          />
        </button>
        <button className="absolute top-0 right-0 bg-white rounded-full p-1 shadow-md">
          <Plus size={16} className="text-gray-500" />
        </button>
        <button
          className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 ${
            selectedItems[index] ? "bg-[#663300] border-amber-800" : "bg-white border-gray-300"
          }`}
          onClick={() => toggleSelection(index)}
          aria-label="Select item"
        >
          {selectedItems[index] && <div className="w-2 h-2 bg-white rounded-full mx-auto"></div>}
        </button>
      </div>
    </div>
  )

  return (
    <div className="relative">
      {/* Pizza Modal */}
      {activeIndex !== null && (
        <PizzaModal
          isOpen={activeIndex !== null}
          onClose={() => setActiveIndex(null)}
          pizzaItem={pizzaItems[activeIndex]}
          onAddToCart={handleAddToCart}
          allPizzas={pizzaItems}
          currentIndex={activeIndex}
          onNavigate={setActiveIndex}
        />
      )}

      <div className="px-28 mx-auto bg-[#F9F3E6] p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#663300] bg-white inline-block px-12 py-2 border-2 border-[#663300] rounded-full">
            CREATIVE DELIGHTS
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          {pizzaItems.map((item, index) => (
            <React.Fragment key={`item-${index}`}>
              <div className="col-span-1">{renderPizzaItem(item, index)}</div>
              {(index + 1) % 2 === 0 && index !== pizzaItems.length - 1 && (
                <div key={`divider-${index}`} className="col-span-full">
                  <hr className="border-t border-gray-300 my-6" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}