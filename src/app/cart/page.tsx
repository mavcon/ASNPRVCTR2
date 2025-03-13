"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"

// Mock cart items for demonstration
const mockCartItems = [
  {
    id: 1,
    name: "Premium Art Canvas",
    price: 59.99,
    quantity: 2,
    image: "https://placehold.co/100x100?text=Canvas",
    maxQuantity: 10,
  },
  {
    id: 2,
    name: "Professional Acrylic Paint Set",
    price: 89.99,
    quantity: 1,
    image: "https://placehold.co/100x100?text=Paint+Set",
    maxQuantity: 5,
  },
  {
    id: 3,
    name: "Artist Brushes Collection",
    price: 29.99,
    quantity: 3,
    image: "https://placehold.co/100x100?text=Brushes",
    maxQuantity: 8,
  },
]

export default function CartPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = React.useState(mockCartItems)
  const [isUpdating, setIsUpdating] = React.useState(false)
  
  // Calculate cart totals
  const subtotal = React.useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }, [cartItems])
  
  const shipping = 9.99
  const tax = subtotal * 0.08 // 8% tax rate
  const total = subtotal + shipping + tax
  
  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    
    const item = cartItems.find((item) => item.id === id)
    if (!item || newQuantity > item.maxQuantity) return
    
    setIsUpdating(true)
    
    // Simulate API call to update cart
    setTimeout(() => {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      )
      setIsUpdating(false)
      
      toast({
        title: "Cart updated",
        description: "Your cart has been updated successfully.",
      })
    }, 500)
  }
  
  const handleRemoveItem = (id: number) => {
    setIsUpdating(true)
    
    // Simulate API call to remove item from cart
    setTimeout(() => {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
      setIsUpdating(false)
      
      toast({
        title: "Item removed",
        description: "The item has been removed from your cart.",
      })
    }, 500)
  }
  
  const handleClearCart = () => {
    setIsUpdating(true)
    
    // Simulate API call to clear cart
    setTimeout(() => {
      setCartItems([])
      setIsUpdating(false)
      
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart.",
      })
    }, 500)
  }
  
  const handleCheckout = () => {
    router.push("/checkout")
  }
  
  if (cartItems.length === 0) {
    return (
      <div className="container px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground" />
          <h1 className="mt-4 text-3xl font-bold">Your cart is empty</h1>
          <p className="mt-2 text-muted-foreground">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button className="mt-8" asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">Your Cart</h1>
      
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-lg border bg-card">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">
                  Items ({cartItems.reduce((count, item) => count + item.quantity, 0)})
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm text-muted-foreground"
                  onClick={handleClearCart}
                  disabled={isUpdating}
                >
                  Clear Cart
                </Button>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <h3 className="text-base font-medium">{item.name}</h3>
                        <p className="text-base font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        ${item.price.toFixed(2)} each
                      </p>
                      
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1 || isUpdating}
                          >
                            <Minus className="h-3 w-3" />
                            <span className="sr-only">Decrease quantity</span>
                          </Button>
                          
                          <span className="w-8 text-center">{item.quantity}</span>
                          
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.maxQuantity || isUpdating}
                          >
                            <Plus className="h-3 w-3" />
                            <span className="sr-only">Increase quantity</span>
                          </Button>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-sm text-muted-foreground"
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={isUpdating}
                        >
                          <Trash2 className="mr-1 h-4 w-4" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
        
        <div>
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-medium">Order Summary</h2>
            
            <Separator className="my-4" />
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <Button
              className="mt-6 w-full"
              size="lg"
              onClick={handleCheckout}
              disabled={isUpdating}
            >
              Proceed to Checkout
            </Button>
            
            <div className="mt-4 text-center text-xs text-muted-foreground">
              <p>Taxes and shipping calculated at checkout</p>
              <p className="mt-1">
                By proceeding to checkout, you agree to our{" "}
                <Link href="/terms" className="underline underline-offset-2">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline underline-offset-2">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 