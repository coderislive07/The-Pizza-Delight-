"use client"

import React, { useState, useEffect } from "react"
import { Plus, X, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"
import Image from "next/image"
import img1 from "../../../public/pizza1 (1).png"
import img2 from "../../../public/pizza1 (2).png"
import img3 from "../../../public/pizza1 (3).png"
import img4 from "../../../public/pizza1 (4).png"
import img5 from "../../../public/pizza1 (5).png"
import img6 from "../../../public/pizza1 (6).png"
import img7 from "../../../public/pizza1 (7).png"
import img8 from "../../../public/pizza1 (8).png"
import img9 from "../../../public/pizza1 (9).png"
import img10 from "../../../public/pizza1 (10).png"
import img11 from "../../../public/pizza1 (11).png"
import img12 from "../../../public/pizza1 (12).png"
import img13 from "../../../public/pizza1 (13).png"
import img14 from "../../../public/pizza1 (5).png"
export default function CreativeDelightsMenu() {
    const [selectedItems, setSelectedItems] = useState({})
    const [activeIndex, setActiveIndex] = useState(null)
    const [expandedSection, setExpandedSection] = useState(null)
    const [customizeOptions, setCustomizeOptions] = useState({
        meats: {},
        vegProteins: {},
        cheese: {},
        sauces: {},
        herbs: {},
    })
    const [selectedSize, setSelectedSize] = useState(null)
    const [selectedBase, setSelectedBase] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [allergiesNote, setAllergiesNote] = useState("")

    // Lock body scroll when popup is open
    useEffect(() => {
        if (activeIndex !== null) {
            // Save the current scroll position
            const scrollY = window.scrollY
            // Add styles to prevent body scrolling
            document.body.style.position = "fixed"
            document.body.style.top = `-${scrollY}px`
            document.body.style.width = "100%"

            return () => {
                // Restore scrolling when component unmounts or popup closes
                document.body.style.position = ""
                document.body.style.top = ""
                document.body.style.width = ""
                // Restore scroll position
                window.scrollTo(0, scrollY)
            }
        }
    }, [activeIndex])

    // Pre-select ingredients based on pizza description when a pizza is selected
    useEffect(() => {
        if (activeIndex !== null) {
            const pizza = pizzaItems[activeIndex]
            const description = pizza.description.toLowerCase()

            // Create a new selection state
            const newSelections = {
                meats: {},
                vegProteins: {},
                cheese: {},
                sauces: {},
                herbs: {},
            }

            // Check for meats in description
            if (description.includes("ham")) newSelections.meats["HAM"] = true
            if (description.includes("bacon")) newSelections.meats["BACON"] = true
            if (description.includes("chicken")) newSelections.meats["MARINATED BAKED CHICKEN"] = true
            if (description.includes("beef")) newSelections.meats["BEEF"] = true
            if (description.includes("tandoori chicken")) newSelections.meats["TANDOORI CHICKEN"] = true
            if (description.includes("kebab")) newSelections.meats["CHICKEN SEEKH KEBAB"] = true

            // Check for vegetarian proteins in description
            if (description.includes("paneer")) newSelections.vegProteins["PANEER CUBES"] = true
            if (description.includes("chaap")) newSelections.vegProteins["SOYA CHAAP (TANDOORI)"] = true

            // Check for cheese in description
            if (description.includes("mozzarella")) newSelections.cheese["MOZZARELLA"] = true
            if (description.includes("cheese")) newSelections.cheese["MOZZARELLA"] = true

            // Check for sauces in description
            if (description.includes("makhani")) newSelections.sauces["BUTTER SAUCE"] = true
            if (description.includes("tandoori sauce")) newSelections.sauces["TANDOORI SAUCE"] = true
            if (description.includes("schezwan")) newSelections.sauces["SCHEZWAN SAUCE"] = true
            if (description.includes("butter")) newSelections.sauces["BUTTER SAUCE"] = true
            if (description.includes("kadahi")) newSelections.sauces["KADAHI SAUCE"] = true

            // Set the new selections
            setCustomizeOptions(newSelections)
        }
    }, [activeIndex])

    const pizzaItems = [
        {
            name: "VEGGIE MAKHANI DELIGHT",
            description:
                "An Indian Fusion Twist: Creamy Makhani Base Topped With Pineapple, Mushrooms, Capsicum And Mozzarella With A Spiced Mayo Finish.",
            isVeg: true,
            image: img1,
        },
        {
            name: "TANDOORI CHAAP DELIGHT",
            description:
                "Fiery & Wholesome: Marinated Soy Chaap In Tandoori Sauce With Ginger, Garlic, Capsicum And Herbs On A Cheesy Base.",
            isVeg: true,
            image: img2,
        },
        {
            name: "TANDOORI PANEER AND CORNS DELIGHT",
            description:
                "A Crunchy, Cheesy Hit: Paneer, Corn, Mushrooms, And Capsicum In Smoky Tandoori Sauce, Finished With Mozzarella.",
            isVeg: true,
            image: img3,
        },
        {
            name: "CHILI PANEER DELIGHT",
            description:
                "Desi Street-Style Flavor: Schezwan-Marinated Paneer Cubes With Garlic, Onion, Capsicum And Coriander On A Cheesy Crust.",
            isVeg: true,
            image: img4,
        },
        {
            name: "CHILI MUSHROOM DELIGHT",
            description:
                "Spicy & Bold: Juicy Mushrooms In Schezwan Sauce With Garlic, Capsicum, And Onions Under Molten Mozzarella.",
            isVeg: true,
            image: img5,
        },
        {
            name: "CHILI CHICKEN DELIGHT",
            description:
                "Indo-Chinese Favorite: Chicken Chunks Tossed In Garlic-Ginger Schezwan Sauce With Onion, Capsicum And Melty Cheese.",
            isVeg: false,
            image: img6,
        },
        {
            name: "TANDOORI CHICKEN DELIGHT",
            description:
                "Smoked & Spiced: Tandoori-Marinated Chicken, Ginger-Garlic, Onion, And Capsicum Topped With Herbs And Mozzarella.",
            isVeg: false,
            image: img7,
        },
        {
            name: "BUTTER CHICKEN DELIGHT",
            description:
                "Creamy Indulgence: Buttery Chicken Chunks With Red Onions And Capsicum Under A Mozzarella-Rich Golden Melt.",
            isVeg: false,
            image: img9,
        },
        {
            name: "CHICKEN SEEKH KEBAB DELIGHT",
            description:
                "Chicken Kebab Pieces, Ginger, Garlic, Coriander, Homemade Tandoori Sauce, Onion, Capsicum, Mozzarella Topped With Homemade Spices.",
            isVeg: false,
            image: img10,
        },
        {
            name: "KADAHI CHICKEN DELIGHT",
            description:
                "Rich & Rustic: Kadahi-Style Chicken With Bold Ginger-Garlic Notes, Onions, Capsicum And Mozzarella Over Spicy Gravy.",
            isVeg: false,
            image: img11,
        },
        {
            name: "KADAHI PANEER DELIGHT",
            description:
                "A Dhaba-Style Winner: Paneer, Capsicum And Onions In Kadahi Gravy, Layered With Mozzarella And Coriander.",
            isVeg: true,
            image: img12,
        },
        {
            name: "INDIAN MAGGIE VEGGIE DELIGHT",
            description:
                "Fun Fusion: Classic Indian Masala Maggie With Cheese, Tomatoes, And Capsicum Baked On A Spicy Crust.",
            isVeg: true,
            image: img13,
        },
        {
            name: "INDIAN MAGGIE CHICKEN DELIGHT",
            description: "Desi Comfort Redefined: Spiced Maggie Noodles Loaded With Cheesy Chicken, Tomatoes And Capsicum.",
            isVeg: false,
            image: img14,
        },
        {
            name: "INDIAN MAGGIE BEEF DELIGHT",
            description:
                "Hearty & Bold: Indian Masala Maggie With Beef, Capsicum And Mozzarella, Finished With Indian Spices.",
            isVeg: false,
            image: img8,
        },
    ]

    // Size options
    const sizeOptions = [
        { name: "S", price: "" },
        { name: "M", price: "+$2.00" },
        { name: "L", price: "+$4.00" },
        { name: "XL", price: "+$6.00" },
    ]

    // Base options
    const baseOptions = [
        { name: "CLASSIC CRUST", price: "" },
        { name: "THIN CRUST", price: "+$0.00" },
        { name: "SIMPLY WHEAT CRUST", price: "+$3.00" },
        { name: "GLUTEN FREE BASE", price: "+$5.00" },
    ]

    // Meat options
    const meatOptions = [
        { name: "HAM", price: "$7.00" },
        { name: "BACON", price: "$3.00" },
        { name: "STREAKY BACON", price: "$3.00" },
        { name: "BACON FLAKES", price: "$3.00" },
        { name: "CHORIZO PEPPERONI", price: "$3.00" },
        { name: "SALAMI", price: "$3.00" },
        { name: "PEPPERONI", price: "$3.00" },
        { name: "BEEF", price: "$3.00" },
        { name: "MARINATED BAKED CHICKEN", price: "$5.50" },
        { name: "BBQ CHICKEN", price: "$3.00" },
        { name: "TANDOORI CHICKEN", price: "$3.00" },
        { name: "CHICKEN SEEKH KEBAB", price: "$3.00" },
    ]

    // Vegetarian protein options
    const vegProteinOptions = [
        { name: "PANEER CUBES", price: "$3.00" },
        { name: "SOYA CHAAP (TANDOORI)", price: "$3.00" },
    ]

    // Cheese options
    const cheeseOptions = [
        { name: "MOZZARELLA", price: "$2.00" },
        { name: "CHEDDAR", price: "$2.00" },
        { name: "FETA", price: "$2.50" },
        { name: "PARMESAN", price: "$2.50" },
        { name: "CREAM CHEESE", price: "$3.00" },
    ]

    // Sauce options
    const sauceOptions = [
        { name: "CLASSIC TOMATO SAUCE", price: "$0.00" },
        { name: "WHITE CREAM SAUCE", price: "$0.00" },
        { name: "BUTTER SAUCE", price: "$1.50" },
        { name: "MARINARA SAUCE", price: "$1.50" },
        { name: "SPINACH SAUCE", price: "$1.50" },
        { name: "PESTO RED VERDE", price: "$2.00" },
        { name: "GARLIC SAUCE", price: "$1.50" },
        { name: "SATAY SAUCE", price: "$1.50" },
        { name: "APRICOT SAUCE", price: "$1.50" },
        { name: "GARLIC AIOLI", price: "$2.00" },
        { name: "CHILI SAUCE", price: "$1.50" },
        { name: "BBQ SAUCE", price: "$1.50" },
        { name: "SCHEZWAN SAUCE", price: "$2.00" },
        { name: "TANDOORI SAUCE", price: "$2.00" },
        { name: "KADAHI SAUCE", price: "$2.00" },
    ]

    // Herbs & Seasonings options
    const herbOptions = [
        { name: "OREGANO", price: "$0.50" },
        { name: "BASIL", price: "$0.50" },
        { name: "ROSEMARY", price: "$0.50" },
        { name: "THYME", price: "$0.50" },
        { name: "CHILI FLAKES", price: "$0.50" },
        { name: "GINGER", price: "$0.50" },
        { name: "GARLIC", price: "$0.50" },
        { name: "CORIANDER", price: "$0.50" },
    ]

    const toggleSelection = (index) => {
        setSelectedItems((prev) => ({
            ...prev,
            [index]: !prev[index],
        }))
    }

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section)
    }

    const toggleCustomizeOption = (category, option) => {
        setCustomizeOptions((prev) => ({
            ...prev,
            [category]: {
                ...prev[category],
                [option]: !prev[category][option],
            },
        }))
    }
    const [expandedSubSection, setExpandedSubSection] = useState(null); // For subsections
    const toggleSubSection = (subSection) => {
        setExpandedSubSection(expandedSubSection === subSection ? null : subSection);
    };

    const isCustomizeOptionSelected = (category, option) => {
        return !!customizeOptions[category][option]
    }

    const nextPizza = () => {
        setActiveIndex((prev) => (prev + 1) % pizzaItems.length)
    }

    const prevPizza = () => {
        setActiveIndex((prev) => (prev - 1 + pizzaItems.length) % pizzaItems.length)
    }

    const selectSize = (index) => {
        setSelectedSize(index)
    }

    const selectBase = (index) => {
        setSelectedBase(index)
    }

    const removeCustomizeOption = (category, option) => {
        setCustomizeOptions((prev) => {
            const newCategory = { ...prev[category] }
            delete newCategory[option]
            return {
                ...prev,
                [category]: newCategory,
            }
        })
    }

    const incrementQuantity = () => {
        setQuantity((prev) => prev + 1)
    }

    const decrementQuantity = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
    }

    const renderPizzaItem = (item, index) => (
        <div key={index} className="flex justify-between items-start mb-8 relative">
            <div className="flex-1 pr-4 max-w-[400px]">
                <h2 className="text-lg font-bold text-[#663300] mb-1">{item.name}</h2>
                <p className="text-sm text-gray-700 mb-2">{item.description}</p>
                <div className="flex items-center">
                    <div
                        className={`w-5 h-5 border ${item.isVeg ? "border-green-600" : "border-red-500"} flex items-center justify-center`}
                    >
                        <div className={`w-3 h-3 ${item.isVeg ? "bg-green-600" : "bg-red-500"} rounded-full`}></div>
                    </div>
                    <span className="text-xs ml-1 text-gray-600">{item.isVeg ? "100% VEG" : "NON VEG"}</span>
                </div>
            </div>

            <div className="relative">
                <button onClick={() => setActiveIndex(index)}>
                    <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={96}
                        height={96}
                        className="w-30 h-30 object-cover rounded-md"
                    />
                </button>
                <button className="absolute top-0 right-0 bg-white rounded-full p-1 shadow-md">
                    <Plus size={16} className="text-gray-500" />
                </button>
                <button
                    className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 ${
                        selectedItems[index] ? "bg-[#663300] border-amber-800" : "bg-white border-gray-300"
                    }`}
                    onClick={() => toggleSelection(index)}
                    aria-label="Select item"
                >
                    {selectedItems[index] && <div className="w-2 h-2 bg-white rounded-full mx-auto"></div>}
                </button>
            </div>
        </div>
    )

    return (
        <div className="relative">
            {activeIndex !== null && (
                <div
                    className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center"
                    style={{ background: "rgba(0,0,0,0.05)" }}
                >
                    <div className="bg-white w-full h-[98%] max-w-md rounded-lg overflow-hidden shadow-xl">
                        {/* Header */}
                        <div className="bg-[#663300] px-4 py-2 flex justify-between items-center">
                            <div className="flex items-center">
                                <div className="bg-white text-[#663300] rounded-sm px-3 py-1 text-xs font-bold">
                                    {pizzaItems[activeIndex].name}
                                </div>
                            </div>
                            <button onClick={() => setActiveIndex(null)} className="text-white">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Pizza Image */}
                        <div className="relative p-4">
                            <div className="text-center">
                                <Image
                                    src={pizzaItems[activeIndex].image || "/placeholder.svg"}
                                    alt={pizzaItems[activeIndex].name}
                                    width={250}
                                    height={250}
                                    className="mx-auto"
                                />
                            </div>

                            {/* Navigation buttons */}
                            <button
                                onClick={prevPizza}
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <button
                                onClick={nextPizza}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
                            >
                                <ChevronRight size={16} />
                            </button>

                            {/* Description */}
                            <div className="text-xs text-gray-600 mt-2 text-center max-w-[300px] mx-auto">
                                <p>{pizzaItems[activeIndex].description}</p>
                            </div>
                        </div>

                        {/* Scrollable content area */}
                        <div className="overflow-y-auto text-black max-h-[600px]">
                            {/* SIZE section */}
                            <div className="border-t border-gray-200 cursor-pointer" onClick={() => toggleSection("SIZE")}>
                                <div className="flex justify-between items-center px-4 py-3">
                                    <span className="font-medium text-gray-700">SIZE</span>
                                    <ChevronDown
                                        size={16}
                                        className={`text-gray-400 transition-transform ${
                                            expandedSection === "SIZE" ? "transform rotate-180" : ""
                                        }`}
                                    />
                                </div>
                                {expandedSection === "SIZE" && (
                                    <div className="border-t border-gray-100 bg-gray-50 px-4 py-2">
                                        <div className="space-y-2">
                                            {sizeOptions.map((option, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex justify-between items-center"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        selectSize(idx)
                                                    }}
                                                >
                                                    <div className="flex items-center">
                                                        <div
                                                            className={`w-4 h-4 rounded-full border ${
                                                                selectedSize === idx ? "border-amber-800" : "border-gray-300"
                                                            } flex items-center justify-center mr-2`}
                                                        >
                                                            {selectedSize === idx && <div className="w-2 h-2 rounded-full bg-[#663300]"></div>}
                                                        </div>
                                                        <span className="text-sm">{option.name}</span>
                                                    </div>
                                                    {option.price && <span className="text-sm text-gray-600">{option.price}</span>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* BASE section */}
                            <div className="border-t border-gray-200 cursor-pointer" onClick={() => toggleSection("BASE")}>
                                <div className="flex justify-between items-center px-4 py-3">
                                    <span className="font-medium text-gray-700">BASE</span>
                                    <ChevronDown
                                        size={16}
                                        className={`text-gray-400 transition-transform ${
                                            expandedSection === "BASE" ? "transform rotate-180" : ""
                                        }`}
                                    />
                                </div>
                                {expandedSection === "BASE" && (
                                    <div className="border-t border-gray-100 bg-gray-50 px-4 py-2">
                                        <div className="space-y-2">
                                            {baseOptions.map((option, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex justify-between items-center"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        selectBase(idx)
                                                    }}
                                                >
                                                    <div className="flex items-center">
                                                        <div
                                                            className={`w-4 h-4 rounded-full border ${
                                                                selectedBase === idx ? "border-amber-800" : "border-gray-300"
                                                            } flex items-center justify-center mr-2`}
                                                        >
                                                            {selectedBase === idx && <div className="w-2 h-2 rounded-full bg-[#663300]"></div>}
                                                        </div>
                                                        <span className="text-sm">{option.name}</span>
                                                    </div>
                                                    {option.price && <span className="text-sm text-gray-600">{option.price}</span>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* CUSTOMIZE section */}
                            <div className="border-t border-gray-200 cursor-pointer" onClick={() => toggleSection("CUSTOMIZE")}>
                                <div className="flex justify-between items-center px-4 py-3">
                                    <span className="font-medium text-gray-700">CUSTOMIZE</span>
                                    <ChevronDown
                                        size={16}
                                        className={`text-gray-400 transition-transform ${
                                            expandedSection === "CUSTOMIZE" ? "transform rotate-180" : ""
                                        }`}
                                    />
                                </div>

                                {expandedSection === "CUSTOMIZE" && (
                                    <div className="border-t border-gray-100 max-h-[800px] overflow-y-auto scroll-smooth">

                                        {/* MEAT Subsection */}
                                        <div className="border-t border-gray-200">
                                            <div
                                                className="flex justify-between items-center px-4 py-3 cursor-pointer"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    toggleSubSection("MEAT")
                                                }}
                                            >
                                                <span className="font-medium text-gray-700">MEAT</span>
                                                <ChevronDown
                                                    size={16}
                                                    className={`text-gray-400 transition-transform ${
                                                        expandedSubSection === "MEAT" ? "transform rotate-180" : ""
                                                    }`}
                                                />
                                            </div>
                                            {expandedSubSection === "MEAT" && (
                                                <div className="bg-gray-50 px-4 py-2">
                                                    <div className="space-y-2">
                                                        {meatOptions.map((option, idx) => (
                                                            <div key={idx} className="flex justify-between items-center">
                                                                <div className="flex items-center">
                                                                    <div
                                                                        className={`w-4 h-4 rounded-sm border ${
                                                                            isCustomizeOptionSelected("meats", option.name)
                                                                                ? "border-amber-800 bg-[#663300]"
                                                                                : "border-gray-300"
                                                                        } mr-2 cursor-pointer`}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation()
                                                                            toggleCustomizeOption("meats", option.name)
                                                                        }}
                                                                    >
                                                                        {isCustomizeOptionSelected("meats", option.name) && (
                                                                            <div className="flex items-center justify-center h-full">
                                                                                <div className="w-2 h-2 bg-white"></div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <span className="text-sm">{option.name}</span>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <span className="text-sm text-gray-600 mr-2">{option.price}</span>
                                                                    {isCustomizeOptionSelected("meats", option.name) && (
                                                                        <button
                                                                            className="text-gray-500 hover:text-red-500"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation()
                                                                                removeCustomizeOption("meats", option.name)
                                                                            }}
                                                                        >
                                                                            <X size={14} />
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* VEGETARIAN PROTEINS Subsection */}
                                        <div className="border-t border-gray-200">
                                            <div
                                                className="flex justify-between items-center px-4 py-3 cursor-pointer"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    toggleSubSection("VEG_PROTEINS")
                                                }}
                                            >
                                                <span className="font-medium text-gray-700">VEGETARIAN PROTEINS</span>
                                                <ChevronDown
                                                    size={16}
                                                    className={`text-gray-400 transition-transform ${
                                                        expandedSubSection === "VEG_PROTEINS" ? "transform rotate-180" : ""
                                                    }`}
                                                />
                                            </div>
                                            {expandedSubSection === "VEG_PROTEINS" && (
                                                <div className="bg-gray-50 px-4 py-2">
                                                    <div className="space-y-2">
                                                        {vegProteinOptions.map((option, idx) => (
                                                            <div key={idx} className="flex justify-between items-center">
                                                                <div className="flex items-center">
                                                                    <div
                                                                        className={`w-4 h-4 rounded-sm border ${
                                                                            isCustomizeOptionSelected("vegProteins", option.name)
                                                                                ? "border-amber-800 bg-[#663300]"
                                                                                : "border-gray-300"
                                                                        } mr-2 cursor-pointer`}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation()
                                                                            toggleCustomizeOption("vegProteins", option.name)
                                                                        }}
                                                                    >
                                                                        {isCustomizeOptionSelected("vegProteins", option.name) && (
                                                                            <div className="flex items-center justify-center h-full">
                                                                                <div className="w-2 h-2 bg-white"></div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <span className="text-sm">{option.name}</span>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <span className="text-sm text-gray-600 mr-2">{option.price}</span>
                                                                    {isCustomizeOptionSelected("vegProteins", option.name) && (
                                                                        <button
                                                                            className="text-gray-500 hover:text-red-500"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation()
                                                                                removeCustomizeOption("vegProteins", option.name)
                                                                            }}
                                                                        >
                                                                            <X size={14} />
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* CHEESE Subsection */}
                                        <div className="border-t border-gray-200">
                                            <div
                                                className="flex justify-between items-center px-4 py-3 cursor-pointer"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    toggleSubSection("CHEESE")
                                                }}
                                            >
                                                <span className="font-medium text-gray-700">CHEESE</span>
                                                <ChevronDown
                                                    size={16}
                                                    className={`text-gray-400 transition-transform ${
                                                        expandedSubSection === "CHEESE" ? "transform rotate-180" : ""
                                                    }`}
                                                />
                                            </div>
                                            {expandedSubSection === "CHEESE" && (
                                                <div className="bg-gray-50 px-4 py-2 max-h-[300px] overflow-y-auto">
                                                    <div className="space-y-2">
                                                        {cheeseOptions.map((option, idx) => (
                                                            <div key={idx} className="flex justify-between items-center">
                                                                <div className="flex items-center">
                                                                    <div
                                                                        className={`w-4 h-4 rounded-sm border ${
                                                                            isCustomizeOptionSelected("cheese", option.name)
                                                                                ? "border-amber-800 bg-[#663300]"
                                                                                : "border-gray-300"
                                                                        } mr-2 cursor-pointer`}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation()
                                                                            toggleCustomizeOption("cheese", option.name)
                                                                        }}
                                                                    >
                                                                        {isCustomizeOptionSelected("cheese", option.name) && (
                                                                            <div className="flex items-center justify-center h-full">
                                                                                <div className="w-2 h-2 bg-white"></div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <span className="text-sm">{option.name}</span>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <span className="text-sm text-gray-600 mr-2">{option.price}</span>
                                                                    {isCustomizeOptionSelected("cheese", option.name) && (
                                                                        <button
                                                                            className="text-gray-500 hover:text-red-500"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation()
                                                                                removeCustomizeOption("cheese", option.name)
                                                                            }}
                                                                        >
                                                                            <X size={14} />
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* SAUCES Subsection */}
                                        <div className="border-t border-gray-200">
                                            <div
                                                className="flex justify-between items-center px-4 py-3 cursor-pointer"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    toggleSubSection("SAUCES")
                                                }}
                                            >
                                                <span className="font-medium text-gray-700">SAUCES</span>
                                                <ChevronDown
                                                    size={16}
                                                    className={`text-gray-400 transition-transform ${
                                                        expandedSubSection === "SAUCES" ? "transform rotate-180" : ""
                                                    }`}
                                                />
                                            </div>
                                            {expandedSubSection === "SAUCES" && (
                                                <div className="bg-gray-50 px-4 py-2 max-h-[300px] overflow-y-auto">
                                                    <div className="space-y-2">
                                                        {sauceOptions.map((option, idx) => (
                                                            <div key={idx} className="flex justify-between items-center">
                                                                <div className="flex items-center">
                                                                    <div
                                                                        className={`w-4 h-4 rounded-sm border ${
                                                                            isCustomizeOptionSelected("sauces", option.name)
                                                                                ? "border-amber-800 bg-[#663300]"
                                                                                : "border-gray-300"
                                                                        } mr-2 cursor-pointer`}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation()
                                                                            toggleCustomizeOption("sauces", option.name)
                                                                        }}
                                                                    >
                                                                        {isCustomizeOptionSelected("sauces", option.name) && (
                                                                            <div className="flex items-center justify-center h-full">
                                                                                <div className="w-2 h-2 bg-white"></div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <span className="text-sm">{option.name}</span>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <span className="text-sm text-gray-600 mr-2">{option.price}</span>
                                                                    {isCustomizeOptionSelected("sauces", option.name) && (
                                                                        <button
                                                                            className="text-gray-500 hover:text-red-500"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation()
                                                                                removeCustomizeOption("sauces", option.name)
                                                                            }}
                                                                        >
                                                                            <X size={14} />
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* HERBS & SEASONINGS Subsection */}
                                        <div className="border-t border-gray-200">
                                            <div
                                                className="flex justify-between items-center px-4 py-3 cursor-pointer"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    toggleSubSection("HERBS")
                                                }}
                                            >
                                                <span className="font-medium text-gray-700">HERBS & SEASONINGS</span>
                                                <ChevronDown
                                                    size={16}
                                                    className={`text-gray-400 transition-transform ${
                                                        expandedSubSection === "HERBS" ? "transform rotate-180" : ""
                                                    }`}
                                                />
                                            </div>
                                            {expandedSubSection === "HERBS" && (
                                                <div className="bg-gray-50 px-4 py-2 max-h-[300px] overflow-y-auto">
                                                    <div className="space-y-2">
                                                        {herbOptions.map((option, idx) => (
                                                            <div key={idx} className="flex justify-between items-center">
                                                                <div className="flex items-center">
                                                                    <div
                                                                        className={`w-4 h-4 rounded-sm border ${
                                                                            isCustomizeOptionSelected("herbs", option.name)
                                                                                ? "border-amber-800 bg-[#663300]"
                                                                                : "border-gray-300"
                                                                        } mr-2 cursor-pointer`}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation()
                                                                            toggleCustomizeOption("herbs", option.name)
                                                                        }}
                                                                    >
                                                                        {isCustomizeOptionSelected("herbs", option.name) && (
                                                                            <div className="flex items-center justify-center h-full">
                                                                                <div className="w-2 h-2 bg-white"></div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <span className="text-sm">{option.name}</span>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <span className="text-sm text-gray-600 mr-2">{option.price}</span>
                                                                    {isCustomizeOptionSelected("herbs", option.name) && (
                                                                        <button
                                                                            className="text-gray-500 hover:text-red-500"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation()
                                                                                removeCustomizeOption("herbs", option.name)
                                                                            }}
                                                                        >
                                                                            <X size={14} />
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                            {/* ALLERGIES section */}
                            <div className="border-t border-gray-200 cursor-pointer" onClick={() => toggleSection("ALLERGIES")}>
                                <div className="flex justify-between items-center px-4 py-3">
                                    <span className="font-medium text-gray-700">ALLERGIES</span>
                                    <ChevronDown
                                        size={16}
                                        className={`text-gray-400 transition-transform ${
                                            expandedSection === "ALLERGIES" ? "transform rotate-180" : ""
                                        }`}
                                    />
                                </div>
                                <div className="border-t border-gray-100 max-h-[250px] overflow-y-auto">

                                {expandedSection === "ALLERGIES" && (
                                    <div className="border-t border-gray-100 bg-gray-50 px-4 py-2">
                                        <div className="text-sm text-gray-600 mb-2">
                                            Please inform us of any allergies or dietary restrictions.
                                        </div>
                                        <textarea
                                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                            placeholder="Enter any allergies or dietary restrictions here..."
                                            rows={3}
                                            value={allergiesNote}
                                            onChange={(e) => setAllergiesNote(e.target.value)}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        <div className="border-t border-gray-200 p-4">
                                            <div className="flex justify-between items-center mb-4">
                                                <span className="font-medium text-gray-700">QUANTITY</span>
                                                <div className="flex items-center border border-gray-300 rounded-md">
                                                    <button className="px-3 py-1 text-gray-500 hover:bg-gray-100" onClick={decrementQuantity}>
                                                        -
                                                    </button>
                                                    <span className="px-3 py-1">{quantity}</span>
                                                    <button className="px-3 py-1 text-gray-500 hover:bg-gray-100" onClick={incrementQuantity}>
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <button
                                                className="w-full bg-[#663300] text-white py-3 rounded-md font-medium hover:bg-amber-700 transition-colors"
                                                onClick={() => {
                                                    // Add to cart logic here
                                                    alert("Pizza added to cart!")
                                                    setActiveIndex(null)
                                                }}
                                            >
                                                ADD TO CART
                                            </button>
                                        </div>
                                    </div>

                                )}
                                </div>
                            </div>

                            {/* Quantity and Add to Cart */}

                        </div>
                    </div>
                </div>
            )}

            <div className="px-28 mx-auto bg-[#F9F3E6] p-6">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[#663300] bg-white inline-block px-12 py-2 border-2 border-[#663300] rounded-full">
                        CREATIVE DELIGHTS
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                    {pizzaItems.map((item, index) => (
                        <React.Fragment key={`item-${index}`}>
                            <div className="col-span-1">{renderPizzaItem(item, index)}</div>
                            {(index + 1) % 2 === 0 && index !== pizzaItems.length - 1 && (
                                <div key={`divider-${index}`} className="col-span-full">
                                    <hr className="border-t border-gray-300 my-6" />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    )
}
