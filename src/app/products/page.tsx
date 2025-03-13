"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { GridIcon, LayoutListIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product/product-card"
import { ProductGrid } from "@/components/product/product-grid"
import { ProductFilters } from "@/components/product/product-filters"
import { ProductSort, SortOption } from "@/components/product/product-sort"
import { Separator } from "@/components/ui/separator"

// Mock data for demonstration
const mockProducts = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  description: "This is a sample product description that showcases the product's features and benefits.",
  price: 19.99 + i * 10,
  originalPrice: i % 3 === 0 ? 29.99 + i * 10 : undefined,
  rating: 3 + Math.random() * 2,
  reviewCount: Math.floor(Math.random() * 100),
  image: `https://placehold.co/600x600?text=Product+${i + 1}`,
  category: `Category ${Math.floor(i / 3) + 1}`,
  isNew: i % 7 === 0,
  isFeatured: i % 5 === 0,
  isSale: i % 3 === 0,
  isOutOfStock: i % 11 === 0,
  artist: i % 4 === 0 ? `Artist ${i % 4 + 1}` : undefined,
}))

// Mock categories for filters
const mockCategories = {
  id: "categories",
  name: "Categories",
  options: Array.from({ length: 4 }).map((_, i) => ({
    id: `category-${i + 1}`,
    label: `Category ${i + 1}`,
    count: Math.floor(Math.random() * 20) + 5,
  })),
}

// Mock filters
const mockFilters = [
  {
    id: "artists",
    name: "Artists",
    options: Array.from({ length: 4 }).map((_, i) => ({
      id: `artist-${i + 1}`,
      label: `Artist ${i + 1}`,
      count: Math.floor(Math.random() * 10) + 2,
    })),
  },
  {
    id: "availability",
    name: "Availability",
    options: [
      { id: "in-stock", label: "In Stock", count: 42 },
      { id: "out-of-stock", label: "Out of Stock", count: 3 },
    ],
  },
]

// Sort options
const sortOptions: SortOption[] = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Rating: High to Low", value: "rating-desc" },
  { label: "Popularity", value: "popularity" },
]

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = React.useState(true)
  const [products, setProducts] = React.useState(mockProducts)
  const [activeFilters, setActiveFilters] = React.useState<{
    [key: string]: string[]
  }>({})
  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 200])
  const [sortValue, setSortValue] = React.useState("newest")
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")
  
  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])
  
  // Handle filter changes
  const handleFilterChange = (filterId: string, optionId: string, checked: boolean) => {
    setActiveFilters((prev) => {
      const newFilters = { ...prev }
      
      if (!newFilters[filterId]) {
        newFilters[filterId] = []
      }
      
      if (checked) {
        newFilters[filterId] = [...newFilters[filterId], optionId]
      } else {
        newFilters[filterId] = newFilters[filterId].filter((id) => id !== optionId)
        
        if (newFilters[filterId].length === 0) {
          delete newFilters[filterId]
        }
      }
      
      return newFilters
    })
  }
  
  // Handle price range changes
  const handlePriceChange = (values: [number, number]) => {
    setPriceRange(values)
  }
  
  // Handle sort changes
  const handleSortChange = (value: string) => {
    setSortValue(value)
  }
  
  // Clear all filters
  const handleClearFilters = () => {
    setActiveFilters({})
    setPriceRange([0, 200])
  }
  
  // Filter and sort products
  const filteredProducts = React.useMemo(() => {
    // Start with all products
    let filtered = [...mockProducts]
    
    // Apply price filter
    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    
    // Apply category filters
    if (activeFilters.categories?.length) {
      filtered = filtered.filter((product) => {
        const categoryId = `category-${product.category?.split(" ")[1]}`
        return activeFilters.categories.includes(categoryId)
      })
    }
    
    // Apply artist filters
    if (activeFilters.artists?.length) {
      filtered = filtered.filter((product) => {
        if (!product.artist) return false
        const artistId = `artist-${product.artist.split(" ")[1]}`
        return activeFilters.artists.includes(artistId)
      })
    }
    
    // Apply availability filters
    if (activeFilters.availability?.length) {
      filtered = filtered.filter((product) => {
        if (activeFilters.availability.includes("in-stock") && !product.isOutOfStock) {
          return true
        }
        if (activeFilters.availability.includes("out-of-stock") && product.isOutOfStock) {
          return true
        }
        return false
      })
    }
    
    // Apply sorting
    switch (sortValue) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating-desc":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case "popularity":
        filtered.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
        break
      case "newest":
      default:
        // Already sorted by newest (id)
        break
    }
    
    return filtered
  }, [mockProducts, activeFilters, priceRange, sortValue])
  
  return (
    <div className="container px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="mt-2 text-muted-foreground">
            Browse our collection of products
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Filters */}
          <div className="lg:col-span-1">
            <ProductFilters
              categories={mockCategories}
              filters={mockFilters}
              priceRange={{
                min: 0,
                max: 200,
                defaultValue: priceRange,
              }}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onPriceChange={handlePriceChange}
              onClearFilters={handleClearFilters}
            />
          </div>
          
          {/* Products */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {filteredProducts.length} products
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode("grid")}
                  >
                    <GridIcon className="h-4 w-4" />
                    <span className="sr-only">Grid view</span>
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode("list")}
                  >
                    <LayoutListIcon className="h-4 w-4" />
                    <span className="sr-only">List view</span>
                  </Button>
                </div>
                
                <Separator orientation="vertical" className="h-8" />
                
                <ProductSort
                  options={sortOptions}
                  value={sortValue}
                  onValueChange={handleSortChange}
                />
              </div>
            </div>
            
            {viewMode === "grid" ? (
              <ProductGrid
                products={filteredProducts}
                loading={loading}
                columns={{
                  default: 1,
                  sm: 2,
                  md: 2,
                  lg: 3,
                }}
              />
            ) : (
              <div className="space-y-4">
                {loading
                  ? Array(4)
                      .fill(null)
                      .map((_, index) => (
                        <div
                          key={index}
                          className="flex h-40 animate-pulse rounded-lg border bg-muted"
                        />
                      ))
                  : filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex flex-col overflow-hidden rounded-lg border sm:flex-row"
                      >
                        <div className="aspect-square h-40 w-full sm:w-40">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col p-4">
                          <div className="mb-2">
                            {product.category && (
                              <span className="mb-1 inline-block text-xs text-muted-foreground">
                                {product.category}
                              </span>
                            )}
                            <h3 className="line-clamp-1 text-base font-medium">
                              {product.name}
                            </h3>
                            <p className="line-clamp-2 mt-1 text-sm text-muted-foreground">
                              {product.description}
                            </p>
                          </div>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-baseline gap-2">
                              <span className="font-medium">
                                ${product.price.toFixed(2)}
                              </span>
                              {product.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                  ${product.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                            <Button
                              size="sm"
                              variant={product.isOutOfStock ? "outline" : "default"}
                              disabled={product.isOutOfStock}
                            >
                              {product.isOutOfStock ? "Out of Stock" : "Add to Cart"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 