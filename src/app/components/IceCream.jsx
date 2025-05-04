"use client";
import { useState } from 'react';
import Image from "next/image";
import { Plus } from 'lucide-react';
import img1 from "../../../public/ice (3).png";
import img2 from "../../../public/ice (2).png";
import img3 from "../../../public/ice (1).png";
import img4 from "../../../public/logo.png"
export default function IceCreamMenu() {
    const [selectedItems, setSelectedItems] = useState({});

    const iceCreamItems = [
        {
            name: "CHOCOLATE ICECREAM",
            description: "Rich, Creamy Chocolate Swirls In A Crisp Cone, Perfect For Indulgent Moments.",
            image: img1,
            isDairyFree: false
        },
        {
            name: "STRAWBERRY",
            description: "Sweet, Fruity Pink Delight Swirled Smoothly In A Cone For Berry Lovers.",
            image: img2,
            isDairyFree: false
        },
        {
            name: "VANILLA",
            description: "Classic Vanilla Perfection With Silky Swirls And Timeless, Smooth Creamy Texture Bliss.",
            image: img3,
            isDairyFree: false
        }

    ];

    const toggleSelection = (index) => {
        setSelectedItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const renderIceCreamItem = (item, index) => (
        <div key={index} className="flex justify-between items-start mb-8 relative">
            <div className="flex-1 pr-4 max-w-[400px]">
                <h2 className="text-lg font-bold text-amber-800 mb-1">{item.name}</h2>
                <p className="text-sm text-gray-700 mb-2">{item.description}</p>
                <div>
                    {item.isDairyFree ? (
                        <div className="flex items-center">
                            <div className="w-5 h-5 border border-blue-600 flex items-center justify-center">
                                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                            </div>
                            <span className="text-xs ml-1 text-gray-600">DAIRY FREE</span>
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <div className="w-5 h-5 border border-amber-600 flex items-center justify-center">
                                <div className="w-3 h-3 bg-amber-600 rounded-full"></div>
                            </div>
                            <span className="text-xs ml-1 text-gray-600">CONTAINS DAIRY</span>
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

                <button
                    className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 ${selectedItems[index] ? 'bg-amber-800 border-amber-800' : 'bg-white border-gray-300'}`}
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
        <div>
        <div className="px-6 md:px-28 mx-auto bg-white p-6">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-amber-800 inline-block px-12 py-2 border-2 border-amber-800 rounded-full">ICE CREAMES</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                {iceCreamItems.map((item, index) => (
                    <>
                        <div key={`item-${index}`} className="col-span-1">
                            {renderIceCreamItem(item, index)}
                        </div>

                        {/* Insert full-width divider after every 2 items, except after the last item */}
                        {(index + 1) % 2 === 0 && index !== iceCreamItems.length - 1 && (
                            <div key={`divider-${index}`} className="col-span-full">
                                <hr className="border-t border-gray-300 my-6" />
                            </div>
                        )}
                    </>
                ))}
            </div>
        </div>

            {/* Footer */}

            <footer className="bg-amber-50  py-6  ">
                <div className="max-w-6xl mx-auto">
                    {/* Logo and Navigation */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                        <div className="mb-4 md:mb-0">
                            <Image src={img4} alt="Pizza Delight Logo" className="h-12 w-12 rounded-full" />
                        </div>
                        <nav className="flex flex-wrap justify-center gap-4">
                            <a href="#" className="text-amber-900 uppercase text-sm font-semibold">Order</a>
                            <a href="#" className="text-amber-900 uppercase text-sm font-semibold">Find a Store</a>
                            <a href="#" className="text-amber-900 uppercase text-sm font-semibold">About Pizza Delight</a>
                            <a href="#" className="text-amber-900 uppercase text-sm font-semibold">Gift Vouchers</a>
                            <a href="#" className="text-amber-900 uppercase text-sm font-semibold">Promos</a>
                            <a href="#" className="text-amber-900 uppercase text-sm font-semibold">Jobs</a>
                            <a href="#" className="text-amber-900 uppercase text-sm font-semibold">Franchise</a>
                        </nav>
                    </div>

                    {/* Copyright and Legal */}
                    <div className="flex flex-col md:flex-row justify-end items-center text-xs text-amber-900">
                        <a href="#" className="mb-2 md:mb-0 md:mr-4">PRIVACY POLICY</a>
                        <a href="#" className="mb-2 md:mb-0 md:mr-4">TERMS AND CONDITIONS</a>
                        <p>COPYRIGHT © PIZZA DELIGHT 2025</p>
                    </div>
                </div>
            </footer>
    </div>

    );
}