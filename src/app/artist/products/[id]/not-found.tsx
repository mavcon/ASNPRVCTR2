import Link from "next/link"
import { FileQuestion } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function ProductNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <FileQuestion className="h-24 w-24 text-muted-foreground" />
      <h1 className="mt-6 text-2xl font-bold">Product Not Found</h1>
      <p className="mt-2 text-muted-foreground">
        The product you're looking for doesn't exist or has been removed.
      </p>
      <div className="mt-8 flex gap-4">
        <Button asChild>
          <Link href="/artist/products">
            Back to Products
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/artist/products/new">
            Create New Product
          </Link>
        </Button>
      </div>
    </div>
  )
} 