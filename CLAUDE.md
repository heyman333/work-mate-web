# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Work Mate Web is a React-based web application for managing work locations and user profiles. The app uses a modern tech stack with React 19, TypeScript, Vite, Chakra UI, and TanStack Query for state management.

## Development Commands

### Core Commands
- `pnpm dev` - Start development server
- `pnpm build` - Build for production (runs TypeScript check + Vite build)
- `pnpm lint` - Run ESLint
- `pnpm type-test` - Run TypeScript type checking without emitting files
- `pnpm preview` - Preview production build

### API Type Generation
- `pnpm generate-types` - Generate TypeScript API types from Swagger/OpenAPI spec
  - Requires backend server running on `localhost:3000` with `/swagger.yaml` endpoint
  - Generates types in `src/api/api.ts` using custom templates from `templates/` directory

## Architecture

### Frontend Stack
- **React 19** with TypeScript
- **Vite** as build tool with SWC for fast refresh
- **Chakra UI v3** for styling (mandatory - use this instead of other styling solutions)
- **TanStack Query** for server state management
- **React Router v7** for routing with lazy loading
- **React Hook Form** with Zod validation
- **Axios** for HTTP requests

### Project Structure
```
src/
├── api/           # Auto-generated API client and types
├── components/    # Reusable UI components
├── hooks/         # Custom React hooks
├── pages/         # Route components (lazy-loaded)
├── routes/        # Router configuration
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

### Key Architecture Patterns

#### API Layer
- Auto-generated API client from OpenAPI spec in `src/api/api.ts`
- Custom axios instance in `src/utils/api.ts` with baseURL from `VITE_API_URL`
- All API calls use cookies for authentication (`withCredentials: true`)

#### State Management
- TanStack Query for server state (queries, mutations, caching)
- React hooks for local state management
- Query keys follow pattern: `["resource-name", ...params]`

#### Authentication
- OAuth integration with Google and GitHub
- Custom hooks: `useLoggedIn`, `useGetMe`, `useLogout`
- Auth callbacks handled by dedicated route components

#### Routing
- React Router v7 with lazy loading for all pages
- Layout component provides consistent navigation structure
- Routes defined in `src/routes/root.tsx`

#### Component Organization
- Components organized by feature in separate directories
- Each component directory contains the main component file
- UI components use Chakra UI exclusively
- Custom hooks in `src/hooks/` for reusable logic

### Key Features
- **Workplace Management**: CRUD operations for work locations with map integration
- **User Profiles**: Profile management with skill sets and collaboration goals
- **Location Services**: Integration with Kakao Maps for location search and display
- **Authentication**: Social login with Google and GitHub OAuth

## API Integration

### Core API Endpoints
- `GET /workplace` - List user's workplaces
- `POST /workplace` - Create new workplace
- `DELETE /workplace/{id}` - Delete workplace
- `GET /user/me` - Get current user profile
- `PUT /user/me` - Update user profile

### Authentication Flow
1. User clicks OAuth login (Google/GitHub)
2. Redirected to OAuth provider
3. Callback handled by dedicated route components
4. User session managed via cookies
5. API calls automatically include credentials

## Development Guidelines

### Styling Requirements
- **MUST use Chakra UI v3** for all styling
- Use Chakra's component library and design system
- Avoid custom CSS or other styling libraries

### Code Patterns
- Use React 19 features (latest hooks, concurrent features)
- Implement proper TypeScript types for all components and functions
- Use TanStack Query for all server state management
- Follow React Router v7 patterns for navigation

### Environment Variables
- `VITE_API_URL` - Backend API base URL (required)
- Configure in `.env` file for local development

### Testing and Quality
- Run `pnpm type-test` before committing to ensure TypeScript compliance
- Use `pnpm lint` to check code quality
- No test framework currently configured

## Important Notes

- API types are auto-generated - do not manually edit `src/api/api.ts`
- Use the existing hook patterns for API calls (see `src/hooks/` examples)
- Follow the existing component structure and lazy loading patterns
- Map integration uses Kakao Maps SDK - see existing components for patterns