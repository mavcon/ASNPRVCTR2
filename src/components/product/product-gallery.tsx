"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ProductGalleryProps {
  images: string[]
  className?: string
}

export function ProductGallery({ images, className }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [selectedThumbnail, setSelectedThumbnail] = React.useState(0)
  
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
    setSelectedThumbnail((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
    setSelectedThumbnail((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }
  
  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index)
    setSelectedThumbnail(index)
  }
  
  return (
    <div className={cn("space-y-4", className)}>
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
              onClick={handleNext}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next</span>
            </Button>
          </>
        )}
        <img
          src={images[currentIndex]}
          alt={`Product image ${currentIndex + 1}`}
          className="h-full w-full object-cover object-center"
        />
      </div>
      
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={cn(
                "relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border bg-muted",
                selectedThumbnail === index && "ring-2 ring-primary"
              )}
              onClick={() => handleThumbnailClick(index)}
            >
              <img
                src={image}
                alt={`Product thumbnail ${index + 1}`}
                className="h-full w-full object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
} 