"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus } from "lucide-react"
import PizzaModal from "./pizza-modal"
import img1 from "../../../public/DeluxeDelight/1.png"
import img2 from "../../../public/DeluxeDelight/2.png"
import img3 from "../../../public/DeluxeDelight/3.png"
import img4 from "../../../public/DeluxeDelight/4.png"
import img5 from "../../../public/DeluxeDelight/5.png"
import img6 from "../../../public/DeluxeDelight/6.png"
import img7 from "../../../public/DeluxeDelight/7.png"
import img8 from "../../../public/DeluxeDelight/8.png"
import img9 from "../../../public/DeluxeDelight/9.png"
import img10 from "../../../public/DeluxeDelight/10.png"
import img11 from "../../../public/DeluxeDelight/11.png"
import img12 from "../../../public/DeluxeDelight/12.png"
import img13 from "../../../public/DeluxeDelight/13.png"
import img14 from "../../../public/DeluxeDelight/14.png"
import img15 from "../../../public/DeluxeDelight/15.png"
import img16 from "../../../public/DeluxeDelight/16.png"
import img17 from "../../../public/DeluxeDelight/17.png"
import img18 from "../../../public/DeluxeDelight/18.png"
import img19 from "../../../public/DeluxeDelight/19.png"    

export default function DeluxeDelight() {
  const [activeIndex, setActiveIndex] = useState(null)
  const [selectedItems, setSelectedItems] = useState({})
  const [cart, setCart] = useState([])

  const pizzaData = [
    {
      title: "VEGGIE LOVERS DELIGHT",
      description:
        "A Loaded Veggie Celebration: Mushrooms, Tomatoes, Capsicum, Onions, Black Olives, And Baby Corn Base With Velvety Mozzarella And Herbs.",
      isVeg: true,
      image: img1,
    },
    {
      title: "PEPPERY VEGGIE DELIGHT",
      description:
        "An Earthy, Spicy Kick: Bell Peppers, Garden-Grown Capsicum, Mushrooms And Onions On A Tomato Base With Mozzarella.",
      isVeg: true,
      image: img2,
    },
    {
      title: "VEGGIE CORN DELIGHT",
      description:
        "The Ultimate Veg Combo: Sweet Corn, Mushrooms, Olives, And Bell Peppers Topped With Mozzarella On A Tangy Base.",
      isVeg: true,
      image: img3,
    },
    {
      title: "VEGGIE PANEER DELIGHT",
      description:
        "An Iconic & Creamy Soft Paneer, Green Chilli, Onions, Garlic, And Capsicum On A Tomato-Mozzarella Base With A Dash Of Herbs.",
      isVeg: true,
      image: img4,
    },
    {
      title: "THAI VEGGIE DELIGHT",
      description:
        "A Fusion Twist: Fiery Asian Sauce, Mushrooms, Baby Corn, And Chili Flakes Layered With Mozzarella And A Spicy Swirl.",
      isVeg: true,
      image: img5,
    },
    {
      title: "CHICKEN DELIGHT",
      description:
        "Simple Yet Satisfying: Herb-Marinated Baked Chicken, Garlic, Red Onion And Mozzarella On A Herbed Tomato Base With Oregano.",
      isVeg: false,
      image: img6,
    },
    {
      title: "THAI CHICKEN DELIGHT",
      description:
        "Asian-Style Thai-Creamy Spicy Base, Marinated Chicken, Red Peppers And Onions With A Drizzle Of Sriracha.",
      isVeg: false,
      image: img7,
    },
    {
      title: "APRICOT CHICKEN DELIGHT",
      description:
        "Sweet & Savory Fusion Flair: Caramelized Apricot, Sliced Chicken And Parmesan Cheese On A Creamy Garlic Base.",
      isVeg: false,
      image: img8,
    },
    {
      title: "PEPPERY CHICKEN DELIGHT",
      description:
        "Bold And Fiery: Grilled Chicken, Black Olives, Mushrooms, And 3 Chilies Atop A Spicy Tomato Base With Mozzarella.",
      isVeg: false,
      image: img9,
    },
    {
      title: "HAM, CHICKEN AND PINEAPPLE DELIGHT",
      description:
        "The Ultimate Trio Burst: Lean Marinated Chicken, Juicy Ham, And Pineapple Chunks Layered With Mozzarella.",
      isVeg: false,
      image: img10,
    },
    {
      title: "GARLIC BEEF DELIGHT",
      description:
        "Savory Flavor Bomb: Minced Beef, Capsicum, Garlic, Onions, And Mozzarella With Herbed Cheese And Black Olives.",
      isVeg: false,
      image: img11,
    },
    {
      title: "AVOCADO BEEF DELIGHT",
      description:
        "Rich Creaminess Meets Savory Beef: Sliced Beef With Avocado And Parmesan Over A Mozzarella Tomato Base.",
      isVeg: false,
      image: img12,
    },
    {
      title: "SEAFOOD DELIGHT",
      description:
        "The Ocean's Treat: Prawns, Calamari, Crab And Olives On A Creamy Garlic Base Finished With Mozzarella And Herbs.",
      isVeg: false,
      image: img13,
    },
    {
      title: "MEATY AND SEAFOOD DELIGHT",
      description:
        "A Surf 'n Turf Fusion: Minced Beef, Spicy Garlic Prawns, And Onions On Tomato Base With Mozzarella And Oregano.",
      isVeg: false,
      image: img14,
    },
    {
      title: "LOADED VEGGIE DELIGHT",
      description:
        "Everything Green & Lush: Mushrooms, Roasted Zucchini, Caramelized Onion And Olives Glazed With Oregano-Infused Mozzarella.",
      isVeg: true,
      image: img15,
    },
    {
      title: "BBQ MEATY DELIGHT",
      description:
        "Smoked & Sauced: Ham, Bacon, Beef, Pepperoni And BBQ Chicken Glazed Over Mozzarella On Smoked BBQ Sauce.",
      isVeg: false,
      image: img16,
    },
    {
      title: "PERI PERI MEATY DELIGHT",
      description:
        "Fiery Spice: Pepperoni, Salami, Ham, Chicken And Bacon Loaded With Extra Chili Flakes On A Peri Peri Base.",
      isVeg: false,
      image: img17,
    },
    {
      title: "BACON DELIGHT",
      description:
        "Classic Indulgence: Plenty Bacon With Bacon Flakes, Feta, Spinach And Onion Over A Rich Mozzarella.",
      isVeg: false,
      image: img18,
    },
    {
      title: "SWEET CHILI BEEF AND BACON DELIGHT",
      description:
        "Sweet Heat Combo: Bacon, Beef And Caramelized Onions Smothered In Sweet Chili Sauce And Topped With Mozzarella.",
      isVeg: false,
      image: img19,
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

  return (
    <div className="px-28 mx-auto bg-[#F9F3E6] p-6 relative">
      {/* Pizza Modal */}
      {activeIndex !== null && (
        <PizzaModal
          isOpen={activeIndex !== null}
          onClose={() => setActiveIndex(null)}
          pizzaItem={pizzaData[activeIndex]}
          onAddToCart={handleAddToCart}
          allPizzas={pizzaData}
          currentIndex={activeIndex}
          onNavigate={setActiveIndex}
        />
      )}

      {/* Plus icons in corners */}
      <div className="absolute top-2 right-2">
        <Plus size={20} className="text-[#663300]" />
      </div>
      <div className="absolute bottom-2 right-2">
        <Plus size={20} className="text-[#663300]" />
      </div>

      <div className="text-center mb-8">
        <div className="inline-block bg-white border border-[#663300] rounded-full px-8 py-2 mb-6">
          <h2 className="text-xl font-bold text-[#663300]">DELUXE DELIGHTS</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
        {pizzaData.map((pizza, index) => (
          <div key={index} className="flex justify-between items-start mb-2 relative">
            <div className="flex-1 pr-4 max-w-[400px]">
              <h2 className="text-lg font-bold text-[#663300] mb-1">{pizza.title}</h2>
              <p className="text-xs text-gray-700 mb-2">{pizza.description}</p>
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 border ${pizza.isVeg ? "border-green-600" : "border-red-500"} flex items-center justify-center`}
                >
                  <div className={`w-3 h-3 ${pizza.isVeg ? "bg-green-600" : "bg-red-500"} rounded-full`}></div>
                </div>
                <span className="text-xs ml-1 text-gray-600">{pizza.isVeg ? "100% VEG" : "NON VEG"}</span>
              </div>
            </div>

            <div className="relative">
              <button onClick={() => setActiveIndex(index)}>
                <Image
                  src={pizza.image || "/placeholder.svg"}
                  alt={pizza.title}
                  width={100}
                  height={100}
                  className="object-cover rounded-md"
                />
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
        ))}
      </div>
    </div>
  )
}
