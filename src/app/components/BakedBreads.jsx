"use client";
import React, { useState } from "react";
import Image from "next/image";

import { Plus } from "lucide-react";
import img1 from "../../../public/ChatGPT Image May 1, 2025, 01_55_34 PM.png"
import img2 from "../../../public/ChatGPT Image May 1, 2025, 06_55_49 PM.png"
import img3 from "../../../public/ChatGPT Image May 1, 2025, 06_59_54 PM.png"
import img4 from "../../../public/ChatGPT Image May 1, 2025, 07_01_25 PM.png"
import img5 from "../../../public/ChatGPT Image May 1, 2025, 07_02_51 PM.png"
import img6 from "../../../public/ChatGPT Image May 1, 2025, 07_34_41 PM.png"




export default function BakedBreadsMenu() {
    const [selectedItems, setSelectedItems] = useState({});

    const breadItems = [
        {
            name: "GARLIC BREAD",
            description:
                "The Classic Starter: Crisp, Golden Bread Brushed With Buttery Garlic Perfection.",
            isVeg: true,
            image: img1,
        },
        {
            name: "CHEESY GARLIC BREAD",
            description:
                "Made For Cheese Lovers: Toasted Garlic Bread Topped With Melty Mozzarella.",
            isVeg: true,
            image: img2, // ✅ FIXED: Removed curly braces
        },
        {
            name: "MARGHERITA BREAD",
            description:
                "A Pizza-Style Twist: Tomato, Mozzarella, And Herbs On Toasted Garlic Bread.",
            isVeg: true,
            image: img3, // ✅ FIXED
        },
        {
            name: "GARLIC KNOTS 5PCS",
            description:
                "Soft, Twisted Delights: Baked Knots Glazed With Garlic Butter And Herbs.",
            isVeg: true,
            image: img4,
        },
        {
            name: "CREAM CHEESE GARLIC BREAD 2PCS",
            description:
                "Stuffed & Smooth: Creamy Cheese Inside Crispy Garlic Bread For A Rich Bite.",
            isVeg: true,
            image: img5,
        },
        {
            name: "HAM AND CHEESE GARLIC BREAD",
            description:
                "Savory & Satisfying: Garlic Bread Loaded With Ham Slices And Gooey Cheese.",
            isVeg: false,
            image: img6,
        },
    ];


    const toggleSelection = (index) => {
        setSelectedItems((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const renderBreadItem = (item, index) => (
        <div key={index} className="flex justify-between items-start mb-8 relative">
            <div className="flex-1 pr-4 max-w-[400px]">
                <h2 className="text-lg font-bold text-amber-800 mb-1">{item.name}</h2>
                <p className="text-sm text-gray-700 mb-2">{item.description}</p>
                <div>
                    {item.isVeg ? (
                        <div className="flex items-center">
                            <div className="w-5 h-5 border border-green-600 flex items-center justify-center">
                                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                            </div>
                            <span className="text-xs ml-1 text-gray-600">100% VEG</span>
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <div className="w-5 h-5 border border-red-500 flex items-center justify-center">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            </div>
                            <span className="text-xs ml-1 text-gray-600">NON VEG</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="relative">
                <Image
                    src={item.image}
                    alt={item.name}
                    width={96}
                    height={96}
                    className="w-30 h-30 object-cover"
                />

                {/*<button className="absolute top-0 right-0 bg-white rounded-full p-1 shadow-md">*/}
                {/*    <Plus size={16} className="text-gray-500" />*/}
                {/*</button>*/}
                <button
                    className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 ${
                        selectedItems[index]
                            ? "bg-amber-800 border-amber-800"
                            : "bg-white border-gray-300"
                    }`}
                    onClick={() => toggleSelection(index)}
                    aria-label="Select item"
                >
                    {selectedItems[index] && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto"></div>
                    )}
                </button>
            </div>
        </div>
    );

    return (
        <div className="px-28 mx-auto bg-white p-6">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-amber-800 inline-block px-12 py-2 border-2 border-amber-800 rounded-full">
                    BAKED BREADS
                </h1>
            </div>

            {/* Grid with 2 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                {breadItems.map((item, index) => (
                    <React.Fragment key={index}>
                        {renderBreadItem(item, index)}
                        {/* Render full-width HR after every 2 items */}
                        {(index + 1) % 2 === 0 && index !== breadItems.length - 1 && (
                            <div className="col-span-full">
                                <hr className="border-t border-gray-300 my-6" />
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
