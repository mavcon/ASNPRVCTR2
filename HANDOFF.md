# Developer Handoff Document

## Project Overview

亞 ASNPRVCTR is an e-commerce platform specializing in premium art and design products. The platform supports multiple user roles (Customer, Artist, Admin, Super-Admin) with role-specific features and interfaces.

## Current State of the Project

The project is currently in the UI development phase. We have implemented most of the UI components and pages for the customer-facing site, artist dashboard, and admin dashboard. The backend integration is pending.

### Key Features Implemented

1. **Customer-Facing Site**
   - Home page with featured products and categories
   - Product listing with filtering and sorting
   - Product details page with gallery and information
   - Shopping cart functionality
   - Checkout flow
   - Account management

2. **Artist Dashboard**
   - Overview dashboard with sales statistics
   - Order management
   - Analytics dashboard
   - Settings management

3. **Admin Dashboard**
   - Overview dashboard
   - Product management (CRUD operations)
   - Order management
   - Customer management
   - Settings management

### Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS, shadcn/ui
- **State Management**: React Query (planned), Zustand (planned)
- **Backend**: Supabase (planned)
- **Authentication**: Supabase Auth (planned)
- **Payment Processing**: Stripe (planned)

## Project Structure

### Key Directories

- `src/app`: Next.js App Router pages and layouts
  - `(public)`: Public-facing routes
  - `account`: Customer account pages
  - `artist`: Artist dashboard
  - `admin`: Admin dashboard
  - `auth`: Authentication pages

- `src/components`: Reusable UI components
  - `ui`: Base UI components (buttons, inputs, etc.)
  - `product`: Product-related components
  - `checkout`: Checkout-related components
  - `artist`: Artist dashboard components
  - `admin`: Admin dashboard components
  - `layout`: Layout components (headers, footers, etc.)

- `src/lib`: Utility functions and shared code

### Key Files

- `src/app/layout.tsx`: Root layout with theme provider
- `src/app/page.tsx`: Home page
- `src/app/artist/layout.tsx`: Artist dashboard layout
- `src/app/admin/layout.tsx`: Admin dashboard layout
- `src/components/admin/product-form.tsx`: Product form for admin product management
- `src/components/ui/switch.tsx`: Switch component for toggle functionality

## Recent Changes

1. **Fixed Build Error**: Added the missing Switch component required by the account page.
2. **Reorganized Product Management**: Centralized product management in the admin interface.
3. **Updated Artist Dashboard**: Focused on sales metrics for assigned products rather than product management.
4. **Implemented Metadata Handling**: Fixed metadata handling for client components.
5. **Added Artist-Product Assignment**: Implemented functionality to assign products to artists in the admin product form.

## Known Issues

1. **Next.js Version**: The project is using Next.js 14.2.24, which is outdated. Consider upgrading to the latest version.
2. **Client-Side Metadata**: Some pages have metadata exports in client components, which is not supported by Next.js. These should be moved to server components or dedicated metadata files.
3. **Mock Data**: The application currently uses mock data throughout. This will need to be replaced with real API calls.

## Next Steps

1. **Backend Integration**:
   - Set up Supabase project
   - Create database schema
   - Implement API endpoints

2. **Authentication**:
   - Implement Supabase authentication
   - Set up protected routes with middleware
   - Implement role-based access control

3. **State Management**:
   - Implement React Query for server state
   - Set up Zustand for client state

4. **Payment Processing**:
   - Integrate Stripe for payment processing
   - Implement checkout flow

5. **Deployment**:
   - Set up CI/CD pipeline
   - Deploy to Vercel

## Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/mavcon/ASNPRVCTR2.git
   cd ASNPRVCTR2
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   ```

## Contact Information

For any questions or clarifications, please contact:
- Project Manager: [Name] ([Email])
- Lead Developer: [Name] ([Email])

## Additional Resources

- [README.md](./README.md): Detailed project documentation
- [NEXT_STEPS.md](./NEXT_STEPS.md): Planned next steps
- [PROGRESS.md](./PROGRESS.md): Development progress tracking 