# Knowledge Portal Application

## Overview

This is a modern full-stack knowledge management portal built with React, Express, and TypeScript. The application serves as an internal company portal for sharing and managing knowledge articles, featuring categories, user activities, and a clean, Japanese-language interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Build Tool**: Vite for development and bundling

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful API with JSON responses
- **Development Server**: Custom middleware for development with Vite integration
- **Error Handling**: Centralized error handling middleware

### Database & ORM
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: Configured for PostgreSQL (via Neon Database)
- **Migrations**: Drizzle Kit for schema management
- **Schema Location**: `shared/schema.ts` for type-safe database operations

## Key Components

### Data Models
- **Users**: Basic user information with username, name, and initials
- **Categories**: Knowledge article categories with icons, colors, and article counts
- **Knowledge Articles**: Main content with metadata (views, likes, featured status)
- **Activities**: User activity tracking for article interactions

### Frontend Components
- **Dashboard**: Main landing page with featured content and category navigation
- **Header**: Search functionality and user navigation
- **Category Grid**: Visual display of knowledge categories
- **Featured Section**: Highlights important articles
- **Recent Knowledge**: Lists latest articles with metadata
- **Sidebar**: Popular articles and recent activities

### Backend Services
- **Storage Interface**: Abstracted storage layer for data operations
- **Memory Storage**: In-memory implementation for development/testing
- **Route Handlers**: RESTful endpoints for categories, articles, and activities

## Data Flow

1. **Client Requests**: React components use TanStack Query to fetch data
2. **API Layer**: Express routes handle HTTP requests and responses
3. **Storage Layer**: Abstract storage interface manages data operations
4. **Database**: Drizzle ORM handles PostgreSQL interactions
5. **Response**: JSON data flows back through the stack to update UI

### Key API Endpoints
- `GET /api/categories` - Retrieve all categories
- `GET /api/knowledge` - Get all knowledge articles
- `GET /api/knowledge/featured` - Get featured article
- `GET /api/knowledge/recent` - Get recent articles
- `GET /api/knowledge/popular` - Get popular articles
- `GET /api/activities/recent` - Get recent user activities

## External Dependencies

### Frontend Libraries
- **UI Components**: Extensive use of Radix UI primitives via shadcn/ui
- **Styling**: Tailwind CSS with custom design tokens
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for date formatting
- **Form Management**: React Hook Form with Zod validation

### Backend Libraries
- **Database**: @neondatabase/serverless for PostgreSQL connectivity
- **ORM**: Drizzle ORM for type-safe database operations
- **Validation**: Zod for runtime type checking
- **Session Management**: connect-pg-simple for PostgreSQL session storage

### Development Tools
- **Build**: Vite with React plugin
- **TypeScript**: Full type safety across the stack
- **ESLint/Prettier**: Code formatting and linting (implied)
- **Replit Integration**: Custom plugins for Replit development environment

## Deployment Strategy

### Development
- **Local Development**: Vite dev server with Express API
- **Hot Reloading**: Vite HMR for frontend, tsx for backend
- **Environment**: NODE_ENV=development with development middleware

### Production Build
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: esbuild bundles Express server to `dist/index.js`
3. **Static Serving**: Express serves built frontend assets
4. **Database**: Requires PostgreSQL connection via DATABASE_URL

### Environment Configuration
- **Database**: Requires DATABASE_URL environment variable
- **Build Scripts**: Separate dev, build, and start commands
- **Database Migrations**: `db:push` command for schema updates

### Replit Specific
- **Development Banner**: Replit development environment integration
- **Cartographer Plugin**: Replit code mapping for development
- **Runtime Error Overlay**: Enhanced error reporting in development

The application follows a standard full-stack architecture with clear separation of concerns, type safety throughout, and modern development practices. The storage layer abstraction allows for easy switching between different database implementations, currently supporting both in-memory and PostgreSQL backends.