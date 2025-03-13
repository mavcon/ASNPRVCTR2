# 亞 ASNPRVCTR E-commerce Platform

## Project Overview

亞 ASNPRVCTR is a comprehensive e-commerce platform specializing in premium art and design products. The platform supports multiple user roles (Customer, Artist, Admin, Super-Admin) with role-specific features and interfaces.

## Brand Identity

### Logo and Typography
- The logo consists of "亞 ASNPRVCTR" where:
  - "亞" is displayed in red (#FF0000)
  - "ASNPRVCTR" is displayed in black (#000000) or white (#FFFFFF) depending on theme
- The logo must always appear on a single line/row and never be separated into different lines
- Use `white-space: nowrap` in CSS to ensure the logo remains on one line

### Brand Colors
- **Primary Colors**:
  - Black (#000000)
  - White (#FFFFFF)
  - Red (#FF0000)
- **Secondary Colors**:
  - Gray (#808080)
  - Light Gray (#F5F5F5)
  - Dark Gray (#333333)

### Theme
- The application leverages the default dark/light theme system
- In light mode:
  - Background: White (#FFFFFF)
  - Text: Black (#000000)
  - Accents: Red (#FF0000)
- In dark mode:
  - Background: Black (#000000)
  - Text: White (#FFFFFF)
  - Accents: Red (#FF0000)

## Tech Stack

### Core Framework
- **Next.js 14+** with App Router for server-side rendering, routing, and API endpoints
- **React 18+** for component-based UI development
- **Supabase** for authentication, database, storage, and realtime features

### Frontend
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** for consistent, accessible UI components
- **React Hook Form** with Zod for form validation
- **TanStack Query** for server state management, data fetching, and caching
- **Zustand** for client-side UI state management
- **Uploadthing** for file uploads and image management
- **Recharts** for data visualization in dashboards

### State Management Strategy
- **TanStack Query**: For all server state (products, orders, user data)
- **Zustand**: For global UI state (cart, theme, authentication)
- **React State**: For component-local state

### E-commerce Engine
- **Medusa.js** for core e-commerce functionality:
  - Product catalog management
  - Order processing
  - Cart functionality
  - Inventory management
  - Shipping and fulfillment

### Content Management
- **Sanity.io** for structured content:
  - Artist profiles
  - Product descriptions
  - Blog posts
  - Marketing content

### Payments & Transactions
- **Stripe** for payment processing
- **React Email** for transactional emails

### Deployment & Infrastructure
- **Vercel** for Next.js frontend hosting
- **Supabase** for backend services
- **Cloudflare** for CDN and image optimization

## Development Roadmap

### Phase 1: Foundation (Weeks 1-2)
- Project setup with Next.js, Tailwind, and shadcn/ui
- Core UI components and layout structure
- Authentication system with Supabase
- Basic navigation and routing

### Phase 2: Public-Facing Features (Weeks 3-4)
- Product browsing and filtering
- Product detail pages
- Shopping cart functionality
- Search functionality

### Phase 3: Customer Features (Weeks 5-6)
- Customer account dashboard
- Order management and history
- Checkout flow with Stripe
- Wishlist functionality

### Phase 4: Artist Features (Weeks 7-8)
- Artist dashboard
- Product management
- Sales tracking
- Order fulfillment

### Phase 5: Admin Features (Weeks 9-10)
- Admin dashboard
- User management
- Order management
- Content moderation

### Phase 6: Super-Admin & Refinement (Weeks 11-12)
- Super-admin dashboard
- System configuration
- Analytics and reporting
- Performance optimization

## Development Approach

We're following a UI-first approach optimized for AI-assisted development:

1. **UI Prototyping**: Design interfaces to clarify requirements
2. **Schema Definition**: Define database structure based on UI needs
3. **API Development**: Create endpoints to support UI functionality
4. **Integration**: Connect UI components to backend services

This approach provides:
- Clear visual context for AI assistance
- Early validation of user experience
- Precise definition of data requirements
- Incremental, testable progress

## State Management Guidelines

### When to Use Each State Management Tool

```
✅ Use TanStack Query when:
- Fetching data from an API
- Caching server responses
- Managing paginated data
- Handling mutations with optimistic updates

✅ Use Zustand when:
- Managing shopping cart state
- Handling authentication state
- Storing theme/preferences
- Managing global UI state (modals, notifications)

✅ Use React state when:
- Managing form inputs
- Handling component-specific UI state
- Managing temporary data that doesn't need persistence
```

### Example Implementation

```typescript
// Server state with TanStack Query
function useProducts(categoryId: string) {
  return useQuery({
    queryKey: ['products', categoryId],
    queryFn: () => fetchProducts(categoryId)
  });
}

// Global UI state with Zustand
interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product, quantity) => set((state) => ({
        items: [...state.items, { product, quantity }]
      })),
      removeItem: (productId) => set((state) => ({
        items: state.items.filter(item => item.product.id !== productId)
      })),
      clearCart: () => set({ items: [] })
    }),
    { name: 'cart-storage' }
  )
);

// Component-local state with React
function ProductFilter() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  // ...
}
```

## Architecture

### Application Structure

```
app/
├── layout.tsx                # Root layout with persistent header
├── (public)/                 # Public-facing routes
│   ├── layout.tsx            # RetailLayout
│   ├── page.tsx              # Homepage
│   ├── products/             # Product browsing
│   ├── product/[id]/         # Product detail
│   ├── cart/                 # Shopping cart
│   ├── checkout/             # Checkout flow
│   └── [...]/                # Other public pages
├── account/                  # Customer account pages
│   ├── layout.tsx            # AccountLayout
│   ├── dashboard/            # Customer dashboard
│   ├── orders/               # Order history
│   ├── wishlist/             # Saved items
│   ├── addresses/            # Address management
│   └── settings/             # Account settings
├── artist/                   # Artist dashboard
│   ├── layout.tsx            # ArtistLayout
│   ├── dashboard/            # Artist overview
│   ├── products/             # Product management
│   ├── orders/               # Order fulfillment
│   └── settings/             # Artist settings
├── admin/                    # Admin dashboard
│   ├── layout.tsx            # AdminLayout
│   ├── dashboard/            # Admin overview
│   ├── products/             # Product administration
│   ├── orders/               # Order management
│   ├── users/                # User management
│   └── settings/             # Site settings
└── super-admin/              # Super-admin dashboard
    ├── layout.tsx            # SuperAdminLayout
    ├── dashboard/            # System overview
    ├── analytics/            # Platform analytics
    ├── users/                # User administration
    └── settings/             # System configuration
```

### Component Organization

```
components/
├── ui/                       # Reusable UI components
│   ├── button.tsx
│   ├── input.tsx
│   ├── select.tsx
│   └── [...]/                # Other UI components
├── layout/                   # Layout components
│   ├── main-nav.tsx          # Main navigation
│   ├── mobile-nav.tsx        # Mobile navigation
│   ├── account-nav.tsx       # Account navigation
│   ├── artist-nav.tsx        # Artist navigation
│   └── footer.tsx            # Site footer
├── forms/                    # Form components
│   ├── checkout-form.tsx
│   ├── product-form.tsx
│   └── [...]/                # Other form components
├── products/                 # Product components
│   ├── product-card.tsx
│   ├── product-grid.tsx
│   ├── product-filters.tsx
│   └── [...]/                # Other product components
├── checkout/                 # Checkout components
│   ├── cart-summary.tsx
│   ├── payment-form.tsx
│   └── [...]/                # Other checkout components
└── dashboard/                # Dashboard components
    ├── stats-card.tsx
    ├── recent-orders.tsx
    ├── sales-chart.tsx
    └── [...]/                # Other dashboard components
```

## User Roles and Features

### Customer
- **Account Management**: Profile settings, password changes, notification preferences
- **Order Management**: View order history, track shipments, manage returns
- **Address Book**: Save and manage multiple shipping addresses
- **Payment Methods**: Securely store payment information for faster checkout
- **Wishlist**: Save products for future consideration
- **Shopping Experience**: Intuitive product browsing, searching, and filtering

### Artist
- **Sales Dashboard**: Track sales, revenue, and performance metrics for assigned products
- **Order Management**: View orders containing their products
- **Analytics**: View performance data for their products
- **Profile Management**: Customize artist profile and settings

### Admin
- **Product Administration**: Create, edit, and manage all product listings
- **Artist Management**: Assign products to artists and manage artist accounts
- **Order Management**: Process orders, handle returns, manage inventory
- **Customer Management**: View and manage customer accounts
- **Site Configuration**: Customize site settings, categories, and features

### Super-Admin
- **System Administration**: Full access to all platform settings
- **User Administration**: Manage all user types including admins
- **Analytics Dashboard**: Comprehensive reporting and analytics
- **Platform Configuration**: Global settings and integrations management

## Database Schema (Supabase)

### Core Tables

#### users
- id (UUID, PK)
- email (string, unique)
- role (enum: customer, artist, admin, super_admin)
- created_at (timestamp)
- updated_at (timestamp)

#### profiles
- id (UUID, PK, FK to users.id)
- first_name (string)
- last_name (string)
- display_name (string)
- avatar_url (string)
- bio (text)
- created_at (timestamp)
- updated_at (timestamp)

#### products
- id (UUID, PK)
- artist_id (UUID, FK to users.id)
- name (string)
- slug (string, unique)
- description (text)
- price (decimal)
- stock_quantity (integer)
- status (enum: draft, published, archived)
- created_at (timestamp)
- updated_at (timestamp)

#### product_images
- id (UUID, PK)
- product_id (UUID, FK to products.id)
- url (string)
- alt_text (string)
- display_order (integer)
- created_at (timestamp)

#### categories
- id (UUID, PK)
- name (string)
- slug (string, unique)
- description (text)
- parent_id (UUID, FK to categories.id, nullable)
- created_at (timestamp)
- updated_at (timestamp)

#### product_categories
- product_id (UUID, FK to products.id)
- category_id (UUID, FK to categories.id)
- PRIMARY KEY (product_id, category_id)

#### orders
- id (UUID, PK)
- user_id (UUID, FK to users.id)
- status (enum: pending, processing, shipped, delivered, cancelled)
- total_amount (decimal)
- shipping_address_id (UUID, FK to addresses.id)
- billing_address_id (UUID, FK to addresses.id)
- payment_intent_id (string)
- created_at (timestamp)
- updated_at (timestamp)

#### order_items
- id (UUID, PK)
- order_id (UUID, FK to orders.id)
- product_id (UUID, FK to products.id)
- quantity (integer)
- unit_price (decimal)
- created_at (timestamp)

#### addresses
- id (UUID, PK)
- user_id (UUID, FK to users.id)
- name (string)
- line1 (string)
- line2 (string, nullable)
- city (string)
- state (string)
- postal_code (string)
- country (string)
- phone (string)
- is_default (boolean)
- address_type (enum: shipping, billing, both)
- created_at (timestamp)
- updated_at (timestamp)

#### wishlists
- id (UUID, PK)
- user_id (UUID, FK to users.id)
- created_at (timestamp)

#### wishlist_items
- wishlist_id (UUID, FK to wishlists.id)
- product_id (UUID, FK to products.id)
- added_at (timestamp)
- PRIMARY KEY (wishlist_id, product_id)

### Row Level Security (RLS) Policies

Supabase RLS policies will be implemented to ensure:

- Customers can only access their own data
- Artists can only manage their own products
- Admins can access all customer and artist data
- Super-admins have full access to all data

## AI-Assisted Development Guidelines

### Task Structure for AI Assistance

When creating tasks for AI assistance, use this template:

```
## Task: [Task Name]

### Objective
[Clear description of what needs to be built]

### Visual Reference
[Link to mockup/wireframe/similar component]

### Requirements
- [Specific requirement 1]
- [Specific requirement 2]
- [Specific requirement 3]

### Related Components
- [Link to similar component 1]
- [Link to similar component 2]

### Data Structure
```typescript
[Relevant TypeScript interfaces]
```

### Expected Behavior
[Description of how the component should behave]
```

### Best Practices for AI Collaboration

1. **Provide Visual References**: Include mockups or wireframes for UI components
2. **Include Clear Requirements**: Specify exact functionality and edge cases
3. **Reference Existing Code**: Link to similar components already built
4. **Break Down Complex Tasks**: Split features into smaller, focused tasks
5. **Provide Type Definitions**: Share relevant interfaces and sample data

## Authentication Flow

1. **Registration**:
   - User registers with email/password or OAuth provider
   - Default role is set to "customer"
   - Profile record is created

2. **Artist Registration**:
   - Customer can apply to become an artist
   - Admin approves and changes role to "artist"

3. **Login**:
   - User authenticates with email/password or OAuth
   - JWT token is issued with user role
   - User is redirected to role-specific dashboard

4. **Authorization**:
   - Next.js middleware checks user role for protected routes
   - Supabase RLS policies enforce data access restrictions
   - UI conditionally renders based on user role

## Development Workflow

### Setup and Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_MEDUSA_API_URL=your_medusa_api_url
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
   NEXT_PUBLIC_SANITY_DATASET=your_sanity_dataset
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```
4. Run the development server: `npm run dev`
5. Open http://localhost:3000 in your browser

## Phase 1 Implementation Checklist

### Project Setup
- [ ] Initialize Next.js with App Router
- [ ] Configure Tailwind CSS
- [ ] Set up shadcn/ui components
- [ ] Create theme configuration for brand colors
- [ ] Set up basic directory structure

### Core UI Components
- [ ] Design and implement button variants
- [ ] Create form input components
- [ ] Build card components
- [ ] Implement modal components
- [ ] Create loading states and skeletons

### Layout Structure
- [ ] Design and implement root layout
- [ ] Create header with logo (亞 ASNPRVCTR)
- [ ] Build main navigation component
- [ ] Implement mobile navigation
- [ ] Create footer component

### Authentication
- [ ] Design login/signup forms
- [ ] Create Supabase project
- [ ] Set up basic user table with role field
- [ ] Implement authentication components
- [ ] Create protected routes with middleware

## Deployment Strategy

### Vercel Deployment
1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Set up preview deployments for branches
4. Configure custom domain

### Supabase Setup
1. Create production Supabase project
2. Run migration scripts to set up schema
3. Configure authentication providers
4. Set up RLS policies
5. Create service roles for server functions

### Medusa.js Deployment
1. Deploy Medusa backend to a suitable host (Heroku, Digital Ocean, etc.)
2. Configure Medusa to use Supabase Postgres database
3. Set up Medusa admin panel for product management

### Monitoring and Analytics
1. Implement Vercel Analytics for performance monitoring
2. Set up error tracking with Sentry
3. Configure Google Analytics for user behavior tracking
4. Create custom analytics dashboard for business metrics

## Performance Optimization

- Implement image optimization with Next.js Image and Cloudflare
- Use React Server Components for data-heavy pages
- Implement staggered loading for dashboard components
- Add prefetching for common navigation paths
- Optimize Core Web Vitals (LCP, CLS, FID)
- Implement edge caching for static content

## Security Considerations

- Implement CSRF protection
- Set up rate limiting for authentication endpoints
- Use HTTP-only cookies for session management
- Configure Content Security Policy (CSP)
- Implement regular security audits
- Set up automated vulnerability scanning

## Accessibility

- Ensure WCAG 2.1 AA compliance
- Implement keyboard navigation
- Add proper ARIA attributes
- Ensure sufficient color contrast
- Provide alternative text for images
- Test with screen readers

## Mobile Responsiveness

- Implement mobile-first design with Tailwind CSS
- Create dedicated mobile navigation
- Optimize touch targets for mobile users
- Ensure responsive checkout flow
- Test on various device sizes and orientations

## Getting Started for Developers

### Prerequisites
- Node.js 18.x or higher
- npm or yarn
- Supabase CLI
- Git

### Local Development Setup
1. Clone the repository
   ```bash
   git clone https://github.com/your-org/asnprvctr.git
   cd asnprvctr
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up local environment variables
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your credentials
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

5. Open http://localhost:3000 in your browser

### Contribution Guidelines
- Follow the established code style and patterns
- Create feature branches for new functionality
- Submit pull requests with comprehensive descriptions
- Ensure all components are accessible and responsive
- Write tests for new features

## Common Issues and Solutions

### Navigation Issues
- **Problem**: Multiple headers appearing on pages
- **Solution**: The header is defined in the root layout (`app/layout.tsx`). Do not add additional headers in page or layout components.

### Authentication Errors
- **Problem**: Users not redirected to correct dashboard after login
- **Solution**: Check the login handler to ensure it's routing users based on their role

### Database Access Issues
- **Problem**: Permission denied errors when accessing data
- **Solution**: Verify RLS policies are correctly configured for each user role

### Logo Display Issues
- **Problem**: Logo "亞 ASNPRVCTR" appears on multiple lines
- **Solution**: Ensure the container has `white-space: nowrap` and sufficient width

## Resources and Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Medusa.js Documentation](https://docs.medusajs.com/)
- [Sanity.io Documentation](https://www.sanity.io/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Stripe Documentation](https://stripe.com/docs)

## License

[MIT License](LICENSE)

## Current Progress

We have completed the initial setup and foundation of the project:

- ✅ Project setup with Next.js, TypeScript, and Tailwind CSS
- ✅ Core UI components (Button, Logo, Theme Toggle)
- ✅ Layout structure with responsive header and footer
- ✅ Basic home page with hero section and featured content
- ✅ Theme support with dark/light mode
- ✅ Mobile navigation

For a detailed breakdown of our progress, see [PROGRESS.md](./PROGRESS.md).

## Next Steps

Our immediate focus is on:

1. Completing the authentication flow with Supabase
2. Building the product browsing experience
3. Implementing the shopping cart functionality

For a detailed plan of our next steps, see [NEXT_STEPS.md](./NEXT_STEPS.md).

## Development

### Prerequisites
- Node.js 18.x or higher
- npm or yarn
- Supabase account (for backend services)

### Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/your-org/asnprvctr.git
   cd asnprvctr
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your credentials
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

5. Open http://localhost:3000 in your browser

## Development Progress

### Completed UI/UX Components

#### Product Components
- **Product Card** (`src/components/product/product-card.tsx`): Reusable card component for displaying product information with wishlist functionality, price display, and add to cart button.
- **Product Grid** (`src/components/product/product-grid.tsx`): Responsive grid layout for displaying product cards with loading states.
- **Product Filters** (`src/components/product/product-filters.tsx`): Comprehensive filtering system with categories, price range, and other attributes. Includes mobile-friendly design.
- **Product Sort** (`src/components/product/product-sort.tsx`): Dropdown component for sorting products by various criteria.
- **Product Gallery** (`src/components/product/product-gallery.tsx`): Image gallery with thumbnails and navigation controls for product images.
- **Product Review** (`src/components/product/product-review.tsx`): Component for displaying user reviews and ratings for products.
- **Product Form** (`src/components/admin/product-form.tsx`): Comprehensive form for adding and editing products with image uploads, validation, and detailed product information.

#### UI Components
- **Rating** (`src/components/ui/rating.tsx`): Star rating component with half-star support and interactive functionality.
- **Slider** (`src/components/ui/slider.tsx`): Range slider component for price filtering and other numeric inputs.
- **Radio Group** (`src/components/ui/radio-group.tsx`): Accessible radio button group for selection options.
- **Switch** (`src/components/ui/switch.tsx`): Toggle switch component for boolean settings and preferences.

#### Checkout Components
- **Checkout Form** (`src/components/checkout/checkout-form.tsx`): Comprehensive form for collecting shipping and payment information during checkout.

#### Pages
- **Product List Page** (`src/app/products/page.tsx`): Page that combines product grid, filters, and sorting components.
- **Product Details Page** (`src/app/products/[id]/page.tsx`): Detailed product view with gallery, information, reviews, and related products.
- **Cart Page** (`src/app/cart/page.tsx`): Shopping cart with product listing, quantity controls, and checkout functionality.
- **Checkout Page** (`src/app/checkout/page.tsx`): Checkout process with order summary and payment options.
- **Account Page** (`src/app/account/page.tsx`): User account management with profile, orders, addresses, payment methods, and settings.
- **Home Page** (`src/app/page.tsx`): Landing page with featured products, categories, promotional sections, and testimonials.
- **404 Page** (`src/app/not-found.tsx`): User-friendly page for handling not found routes.
- **Loading Page** (`src/app/loading.tsx`): Loading component to enhance the user experience during page transitions.
- **Search Page** (`src/app/search/page.tsx`): Advanced search functionality with filters, sorting, and results display.

### Authentication System
- **Login Page** (`src/app/auth/login/page.tsx`): User login with email/password and social login options.
- **Registration Page** (`src/app/auth/register/page.tsx`): User registration with form validation and terms acceptance.
- **Forgot Password Page** (`src/app/auth/forgot-password/page.tsx`): Password recovery flow with email verification.
- **Auth Layout** (`src/app/auth/layout.tsx`): Consistent layout for authentication pages with branding and navigation.

### Artist Dashboard
- **Artist Layout** (`src/app/artist/layout.tsx`): Consistent layout for the artist dashboard with navigation, header, and footer.
- **Artist Dashboard** (`src/app/artist/dashboard/page.tsx`): Overview dashboard with sales statistics, assigned products, and recent orders.
- **Order Management** (`src/app/artist/orders/page.tsx`): Order listing with search, filtering, and status updates.
- **Analytics Dashboard** (`src/app/artist/analytics/page.tsx`): Comprehensive analytics with sales data, customer demographics, and product performance charts.
- **Settings Page** (`src/app/artist/settings/page.tsx`): Complete settings management with profile, store, and notification preferences.

### Admin Dashboard
- **Admin Layout** (`src/app/admin/layout.tsx`): Consistent layout for the admin dashboard with navigation, header, and footer.
- **Admin Dashboard** (`src/app/admin/dashboard/page.tsx`): Overview dashboard with sales statistics, recent orders, and top products.
- **Product Management** (`src/app/admin/products/page.tsx`): Product listing with search, filtering, and bulk actions.
- **Add Product** (`src/app/admin/products/new/page.tsx`): Page for adding new products using the product form.
- **Edit Product** (`src/app/admin/products/[id]/edit/page.tsx`): Page for editing existing products using the product form.
- **Order Management** (`src/app/admin/orders/page.tsx`): Order listing with search, filtering, and status updates.
- **Customer Management** (`src/app/admin/customers/page.tsx`): Customer listing with search, filtering by status and country, and detailed customer profiles.
- **Settings Page** (`src/app/admin/settings/page.tsx`): Complete settings management with profile, store, and notification preferences.

### Recent Updates
- Fixed build error related to missing Switch component
- Reorganized product management to be centralized in the admin interface
- Updated artist dashboard to focus on sales metrics for assigned products
- Implemented proper metadata handling for client components
- Added artist-product assignment functionality in the admin product form

### Next Steps
- Connect authentication to backend services
- Implement protected routes with middleware
- Complete remaining admin interfaces
- Implement backend integration for product and order management
- Set up Supabase database and authentication
- Implement Stripe payment processing
