import * as React from "react"
import Link from "next/link"
import { ArrowRight, ShoppingBag, Truck, Shield, Clock, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Mock featured products
const featuredProducts = [
  {
    id: 1,
    name: "Abstract Harmony",
    artist: "Mei Lin",
    price: 299.99,
    image: "https://placehold.co/600x400?text=Abstract+Harmony",
    rating: 4.8,
    reviewCount: 24,
  },
  {
    id: 2,
    name: "Modern Sculpture",
    artist: "Elena Rodriguez",
    price: 499.99,
    image: "https://placehold.co/600x400?text=Modern+Sculpture",
    rating: 4.9,
    reviewCount: 18,
  },
  {
    id: 3,
    name: "Vibrant Landscape",
    artist: "James Wilson",
    price: 249.99,
    image: "https://placehold.co/600x400?text=Vibrant+Landscape",
    rating: 4.7,
    reviewCount: 32,
  },
  {
    id: 4,
    name: "Serene Waters",
    artist: "Akira Tanaka",
    price: 349.99,
    image: "https://placehold.co/600x400?text=Serene+Waters",
    rating: 4.6,
    reviewCount: 15,
  },
]

// Mock categories
const categories = [
  {
    id: 1,
    name: "Paintings",
    image: "https://placehold.co/400x300?text=Paintings",
    count: 120,
  },
  {
    id: 2,
    name: "Sculptures",
    image: "https://placehold.co/400x300?text=Sculptures",
    count: 85,
  },
  {
    id: 3,
    name: "Photography",
    image: "https://placehold.co/400x300?text=Photography",
    count: 150,
  },
  {
    id: 4,
    name: "Digital Art",
    image: "https://placehold.co/400x300?text=Digital+Art",
    count: 95,
  },
]

// Mock testimonials
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Art Collector",
    content: "I've been collecting art for years, and this platform offers the best selection and quality I've seen. The customer service is exceptional!",
    avatar: "https://placehold.co/100x100?text=SJ",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Interior Designer",
    content: "As an interior designer, I rely on finding unique pieces for my clients. This site has become my go-to resource for discovering new artists and styles.",
    avatar: "https://placehold.co/100x100?text=MC",
  },
  {
    id: 3,
    name: "Emma Williams",
    role: "Art Enthusiast",
    content: "The variety of art available is impressive. I've purchased several pieces and each one has exceeded my expectations in quality and presentation.",
    avatar: "https://placehold.co/100x100?text=EW",
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 dark:from-primary/10 dark:to-secondary/10">
          <div className="container px-4 py-24 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Discover Unique Art for Your Space
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Explore our curated collection of original artwork from talented artists around the world.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/products">
                      Shop Collection
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/about">
                      About Us
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="absolute -left-8 -top-8 h-72 w-72 rounded-full bg-primary/30 blur-3xl"></div>
                <img
                  alt="Featured Artwork"
                  className="relative z-10 mx-auto aspect-[4/3] overflow-hidden rounded-xl object-cover"
                  height={400}
                  src="https://placehold.co/800x600?text=Featured+Artwork"
                  width={600}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-none shadow-none">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-medium">Free Shipping</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Free shipping on all orders over $100
              </p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-none">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-medium">Secure Payment</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                100% secure payment processing
              </p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-none">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-medium">Fast Delivery</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Quick delivery within 3-5 business days
              </p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-none">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-medium">Easy Returns</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                30-day money-back guarantee
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Artwork</h2>
            <p className="text-muted-foreground">
              Discover our handpicked selection of exceptional pieces
            </p>
          </div>
          <Button variant="ghost" className="gap-1" asChild>
            <Link href="/products">
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group relative overflow-hidden rounded-lg border bg-background transition-colors hover:border-primary"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-muted-foreground">by {product.artist}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-medium">${product.price.toFixed(2)}</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="text-sm">{product.rating}</span>
                    <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-muted/50">
        <div className="container px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tight">Browse by Category</h2>
            <p className="mt-2 text-muted-foreground">
              Explore our diverse collection of art categories
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="group relative overflow-hidden rounded-lg"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-medium">{category.name}</h3>
                    <p className="text-sm">{category.count} items</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="container px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-lg bg-primary">
          <div className="absolute inset-0 bg-[url('https://placehold.co/1200x400?text=Banner')] bg-cover bg-center opacity-20" />
          <div className="relative grid gap-4 p-6 sm:p-10 md:grid-cols-2 md:gap-8 lg:p-16">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Special Collection
                </h2>
                <p className="max-w-[600px] text-white/90 md:text-xl">
                  Discover our limited edition artworks from renowned artists around the world.
                </p>
              </div>
              <div>
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/products?collection=special">
                    Explore Collection
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-muted/50">
        <div className="container px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tight">What Our Customers Say</h2>
            <p className="mt-2 text-muted-foreground">
              Read testimonials from our satisfied customers
            </p>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="h-full">
                <CardContent className="flex h-full flex-col justify-between p-6">
                  <div>
                    <p className="text-lg">&ldquo;{testimonial.content}&rdquo;</p>
                  </div>
                  <div className="mt-6 flex items-center gap-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-muted p-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">Stay Updated</h2>
            <p className="mt-2 text-muted-foreground">
              Subscribe to our newsletter for the latest art releases and exclusive offers
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="rounded-md border bg-background px-4 py-2 sm:min-w-[300px]"
                aria-label="Email for newsletter"
              />
              <Button>Subscribe</Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              By subscribing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
} 