import React from 'react'
import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'
import logo from '../../../public/logo.png'
import allcravings from '../../../public/allcravings.png'
import headerCart from '../../../public/headerCart.png'
import menuchoicesicon from '../../../public/menuchoicesicon.png'
import freshdoughicon from '../../../public/freshdoughicon.png'
import oneclickordericon from '../../../public/oneclickordericon.png'
import headerbg from '../../../public/headerbg.png'

export default function HeroSection() {
  return (
    <div
    style={{ backgroundImage: `url(${headerbg.src})` }}
    className="relative w-full bg-cover bg-center px-20"
  >
      <div className="container mx-auto px-4 py-4">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image src={logo || "/placeholder.svg"} alt="Logo" className="h-16 w-16" />
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <NavItem text="PIZZAS" />
            <NavItem text="PASTA" />
            <NavItem text="PIZZA POCKETS" />
            <NavItem text="BAKED BREADS" />
            <NavItem text="SIDES" />
            <NavItem text="ICE CREAMS" />
            <NavItem text="MILKSHAKES" />
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="border border-[#663300] rounded-full px-6 py-1 text-[#663300] font-medium">
              Login/Signup
            </button>
            <button className="flex items-center border border-[#663300] rounded-full px-4 py-1 text-[#663300] font-medium">
              <Image src={headerCart || "/placeholder.svg"} alt="Cart" className="h-5 w-5 mr-2" />
              Cart
            </button>
          </div>
        </div>
        
        {/* Hero Content */}
        <div className="flex flex-col md:flex-row mt-8 pb-12">
          <div className="md:w-1/2">
            <h1 className="text-[#663300] text-3xl md:text-4xl font-bold leading-tight">
              FROM SIZZLING PIZZAS TO DREAMY PASTAS,
              <br />
              CHILLED SHAKES TO CREAMY ICE CREAMS —
            </h1>
            
            <div className="bg-[#663300] text-white px-4 py-2 rounded-md mt-4 inline-block">
              <h2 className="text-xl font-bold">ALL YOUR CRAVINGS SERVED UNDER ONE DELICIOUS ROOF!</h2>
            </div>
            
            <div className="mt-8 space-y-4">
              <FeatureItem 
                icon={menuchoicesicon} 
                text="100+ Menu Choices" 
                active={true} 
              />
              <FeatureItem 
                icon={freshdoughicon} 
                text="Fresh Dough Made Daily" 
              />
              <FeatureItem 
                icon={oneclickordericon} 
                text="One-Click Ordering Experience" 
              />
            </div>
            
            <button className="mt-8 border border-[#663300] rounded-full px-6 py-2 text-[#663300] font-medium">
              Download Menu
            </button>
          </div>
          
          <div className="md:w-1/2 relative mt-8 md:mt-0">
            <Image 
              src={allcravings || "/placeholder.svg"} 
              alt="Food items including pizza, ice cream and more" 
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper components
function NavItem({ text }) {
  return (
    <a href="#" className="text-[#663300] font-medium hover:underline">
      {text}
    </a>
  )
}

function FeatureItem({ icon, text, active = false }) {
  return (
    <div className="flex items-center space-x-3">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center `}>
        <Image src={icon || "/placeholder.svg"} alt={text} className="w-8 h-8" />
      </div>
      <span className="text-[#663300] font-medium">{text}</span>
    </div>
  )
}