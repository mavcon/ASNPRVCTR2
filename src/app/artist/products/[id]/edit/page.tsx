"use client"

import * as React from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

import { ProductForm } from "@/components/artist/product-form"

// Mock function to get product data
const getProductData = (id: string) => {
  // In a real app, this would fetch data from an API
  // For now, we'll return mock data
  const productId = parseInt(id)
  
  if (isNaN(productId) || productId < 1 || productId > 20) {
    return null
  }
  
  return {
    id: productId,
    name: `Product ${productId}`,
    description: `This is a detailed description for product ${productId}. It would contain information about the product's features, materials, and other relevant details.`,
    price: 19.99 + productId * 10,
    category: productId % 4 === 0 ? "paintings" : productId % 4 === 1 ? "sculptures" : productId % 4 === 2 ? "photography" : "digital-art",
    stock: Math.floor(Math.random() * 50),
    sku: `SKU-${productId.toString().padStart(4, '0')}`,
    weight: Math.floor(Math.random() * 10) + 0.5,
    dimensions: `${Math.floor(Math.random() * 50) + 10} x ${Math.floor(Math.random() * 50) + 10} x ${Math.floor(Math.random() * 20) + 2} cm`,
    materials: productId % 4 === 0 ? "Canvas, Acrylic, Wood" : productId % 4 === 1 ? "Marble, Bronze" : productId % 4 === 2 ? "Photo Paper, Frame" : "Digital File",
    status: productId % 5 === 0 ? "Draft" : productId % 7 === 0 ? "Archived" : "Published",
    images: [
      `https://placehold.co/600x600?text=Product+${productId}+Image+1`,
      `https://placehold.co/600x600?text=Product+${productId}+Image+2`,
    ]
  }
}

export default function EditProductPage({ params }: { params: { id: string } }) {
  const productData = getProductData(params.id)
  
  if (!productData) {
    notFound()
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link
          href="/artist/products"
          className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>
      </div>
      
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
        <p className="text-muted-foreground">
          Update the details for {productData.name}
        </p>
      </div>

      <ProductForm initialData={productData} isEditing={true} />
    </div>
  )
} 