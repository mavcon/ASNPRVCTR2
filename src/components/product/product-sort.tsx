"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export interface SortOption {
  label: string
  value: string
}

interface ProductSortProps {
  options: SortOption[]
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  className?: string
}

export function ProductSort({
  options,
  defaultValue,
  value,
  onValueChange,
  className,
}: ProductSortProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState(value || defaultValue || options[0]?.value)
  
  // Find the selected option label
  const selectedLabel = React.useMemo(() => {
    return options.find((option) => option.value === selectedValue)?.label || "Sort by"
  }, [options, selectedValue])
  
  // Handle value change
  const handleSelect = React.useCallback(
    (value: string) => {
      setSelectedValue(value)
      setOpen(false)
      
      if (onValueChange) {
        onValueChange(value)
      }
    },
    [onValueChange]
  )
  
  // Update internal state when value prop changes
  React.useEffect(() => {
    if (value !== undefined && value !== selectedValue) {
      setSelectedValue(value)
    }
  }, [value, selectedValue])
  
  return (
    <div className={cn("flex items-center", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between md:w-[200px]"
          >
            <span className="line-clamp-1 text-sm">{selectedLabel}</span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 md:w-[200px]">
          <Command>
            <CommandInput placeholder="Search sort options..." />
            <CommandEmpty>No sort option found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={handleSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedValue === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
} 