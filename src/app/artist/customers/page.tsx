"use client"

import * as React from "react"
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  MoreHorizontal, 
  Mail, 
  MapPin, 
  Phone,
  Calendar,
  ShoppingBag,
  DollarSign,
  X
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Mock customer data for demonstration
const mockCustomers = Array.from({ length: 20 }).map((_, i) => {
  const id = i + 1
  const firstName = ["John", "Jane", "Michael", "Emily", "David", "Sarah", "Robert", "Lisa"][i % 8]
  const lastName = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Wilson"][i % 8]
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`
  const country = ["United States", "Canada", "United Kingdom", "Australia", "Germany", "France"][i % 6]
  const city = ["New York", "Los Angeles", "Toronto", "London", "Sydney", "Berlin", "Paris"][i % 7]
  const phone = `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`
  const totalSpent = Math.floor(Math.random() * 5000) + 100
  const totalOrders = Math.floor(Math.random() * 20) + 1
  const lastOrderDate = new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0]
  const status = i % 5 === 0 ? "New" : i % 3 === 0 ? "Returning" : "Regular"
  
  return {
    id,
    firstName,
    lastName,
    email,
    country,
    city,
    phone,
    totalSpent,
    totalOrders,
    lastOrderDate,
    status,
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${firstName}%20${lastName}`,
  }
})

export default function ArtistCustomersPage() {
  const [customers, setCustomers] = React.useState(mockCustomers)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedStatus, setSelectedStatus] = React.useState<string>("all")
  const [selectedCountry, setSelectedCountry] = React.useState<string>("all")
  const [isCustomerSheetOpen, setIsCustomerSheetOpen] = React.useState(false)
  const [selectedCustomer, setSelectedCustomer] = React.useState<typeof mockCustomers[0] | null>(null)

  // Filter customers based on search query, status, and country
  const filteredCustomers = React.useMemo(() => {
    return customers.filter((customer) => {
      const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase()
      const matchesSearch = 
        fullName.includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.city.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = selectedStatus === "all" || customer.status === selectedStatus
      const matchesCountry = selectedCountry === "all" || customer.country === selectedCountry
      return matchesSearch && matchesStatus && matchesCountry
    })
  }, [customers, searchQuery, selectedStatus, selectedCountry])

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Handle status filter change
  const handleStatusChange = (value: string) => {
    setSelectedStatus(value)
  }

  // Handle country filter change
  const handleCountryChange = (value: string) => {
    setSelectedCountry(value)
  }

  // Handle view customer details
  const handleViewCustomer = (customer: typeof mockCustomers[0]) => {
    setSelectedCustomer(customer)
    setIsCustomerSheetOpen(true)
  }

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Returning":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Regular":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  // Mock recent orders for customer details
  const mockRecentOrders = [
    {
      id: "ORD-001",
      date: "2023-06-15",
      status: "Delivered",
      total: 129.99
    },
    {
      id: "ORD-002",
      date: "2023-05-22",
      status: "Delivered",
      total: 79.95
    },
    {
      id: "ORD-003",
      date: "2023-04-10",
      status: "Delivered",
      total: 249.50
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        <p className="text-muted-foreground">
          Manage and view your customer information
        </p>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search customers..."
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
          <Select value={selectedStatus} onValueChange={handleStatusChange}>
            <SelectTrigger className="h-9 w-full md:w-[180px]">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="Returning">Returning</SelectItem>
              <SelectItem value="Regular">Regular</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedCountry} onValueChange={handleCountryChange}>
            <SelectTrigger className="h-9 w-full md:w-[180px]">
              <SelectValue placeholder="All Countries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              <SelectItem value="United States">United States</SelectItem>
              <SelectItem value="Canada">Canada</SelectItem>
              <SelectItem value="United Kingdom">United Kingdom</SelectItem>
              <SelectItem value="Australia">Australia</SelectItem>
              <SelectItem value="Germany">Germany</SelectItem>
              <SelectItem value="France">France</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="flex items-center space-x-1">
                  <span>Customer</span>
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Last Order</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No customers found.
                </TableCell>
              </TableRow>
            ) : (
              filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={customer.avatar} alt={`${customer.firstName} ${customer.lastName}`} />
                        <AvatarFallback>{customer.firstName[0]}{customer.lastName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{customer.firstName} {customer.lastName}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.city}, {customer.country}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(customer.status)}>
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>${customer.totalSpent.toLocaleString()}</TableCell>
                  <TableCell>{customer.totalOrders}</TableCell>
                  <TableCell>{customer.lastOrderDate}</TableCell>
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
                        <DropdownMenuItem onClick={() => handleViewCustomer(customer)}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <a href={`mailto:${customer.email}`}>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Email
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          View Orders
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

      {/* Customer Details Sheet */}
      <Sheet open={isCustomerSheetOpen} onOpenChange={setIsCustomerSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Customer Details</SheetTitle>
            <SheetDescription>
              View detailed information about this customer
            </SheetDescription>
          </SheetHeader>
          {selectedCustomer && (
            <div className="mt-6 space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedCustomer.avatar} alt={`${selectedCustomer.firstName} ${selectedCustomer.lastName}`} />
                  <AvatarFallback>{selectedCustomer.firstName[0]}{selectedCustomer.lastName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-medium">{selectedCustomer.firstName} {selectedCustomer.lastName}</h3>
                  <p className="text-sm text-muted-foreground">{selectedCustomer.email}</p>
                  <Badge className={`mt-1 ${getStatusBadgeColor(selectedCustomer.status)}`}>
                    {selectedCustomer.status}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{selectedCustomer.city}, {selectedCustomer.country}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{selectedCustomer.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{selectedCustomer.totalOrders} orders</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">${selectedCustomer.totalSpent.toLocaleString()} spent</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Last order: {selectedCustomer.lastOrderDate}</span>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="mb-4 text-sm font-medium">Recent Orders</h4>
                <div className="space-y-3">
                  {mockRecentOrders.map((order) => (
                    <Card key={order.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{order.id}</p>
                            <p className="text-xs text-muted-foreground">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${order.total.toFixed(2)}</p>
                            <p className="text-xs text-muted-foreground">{order.status}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Button variant="outline" className="mt-4 w-full">
                  View All Orders
                </Button>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" asChild>
                  <a href={`mailto:${selectedCustomer.email}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Email Customer
                  </a>
                </Button>
                <Button variant="outline" className="flex-1">
                  Export Data
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
} 