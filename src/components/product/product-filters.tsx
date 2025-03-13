"use client"

import * as React from "react"
import { Filter, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"

interface FilterOption {
  id: string
  label: string
  count?: number
}

interface FilterGroup {
  id: string
  name: string
  options: FilterOption[]
}

interface PriceRange {
  min: number
  max: number
}

interface ProductFiltersProps {
  categories?: FilterGroup
  filters?: FilterGroup[]
  priceRange?: {
    min: number
    max: number
    defaultValue?: [number, number]
  }
  activeFilters?: {
    categories?: string[]
    [key: string]: string[] | undefined
  }
  onFilterChange?: (filterId: string, optionId: string, checked: boolean) => void
  onPriceChange?: (values: [number, number]) => void
  onClearFilters?: () => void
  className?: string
}

export function ProductFilters({
  categories,
  filters = [],
  priceRange,
  activeFilters = {},
  onFilterChange,
  onPriceChange,
  onClearFilters,
  className,
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [localPriceRange, setLocalPriceRange] = React.useState<[number, number]>(
    priceRange?.defaultValue || [priceRange?.min || 0, priceRange?.max || 1000]
  )
  
  // Count total active filters
  const activeFilterCount = React.useMemo(() => {
    let count = 0
    
    Object.values(activeFilters).forEach((filterValues) => {
      if (filterValues) {
        count += filterValues.length
      }
    })
    
    return count
  }, [activeFilters])
  
  // Handle price slider change
  const handlePriceChange = React.useCallback(
    (values: number[]) => {
      const newValues: [number, number] = [values[0], values[1]]
      setLocalPriceRange(newValues)
    },
    []
  )
  
  // Apply price filter when slider interaction ends
  const handlePriceChangeEnd = React.useCallback(() => {
    if (onPriceChange) {
      onPriceChange(localPriceRange)
    }
  }, [localPriceRange, onPriceChange])
  
  // Handle checkbox change
  const handleCheckboxChange = React.useCallback(
    (filterId: string, optionId: string, checked: boolean) => {
      if (onFilterChange) {
        onFilterChange(filterId, optionId, checked)
      }
    },
    [onFilterChange]
  )
  
  // Check if a filter option is active
  const isFilterActive = React.useCallback(
    (filterId: string, optionId: string) => {
      return activeFilters[filterId]?.includes(optionId) || false
    },
    [activeFilters]
  )
  
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Mobile filter button */}
      <div className="flex items-center justify-between lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <SheetHeader>
              <SheetTitle className="flex items-center justify-between">
                Filters
                {activeFilterCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-xs"
                    onClick={onClearFilters}
                  >
                    Clear all
                  </Button>
                )}
              </SheetTitle>
            </SheetHeader>
            <div className="mt-4 flex flex-col gap-6">
              {/* Mobile price range filter */}
              {priceRange && (
                <div className="space-y-4">
                  <h3 className="font-medium">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={localPriceRange}
                      min={priceRange.min}
                      max={priceRange.max}
                      step={1}
                      onValueChange={handlePriceChange}
                      onValueCommit={handlePriceChangeEnd}
                      className="my-6"
                    />
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        ${localPriceRange[0]}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ${localPriceRange[1]}
                      </p>
                    </div>
                  </div>
                  <Separator />
                </div>
              )}
              
              {/* Mobile categories filter */}
              {categories && categories.options.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-medium">{categories.name}</h3>
                  <div className="space-y-2">
                    {categories.options.map((option) => (
                      <div key={option.id} className="flex items-center gap-2">
                        <Checkbox
                          id={`mobile-category-${option.id}`}
                          checked={isFilterActive(categories.id, option.id)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(categories.id, option.id, checked === true)
                          }
                        />
                        <label
                          htmlFor={`mobile-category-${option.id}`}
                          className="flex-1 text-sm"
                        >
                          {option.label}
                          {option.count !== undefined && (
                            <span className="ml-1 text-muted-foreground">
                              ({option.count})
                            </span>
                          )}
                        </label>
                      </div>
                    ))}
                  </div>
                  <Separator />
                </div>
              )}
              
              {/* Mobile other filters */}
              {filters.map((filter) => (
                <div key={filter.id} className="space-y-4">
                  <h3 className="font-medium">{filter.name}</h3>
                  <div className="space-y-2">
                    {filter.options.map((option) => (
                      <div key={option.id} className="flex items-center gap-2">
                        <Checkbox
                          id={`mobile-${filter.id}-${option.id}`}
                          checked={isFilterActive(filter.id, option.id)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(filter.id, option.id, checked === true)
                          }
                        />
                        <label
                          htmlFor={`mobile-${filter.id}-${option.id}`}
                          className="flex-1 text-sm"
                        >
                          {option.label}
                          {option.count !== undefined && (
                            <span className="ml-1 text-muted-foreground">
                              ({option.count})
                            </span>
                          )}
                        </label>
                      </div>
                    ))}
                  </div>
                  {filter !== filters[filters.length - 1] && <Separator />}
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        
        {/* Mobile active filters */}
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-xs"
            onClick={onClearFilters}
          >
            Clear all
          </Button>
        )}
      </div>
      
      {/* Desktop filters */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Filters</h2>
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs"
              onClick={onClearFilters}
            >
              Clear all
            </Button>
          )}
        </div>
        
        <div className="mt-4 flex flex-col gap-6">
          {/* Desktop price range filter */}
          {priceRange && (
            <div className="space-y-4">
              <h3 className="font-medium">Price Range</h3>
              <div className="px-2">
                <Slider
                  defaultValue={localPriceRange}
                  min={priceRange.min}
                  max={priceRange.max}
                  step={1}
                  onValueChange={handlePriceChange}
                  onValueCommit={handlePriceChangeEnd}
                  className="my-6"
                />
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    ${localPriceRange[0]}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ${localPriceRange[1]}
                  </p>
                </div>
              </div>
              <Separator />
            </div>
          )}
          
          {/* Desktop categories filter */}
          {categories && categories.options.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-medium">{categories.name}</h3>
              <div className="space-y-2">
                {categories.options.map((option) => (
                  <div key={option.id} className="flex items-center gap-2">
                    <Checkbox
                      id={`desktop-category-${option.id}`}
                      checked={isFilterActive(categories.id, option.id)}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(categories.id, option.id, checked === true)
                      }
                    />
                    <label
                      htmlFor={`desktop-category-${option.id}`}
                      className="flex-1 text-sm"
                    >
                      {option.label}
                      {option.count !== undefined && (
                        <span className="ml-1 text-muted-foreground">
                          ({option.count})
                        </span>
                      )}
                    </label>
                  </div>
                ))}
              </div>
              <Separator />
            </div>
          )}
          
          {/* Desktop other filters */}
          {filters.map((filter) => (
            <div key={filter.id} className="space-y-4">
              <h3 className="font-medium">{filter.name}</h3>
              <div className="space-y-2">
                {filter.options.map((option) => (
                  <div key={option.id} className="flex items-center gap-2">
                    <Checkbox
                      id={`desktop-${filter.id}-${option.id}`}
                      checked={isFilterActive(filter.id, option.id)}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(filter.id, option.id, checked === true)
                      }
                    />
                    <label
                      htmlFor={`desktop-${filter.id}-${option.id}`}
                      className="flex-1 text-sm"
                    >
                      {option.label}
                      {option.count !== undefined && (
                        <span className="ml-1 text-muted-foreground">
                          ({option.count})
                        </span>
                      )}
                    </label>
                  </div>
                ))}
              </div>
              {filter !== filters[filters.length - 1] && <Separator />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 