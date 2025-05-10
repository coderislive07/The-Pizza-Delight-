"use client";
import Image from "next/image";
import img1 from "../../../public/sides (17).png";
import img2 from "../../../public/sides (16).png";
import img3 from "../../../public/sides (15).png";
import img4 from "../../../public/sides (14).png";
import img5 from "../../../public/sides (13).png";
import img6 from "../../../public/sides (12).png";
import img7 from "../../../public/sides (11).png";
import img8 from "../../../public/sides (10).png";
import img9 from "../../../public/sides (9).png";
import img10 from "../../../public/sides (8).png";
import img11 from "../../../public/sides (7).png";
import img12 from "../../../public/sides (6).png";
import img13 from "../../../public/sides (5).png";
import img14 from "../../../public/sides (4).png";
import img15 from "../../../public/sides (3).png";
import img16 from "../../../public/sides (2).png";
import img17 from "../../../public/sides (1).png";


import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export default function SidesMenu() {
    const [selectedItems, setSelectedItems] = useState({});

    const sidesItems = [
        {
            name: "WEDGES WITH SOUR CREAM AND SWEET CHILLI RELISH",
            description: "Crispy Potato Wedges Served With Creamy Sour Cream And A Tangy-Sweet Chili Kick.",
            isVeg: true,
            image: img1
        },
        {
            name: "VEG LOADED FRIES",
            description: "Piled High With Melty Cheese, Veggies, And Savory Sauces — Full On Indulgence.",
            isVeg: true,
            image: img2
        },
        {
            name: "CHEESY JALAPENOS BITES",
            description: "Spicy Jalapenos Stuffed With Gooey Cheese — Golden And Bite-Sized.",
            isVeg: true,
            image: img3
        },
        {
            name: "ARANCINI BALLS",
            description: "Crispy Risotto Bites Filled With Cheese And Herbs — Italian-Style Perfection.",
            isVeg: img4
        },
        {
            name: "SMOKE CHIPOTLE SWEET POTATO BITE",
            description: "Smoky, Earthy And Slightly Sweet — A Perfect Balance Of Flavor In A Bite.",
            isVeg: true,
            image: img5
        },
        {
            name: "ONION RINGS BEER BATTERED",
            description: "Thick Cut Onion Dipped In A Light Beer Batter And Fried To Perfect Crisp.",
            isVeg: true,
            image: img6
        },
        {
            name: "BEER BATTERED FRIES",
            description: "Extra-Crispy Fries With A Golden Beer-Infused Crunch.",
            isVeg: true,
            image: img7
        },
        {
            name: "CHICKEN NUGGETS",
            description: "Crispy Golden Outside, Tender Chicken Inside — A Timeless Snack.",
            isVeg: false,
            image: img8
        },
        {
            name: "BUFFALO WINGS",
            description: "Spicy And Saucy With A Tangy Buffalo Sauce Punch.",
            isVeg: false,
            image: img9
        },
        {
            name: "FRIES",
            description: "Classic Golden Fries, Perfectly Salted And Always Satisfying.",
            isVeg: true,
            image: img10
        },
        {
            name: "LOADED WEDGES (BACON AND CHEESE)",
            description: "Crunchy Wedges Topped With Crispy Bacon Bits And Creamy Cheese Sauce.",
            isVeg: false,
            image: img11
        },
        {
            name: "JALAPENO POPPERS",
            description: "Crunchy On The Outside, Creamy And Fiery On The Inside.",
            isVeg: true,
            image: img12
        },
        {
            name: "BEETROOT AND PLUM BITES",
            description: "A Sweet And Savory Combo Of Earthy Beetroot And Tangy Plum, Fried Crisp.",
            isVeg: true,
            image: img13
        },
        {
            name: "CHICKEN STICKS WITH SAUCE",
            description: "Juicy Chicken Strips Grilled Or Fried, With Your Choice Of Dipping Sauce.",
            isVeg: false,
            image: img14
        },
        {
            name: "CHICKEN WINGS",
            description: "Classic Wings Tossed In Your Choice Of Sauce — Spicy, Sweet, Or Smoky.",
            isVeg: false,
            image: img15
        },
        {
            name: "KUMARA FRIES",
            description: "Sweet Potato Fries With A Natural Caramelized Crisp.",
            isVeg: true,
            image: img16
        },
        {
            name: "CHICKEN POPCORN",
            description: "Bite-Sized, Boldly Flavored Chicken In A Crunchy Seasoned Shell.",
            isVeg: false,
            image: img17
        }
    ];

    const toggleSelection = (index) => {
        setSelectedItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    // Split items into left and right columns
    const leftColumnItems = sidesItems.slice(0, 9);
    const rightColumnItems = sidesItems.slice(9);

    const renderSideItem = (item, index, actualIndex) => (
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
                {/*<button className="absolute top-0 right-0 bg-white rounded-full p-1 shadow-md">*/}
                {/*    <Plus size={16} className="text-gray-500" />*/}
                {/*</button>*/}
                <button
                    className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 ${selectedItems[actualIndex] ? 'bg-amber-800 border-amber-800' : 'bg-white border-gray-300'}`}
                    onClick={() => toggleSelection(actualIndex)}
                    aria-label="Select item"
                >
                    {selectedItems[actualIndex] && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto"></div>
                    )}
                </button>
            </div>
        </div>
    );

    return (
        <div className="px-28 mx-auto bg-[#faf6eb] p-6">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-amber-800 inline-block px-12 py-2 border-2 border-amber-800 rounded-full">SIDES</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                {sidesItems.map((item, index) => (
                    <>
                        <div key={`item-${index}`} className="col-span-1">
                            {renderSideItem(item, index, index)}
                        </div>

                        {/* Insert full-width divider after every 2 items, except after the last item */}
                        {(index + 1) % 2 === 0 && index !== sidesItems.length - 1 && (
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