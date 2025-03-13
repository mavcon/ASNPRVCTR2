"use client"

import * as React from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { ProductForm } from "@/components/artist/product-form"

export default function NewProductPage() {
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
        <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
        <p className="text-muted-foreground">
          Create a new product to sell in your store
        </p>
      </div>

      <ProductForm />
    </div>
  )
}