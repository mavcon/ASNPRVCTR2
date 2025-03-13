"use client"

import * as React from "react"
import { 
  BarChart as BarChartIcon, 
  LineChart as LineChartIcon, 
  PieChart as PieChartIcon,
  Calendar,
  Download
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock data for charts
const mockRevenueData = [
  { month: "Jan", revenue: 4200 },
  { month: "Feb", revenue: 3800 },
  { month: "Mar", revenue: 5100 },
  { month: "Apr", revenue: 4800 },
  { month: "May", revenue: 5600 },
  { month: "Jun", revenue: 6200 },
  { month: "Jul", revenue: 5900 },
  { month: "Aug", revenue: 6800 },
  { month: "Sep", revenue: 7400 },
  { month: "Oct", revenue: 7900 },
  { month: "Nov", revenue: 8600 },
  { month: "Dec", revenue: 9200 },
]

const mockCategoryData = [
  { category: "Paintings", sales: 42, percentage: 35 },
  { category: "Sculptures", sales: 28, percentage: 23 },
  { category: "Photography", sales: 19, percentage: 16 },
  { category: "Digital Art", sales: 15, percentage: 13 },
  { category: "Prints", sales: 10, percentage: 8 },
  { category: "Mixed Media", sales: 6, percentage: 5 },
]

const mockCustomerData = [
  { country: "United States", customers: 145, percentage: 42 },
  { country: "Canada", customers: 78, percentage: 23 },
  { country: "United Kingdom", customers: 56, percentage: 16 },
  { country: "Australia", customers: 34, percentage: 10 },
  { country: "Germany", customers: 18, percentage: 5 },
  { country: "Other", customers: 14, percentage: 4 },
]

export default function ArtistAnalyticsPage() {
  const [timeRange, setTimeRange] = React.useState("year")
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Track your store performance and customer insights
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last 7 days</SelectItem>
              <SelectItem value="month">Last 30 days</SelectItem>
              <SelectItem value="quarter">Last 3 months</SelectItem>
              <SelectItem value="year">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
            <span className="sr-only">Select date range</span>
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$68,500.00</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last {timeRange}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +12.4% from last {timeRange}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+345</div>
            <p className="text-xs text-muted-foreground">
              +8.2% from last {timeRange}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-muted-foreground">
              +1.1% from last {timeRange}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Revenue Over Time</CardTitle>
                <CardDescription>
                  Monthly revenue for the past year
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="h-full w-full">
                  {/* In a real app, this would be a chart component */}
                  <div className="flex h-full items-end gap-2 rounded-md border p-4">
                    {mockRevenueData.map((item, index) => (
                      <div key={index} className="flex flex-1 flex-col items-center">
                        <div 
                          className="w-full bg-primary" 
                          style={{ 
                            height: `${(item.revenue / 10000) * 100}%`,
                            minHeight: '4px',
                            maxHeight: '100%'
                          }}
                        />
                        <span className="mt-2 text-xs">{item.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <div className="text-sm text-muted-foreground">
                  Total Revenue: <span className="font-medium">$68,500.00</span>
                </div>
                <Button variant="ghost" size="sm">
                  View detailed report
                </Button>
              </CardFooter>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
                <CardDescription>
                  Distribution of sales across product categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCategoryData.map((category, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-16 text-sm">{category.category}</div>
                      <div className="flex-1">
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div
                            className="h-2 rounded-full bg-primary"
                            style={{ width: `${category.percentage}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-12 text-right text-sm">{category.percentage}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="w-full">
                  View all categories
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Performance</CardTitle>
              <CardDescription>
                Detailed breakdown of sales performance over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <LineChartIcon className="mx-auto h-16 w-16 text-muted-foreground" />
                  <p className="mt-2 text-muted-foreground">
                    Sales performance chart will be displayed here
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Coming soon
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Demographics</CardTitle>
              <CardDescription>
                Geographic distribution of your customers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  {mockCustomerData.map((country, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-36 text-sm">{country.country}</div>
                      <div className="flex-1">
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div
                            className="h-2 rounded-full bg-primary"
                            style={{ width: `${country.percentage}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-12 text-right text-sm">{country.percentage}%</div>
                      <div className="w-16 text-right text-sm">{country.customers}</div>
                    </div>
                  ))}
                </div>
                <div className="rounded-md border p-4">
                  <div className="flex h-[200px] items-center justify-center">
                    <div className="text-center">
                      <PieChartIcon className="mx-auto h-16 w-16 text-muted-foreground" />
                      <p className="mt-2 text-muted-foreground">
                        World map visualization coming soon
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
              <CardDescription>
                Analysis of your best and worst performing products
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <BarChartIcon className="mx-auto h-16 w-16 text-muted-foreground" />
                  <p className="mt-2 text-muted-foreground">
                    Product performance chart will be displayed here
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Coming soon
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 