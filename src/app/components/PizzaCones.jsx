import cone1 from "../../../public/pizzaCones/1.png"
import cone2 from "../../../public/pizzaCones/2.png"
import cone3 from "../../../public/pizzaCones/3.png"
import cone4 from "../../../public/pizzaCones/4.png"
import cone5 from "../../../public/pizzaCones/5.png"
import cone6 from "../../../public/pizzaCones/6.png"
import cone7 from "../../../public/pizzaCones/7.png"
import cone8 from "../../../public/pizzaCones/8.png"
import cone9 from "../../../public/pizzaCones/9.png"
import cone10 from "../../../public/pizzaCones/10.png"
import { Plus, Circle } from "lucide-react"
import Image from "next/image"

export default function PizzaCones() {
  const pizzaCones = [
    {
      id: 1,
      title: "HAM & CHEESE PIZZA CONE",
      description:
        "A Classic Cone Filled With Smoky Ham, Sautéed Onions, Mushrooms, And Stretchy Mozzarella — Sealed In A Crispy Shell.",
      image: cone1,
      isVeg: true,
    },
    {
      id: 2,
      title: "ONION & CHEESE PIZZA CONE",
      description:
        "A Simple Yet Comforting Cone Loaded With Caramelized Onions, Oregano, And Melted Mozzarella In Every Bite.",
      image: cone2,
      isVeg: true,
    },
    {
      id: 3,
      title: "PEPPERONI PIZZA CONE",
      description:
        "Spicy Pepperoni Slices Tucked Into A Golden Cone With Onions And Bubbling Mozzarella — Bold And Satisfying.",
      image: cone3,
      isVeg: false,
    },
    {
      id: 4,
      title: "VEGGIE PIZZA CONE",
      description: "A Vibrant Mix Of Capsicum, Tomatoes, Onions, And Cheese Baked Into A Crisp Vegetarian Pocket.",
      image: cone4,
      isVeg: true,
    },
    {
      id: 5,
      title: "BEEF & ONION DELIGHT PIZZA CONE",
      description: "Tender Beef, Black Olives, And Onion With Herbs And Cheese, Folded Into A Savory Golden Crust.",
      image: cone5,
      isVeg: false,
    },
    {
      id: 6,
      title: "VEGGIE PANEER DELIGHT PIZZA CONE",
      description: "Packed With Spiced Paneer, Onion, Garlic, Capsicum, And Cheese — A Pocket-Sized Desi Delight.",
      image: cone6,
      isVeg: true,
    },
    {
      id: 7,
      title: "CHICKEN DELIGHT PIZZA CONE",
      description:
        "Tandoori-Marinated Chicken, Garlic, Capsicum, And Herbs Baked Into A Cone For The Ultimate Cheesy Bite.",
      image: cone7,
      isVeg: false,
    },
    {
      id: 8,
      title: "APRICOT CHICKEN DELIGHT PIZZA CONE",
      description:
        "A Sweet & Savory Explosion: Pineapple, Apricot Sauce, Feta Cheese, And Tender Chicken Inside A Creamy, Cheesy Cone.",
      image: cone8,
      isVeg: false,
    },
    {
      id: 9,
      title: "SEAFOOD DELIGHT PIZZA CONE",
      description:
        "Prawns, Shrimps, Olives, And Garlic In A Rich Fraiche Base With Cajun Seasoning — A Coastal Twist In Cone Form.",
      image: cone9,
      isVeg: false,
    },
    {
      id: 10,
      title: "PEPPERY CHICKEN DELIGHT PIZZA CONE",
      description:
        "A Fiery Cone Stuffed With Spiced Chicken, Jalapeños, Black Olives, And Capsicum, Topped With Sriracha Mayo Swirl.",
      image: cone10,
      isVeg: true,
    },
  ]

  return (
    <div className="bg-[#F9F3E6] p-8 min-h-screen">
      <div className="max-w-[105rem] mx-auto">
        {/* Header */}
        <div className="flex justify-center mb-10">
          <div className="bg-white rounded-full px-10 py-3 shadow-md">
            <h1 className="text-4xl font-bold text-[#5A3800]">PIZZA CONES</h1>
          </div>
        </div>

        {/* Pizza Cones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {pizzaCones.slice(0, 5).map((cone) => (
              <div key={cone.id} className="flex justify-between items-center">
                <div className="max-w-xs">
                  <h2 className="text-xl font-bold text-[#5A3800]">{cone.title}</h2>
                  <p className="text-sm mt-1 text-[#5A3800]">{cone.description}</p>
                  <div className="mt-2 flex items-center">
                    <div className={`p-1 border ${cone.isVeg ? "border-green-500" : "border-red-500"}`}>
                      <Circle
                        className={`w-3 h-3 ${cone.isVeg ? "fill-green-600 text-green-600" : "fill-red-600 text-red-600"}`}
                      />
                    </div>
                    <span className="ml-1 text-xs text-[#5A3800]">{cone.isVeg ? "100% VEG" : "NON-VEG"}</span>
                  </div>
                </div>
                <div className="relative">
                  <Image src={cone.image || "/placeholder.svg"} alt={cone.title} className="w-32 h-32 object-contain" />
                  <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
                    <Plus className="w-5 h-5 text-[#5A3800]" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {pizzaCones.slice(5, 10).map((cone) => (
              <div key={cone.id} className="flex justify-between items-center">
                <div className="max-w-xs">
                  <h2 className="text-xl font-bold text-[#5A3800]">{cone.title}</h2>
                  <p className="text-sm mt-1 text-[#5A3800]">{cone.description}</p>
                  <div className="mt-2 flex items-center">
                    <div className={`p-1 border ${cone.isVeg ? "border-green-500" : "border-red-500"}`}>
                      <Circle
                        className={`w-3 h-3 ${cone.isVeg ? "fill-green-600 text-green-600" : "fill-red-600 text-red-600"}`}
                      />
                    </div>
                    <span className="ml-1 text-xs text-[#5A3800]">{cone.isVeg ? "100% VEG" : "NON-VEG"}</span>
                  </div>
                </div>
                <div className="relative">
                  <Image src={cone.image || "/placeholder.svg"} alt={cone.title} className="w-32 h-32 object-contain" />
                  <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
                    <Plus className="w-5 h-5 text-[#5A3800]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
