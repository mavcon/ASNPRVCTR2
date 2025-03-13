"use client"

import * as React from "react"
import Link from "next/link"
import { 
  Plus, 
  Search, 
  Filter, 
  ArrowUpDown, 
  MoreHorizontal, 
  Pencil, 
  Trash, 
  Eye,
  X
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"

// Mock product data for demonstration
const mockProducts = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  category: i % 4 === 0 ? "Paintings" : i % 4 === 1 ? "Sculptures" : i % 4 === 2 ? "Photography" : "Digital Art",
  price: 19.99 + i * 10,
  stock: Math.floor(Math.random() * 50),
  status: i % 5 === 0 ? "Draft" : i % 7 === 0 ? "Archived" : "Published",
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0],
}))

export default function ArtistProductsPage() {
  const [products, setProducts] = React.useState(mockProducts)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedStatus, setSelectedStatus] = React.useState<string>("all")
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all")
  const [selectedProducts, setSelectedProducts] = React.useState<number[]>([])
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false)
  const [productToDelete, setProductToDelete] = React.useState<number | null>(null)

  // Filter products based on search query, status, and category
  const filteredProducts = React.useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = selectedStatus === "all" || product.status === selectedStatus
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      return matchesSearch && matchesStatus && matchesCategory
    })
  }, [products, searchQuery, selectedStatus, selectedCategory])

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Handle status filter change
  const handleStatusChange = (value: string) => {
    setSelectedStatus(value)
  }

  // Handle category filter change
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
  }

  // Handle checkbox selection
  const handleSelectProduct = (productId: number) => {
    setSelectedProducts((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId)
      } else {
        return [...prev, productId]
      }
    })
  }

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducts.map((product) => product.id))
    }
  }

  // Handle delete product
  const handleDeleteProduct = (productId: number) => {
    setProductToDelete(productId)
    setIsDeleteDialogOpen(true)
  }

  // Confirm delete product
  const confirmDeleteProduct = () => {
    if (productToDelete) {
      setProducts((prev) => prev.filter((product) => product.id !== productToDelete))
      toast({
        title: "Product deleted",
        description: "The product has been deleted successfully.",
      })
    } else if (selectedProducts.length > 0) {
      setProducts((prev) => prev.filter((product) => !selectedProducts.includes(product.id)))
      toast({
        title: "Products deleted",
        description: `${selectedProducts.length} products have been deleted successfully.`,
      })
      setSelectedProducts([])
    }
    setIsDeleteDialogOpen(false)
    setProductToDelete(null)
  }

  // Handle bulk actions
  const handleBulkAction = (action: string) => {
    if (selectedProducts.length === 0) {
      toast({
        title: "No products selected",
        description: "Please select at least one product to perform this action.",
        variant: "destructive",
      })
      return
    }

    if (action === "delete") {
      setIsDeleteDialogOpen(true)
    } else if (action === "publish") {
      setProducts((prev) =>
        prev.map((product) =>
          selectedProducts.includes(product.id)
            ? { ...product, status: "Published" }
            : product
        )
      )
      toast({
        title: "Products published",
        description: `${selectedProducts.length} products have been published.`,
      })
      setSelectedProducts([])
    } else if (action === "archive") {
      setProducts((prev) =>
        prev.map((product) =>
          selectedProducts.includes(product.id)
            ? { ...product, status: "Archived" }
            : product
        )
      )
      toast({
        title: "Products archived",
        description: `${selectedProducts.length} products have been archived.`,
      })
      setSelectedProducts([])
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage your product catalog
          </p>
        </div>
        <Button asChild>
          <Link href="/artist/products/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-9 w-9"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </div>
          <div className="hidden md:flex">
            <Button variant="outline" size="sm" className="ml-auto h-9">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>
        <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="h-9 w-full md:w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Paintings">Paintings</SelectItem>
              <SelectItem value="Sculptures">Sculptures</SelectItem>
              <SelectItem value="Photography">Photography</SelectItem>
              <SelectItem value="Digital Art">Digital Art</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={handleStatusChange}>
            <SelectTrigger className="h-9 w-full md:w-[180px]">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Published">Published</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedProducts.length > 0 && (
        <div className="flex items-center gap-2 rounded-lg border bg-background p-2">
          <div className="text-sm">
            {selectedProducts.length} item{selectedProducts.length > 1 ? "s" : ""} selected
          </div>
          <div className="ml-auto flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleBulkAction("publish")}
            >
              Publish
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleBulkAction("archive")}
            >
              Archive
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleBulkAction("delete")}
            >
              Delete
            </Button>
          </div>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    filteredProducts.length > 0 &&
                    selectedProducts.length === filteredProducts.length
                  }
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all products"
                />
              </TableHead>
              <TableHead>
                <div className="flex items-center space-x-1">
                  <span>Product</span>
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedProducts.includes(product.id)}
                      onCheckedChange={() => handleSelectProduct(product.id)}
                      aria-label={`Select product ${product.name}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div
                        className={`mr-2 h-2 w-2 rounded-full ${
                          product.status === "Published"
                            ? "bg-green-500"
                            : product.status === "Draft"
                            ? "bg-yellow-500"
                            : "bg-gray-500"
                        }`}
                      />
                      {product.status}
                    </div>
                  </TableCell>
                  <TableCell>{product.createdAt}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link href={`/products/${product.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/artist/products/${product.id}/edit`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              {productToDelete
                ? "This action cannot be undone. This will permanently delete the selected product."
                : `This action cannot be undone. This will permanently delete ${selectedProducts.length} selected products.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDeleteProduct}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 