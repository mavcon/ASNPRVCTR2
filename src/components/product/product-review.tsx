"use client"

import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Rating } from "@/components/ui/rating"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ThumbsUp, Flag } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProductReviewProps {
  review: {
    id: string
    user: {
      name: string
      avatar?: string
    }
    rating: number
    title: string
    content: string
    date: string
    helpful?: number
    verified?: boolean
  }
  className?: string
}

export function ProductReview({ review, className }: ProductReviewProps) {
  const [isHelpful, setIsHelpful] = React.useState(false)
  const [helpfulCount, setHelpfulCount] = React.useState(review.helpful || 0)
  
  const handleHelpfulClick = () => {
    if (isHelpful) {
      setHelpfulCount(prev => prev - 1)
    } else {
      setHelpfulCount(prev => prev + 1)
    }
    setIsHelpful(!isHelpful)
  }
  
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <Avatar>
            <AvatarImage src={review.user.avatar} alt={review.user.name} />
            <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center">
              <h4 className="font-medium">{review.user.name}</h4>
              {review.verified && (
                <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                  Verified Purchase
                </span>
              )}
            </div>
            <div className="mt-1 flex items-center space-x-2">
              <Rating value={review.rating} size="sm" />
              <span className="text-sm text-muted-foreground">
                {new Date(review.date).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h5 className="font-medium">{review.title}</h5>
        <p className="mt-1 text-sm text-muted-foreground">{review.content}</p>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn(isHelpful && "text-primary")}
          onClick={handleHelpfulClick}
        >
          <ThumbsUp className="mr-1 h-4 w-4" />
          Helpful ({helpfulCount})
        </Button>
        <Button variant="ghost" size="sm">
          <Flag className="mr-1 h-4 w-4" />
          Report
        </Button>
      </div>
      
      <Separator />
    </div>
  )
}

interface ProductReviewsProps {
  reviews: ProductReviewProps["review"][]
  className?: string
}

export function ProductReviews({ reviews, className }: ProductReviewsProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {reviews.map((review) => (
        <ProductReview key={review.id} review={review} />
      ))}
    </div>
  )
} 