"use client";

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Image from "next/image";
import img1 from "../../../public/pasta (7).png";
import img2 from "../../../public/pasta (6).png";
import img3 from "../../../public/pasta (5).png";
import img4 from "../../../public/pasta (4).png";
import img5 from "../../../public/pasta (3).png";
import img6 from "../../../public/pasta (2).png";
import img7 from "../../../public/pasta (1).png";


export default function BakedPastaMenu() {
    const [selectedItems, setSelectedItems] = useState({});

    const pastaItems = [
        {
            name: "BUTTER CHICKEN PASTA",
            description: "Tender Chicken And Penne Tossed In A Creamy Homemade Butter Sauce With Capsicum And Spices, Finished With Melty Mozzarella.",
            isVeg: false,
            image: img1
        },
        {
            name: "BACON AND CHICKEN PASTA IN WHITE SAUCE",
            description: "A Rich Combo Of Bacon Flakes And Chicken In Creamy White Sauce, Parmesan, And Herbs — Finished With Golden Mozzarella.",
            isVeg: false,
            image: img2
        },
        {
            name: "RED SAUCE VEGGIE AND CHICKEN PASTA",
            description: "Chicken, Veggies, Pineapple, And Sweet Corn In Spicy Tomato Sauce — Finished With Mozzarella And Black Olives.",
            isVeg: false,
            image: img3
        },
        {
            name: "WHITE VEGGIE AND CHICKEN PASTA",
            description: "Chicken And Sweet Corn With Penne In A Creamy Herb Sauce — Finished With Gooey Mozzarella And Oven-Baked Love.",
            isVeg: false,
            image: img4
        },
        {
            name: "SPINACH CHICKEN PASTA",
            description: "Wholesome And Mild: Chicken, Onion, And Spinach Leaves In A Creamy Spinach Sauce With Herbs And Mozzarella Melt.",
            isVeg: false,
            image: img5
        },
        {
            name: "RED SAUCE VEGGIE PASTA",
            description: "Penne Tossed With Corn, Pineapple, Capsicum, And Onions In Spiced Tomato Sauce — Topped With Cheese And Black Olives.",
            isVeg: true,
            image: img6
        },
        {
            name: "WHITE VEGGIE PASTA",
            description: "Creamy And Comforting: Penne With Corn, Capsicum, And Onion In A Mild White Sauce, Baked With Cheese And Herbs.",
            isVeg: true,
            image: img7
        }
    ];

    const toggleSelection = (index) => {
        setSelectedItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const renderPastaItem = (item, index) => (
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
                <button className="absolute top-0 right-0 bg-white rounded-full p-1 shadow-md">
                    <Plus size={16} className="text-gray-500" />
                </button>
                <button
                    className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 ${
                        selectedItems[index]
                            ? 'bg-amber-800 border-amber-800'
                            : 'bg-white border-gray-300'
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
                    BAKED PASTA
                </h1>
            </div>

            {/* Grid layout with 2 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                {pastaItems.map((item, index) => (
                    <>
                        <div key={`item-${index}`} className="col-span-1">
                            {renderPastaItem(item, index)}
                        </div>

                        {/* Full-width line after every 2 items, except after the last item */}
                        {(index + 1) % 2 === 0 && index !== pastaItems.length - 1 && (
                            <div key={`divider-${index}`} className="col-span-full">
                                <hr className="border-t border-gray-300 my-6" />
                            </div>
                        )}
                    </>
                ))}
            </div>

        </div>
    );
}
