import pocket1 from "../../../public/pizzaPockets/1.png"
import pocket2 from "../../../public/pizzaPockets/2.png"
import pocket3 from "../../../public/pizzaPockets/3.png"
import pocket4 from "../../../public/pizzaPockets/4.png"
import pocket5 from "../../../public/pizzaPockets/5.png"
import pocket6 from "../../../public/pizzaPockets/6.png"
import pocket7 from "../../../public/pizzaPockets/7.png"
import pocket8 from "../../../public/pizzaPockets/8.png"
import pocket9 from "../../../public/pizzaPockets/9.png"
import pocket10 from "../../../public/pizzaPockets/10.png"
import Image from "next/image"
import { Plus, Circle } from "lucide-react"

export default function PizzaPockets() {
  return (
    <div className="bg-[#F9F3E6] p-8 min-h-screen">
      <div className="max-w-[105rem] mx-auto">
        {/* Header */}
        <div className="flex justify-center mb-10">
          <div className="bg-white rounded-full px-10 py-3 shadow-md">
            <h1 className="text-4xl font-bold text-[#5A3800]">PIZZA POCKETS</h1>
          </div>
        </div>

        {/* Pizza Pockets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Pocket 1 */}
            <div className="flex justify-between items-center">
              <div className="max-w-xs">
                <h2 className="text-xl font-bold text-[#5A3800]">HAM & CHEESE PIZZA POCKET</h2>
                <p className="text-sm mt-1 text-[#5A3800]">
                  A Classic Cone Filled With Smoky Ham, Sautéed Onions, Mushrooms, And Stretchy Mozzarella — Sealed In A
                  Crispy Shell.
                </p>
                <div className="mt-2 flex items-center">
                  <Circle className="w-5 h-5 fill-green-600 text-green-600" />
                  <span className="ml-1 text-xs text-[#5A3800]">100% VEG</span>
                </div>
              </div>
              <div className="relative">
                <Image
                  src={pocket1 || "/placeholder.svg"}
                  alt="Ham & Cheese Pizza Pocket"
                  className="w-32 h-32 object-contain"
                />
                <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
                  <Plus className="w-5 h-5 text-[#5A3800]" />
                </button>
              </div>
            </div>

            {/* Pocket 3 */}
            <div className="flex justify-between items-center">
              <div className="max-w-xs">
                <h2 className="text-xl font-bold text-[#5A3800]">PEPPERONI PIZZA POCKET</h2>
                <p className="text-sm mt-1 text-[#5A3800]">
                  Spicy Pepperoni And Melty Mozzarella Packed Inside A Crispy, Handheld Crust — A Meaty Favorite.
                </p>
                <div className="mt-2 flex items-center">
                  <Circle className="w-5 h-5 fill-red-600 text-red-600" />
                  <span className="ml-1 text-xs text-[#5A3800]">NON-VEG</span>
                </div>
              </div>
              <div className="relative">
                <Image
                  src={pocket3 || "/placeholder.svg"}
                  alt="Pepperoni Pizza Pocket"
                  className="w-32 h-32 object-contain"
                />
                <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
                  <Plus className="w-5 h-5 text-[#5A3800]" />
                </button>
              </div>
            </div>

            {/* Pocket 5 */}
            <div className="flex justify-between items-center">
              <div className="max-w-xs">
                <h2 className="text-xl font-bold text-[#5A3800]">BEEF & ONION DELIGHT PIZZA POCKET</h2>
                <p className="text-sm mt-1 text-[#5A3800]">
                  Tender Beef, Black Olives, And Onion With Herbs And Cheese, Folded Into A Savory Golden Crust.
                </p>
                <div className="mt-2 flex items-center">
                  <Circle className="w-5 h-5 fill-red-600 text-red-600" />
                  <span className="ml-1 text-xs text-[#5A3800]">NON-VEG</span>
                </div>
              </div>
              <div className="relative">
                <Image
                  src={pocket5 || "/placeholder.svg"}
                  alt="Beef & Onion Delight Pizza Pocket"
                  className="w-32 h-32 object-contain"
                />
                <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
                  <Plus className="w-5 h-5 text-[#5A3800]" />
                </button>
              </div>
            </div>

            {/* Pocket 7 */}
            <div className="flex justify-between items-center">
              <div className="max-w-xs">
                <h2 className="text-xl font-bold text-[#5A3800]">CHICKEN DELIGHT PIZZA POCKET</h2>
                <p className="text-sm mt-1 text-[#5A3800]">
                  Marinated Baked Chicken With Capsicum, Onion, And Garlic, Seasoned With Herbs And Stuffed With
                  Mozzarella.
                </p>
                <div className="mt-2 flex items-center">
                  <Circle className="w-5 h-5 fill-red-600 text-red-600" />
                  <span className="ml-1 text-xs text-[#5A3800]">NON-VEG</span>
                </div>
              </div>
              <div className="relative">
                <Image
                  src={pocket7 || "/placeholder.svg"}
                  alt="Chicken Delight Pizza Pocket"
                  className="w-32 h-32 object-contain"
                />
                <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
                  <Plus className="w-5 h-5 text-[#5A3800]" />
                </button>
              </div>
            </div>

            {/* Pocket 9 */}
            <div className="flex justify-between items-center">
              <div className="max-w-xs">
                <h2 className="text-xl font-bold text-[#5A3800]">SEAFOOD DELIGHT PIZZA POCKET</h2>
                <p className="text-sm mt-1 text-[#5A3800]">
                  Juicy Prawns And Shrimp With Garlic, Olives, And Cheese In A Creamy Fraiche Base — A Seafood Lover's
                  Dream.
                </p>
                <div className="mt-2 flex items-center">
                  <Circle className="w-5 h-5 fill-red-600 text-red-600" />
                  <span className="ml-1 text-xs text-[#5A3800]">NON-VEG</span>
                </div>
              </div>
              <div className="relative">
                <Image
                  src={pocket9 || "/placeholder.svg"}
                  alt="Seafood Delight Pizza Pocket"
                  className="w-32 h-32 object-contain"
                />
                <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
                  <Plus className="w-5 h-5 text-[#5A3800]" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Pocket 2 */}
            <div className="flex justify-between items-center">
              <div className="max-w-xs">
                <h2 className="text-xl font-bold text-[#5A3800]">ONION & CHEESE PIZZA POCKET</h2>
                <p className="text-sm mt-1 text-[#5A3800]">
                  A Simple Yet Comforting Cone Loaded With Caramelized Onions, Oregano, And Melted Mozzarella In Every
                  Bite.
                </p>
                <div className="mt-2 flex items-center">
                  <Circle className="w-5 h-5 fill-green-600 text-green-600" />
                  <span className="ml-1 text-xs text-[#5A3800]">100% VEG</span>
                </div>
              </div>
              <div className="relative">
                <Image
                  src={pocket2 || "/placeholder.svg"}
                  alt="Onion & Cheese Pizza Pocket"
                  className="w-32 h-32 object-contain"
                />
                <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
                  <Plus className="w-5 h-5 text-[#5A3800]" />
                </button>
              </div>
            </div>

            {/* Pocket 4 */}
            <div className="flex justify-between items-center">
              <div className="max-w-xs">
                <h2 className="text-xl font-bold text-[#5A3800]">VEGGIE PIZZA POCKET</h2>
                <p className="text-sm mt-1 text-[#5A3800]">
                  A Vibrant Mix Of Capsicum, Tomatoes, Onions, And Cheese Baked Into A Crisp Vegetarian Pocket.
                </p>
                <div className="mt-2 flex items-center">
                  <Circle className="w-5 h-5 fill-green-600 text-green-600" />
                  <span className="ml-1 text-xs text-[#5A3800]">100% VEG</span>
                </div>
              </div>
              <div className="relative">
                <Image
                  src={pocket4 || "/placeholder.svg"}
                  alt="Veggie Pizza Pocket"
                  className="w-32 h-32 object-contain"
                />
                <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
                  <Plus className="w-5 h-5 text-[#5A3800]" />
                </button>
              </div>
            </div>

            {/* Pocket 6 */}
            <div className="flex justify-between items-center">
              <div className="max-w-xs">
                <h2 className="text-xl font-bold text-[#5A3800]">VEGGIE PANEER DELIGHT PIZZA POCKET</h2>
                <p className="text-sm mt-1 text-[#5A3800]">
                  Packed With Spiced Paneer, Onion, Garlic, Capsicum, And Cheese — A Pocket-Sized Desi Delight.
                </p>
                <div className="mt-2 flex items-center">
                  <Circle className="w-5 h-5 fill-green-600 text-green-600" />
                  <span className="ml-1 text-xs text-[#5A3800]">100% VEG</span>
                </div>
              </div>
              <div className="relative">
                <Image
                  src={pocket6 || "/placeholder.svg"}
                  alt="Veggie Paneer Delight Pizza Pocket"
                  className="w-32 h-32 object-contain"
                />
                <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
                  <Plus className="w-5 h-5 text-[#5A3800]" />
                </button>
              </div>
            </div>

            {/* Pocket 8 */}
            <div className="flex justify-between items-center">
              <div className="max-w-xs">
                <h2 className="text-xl font-bold text-[#5A3800]">APRICOT CHICKEN DELIGHT PIZZA POCKET</h2>
                <p className="text-sm mt-1 text-[#5A3800]">
                  Sweet And Savory Inside-Out: Pineapple, Apricot Glaze, Feta, And Baked Chicken All Stuffed In A Cheesy
                  Pocket.
                </p>
                <div className="mt-2 flex items-center">
                  <Circle className="w-5 h-5 fill-red-600 text-red-600" />
                  <span className="ml-1 text-xs text-[#5A3800]">NON-VEG</span>
                </div>
              </div>
              <div className="relative">
                <Image
                  src={pocket8 || "/placeholder.svg"}
                  alt="Apricot Chicken Delight Pizza Pocket"
                  className="w-32 h-32 object-contain"
                />
                <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
                  <Plus className="w-5 h-5 text-[#5A3800]" />
                </button>
              </div>
            </div>

            {/* Pocket 10 */}
            <div className="flex justify-between items-center">
              <div className="max-w-xs">
                <h2 className="text-xl font-bold text-[#5A3800]">PEPPERY CHICKEN DELIGHT PIZZA POCKET</h2>
                <p className="text-sm mt-1 text-[#5A3800]">
                  Filled With Bold Flavors: Spicy Chicken, Black Pepper, Jalapeños, Capsicum, And Sriracha Mayo All
                  Sealed Inside
                </p>
                <div className="mt-2 flex items-center">
                  <Circle className="w-5 h-5 fill-green-600 text-green-600" />
                  <span className="ml-1 text-xs text-[#5A3800]">100% VEG</span>
                </div>
              </div>
              <div className="relative">
                <Image
                  src={pocket10 || "/placeholder.svg"}
                  alt="Peppery Chicken Delight Pizza Pocket"
                  className="w-32 h-32 object-contain"
                />
                <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
                  <Plus className="w-5 h-5 text-[#5A3800]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
