# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server (both frontend and backend)
- `npm run build` - Build for production (frontend to dist/public, backend to dist/)
- `npm start` - Run production build
- `npm run check` - TypeScript type checking
- `npm run db:push` - Push database schema changes using Drizzle

## Architecture Overview

This is a full-stack TypeScript application for EuroPlast Ltd., a plastic packaging manufacturer. The project uses a monorepo structure with shared types and database schema.

### Project Structure
- `client/` - React frontend with Vite
- `server/` - Express.js backend API 
- `shared/` - Shared TypeScript types and Drizzle database schema
- `attached_assets/` - Static design reference files

### Technology Stack
- **Frontend**: React 18 + TypeScript + Vite + Wouter (routing) + TanStack Query + shadcn/ui + Tailwind CSS
- **Backend**: Express.js + TypeScript + Drizzle ORM
- **Database**: PostgreSQL with Drizzle ORM for type-safe operations
- **Build**: Vite (frontend), ESBuild (backend production)

### Key Technical Patterns

**Database Schema** (`shared/schema.ts`):
- All tables use Drizzle ORM with PostgreSQL
- Shared Zod validation schemas for type safety
- Main entities: products, industries, blogPosts, quoteRequests, contactInquiries, resources, testimonials

**API Structure**:
- RESTful endpoints under `/api/*`
- Centralized route registration in `server/routes.ts`
- JSON responses with error handling middleware

**Frontend Architecture**:
- Component-based with shadcn/ui design system
- Path aliases: `@/` for client/src, `@shared/` for shared types
- Form handling with React Hook Form + Zod validation
- Server state management with TanStack Query

### Development Environment
- Uses tsx for backend development with hot reload
- Vite dev server for frontend with HMR
- Database changes via `npm run db:push` (development) or migrations (production)
- Environment variables required: DATABASE_URL

### Path Aliases
- `@/*` maps to `client/src/*`
- `@shared/*` maps to `shared/*`
- `@assets/*` maps to `attached_assets/*`

### Important Files
- `shared/schema.ts` - Database schema and validation
- `server/routes.ts` - API endpoint definitions
- `client/src/App.tsx` - Main React application with routing
- `drizzle.config.ts` - Database configuration
- `vite.config.ts` - Frontend build configuration