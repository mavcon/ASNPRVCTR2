"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search as SearchIcon, Filter, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ProductGrid } from "@/components/product/product-grid"
import { ProductFilters } from "@/components/product/product-filters"
import { ProductSort } from "@/components/product/product-sort"

// Mock search results for demonstration
const mockProducts = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  description: "This is a product description",
  price: 19.99 + i * 10,
  originalPrice: i % 3 === 0 ? 29.99 + i * 10 : undefined,
  rating: 3.5 + Math.random() * 1.5,
  reviewCount: Math.floor(Math.random() * 100) + 5,
  image: `https://placehold.co/600x600?text=Product+${i + 1}`,
  category: i % 4 === 0 ? "Paintings" : i % 4 === 1 ? "Sculptures" : i % 4 === 2 ? "Photography" : "Digital Art",
  isNew: i % 7 === 0,
  isFeatured: i % 5 === 0,
  isSale: i % 3 === 0,
  isOutOfStock: i % 11 === 0,
}))

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = React.useState(false)
  const [showFilters, setShowFilters] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState(
    searchParams.get("q") || ""
  )
  const [searchResults, setSearchResults] = React.useState(mockProducts)
  const [totalResults, setTotalResults] = React.useState(mockProducts.length)

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Update URL with search query
    const params = new URLSearchParams(searchParams.toString())
    if (searchQuery) {
      params.set("q", searchQuery)
    } else {
      params.delete("q")
    }
    router.push(`/search?${params.toString()}`)

    // Simulate API call to search products
    setTimeout(() => {
      // Filter products based on search query
      const filteredProducts = mockProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSearchResults(filteredProducts)
      setTotalResults(filteredProducts.length)
      setIsLoading(false)
    }, 500)
  }

  // Handle filter changes
  const handleFilterChange = (filters: Record<string, any>) => {
    setIsLoading(true)

    // Simulate API call to filter products
    setTimeout(() => {
      // In a real app, we would apply the filters to the search results
      // For now, we'll just use the mock products
      setSearchResults(mockProducts)
      setTotalResults(mockProducts.length)
      setIsLoading(false)
    }, 500)
  }

  // Handle sort changes
  const handleSortChange = (sortOption: string) => {
    setIsLoading(true)

    // Simulate API call to sort products
    setTimeout(() => {
      let sortedResults = [...searchResults]

      switch (sortOption) {
        case "price-asc":
          sortedResults.sort((a, b) => a.price - b.price)
          break
        case "price-desc":
          sortedResults.sort((a, b) => b.price - a.price)
          break
        case "newest":
          sortedResults.sort((a, b) => b.id - a.id)
          break
        case "rating":
          sortedResults.sort((a, b) => b.rating - a.rating)
          break
        default:
          // Default to relevance (no sorting)
          break
      }

      setSearchResults(sortedResults)
      setIsLoading(false)
    }, 500)
  }

  // Clear search query
  const handleClearSearch = () => {
    setSearchQuery("")
    router.push("/search")
    setSearchResults(mockProducts)
    setTotalResults(mockProducts.length)
  }

  return (
    <div className="container px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Search</h1>
          <p className="text-muted-foreground">
            Find products in our catalog
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex w-full max-w-3xl space-x-2">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for products..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8"
                onClick={handleClearSearch}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </form>

        <div className="flex flex-col space-y-6 lg:flex-row lg:space-x-8 lg:space-y-0">
          <div className="lg:w-1/4">
            <div className="sticky top-4 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </Button>
              </div>

              <div className={`space-y-4 ${showFilters ? "block" : "hidden lg:block"}`}>
                <ProductFilters onFilterChange={handleFilterChange} />
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div>
                {searchParams.get("q") ? (
                  <p className="text-sm text-muted-foreground">
                    {totalResults} results for "{searchParams.get("q")}"
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {totalResults} products
                  </p>
                )}
              </div>

              <ProductSort onSortChange={handleSortChange} />
            </div>

            <Separator />

            {isLoading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-lg border bg-card animate-pulse"
                  >
                    <div className="aspect-square w-full bg-muted" />
                    <div className="p-4 space-y-2">
                      <div className="h-4 w-2/3 rounded bg-muted" />
                      <div className="h-4 w-1/2 rounded bg-muted" />
                      <div className="h-4 w-1/4 rounded bg-muted" />
                    </div>
                  </div>
                ))}
              </div>
            ) : searchResults.length > 0 ? (
              <ProductGrid
                products={searchResults}
                columns={{
                  default: 1,
                  sm: 2,
                  lg: 3,
                  xl: 4,
                }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <SearchIcon className="h-12 w-12 text-muted-foreground" />
                <h2 className="mt-4 text-lg font-medium">No results found</h2>
                <p className="mt-2 text-muted-foreground">
                  We couldn't find any products matching your search.
                </p>
                <Button
                  className="mt-6"
                  onClick={handleClearSearch}
                >
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 