"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'

export default function OrderConfirmationPage() {
  const router = useRouter()
  
  // Generate a random order number
  const orderNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
  
  // Get current date and add 5 days for estimated delivery
  const orderDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  
  const deliveryDate = new Date()
  deliveryDate.setDate(deliveryDate.getDate() + 5)
  const estimatedDelivery = deliveryDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  
  // Redirect to home if accessed directly without checkout
  useEffect(() => {
    // Check if we have order data in session storage
    // This is a placeholder - in a real app, you would check if the user has completed checkout
    const hasCompletedCheckout = true
    
    if (!hasCompletedCheckout) {
      router.push('/')
    }
  }, [router])
  
  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
          <CardDescription>
            Thank you for your purchase. Your order has been received.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Order Number</p>
              <p className="font-medium">{orderNumber}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Order Date</p>
              <p className="font-medium">{orderDate}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Payment Method</p>
              <p className="font-medium">Credit Card</p>
            </div>
            <div>
              <p className="text-muted-foreground">Estimated Delivery</p>
              <p className="font-medium">{estimatedDelivery}</p>
            </div>
          </div>
          
          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-medium mb-2">What happens next?</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
              <li>We'll send you a confirmation email with your order details.</li>
              <li>Our team will process your order and prepare it for shipping.</li>
              <li>You'll receive a shipping notification with tracking information.</li>
              <li>Your package will be delivered to your address.</li>
            </ol>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <Link href="/account">View Order History</Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 