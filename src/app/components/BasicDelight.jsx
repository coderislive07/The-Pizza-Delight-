import Image from "next/image"
import { Plus } from "lucide-react"
import img1 from "../../../public/BasicDelight/1.png"
import img2 from "../../../public/BasicDelight/2.png"
import img3 from "../../../public/BasicDelight/3.png"
import img4 from "../../../public/BasicDelight/4.png"
import img5 from "../../../public/BasicDelight/5.png"
import img6 from "../../../public/BasicDelight/6.png"
import img7 from "../../../public/BasicDelight/7.png"
import img8 from "../../../public/BasicDelight/8.png"
import img9 from "../../../public/BasicDelight/9.png"
import img10 from "../../../public/BasicDelight/10.png"

export default function BasicDelight() {
  const pizzaData = [
    {
      title: "HAM & CHEESE",
      description:
        "Classic Meets Comfort: Juicy Ham Slices With Mushrooms And Onions, Layered Over Tomato Base And Gooey Mozzarella.",
      isVeg: false,
      image: img1,
    },
    {
      title: "ONION & CHEESE",
      description:
        "Simplicity Done Right: Tangy Tomato Base, Black Olives, And Onions Topped With Stretchy Mozzarella Goodness.",
      isVeg: true,
      image: img2,
    },
    {
      title: "HAWAIIAN",
      description:
        "The Sweet & Savory Icon: Juicy Pineapple And Tender Ham Slices On A Rich Tomato And Mozzarella Base.",
      isVeg: false,
      image: img3,
    },
    {
      title: "PEPPERONI",
      description:
        "Our Take On A Traditional Pepperoni Pizza: Italian Buffalo Mozzarella, 5-Pepper Free-Range Pepperoni On A Tangy Tomato Base.",
      isVeg: false,
      image: img4,
    },
    {
      title: "MARGARITA",
      description:
        "A Timeless Favorite: Tomato Base, Fresh Baby Spinach, Juicy Tomatoes, And Mozzarella Finished With Oregano.",
      isVeg: true,
      image: img5,
    },
    {
      title: "MUSHROOM & CHEESE",
      description:
        "Earthy Flavors Unite: Sliced Mushrooms And Black Olives On A Tomato-Mozzarella Base — Simple, Rich, And Satisfying.",
      isVeg: false,
      image: img6,
    },
    {
      title: "CHEESY GARLIC",
      description:
        "For The Garlic Lovers: Garlic Sauce And Mozzarella Over A Tomato Base, With Double Garlic For Bold Flavor.",
      isVeg: true,
      image: img7,
    },
    {
      title: "VEGGIE PIZZA",
      description: "A Garden On A Crust: Capsicum, Onion, Tomato, And Mozzarella Over A Vibrant Tomato Sauce.",
      isVeg: false,
      image: img8,
    },
    {
      title: "CHEESE LOVERS DELIGHT",
      description:
        "Every Cheese Lover's Dream: A Creamy Trio Of Mozzarella, Cheddar, Camembert, And Feta Topped With Parmesan And Herbs.",
      isVeg: false,
      image: img9,
    },
    {
      title: "BEEF AND ONION DELIGHT",
      description:
        "Hearty And Bold: Savory Beef, Onions, And Olives Over Tomato Sauce, Finished With Mozzarella And A Dash Of Oregano.",
      isVeg: false,
      image: img10,
    },
  ]

  return (
    <div className="px-28 mx-auto bg-[#F9F3E6] p-6 relative">
      {/* Plus icons in corners */}
      <div className="absolute top-2 right-2">
        <Plus size={20} className="text-amber-800" />
      </div>
      <div className="absolute top-2 left-2">
        <Plus size={20} className="text-amber-800" />
      </div>

      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-[#663300] mb-4">PIZZA</h1>
        <div className="inline-block  bg-white border border-[#663300] rounded-full px-6 py-2 mb-6">
          <h2 className="text-lg font-bold  text-amber-800">BASIC DELIGHTS PIZZA</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
        {pizzaData.map((pizza, index) => (
          <div key={index} className="flex justify-between items-start mb-4 relative">
            <div className="flex-1 pr-4 max-w-[400px]">
              <h2 className="text-lg font-bold text-[#663300] mb-1">{pizza.title}</h2>
              <p className="text-sm text-gray-700 mb-2">{pizza.description}</p>
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
              <Image
                src={pizza.image || "/placeholder.svg"}
                alt={pizza.title}
                width={120}
                height={120}
                className="object-cover rounded-md"
              />
              <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 border-gray-300 bg-white"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Plus icons in bottom corners */}
      <div className="absolute bottom-2 right-2">
        <Plus size={20} className="text-amber-800" />
      </div>
      <div className="absolute bottom-2 left-2">
        <Plus size={20} className="text-amber-800" />
      </div>
    </div>
  )
}
