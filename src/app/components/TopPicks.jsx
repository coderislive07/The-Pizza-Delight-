import { Plus } from "lucide-react"
import pizza from "../../../public/topPicks/pizza.png"
import breads from "../../../public/topPicks/breads.png"
import cones from "../../../public/topPicks/cones.png"
import icecream from "../../../public/topPicks/icecream.png"
import milkshakes from "../../../public/topPicks/milkshakes.png"
import pasta from "../../../public/topPicks/pasta.png"
import sides from "../../../public/topPicks/sides.png"
import vegdelight from "../../../public/topPicks/vegdelight.png"
import Image from "next/image"

export default function TopPicks() {
  const topPicksData = [
    {
      title: "PIZZA",
      description: "From Cheesy Classics To Fiery Fusion — Your Perfect Slice Awaits.",
      buttonText: "Explore Pizzas",
      image: pizza,
    },
    {
      title: "PASTA",
      description: "Baked, Cheesy, And Loaded With Flavor — Comfort In Every Bite.",
      buttonText: "Dig Into Pastas",
      image: pasta,
    },
    {
      title: "PIZZA CONES & POCKET",
      description: "Crispy Outside, Melty Inside — Pizza That Fits In Your Palm.",
      buttonText: "Grab a Pocket",
      image: cones,
    },
    {
      title: "BAKED BREADS",
      description: "Wholesome, Vibrant, And All-Veg Goodness Without Compromise.",
      buttonText: "Explore Breads",
      image: breads,
    },
    {
      title: "VEGGIE DELIGHTS",
      description: "Fresh, Vibrant, Flavorful — The Star Of Every Garden Bite.",
      buttonText: "Go Veggie",
      image: vegdelight,
    },
    {
      title: "ICE CREAMS",
      description: "Soft-Serve Swirls And Creamy Cones That Melt Hearts.",
      buttonText: "Scoop It Up",
      image: icecream,
    },
    {
      title: "SIDES",
      description: "Crunchy, Spicy, Cheesy — The Ultimate Supporting Cast.",
      buttonText: "Pick Your Sides",
      image: sides,
    },
    {
      title: "MILKSHAKES",
      description: "Milkshakes And Chillers That Cool, Refresh, And Satisfy.",
      buttonText: "Sip Something Cool",
      image: milkshakes,
    },
  ]

  return (
    <div className="px-28 mx-auto bg-white p-6">
      <div className="relative flex justify-center items-center mb-24">
        <h1 className="absolute text-3xl font-bold text-[#663300]">TOP PICKS FROM THE KITCHEN</h1>
        <div className="ml-auto ">
        <button className="text-[#663300] ">
          <Plus size={24} />
        </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
        {topPicksData.map((item, index) => (
          <div key={index} className="flex justify-between items-start">
            <div className="flex-1 pr-4">
              <h2 className="text-lg font-bold text-[#663300] mb-1">{item.title}</h2>
              <p className="text-sm text-gray-700 max-w-72 mb-4">{item.description}</p>
              <button className="bg-[#663300] text-white text-sm px-4 py-1 rounded-full">{item.buttonText}</button>
            </div>
            <div className="relative">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                width={120}
                height={120}
                className="object-cover rounded-md"
              />
              <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
                <Plus size={16} className="text-gray-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
