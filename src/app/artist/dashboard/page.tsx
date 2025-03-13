"use client"

import * as React from "react"
import { 
  Package, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  ShoppingBag,
  Star
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Mock data for assigned products
const assignedProducts = [
  {
    id: 1,
    name: "Premium Art Canvas",
    price: 59.99,
    sales: 245,
    rating: 4.8,
    image: "https://placehold.co/100x100?text=Canvas",
  },
  {
    id: 2,
    name: "Professional Acrylic Paint Set",
    price: 89.99,
    sales: 189,
    rating: 4.7,
    image: "https://placehold.co/100x100?text=Paint+Set",
  },
  {
    id: 3,
    name: "Artist Brushes Collection",
    price: 29.99,
    sales: 312,
    rating: 4.9,
    image: "https://placehold.co/100x100?text=Brushes",
  },
]

// Mock data for recent orders
const recentOrders = [
  {
    id: "ORD-001",
    date: "2023-06-15",
    status: "Delivered",
    total: 129.99,
    items: 2,
    customer: "John Smith"
  },
  {
    id: "ORD-002",
    date: "2023-05-22",
    status: "Shipped",
    total: 79.95,
    items: 1,
    customer: "Emily Johnson"
  },
  {
    id: "ORD-003",
    date: "2023-04-10",
    status: "Processing",
    total: 249.50,
    items: 3,
    customer: "Michael Brown"
  }
]

export default function ArtistDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Artist Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your sales performance.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,546.89</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3" />
                +18.2%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">746</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3" />
                +24
              </span>
              from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="text-red-500 flex items-center">
                <ArrowDownRight className="h-3 w-3" />
                -2
              </span>
              from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3" />
                +0.2
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="products" className="space-y-4">
        <TabsList>
          <TabsTrigger value="products">My Products</TabsTrigger>
          <TabsTrigger value="orders">Recent Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Products Assigned to You</CardTitle>
              <CardDescription>
                These are the products you're credited for as an artist
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignedProducts.map((product) => (
                  <div key={product.id} className="flex items-center gap-4">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{product.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>${product.price.toFixed(2)}</span>
                        <span>•</span>
                        <span className="flex items-center">
                          <Star className="mr-1 h-3 w-3 fill-current text-yellow-500" />
                          {product.rating}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{product.sales} sales</div>
                      <div className="text-sm text-muted-foreground">
                        ${(product.sales * product.price).toFixed(2)} revenue
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" className="w-full sm:w-auto">
                  View All Products
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>
                Orders for your products in the last 30 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>{order.customer.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{order.id}</div>
                        <div className="text-sm text-muted-foreground">{order.customer}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-medium">${order.total.toFixed(2)}</div>
                        <div className="text-sm text-muted-foreground">{order.items} items</div>
                      </div>
                      <Badge 
                        className={
                          order.status === "Delivered" 
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" className="w-full sm:w-auto">
                  View All Orders
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 