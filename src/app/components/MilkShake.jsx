"use client";
import Image from "next/image";
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import img1 from "../../../public/shake (12).png";
import img2 from "../../../public/shake (11).png";
import img3 from "../../../public/shake (10).png";
import img4 from "../../../public/shake (9).png";
import img5 from "../../../public/shake (8).png";
import img5a from "../../../public/shake (7).png";
import img6 from "../../../public/shake (6).png";

import img7 from "../../../public/shake (5).png";
import img8 from "../../../public/shake (4).png";
import img9 from "../../../public/shake (2).png";
import img10 from "../../../public/shake (1).png";

export default function MilkshakesMenu() {
    const [selectedItems, setSelectedItems] = useState({});

    const milkshakeItems = [
        {
            name: "VANILLA MILKSHAKE",
            description: "Classic And Timeless — Smooth Vanilla Blended Into Creamy Perfection.",
            image: img1
        },
        {
            name: "CHOCOLATE MILKSHAKE",
            description: "Rich And Indulgent — Bold Chocolate Blended Into A Chilled Creamy Base.",
            image: img2
        },
        {
            name: "CARAMEL MILKSHAKE",
            description: "Silky Caramel Swirled Through Rich Cream For A Melt-In-Your-Mouth Sip.",
            image: img3
        },
        {
            name: "LIME MILKSHAKE",
            description: "Zesty And Refreshing — Cool Lime Meets Creamy Goodness In Every Gulp.",
            image:  img4
        },
        {
            name: "ORANGE MILKSHAKE",
            description: "Citrusy And Light — Orange Cream Swirl That's Both Sweet And Refreshing.",
            image: img5
        },
        {
            name: "SPEARMINT MILKSHAKE",
            description: "Cool And Minty — Spearmint Flavor For That Chilled, Fresh-Breath Finish.",
            image: img5a
        },
        {
            name: "STRAWBERRY MILKSHAKE",
            description: "Fruity And Fresh — Ripe Strawberry Flavor In A Sweet, Velvety Shake.",
            image: img6
        },
        {
            name: "CREAMING SODA MILKSHAKE",
            description: "A Fizzy Twist — Sweet Creaming Soda Fused Into A Nostalgic, Frothy Shake.",
            image: img7
        },
        {
            name: "COFFEE CHAI MILKSHAKE",
            description: "Wake Up Your Senses — A Unique Fusion Of Bold Coffee And Spicy Chai.",
            image: img8
        },
        {
            name: "WHITE CHOCOLATE MILKSHAKE",
            description: "Luxuriously Smooth — White Chocolate Flavor Blended With A Milky Finish.",
            image: img9
        },
        {
            name: "RASPBERRY MILKSHAKE",
            description: "Tart Meets Sweet —Juicy Raspberry Burst In A Creamy Base.",
            image: img10
        }
    ];

    const toggleSelection = (index) => {
        setSelectedItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    // Split items into left and right columns
    const leftColumnItems = milkshakeItems.slice(0, 6);
    const rightColumnItems = milkshakeItems.slice(6);

    const renderMilkshakeItem = (item, index, actualIndex) => (
        <div key={index} className="flex justify-between items-start mb-8 relative">
            <div className="flex-1 pr-4 max-w-[400px]">
                <h2 className="text-lg font-bold text-amber-800 mb-1">{item.name}</h2>
                <p className="text-sm text-gray-700 mb-2">{item.description}</p>
            </div>

            <div className="relative">
                <Image
                    src={item.image}
                    alt={item.name}
                    width={96}
                    height={96}
                    className="w-30 h-30 object-cover"
                />
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
        <div className="px-28 mx-auto bg-white p-6" style={{ backgroundColor: "#faf6eb" }}>
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-amber-800 inline-block px-12 py-2 border-2 border-amber-800 rounded-full bg-white">MILKSHAKES</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                {[...leftColumnItems, ...rightColumnItems].map((item, index, arr) => (
                    <>
                        <div key={`item-${index}`} className="col-span-1">
                            {renderMilkshakeItem(item, index, index)}
                        </div>

                        {/* After every even index (i.e., after two items), insert a full-width divider */}
                        {(index % 2 === 1 && index !== arr.length - 1) && (
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