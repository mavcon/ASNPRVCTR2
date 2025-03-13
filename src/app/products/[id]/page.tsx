"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Heart, Share2, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ProductGallery } from "@/components/product/product-gallery"
import { ProductReviews } from "@/components/product/product-review"
import { Rating } from "@/components/ui/rating"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductGrid } from "@/components/product/product-grid"

// Mock product data for demonstration
const mockProduct = {
  id: "1",
  name: "Premium Art Canvas",
  description: "This premium art canvas is perfect for artists who want to create stunning masterpieces. Made with high-quality materials, this canvas provides a smooth surface for painting with oils, acrylics, or watercolors.",
  price: 59.99,
  originalPrice: 79.99,
  rating: 4.5,
  reviewCount: 127,
  images: [
    "https://placehold.co/600x600?text=Canvas+1",
    "https://placehold.co/600x600?text=Canvas+2",
    "https://placehold.co/600x600?text=Canvas+3",
    "https://placehold.co/600x600?text=Canvas+4",
  ],
  category: "Art Supplies",
  isNew: true,
  isFeatured: true,
  isSale: true,
  isOutOfStock: false,
  artist: "ArtCo",
  sku: "ART-CNV-001",
  dimensions: "24 x 36 inches",
  weight: "1.5 lbs",
  materials: ["Cotton", "Wood", "Gesso"],
  features: [
    "Acid-free canvas",
    "Pre-primed with gesso",
    "Stretched on solid wood frame",
    "Ready to hang or display",
  ],
}

// Mock reviews for demonstration
const mockReviews = [
  {
    id: "1",
    user: {
      name: "Jane Smith",
      avatar: "https://placehold.co/100x100?text=JS",
    },
    rating: 5,
    title: "Excellent quality canvas",
    content: "I've been using this canvas for my oil paintings and it's absolutely fantastic. The texture is perfect and it doesn't warp even with heavy paint application. Highly recommended for both beginners and professionals.",
    date: "2023-08-15",
    helpful: 24,
    verified: true,
  },
  {
    id: "2",
    user: {
      name: "Michael Johnson",
      avatar: "https://placehold.co/100x100?text=MJ",
    },
    rating: 4,
    title: "Great canvas, slightly overpriced",
    content: "The quality of this canvas is excellent, no doubt about that. It takes both oil and acrylic paints very well. My only complaint is that it's a bit expensive compared to similar products, but you do get what you pay for.",
    date: "2023-07-22",
    helpful: 15,
    verified: true,
  },
  {
    id: "3",
    user: {
      name: "Sarah Williams",
      avatar: "https://placehold.co/100x100?text=SW",
    },
    rating: 5,
    title: "Perfect for my art studio",
    content: "I purchased several of these canvases for my art studio and they've been wonderful. The quality is consistent across all the canvases I received. The surface is smooth yet has just enough texture for interesting brushwork.",
    date: "2023-06-30",
    helpful: 10,
    verified: true,
  },
]

