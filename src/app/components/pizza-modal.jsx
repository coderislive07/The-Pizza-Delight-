"use client"

import { useState, useEffect, useRef } from "react"
import { X, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
import Image from "next/image"
import { userAgent } from "next/server"

export default function PizzaModal({
  isOpen,
  onClose,
  pizzaItem,
  onAddToCart,
  allPizzas,
  currentIndex = 0,
  onNavigate,
}) {
  const [expandedSection, setExpandedSection] = useState(null)
  const [expandedSubSection, setExpandedSubSection] = useState(null)
  const [selectedSize, setSelectedSize] = useState(0) // Default to S
  const [selectedBase, setSelectedBase] = useState(0) // Default to CLASSIC CRUST
  const [customizeOptions, setCustomizeOptions] = useState({
    meats: {},
    vegProteins: {},
    cheese: {},
    sauces: {},
    herbs: {},
  })
  const [quantity, setQuantity] = useState(1)
  const [allergiesNote, setAllergiesNote] = useState("")
  const modalRef=useRef();

  // Lock body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen])

  // Pre-select ingredients based on pizza description when a pizza is selected
  useEffect(() => {
    if (isOpen && pizzaItem) {
      const description = pizzaItem.description.toLowerCase()

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
      if (description.includes("pepperoni")) newSelections.meats["PEPPERONI"] = true
      if (description.includes("salami")) newSelections.meats["SALAMI"] = true

      // Check for vegetarian proteins in description
      if (description.includes("paneer")) newSelections.vegProteins["PANEER CUBES"] = true
      if (description.includes("chaap")) newSelections.vegProteins["SOYA CHAAP (TANDOORI)"] = true

      // Check for cheese in description
      if (description.includes("mozzarella")) newSelections.cheese["MOZZARELLA"] = true
      if (description.includes("cheese")) newSelections.cheese["MOZZARELLA"] = true
      if (description.includes("cheddar")) newSelections.cheese["CHEDDAR"] = true
      if (description.includes("feta")) newSelections.cheese["FETA"] = true
      if (description.includes("parmesan")) newSelections.cheese["PARMESAN"] = true
      if (description.includes("cream cheese")) newSelections.cheese["CREAM CHEESE"] = true

      // Check for sauces in description
      if (description.includes("makhani")) newSelections.sauces["BUTTER SAUCE"] = true
      if (description.includes("tandoori sauce")) newSelections.sauces["TANDOORI SAUCE"] = true
      if (description.includes("schezwan")) newSelections.sauces["SCHEZWAN SAUCE"] = true
      if (description.includes("butter")) newSelections.sauces["BUTTER SAUCE"] = true
      if (description.includes("kadahi")) newSelections.sauces["KADAHI SAUCE"] = true
      if (description.includes("tomato")) newSelections.sauces["CLASSIC TOMATO SAUCE"] = true
      if (description.includes("bbq")) newSelections.sauces["BBQ SAUCE"] = true
      if (description.includes("garlic")) newSelections.herbs["GARLIC"] = true

      // Check for herbs in description
      if (description.includes("oregano")) newSelections.herbs["OREGANO"] = true
      if (description.includes("basil")) newSelections.herbs["BASIL"] = true
      if (description.includes("coriander")) newSelections.herbs["CORIANDER"] = true
      if (description.includes("chili flakes")) newSelections.herbs["CHILI FLAKES"] = true
      if (description.includes("ginger")) newSelections.herbs["GINGER"] = true

      // Set the new selections
      setCustomizeOptions(newSelections)
    }
  }, [isOpen, pizzaItem])

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
    { name: "THIN CRUST", price: "+$1.00" },
    { name: "CHEESE BURST BASE", price: "+$2.50" },
    { name: "GLUTEN-FREE BASE", price: "+$2.00" },
  ]

  // Meat options
  const meatOptions = [
    { name: "HAM", price: "$1.00" },
    { name: "BACON", price: "$1.00" },
    { name: "STREAKY BACON", price: "$1.00" },
    { name: "BACON FLAKES", price: "$1.00" },
    { name: "CHORIZO PEPPERONI", price: "$1.00" },
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
    { name: "PANEER CUBES", price: "$1.50" },
    { name: "SOYA CHAAP (TANDOORI)", price: "$1.50" },
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
    { name: "CLASSIC TOMATO SAUCE", price: "$1.00" },
    { name: "WHITE CREAM SAUCE", price: "$1.00" },
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

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const toggleSubSection = (subSection) => {
    setExpandedSubSection(expandedSubSection === subSection ? null : subSection)
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

useEffect(() => {
  function handleClickOutside(event) {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose(); // Close the modal
    }
  }

  if (isOpen) {
    document.addEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [isOpen, onClose]);
  const isCustomizeOptionSelected = (category, option) => {
    return !!customizeOptions[category][option]
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

  const nextPizza = () => {
    if (onNavigate && allPizzas && currentIndex < allPizzas.length - 1) {
      onNavigate(currentIndex + 1)
    }
  }

  const prevPizza = () => {
    if (onNavigate && allPizzas && currentIndex > 0) {
      onNavigate(currentIndex - 1)
    }
  }

  const selectSize = (index) => {
    setSelectedSize(index)
  }

  const selectBase = (index) => {
    setSelectedBase(index)
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  const handleAddToCart = () => {
    onAddToCart({
      pizza: pizzaItem,
      size: selectedSize,
      base: selectedBase,
      customizeOptions,
      quantity,
      allergiesNote,
    })
  }

  if (!isOpen) return null

  // Get the pizza name (some components use 'name', others use 'title')
  const pizzaName = pizzaItem.name || pizzaItem.title || "Pizza"
return (
  isOpen && (
    <div ref={modalRef}
      className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center overflow-y-scroll"
      style={{ background: "rgba(0,0,0,0.05)" }}
    >
      <div className="bg-white w-full h-[98%] max-w-md rounded-lg overflow-scroll shadow-xl">
        {/* Header */}
        
        <div className="bg-[#663300] px-4 py-2 flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-white text-[#663300] rounded-sm px-3 py-1 text-xs font-bold">{pizzaName}</div>
          </div>
          <button onClick={onClose} className="text-white">
            <X size={18} />
          </button>
        </div>

        {/* Pizza Image */}
        <div className="relative p-4">
          <div className="text-center">
            <Image
              src={pizzaItem.image || "/placeholder.svg"}
              alt={pizzaName}
              width={250}
              height={250}
              className="mx-auto"
            />
          </div>

          {/* Navigation buttons - only show if navigation is enabled */}
          {allPizzas && allPizzas.length > 1 && (
            <>
              <button
                onClick={prevPizza}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
                disabled={currentIndex === 0}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextPizza}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
                disabled={currentIndex === allPizzas.length - 1}
              >
                <ChevronRight size={16} />
              </button>
            </>
          )}

          {/* Description */}
          <div className="text-xs text-gray-600 mt-2 text-center max-w-[300px] mx-auto">
            <p>{pizzaItem.description}</p>
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
                </div>
              )}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
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
              onClick={handleAddToCart}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  )
)
}
