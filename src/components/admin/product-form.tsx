"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Trash, Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"

// Define the form schema
const productFormSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Product description is required"),
  price: z.coerce.number().min(0.01, "Price must be greater than 0"),
  category: z.string().min(1, "Category is required"),
  stock: z.coerce.number().int().min(0, "Stock must be a positive number"),
  sku: z.string().optional(),
  weight: z.coerce.number().min(0, "Weight must be a positive number").optional(),
  dimensions: z.string().optional(),
  materials: z.string().optional(),
  status: z.enum(["Published", "Draft", "Archived"]),
  artistId: z.string().optional(),
})

// Define the form values type
type ProductFormValues = z.infer<typeof productFormSchema>

// Define the product form props
interface ProductFormProps {
  initialData?: ProductFormValues
  isEditing?: boolean
}

// Mock categories for demonstration
const categories = [
  { id: "paintings", name: "Paintings" },
  { id: "sculptures", name: "Sculptures" },
  { id: "photography", name: "Photography" },
  { id: "digital-art", name: "Digital Art" },
  { id: "prints", name: "Prints" },
  { id: "mixed-media", name: "Mixed Media" },
]

// Mock artists for demonstration
const artists = [
  { id: "artist1", name: "Jane Smith" },
  { id: "artist2", name: "John Doe" },
  { id: "artist3", name: "Emily Johnson" },
  { id: "artist4", name: "Michael Brown" },
  { id: "artist5", name: "Sarah Wilson" },
]

export function ProductForm({ initialData, isEditing = false }: ProductFormProps) {
  const router = useRouter()
  const [images, setImages] = React.useState<string[]>(
    initialData?.images ? [...initialData.images] : []
  )
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  // Default values for the form
  const defaultValues: Partial<ProductFormValues> = {
    name: "",
    description: "",
    price: 0,
    category: "",
    stock: 0,
    sku: "",
    weight: 0,
    dimensions: "",
    materials: "",
    status: "Draft",
    artistId: "",
    ...initialData,
  }

  // Initialize the form
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  })

  // Handle form submission
  const onSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call to save the product
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate successful submission
      toast({
        title: isEditing ? "Product updated" : "Product created",
        description: isEditing
          ? "Your product has been updated successfully."
          : "Your product has been created successfully.",
      })

      // Redirect to products page
      router.push("/admin/products")
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "There was an error saving your product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    // In a real app, this would upload the file to a storage service
    // For now, we'll just create a URL for the file
    const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
    setImages((prev) => [...prev, ...newImages])
  }

  // Handle image removal
  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
              <CardDescription>
                Basic information about your product
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormDescription>
                      The name of your product as it will appear to customers
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter product description"
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Detailed description of your product
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price ($)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="artistId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assign to Artist</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an artist" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        {artists.map((artist) => (
                          <SelectItem key={artist.id} value={artist.id}>
                            {artist.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Assign this product to an artist who will receive credit and track sales
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>
                  Upload images of your product
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square overflow-hidden rounded-md border"
                    >
                      <img
                        src={image}
                        alt={`Product image ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute right-1 top-1 h-6 w-6"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove image</span>
                      </Button>
                    </div>
                  ))}
                  <label
                    htmlFor="image-upload"
                    className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-md border border-dashed"
                  >
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <span className="mt-2 text-sm font-medium">
                      Upload Image
                    </span>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      className="sr-only"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                <FormDescription>
                  Upload high-quality images of your product. You can upload
                  multiple images.
                </FormDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Details</CardTitle>
                <CardDescription>
                  Provide additional details about your product
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SKU</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter SKU" {...field} />
                      </FormControl>
                      <FormDescription>
                        Stock Keeping Unit (optional)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weight (kg)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dimensions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dimensions</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., 10 x 20 x 5 cm"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="materials"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Materials</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Canvas, Acrylic, Wood"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Published">Published</SelectItem>
                          <SelectItem value="Draft">Draft</SelectItem>
                          <SelectItem value="Archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Control the visibility of your product
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            variant="outline"
            onClick={() => router.push("/admin/products")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : isEditing ? "Update Product" : "Create Product"}
          </Button>
        </div>
      </form>
    </Form>
  )
} 