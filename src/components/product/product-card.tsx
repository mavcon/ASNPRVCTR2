"use client"

import * as React from "react"
import Link from "next/link"
import { Heart, ShoppingCart } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Rating } from "@/components/ui/rating"
import { toast } from "@/hooks/use-toast"

interface ProductCardProps {
  product: {
    id: string | number
    name: string
    description?: string
    price: number
    originalPrice?: number
    rating?: number
    reviewCount?: number
    image: string
    category?: string
    isNew?: boolean
    isFeatured?: boolean
    isSale?: boolean
    isOutOfStock?: boolean
    artist?: string
  }
  variant?: "default" | "compact"
  className?: string
}

export function ProductCard({ product, variant = "default", className }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = React.useState(false)
  
  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    setIsWishlisted(!isWishlisted)
    
    if (!isWishlisted) {
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      })
    } else {
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      })
    }
  }
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (product.isOutOfStock) return
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }
  
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0
  
  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", className)}>
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square">
          <img 
            src={product.image} 
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />
          
          {/* Product badges */}
          <div className="absolute left-2 top-2 flex flex-col gap-1">
            {product.isNew && (
              <Badge>New</Badge>
            )}
            {product.isSale && product.originalPrice && (
              <Badge variant="destructive">-{discount}%</Badge>
            )}
            {product.isFeatured && (
              <Badge variant="secondary">Featured</Badge>
            )}
          </div>
          
          {/* Wishlist button */}
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={handleWishlistClick}
          >
            <Heart 
              className={cn(
                "h-4 w-4", 
                isWishlisted && "fill-red-500 text-red-500"
              )} 
            />
            <span className="sr-only">Add to wishlist</span>
          </Button>
        </div>
        
        <CardContent className="p-4">
          {variant === "default" && product.category && (
            <div className="mb-1">
              <Badge variant="outline" className="text-xs font-normal">
                {product.category}
              </Badge>
            </div>
          )}
          
          <h3 className="line-clamp-1 text-base font-medium">{product.name}</h3>
          
          {variant === "default" && product.artist && (
            <p className="line-clamp-1 text-sm text-muted-foreground">
              By {product.artist}
            </p>
          )}
          
          {variant === "default" && product.description && (
            <p className="line-clamp-2 mt-1 text-xs text-muted-foreground">
              {product.description}
            </p>
          )}
          
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-medium">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            
            {product.rating !== undefined && (
              <div className="flex items-center">
                <Rating value={product.rating} size="sm" />
                {product.reviewCount !== undefined && (
                  <span className="ml-1 text-xs text-muted-foreground">
                    ({product.reviewCount})
                  </span>
                )}
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <Button 
            className="w-full" 
            size="sm"
            variant={product.isOutOfStock ? "outline" : "default"}
            disabled={product.isOutOfStock}
            onClick={handleAddToCart}
          >
            {product.isOutOfStock ? (
              "Out of Stock"
            ) : (
              <>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </>
            )}
          </Button>
        </CardFooter>
      </Link>
    </Card>
  )
} 