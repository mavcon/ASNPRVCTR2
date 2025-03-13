"use client"

import * as React from "react"
import { Star, StarHalf } from "lucide-react"

import { cn } from "@/lib/utils"

interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  size?: "sm" | "md" | "lg"
  readonly?: boolean
  onRatingChange?: (value: number) => void
}

export function Rating({
  value,
  max = 5,
  size = "md",
  readonly = true,
  onRatingChange,
  className,
  ...props
}: RatingProps) {
  const [hoverValue, setHoverValue] = React.useState<number | null>(null)
  
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }
  
  const handleClick = (index: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(index + 1)
    }
  }
  
  const handleMouseEnter = (index: number) => {
    if (!readonly) {
      setHoverValue(index + 1)
    }
  }
  
  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverValue(null)
    }
  }
  
  const displayValue = hoverValue !== null ? hoverValue : value
  
  return (
    <div 
      className={cn("flex items-center", className)}
      {...props}
    >
      {Array.from({ length: max }).map((_, index) => {
        const isFilled = index < Math.floor(displayValue)
        const isHalf = !isFilled && index < displayValue
        
        return (
          <span 
            key={index}
            className={cn(
              "inline-flex",
              !readonly && "cursor-pointer"
            )}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {isFilled ? (
              <Star className={cn("fill-primary text-primary", sizeClasses[size])} />
            ) : isHalf ? (
              <StarHalf className={cn("fill-primary text-primary", sizeClasses[size])} />
            ) : (
              <Star className={cn("text-muted-foreground", sizeClasses[size])} />
            )}
          </span>
        )
      })}
      
      {props.children && (
        <span className="ml-2 text-sm text-muted-foreground">
          {props.children}
        </span>
      )}
    </div>
  )
} 