// Mock related products
const mockRelatedProducts = Array.from({ length: 4 }).map((_, i) => ({
  id: i + 100,
  name: `Related Product ${i + 1}`,
  description: "This is a related product that complements the main product.",
  price: 29.99 + i * 10,
  originalPrice: i % 2 === 0 ? 39.99 + i * 10 : undefined,
  rating: 3.5 + Math.random() * 1.5,
  reviewCount: Math.floor(Math.random() * 50) + 10,
  image: `https://placehold.co/600x600?text=Related+${i + 1}`,
  category: "Art Supplies",
  isNew: i === 0,
  isFeatured: i === 1,
  isSale: i === 2,
  isOutOfStock: i === 3,
}))

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const [quantity, setQuantity] = React.useState(1)
  const [isWishlisted, setIsWishlisted] = React.useState(false)
  
  // In a real app, you would fetch the product data based on the ID
  // const { id } = params
  // const [product, setProduct] = React.useState(null)
  // React.useEffect(() => {
  //   const fetchProduct = async () => {
  //     const response = await fetch(`/api/products/${id}`)
  //     const data = await response.json()
  //     setProduct(data)
  //   }
  //   fetchProduct()
  // }, [id])
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value))
  }
  
  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} × ${mockProduct.name} has been added to your cart.`,
    })
  }
  
  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted)
    
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${mockProduct.name} has been ${isWishlisted ? "removed from" : "added to"} your wishlist.`,
    })
  }
  
  const handleShare = () => {
    // In a real app, you would implement social sharing functionality
    navigator.clipboard.writeText(window.location.href)
    
    toast({
      title: "Link copied",
      description: "Product link has been copied to your clipboard.",
    })
  }
  
  const discount = mockProduct.originalPrice
    ? Math.round(((mockProduct.originalPrice - mockProduct.price) / mockProduct.originalPrice) * 100)
    : 0
  
  return (
    <div className="container px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </button>
      </div>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Product Gallery */}
        <div>
          <ProductGallery images={mockProduct.images} />
        </div>
        
        {/* Product Info */}
        <div className="flex flex-col space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              {mockProduct.isNew && <Badge>New</Badge>}
              {mockProduct.isSale && <Badge variant="destructive">Sale</Badge>}
              {mockProduct.isFeatured && <Badge variant="secondary">Featured</Badge>}
              <span className="text-sm text-muted-foreground">{mockProduct.category}</span>
            </div>
            
            <h1 className="mt-2 text-3xl font-bold tracking-tight">{mockProduct.name}</h1>
            
            <div className="mt-2 flex items-center space-x-2">
              <Rating value={mockProduct.rating} />
              <span className="text-sm text-muted-foreground">
                ({mockProduct.reviewCount} reviews)
              </span>
            </div>
            
            <div className="mt-4 flex items-baseline space-x-3">
              <span className="text-3xl font-bold">${mockProduct.price.toFixed(2)}</span>
              {mockProduct.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    ${mockProduct.originalPrice.toFixed(2)}
                  </span>
                  <Badge variant="outline" className="text-sm font-normal text-red-500">
                    {discount}% OFF
                  </Badge>
                </>
              )}
            </div>
            
            <p className="mt-4 text-muted-foreground">{mockProduct.description}</p>
          </div>
          
          <Separator />
          
          {/* Product Actions */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div>
                <label htmlFor="quantity" className="text-sm font-medium">
                  Quantity
                </label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="mt-1 block w-20 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  {Array.from({ length: 10 }).map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex-1">
                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleAddToCart}
                  disabled={mockProduct.isOutOfStock}
                >
                  {mockProduct.isOutOfStock ? (
                    "Out of Stock"
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={handleWishlistToggle}
              >
                <Heart
                  className={`mr-2 h-5 w-5 ${
                    isWishlisted ? "fill-red-500 text-red-500" : ""
                  }`}
                />
                {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
              </Button>
              
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Share</span>
              </Button>
            </div>
          </div>
          
          <Separator />
          
          {/* Product Details */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Product Details</h2>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <p className="text-sm font-medium">SKU</p>
                <p className="text-sm text-muted-foreground">{mockProduct.sku}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium">Dimensions</p>
                <p className="text-sm text-muted-foreground">{mockProduct.dimensions}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium">Weight</p>
                <p className="text-sm text-muted-foreground">{mockProduct.weight}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium">Brand/Artist</p>
                <p className="text-sm text-muted-foreground">{mockProduct.artist}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Materials</p>
              <ul className="list-inside list-disc text-sm text-muted-foreground">
                {mockProduct.materials.map((material, index) => (
                  <li key={index}>{material}</li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Features</p>
              <ul className="list-inside list-disc text-sm text-muted-foreground">
                {mockProduct.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Reviews and Related Products */}
      <div className="mt-16">
        <Tabs defaultValue="reviews">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="reviews">Reviews ({mockReviews.length})</TabsTrigger>
            <TabsTrigger value="related">Related Products</TabsTrigger>
          </TabsList>
          
          <TabsContent value="reviews" className="mt-6">
            <ProductReviews reviews={mockReviews} />
          </TabsContent>
          
          <TabsContent value="related" className="mt-6">
            <h2 className="mb-6 text-2xl font-bold">Related Products</h2>
            <ProductGrid
              products={mockRelatedProducts}
              columns={{
                default: 1,
                sm: 2,
                md: 3,
                lg: 4,
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 