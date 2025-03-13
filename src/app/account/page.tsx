"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  CreditCard, 
  LogOut, 
  Package, 
  Settings, 
  User, 
  Heart, 
  MapPin,
  Bell
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"

// Mock user data
const mockUser = {
  id: "user_123",
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  avatar: "https://placehold.co/400x400?text=AJ",
  joined: "January 2023",
}

// Mock order history
const mockOrders = [
  {
    id: "ORD-12345",
    date: "2023-11-15",
    status: "Delivered",
    total: 189.97,
    items: [
      { id: 1, name: "Premium Art Canvas", quantity: 2, price: 59.99 },
      { id: 2, name: "Professional Acrylic Paint Set", quantity: 1, price: 69.99 },
    ],
  },
  {
    id: "ORD-12346",
    date: "2023-10-28",
    status: "Delivered",
    total: 129.99,
    items: [
      { id: 3, name: "Artist Brushes Collection", quantity: 1, price: 29.99 },
      { id: 4, name: "Premium Easel", quantity: 1, price: 100.00 },
    ],
  },
  {
    id: "ORD-12347",
    date: "2023-12-05",
    status: "Processing",
    total: 249.99,
    items: [
      { id: 5, name: "Abstract Harmony", quantity: 1, price: 249.99 },
    ],
  },
]

// Mock addresses
const mockAddresses = [
  {
    id: "addr_1",
    type: "Home",
    default: true,
    street: "123 Art Avenue",
    city: "Creativeville",
    state: "CA",
    zip: "90210",
    country: "United States",
  },
  {
    id: "addr_2",
    type: "Work",
    default: false,
    street: "456 Studio Street",
    city: "Designopolis",
    state: "NY",
    zip: "10001",
    country: "United States",
  },
]

// Mock payment methods
const mockPaymentMethods = [
  {
    id: "pm_1",
    type: "Credit Card",
    default: true,
    last4: "4242",
    brand: "Visa",
    expiry: "05/25",
  },
  {
    id: "pm_2",
    type: "Credit Card",
    default: false,
    last4: "1234",
    brand: "Mastercard",
    expiry: "08/24",
  },
]

