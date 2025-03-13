"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { ProductCard } from "@/components/product/product-card"
import { Skeleton } from "@/components/ui/skeleton"

interface ProductGridProps extends React.HTMLAttributes<HTMLDivElement> {
  products: any[]
  loading?: boolean
  skeletonCount?: number
  variant?: "default" | "compact"
  columns?: {
    default: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
}

export function ProductGrid({
  products,
  loading = false,
  skeletonCount = 8,
  variant = "default",
  columns = {
    default: 2,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  },
  className,
  ...props
}: ProductGridProps) {
  // Generate grid template columns based on the columns prop
  const gridCols = React.useMemo(() => {
    const colClasses = []
    
    colClasses.push(`grid-cols-${columns.default}`)
    
    if (columns.sm) {
      colClasses.push(`sm:grid-cols-${columns.sm}`)
    }
    
    if (columns.md) {
      colClasses.push(`md:grid-cols-${columns.md}`)
    }
    
    if (columns.lg) {
      colClasses.push(`lg:grid-cols-${columns.lg}`)
    }
    
    if (columns.xl) {
      colClasses.push(`xl:grid-cols-${columns.xl}`)
    }
    
    return colClasses.join(" ")
  }, [columns])

  return (
    <div
      className={cn(
        "grid gap-4",
        gridCols,
        className
      )}
      {...props}
    >
      {loading
        ? Array(skeletonCount)
            .fill(null)
            .map((_, index) => <ProductCardSkeleton key={index} />)
        : products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              variant={variant}
            />
          ))}
    </div>
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border bg-background">
      <Skeleton className="aspect-square w-full" />
      <div className="p-4">
        <Skeleton className="h-4 w-1/4 mb-2" />
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-4" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <div className="mt-4">
          <Skeleton className="h-9 w-full" />
        </div>
      </div>
    </div>
  )
} 