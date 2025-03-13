import { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Categories | 亞 ASNPRVCTR",
  description: "Browse our collection of premium art and design categories.",
}

// Mock category data
const categories = [
  {
    id: "paintings",
    name: "Paintings",
    description: "Discover unique paintings from contemporary artists around the world.",
    productCount: 24,
    featured: true,
    image: "https://placehold.co/600x450/e2e8f0/1e293b?text=Paintings"
  },
  {
    id: "sculptures",
    name: "Sculptures",
    description: "Explore our collection of handcrafted sculptures in various materials.",
    productCount: 18,
    featured: true,
    image: "https://placehold.co/600x450/e2e8f0/1e293b?text=Sculptures"
  },
  {
    id: "photography",
    name: "Photography",
    description: "Fine art photography capturing moments and perspectives.",
    productCount: 32,
    featured: true,
    image: "https://placehold.co/600x450/e2e8f0/1e293b?text=Photography"
  },
  {
    id: "digital-art",
    name: "Digital Art",
    description: "Contemporary digital artworks from innovative creators.",
    productCount: 16,
    featured: true,
    image: "https://placehold.co/600x450/e2e8f0/1e293b?text=Digital+Art"
  },
  {
    id: "prints",
    name: "Prints",
    description: "High-quality prints of original artworks at accessible prices.",
    productCount: 42,
    featured: false,
    image: "https://placehold.co/600x450/e2e8f0/1e293b?text=Prints"
  },
  {
    id: "ceramics",
    name: "Ceramics",
    description: "Handcrafted ceramic pieces for your home and collection.",
    productCount: 15,
    featured: false,
  },
  {
    id: "textiles",
    name: "Textiles",
    description: "Artistic textiles including tapestries, rugs, and woven art.",
    productCount: 12,
    featured: false,
  },
  {
    id: "mixed-media",
    name: "Mixed Media",
    description: "Innovative artworks combining multiple materials and techniques.",
    productCount: 20,
    featured: false,
  },
]

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Categories</h1>
        <p className="text-muted-foreground">Browse our collection by category</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => (
          <Card key={category.id} className="overflow-hidden">
            <div className="relative aspect-[4/3] bg-muted">
              <img 
                src={category.image} 
                alt={category.name}
                className="object-cover w-full h-full"
              />
            </div>
            <CardHeader className="p-4 pb-0">
              <CardTitle>{category.name}</CardTitle>
              <CardDescription>{category.productCount} products</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {category.description}
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full" asChild>
                <Link href={`/categories/${category.id}`}>
                  Browse {category.name}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
} 