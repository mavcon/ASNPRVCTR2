"use client"

import * as React from "react"
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  MoreHorizontal, 
  Eye, 
  Package, 
  Truck, 
  CheckCircle,
  XCircle,
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"

// Mock order data for demonstration
const mockOrders = Array.from({ length: 20 }).map((_, i) => ({
  id: `ORD-${(i + 1).toString().padStart(4, '0')}`,
  customer: `Customer ${i + 1}`,
  email: `customer${i + 1}@example.com`,
  date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0],
  status: i % 5 === 0 ? "Pending" : i % 5 === 1 ? "Processing" : i % 5 === 2 ? "Shipped" : i % 5 === 3 ? "Delivered" : "Cancelled",
  total: (Math.floor(Math.random() * 500) + 50) + 0.99,
  items: Math.floor(Math.random() * 5) + 1,
  paymentStatus: i % 7 === 0 ? "Pending" : "Paid",
}))

export default function ArtistOrdersPage() {
  const [orders, setOrders] = React.useState(mockOrders)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedStatus, setSelectedStatus] = React.useState<string>("all")
  const [selectedPaymentStatus, setSelectedPaymentStatus] = React.useState<string>("all")
  const [isUpdateStatusDialogOpen, setIsUpdateStatusDialogOpen] = React.useState(false)
  const [selectedOrder, setSelectedOrder] = React.useState<string | null>(null)
  const [newStatus, setNewStatus] = React.useState<string>("")

  // Filter orders based on search query, status, and payment status
  const filteredOrders = React.useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch = 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = selectedStatus === "all" || order.status === selectedStatus
      const matchesPaymentStatus = selectedPaymentStatus === "all" || order.paymentStatus === selectedPaymentStatus
      return matchesSearch && matchesStatus && matchesPaymentStatus
    })
  }, [orders, searchQuery, selectedStatus, selectedPaymentStatus])

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Handle status filter change
  const handleStatusChange = (value: string) => {
    setSelectedStatus(value)
  }

  // Handle payment status filter change
  const handlePaymentStatusChange = (value: string) => {
    setSelectedPaymentStatus(value)
  }

  // Handle update order status
  const handleUpdateStatus = (orderId: string, status: string) => {
    setSelectedOrder(orderId)
    setNewStatus(status)
    setIsUpdateStatusDialogOpen(true)
  }

  // Confirm update order status
  const confirmUpdateStatus = () => {
    if (selectedOrder && newStatus) {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === selectedOrder
            ? { ...order, status: newStatus }
            : order
        )
      )
      toast({
        title: "Order status updated",
        description: `Order ${selectedOrder} has been updated to ${newStatus}.`,
      })
    }
    setIsUpdateStatusDialogOpen(false)
    setSelectedOrder(null)
    setNewStatus("")
  }

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Shipped":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "Delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  // Get payment status badge color
  const getPaymentStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">
          Manage and fulfill customer orders
        </p>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search orders..."
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
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Shipped">Shipped</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedPaymentStatus} onValueChange={handlePaymentStatusChange}>
            <SelectTrigger className="h-9 w-full md:w-[180px]">
              <SelectValue placeholder="All Payment Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payment Statuses</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
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
                  <span>Order</span>
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Items</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No orders found.
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <div>{order.customer}</div>
                      <div className="text-xs text-muted-foreground">{order.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPaymentStatusBadgeColor(order.paymentStatus)}>
                      {order.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>{order.items}</TableCell>
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
                          <a href={`/artist/orders/${order.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                        {order.status !== "Processing" && (
                          <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "Processing")}>
                            <Package className="mr-2 h-4 w-4" />
                            Mark as Processing
                          </DropdownMenuItem>
                        )}
                        {order.status !== "Shipped" && order.status !== "Delivered" && (
                          <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "Shipped")}>
                            <Truck className="mr-2 h-4 w-4" />
                            Mark as Shipped
                          </DropdownMenuItem>
                        )}
                        {order.status !== "Delivered" && (
                          <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "Delivered")}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Mark as Delivered
                          </DropdownMenuItem>
                        )}
                        {order.status !== "Cancelled" && (
                          <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "Cancelled")}>
                            <XCircle className="mr-2 h-4 w-4" />
                            Cancel Order
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isUpdateStatusDialogOpen} onOpenChange={setIsUpdateStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogDescription>
              Are you sure you want to update the status of order {selectedOrder} to {newStatus}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsUpdateStatusDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmUpdateStatus}
            >
              Update Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 