"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CheckoutForm } from "@/components/checkout/checkout-form"

// Mock cart items for demonstration
const mockCartItems = [
  {
    id: 1,
    name: "Product 1",
    price: 29.99,
    quantity: 2,
    image: "https://placehold.co/100x100?text=Product+1",
  },
  {
    id: 2,
    name: "Product 2",
    price: 49.99,
    quantity: 1,
    image: "https://placehold.co/100x100?text=Product+2",
  },
  {
    id: 3,
    name: "Product 3",
    price: 19.99,
    quantity: 3,
    image: "https://placehold.co/100x100?text=Product+3",
  },
]

export default function CheckoutPage() {
  // Calculate cart totals
  const subtotal = mockCartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )
  const shipping = 9.99
  const tax = subtotal * 0.08 // 8% tax rate
  const total = subtotal + shipping + tax
  
  return (
    <div className="container px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          href="/cart"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Cart
        </Link>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Checkout</h1>
      </div>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <CheckoutForm />
        </div>
        
        {/* Order Summary */}
        <div>
          <div className="rounded-lg border bg-card p-6">
            <h2 className="flex items-center text-lg font-medium">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Order Summary
            </h2>
            
            <Separator className="my-4" />
            
            <div className="space-y-4">
              {/* Cart Items */}
              <div className="space-y-3">
                {mockCartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="relative h-16 w-16 overflow-hidden rounded-md">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              
              <Separator />
              
              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <p>Subtotal</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p>Shipping</p>
                  <p>${shipping.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p>Tax</p>
                  <p>${tax.toFixed(2)}</p>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <p>Total</p>
                  <p>${total.toFixed(2)}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <Button className="w-full" size="lg">
                Complete Order
              </Button>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                By placing your order, you agree to our{" "}
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