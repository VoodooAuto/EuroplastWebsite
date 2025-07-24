# EuroPlast Ltd. - Packaging Solutions Platform

## Overview

This is a full-stack web application for EuroPlast Ltd., a European plastic packaging manufacturer. The application showcases their product catalog, serves different industries, provides resources, and handles customer inquiries and quote requests. Built with a modern React frontend and Express.js backend, it uses PostgreSQL for data persistence and features a responsive design with shadcn/ui components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom EuroPlast color scheme
- **State Management**: TanStack Query (React Query) for server state
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM for type-safe database operations
- **API Design**: RESTful API with JSON responses
- **Error Handling**: Centralized error middleware
- **Development**: Hot reload with tsx and Vite integration

### Monorepo Structure
- `client/` - React frontend application
- `server/` - Express.js backend API
- `shared/` - Shared TypeScript types and database schema
- `attached_assets/` - Static HTML design references

## Key Components

### Database Schema (`shared/schema.ts`)
- **Products**: Complete product catalog with categories, materials, specifications
- **Industries**: Industry-specific information and case studies
- **Blog Posts**: Content management for company blog
- **Quote Requests**: Customer quote request handling
- **Contact Inquiries**: General customer contact form submissions
- **Resources**: Downloadable materials (datasheets, certificates, brochures)
- **Testimonials**: Customer testimonials and reviews

### Frontend Pages
- **Home**: Hero section, product categories, industries overview
- **Products**: Filterable product catalog with search and categories
- **Product Detail**: Individual product specifications and quote requests
- **Industries**: Industry-specific solutions and case studies
- **About**: Company information, certifications, values
- **Blog**: Content marketing and industry insights
- **Contact**: Multi-purpose contact and inquiry forms
- **Resources**: Downloadable materials and documentation

### API Endpoints
- `GET /api/products` - Product catalog with filtering
- `GET /api/products/:id` - Individual product details
- `GET /api/industries` - Industries served
- `GET /api/industries/:slug` - Industry-specific information
- `GET /api/blog` - Blog posts
- `GET /api/resources` - Downloadable resources
- `POST /api/quotes` - Quote request submission
- `POST /api/contact` - Contact form submission

## Data Flow

1. **Product Discovery**: Users browse products by category, material, or search
2. **Quote Requests**: Integrated quote request forms on product pages
3. **Industry Solutions**: Industry-specific landing pages with relevant products
4. **Content Marketing**: Blog and resources for lead generation
5. **Contact Management**: Multiple contact points funneling to inquiry system

## External Dependencies

### Database
- **PostgreSQL**: Primary database via Neon Database service
- **Connection**: Pool-based connections with WebSocket support

### UI Components
- **Radix UI**: Headless component primitives for accessibility
- **Lucide React**: Icon library
- **Class Variance Authority**: Component variant management
- **Tailwind CSS**: Utility-first styling

### Development Tools
- **Vite**: Fast development server and build tool
- **TypeScript**: Type safety across frontend and backend
- **Drizzle Kit**: Database migration and schema management
- **ESBuild**: Production backend bundling

## Deployment Strategy

### Development
- Frontend: Vite dev server with HMR
- Backend: tsx with nodemon-like watching
- Database: Drizzle push for schema synchronization

### Production Build
- Frontend: Vite build to `dist/public`
- Backend: ESBuild bundle to `dist/index.js`
- Static assets: Served by Express in production
- Environment: Node.js with PostgreSQL database

### Key Features
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Form Validation**: Zod schemas shared between frontend and backend
- **Error Handling**: User-friendly error messages and loading states
- **SEO Friendly**: Proper meta tags and semantic HTML structure
- **Accessibility**: ARIA labels and keyboard navigation support

The application serves as both a marketing website and a lead generation platform, with integrated quote request functionality and comprehensive product information to support B2B sales processes.