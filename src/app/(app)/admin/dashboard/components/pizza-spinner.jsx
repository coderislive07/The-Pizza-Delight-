"use client"

const PizzaSpinner = ({ size = "md", className = "" }) => {
  // Size variants
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  }

  // Number of slices
  const slices = 8

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-full h-full rounded-full bg-yellow-100 animate-pulse"></div>
      </div>

      {[...Array(slices)].map((_, index) => {
        const rotation = index * (360 / slices)
        const delay = index * 0.1

        return (
          <div
            key={index}
            className="absolute w-full h-full"
            style={{
              transform: `rotate(${rotation}deg)`,
              transformOrigin: "center",
            }}
          >
            <div
              className="absolute top-0 left-1/2 w-1/4 h-1/2 bg-red-500 origin-bottom"
              style={{
                transform: "translateX(-50%)",
                clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
                animation: `pizzaSlicePulse 1.5s infinite ${delay}s`,
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-1/4 bg-yellow-400 rounded-t-sm"></div>
            </div>
          </div>
        )
      })}

      <style jsx>{`
        @keyframes pizzaSlicePulse {
          0%, 100% { opacity: 0.5; transform: translateX(-50%) scaleY(0.9); }
          50% { opacity: 1; transform: translateX(-50%) scaleY(1); }
        }
      `}</style>
    </div>
  )
}

export default PizzaSpinner
