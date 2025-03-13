import { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "About Us | 亞 ASNPRVCTR",
  description: "Learn more about 亞 ASNPRVCTR, our mission, and our team.",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-4xl font-bold">About 亞 ASNPRVCTR</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Premium art and design e-commerce platform
        </p>

        <div className="relative mb-12 aspect-video overflow-hidden rounded-lg bg-muted">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-muted-foreground">Company Image</span>
          </div>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="mb-4 text-2xl font-bold">Our Mission</h2>
            <p className="text-muted-foreground">
              At 亞 ASNPRVCTR, our mission is to connect art lovers with exceptional pieces from talented artists around the world. We believe that art should be accessible to everyone, and we strive to create a platform that makes discovering and purchasing unique art pieces a seamless experience.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="mb-4 text-2xl font-bold">Our Story</h2>
            <p className="mb-4 text-muted-foreground">
              Founded in 2023, 亞 ASNPRVCTR began as a small online gallery showcasing works from a select group of contemporary artists. Our founder, a passionate art collector, recognized the need for a platform that could bridge the gap between artists and art enthusiasts.
            </p>
            <p className="mb-4 text-muted-foreground">
              What started as a modest collection has grown into a curated marketplace featuring hundreds of artists and thousands of unique pieces. Our commitment to quality, authenticity, and exceptional customer service has established us as a trusted destination for art collectors and interior designers alike.
            </p>
            <p className="text-muted-foreground">
              Today, we continue to expand our collection while maintaining our core values of artistic integrity, cultural diversity, and sustainable practices.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="mb-6 text-2xl font-bold">Our Team</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {[
                { name: "Mei Lin", role: "Founder & CEO" },
                { name: "David Chen", role: "Creative Director" },
                { name: "Sophia Kim", role: "Head of Curation" },
                { name: "James Wilson", role: "Operations Manager" },
                { name: "Elena Rodriguez", role: "Artist Relations" },
                { name: "Akira Tanaka", role: "Technology Lead" },
              ].map((member, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="mb-4 h-32 w-32 rounded-full bg-muted mx-auto"></div>
                    <h3 className="text-center text-lg font-medium">{member.name}</h3>
                    <p className="text-center text-sm text-muted-foreground">{member.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="mb-4 text-2xl font-bold">Our Values</h2>
            <ul className="list-inside list-disc space-y-2 text-muted-foreground">
              <li><strong>Artistic Integrity:</strong> We respect the vision and rights of our artists.</li>
              <li><strong>Cultural Diversity:</strong> We celebrate art from all cultures and backgrounds.</li>
              <li><strong>Quality:</strong> We curate only the finest pieces for our collection.</li>
              <li><strong>Sustainability:</strong> We are committed to environmentally responsible practices.</li>
              <li><strong>Community:</strong> We foster connections between artists and art lovers.</li>
            </ul>
          </section>

          <div className="mt-8 flex justify-center">
            <Button size="lg" asChild>
              <Link href="/products">Explore Our Collection</Link>
            </Button>
          </div>
        </div>
 