export default function AccountPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = React.useState("profile")
  const [isUpdating, setIsUpdating] = React.useState(false)
  const [user, setUser] = React.useState(mockUser)
  const [formData, setFormData] = React.useState({
    name: mockUser.name,
    email: mockUser.email,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)
    
    // Simulate API call to update profile
    setTimeout(() => {
      setUser((prev) => ({
        ...prev,
        name: formData.name,
        email: formData.email,
      }))
      setIsUpdating(false)
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    }, 1000)
  }
  
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirm password must match.",
        variant: "destructive",
      })
      return
    }
    
    if (formData.newPassword.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      })
      return
    }
    
    setIsUpdating(true)
    
    // Simulate API call to change password
    setTimeout(() => {
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }))
      setIsUpdating(false)
      
      toast({
        title: "Password changed",
        description: "Your password has been changed successfully.",
      })
    }, 1000)
  }
  
  const handleLogout = () => {
    // Simulate logout
    setTimeout(() => {
      router.push("/")
      
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      })
    }, 500)
  }
  
  return (
    <div className="container px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/4">
          <div className="sticky top-4 space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-sm text-muted-foreground">Member since {user.joined}</p>
              </div>
            </div>
            
            <Separator />
            
            <nav className="flex flex-col space-y-1">
              <Button
                variant={activeTab === "profile" ? "secondary" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("profile")}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
              <Button
                variant={activeTab === "orders" ? "secondary" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("orders")}
              >
                <Package className="mr-2 h-4 w-4" />
                Orders
              </Button>
              <Button
                variant={activeTab === "addresses" ? "secondary" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("addresses")}
              >
                <MapPin className="mr-2 h-4 w-4" />
                Addresses
              </Button>
              <Button
                variant={activeTab === "payment" ? "secondary" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("payment")}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Payment Methods
              </Button>
              <Button
                variant={activeTab === "wishlist" ? "secondary" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("wishlist")}
              >
                <Heart className="mr-2 h-4 w-4" />
                Wishlist
              </Button>
              <Button
                variant={activeTab === "settings" ? "secondary" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
              <Separator />
              <Button
                variant="ghost"
                className="justify-start text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </nav>
          </div>
        </aside>
        
        <div className="flex-1 lg:max-w-3xl">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">Profile</h1>
                <p className="text-muted-foreground">
                  Manage your personal information and account settings
                </p>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" disabled={isUpdating}>
                      {isUpdating ? "Updating..." : "Update Profile"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>
                    Update your password to keep your account secure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" disabled={isUpdating}>
                      {isUpdating ? "Updating..." : "Change Password"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}
          
          {activeTab === "orders" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">Order History</h1>
                <p className="text-muted-foreground">
                  View and track your orders
                </p>
              </div>
              
              {mockOrders.length > 0 ? (
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <Card key={order.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">Order #{order.id}</CardTitle>
                          <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                            order.status === "Delivered" 
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" 
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <CardDescription>
                          Placed on {new Date(order.date).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex justify-between">
                              <div>
                                <span className="font-medium">{item.name}</span>
                                <span className="ml-2 text-muted-foreground">x{item.quantity}</span>
                              </div>
                              <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                          <Separator />
                          <div className="flex justify-between font-medium">
                            <span>Total</span>
                            <span>${order.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          View Order Details
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <Package className="h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No orders yet</h3>
                    <p className="mt-2 text-center text-muted-foreground">
                      You haven't placed any orders yet. Start shopping to see your orders here.
                    </p>
                    <Button className="mt-6" asChild>
                      <Link href="/products">Browse Products</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
          
          {activeTab === "addresses" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">Addresses</h1>
                <p className="text-muted-foreground">
                  Manage your shipping and billing addresses
                </p>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                {mockAddresses.map((address) => (
                  <Card key={address.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{address.type}</CardTitle>
                        {address.default && (
                          <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                            Default
                          </span>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm">
                        <p>{address.street}</p>
                        <p>{address.city}, {address.state} {address.zip}</p>
                        <p>{address.country}</p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      {!address.default && (
                        <Button variant="ghost" size="sm">
                          Set as Default
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
                
                <Card className="flex flex-col items-center justify-center p-6">
                  <div className="rounded-full border-2 border-dashed p-4">
                    <Plus className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 font-medium">Add New Address</h3>
                  <p className="mt-1 text-center text-sm text-muted-foreground">
                    Add a new shipping or billing address
                  </p>
                  <Button className="mt-4" variant="outline">
                    Add Address
                  </Button>
                </Card>
              </div>
            </div>
          )}
          
          {activeTab === "payment" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">Payment Methods</h1>
                <p className="text-muted-foreground">
                  Manage your payment methods
                </p>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                {mockPaymentMethods.map((payment) => (
                  <Card key={payment.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">
                          {payment.brand} •••• {payment.last4}
                        </CardTitle>
                        {payment.default && (
                          <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                            Default
                          </span>
                        )}
                      </div>
                      <CardDescription>
                        Expires {payment.expiry}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      {!payment.default && (
                        <Button variant="ghost" size="sm">
                          Set as Default
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
                
                <Card className="flex flex-col items-center justify-center p-6">
                  <div className="rounded-full border-2 border-dashed p-4">
                    <Plus className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 font-medium">Add Payment Method</h3>
                  <p className="mt-1 text-center text-sm text-muted-foreground">
                    Add a new credit card or payment method
                  </p>
                  <Button className="mt-4" variant="outline">
                    Add Payment Method
                  </Button>
                </Card>
              </div>
            </div>
          )}
          
          {activeTab === "wishlist" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">Wishlist</h1>
                <p className="text-muted-foreground">
                  Products you've saved for later
                </p>
              </div>
              
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <Heart className="h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Your wishlist is empty</h3>
                  <p className="mt-2 text-center text-muted-foreground">
                    Save items you love to your wishlist and they'll appear here.
                  </p>
                  <Button className="mt-6" asChild>
                    <Link href="/products">Browse Products</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
          
          {activeTab === "settings" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-muted-foreground">
                  Manage your account settings and preferences
                </p>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>
                    Manage how you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive order updates and promotional emails
                      </p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketing-emails">Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive emails about new products and special offers
                      </p>
                    </div>
                    <Switch id="marketing-emails" defaultChecked />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Account Preferences</CardTitle>
                  <CardDescription>
                    Manage your account settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="currency">Currency</Label>
                      <p className="text-sm text-muted-foreground">
                        Choose your preferred currency
                      </p>
                    </div>
                    <select
                      id="currency"
                      className="rounded-md border border-input bg-background px-3 py-2"
                      defaultValue="USD"
                      aria-label="Currency selection"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="CAD">CAD ($)</option>
                    </select>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="language">Language</Label>
                      <p className="text-sm text-muted-foreground">
                        Choose your preferred language
                      </p>
                    </div>
                    <select
                      id="language"
                      className="rounded-md border border-input bg-background px-3 py-2"
                      defaultValue="en"
                      aria-label="Language selection"
                    >
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                    </select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Delete Account</CardTitle>
                  <CardDescription>
                    Permanently delete your account and all your data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    This action cannot be undone. Once you delete your account, all your data will be permanently removed.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="destructive">Delete Account</Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 