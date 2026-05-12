# Technology Stack

**Project:** Brahcaciones
**Researched:** 2025-05-24
**Confidence:** HIGH

## Recommended Stack

### Core Framework
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **React** | 19.x | Frontend Library | Industry standard, robust ecosystem, and native support for better async patterns. |
| **Vite** | 6.x | Build Tool | Fastest development experience and optimized builds for modern browsers. |

### Database & Backend
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **Supabase** | Latest | BaaS (Database/Auth) | Zero-config PostgreSQL, built-in Auth, and Realtime capabilities for live voting updates. |
| **PostgreSQL** | 16+ | Database Engine | Relational power for accommodations, users, and votes. |

### UI & Styling
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **Tailwind CSS** | 4.x | CSS Framework | Utility-first styling for rapid development and clean maintenance. |
| **shadcn/ui** | Latest | UI Components | Provides the "Modern SaaS" minimalist aesthetic. Highly customizable as code is owned locally. |
| **Lucide React** | Latest | Icon Set | Standard icons for shadcn/ui; lightweight and consistent. |
| **next-themes** | Latest | Theme Management | Reliable dark/light mode toggle that integrates perfectly with Tailwind and shadcn. |

### Map Integration
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **Leaflet** | 1.9+ | Map Engine | Open-source and free. No API key or credit card required. |
| **react-leaflet** | 4.x | React Wrapper | Simplifies Leaflet integration using declarative React components. |
| **shadcn-map** | Latest | Map UI Components | Community components to style Leaflet popups and controls using shadcn primitives. |

### State & Data Handling
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **TanStack Query** | v5 | Data Fetching | Automatic caching, revalidation, and robust optimistic updates for the voting system. |
| **React Hook Form** | v7 | Form Management | High-performance forms for the Admin CRUD panel. |
| **Zod** | v3 | Schema Validation | Type-safe validation for both forms and Supabase responses. |
| **date-fns** | v4 | Date Utilities | Minimalist library for handling vacation dates and formatting. |

---

## Architecture Rationale

### 1. Why shadcn/ui over MUI/Chakra?
Brahcaciones requires a **minimalist, professional look**. MUI and Chakra UI come with heavy default styles and large bundles. `shadcn/ui` gives us total control over the code, making it easier to integrate with the Map's custom styling and Tailwind's dark mode.

### 2. Why TanStack Query v5 + Supabase?
While Supabase has a client library, TanStack Query is essential for:
- **Optimistic Updates:** When a friend votes, the UI should reflect the change instantly before the database confirms.
- **Global Cache:** Keeping accommodation details and vote counts in sync across the List and Map views.
- **Realtime Sync:** Pairing Query invalidation with Supabase Realtime ensures everyone sees new accommodations or votes as they happen.

### 3. Authentication Strategy: "Simple but Secure"
To satisfy the requirement of "login via .env passwords" while maintaining security:
- **Recommendation:** Use **Supabase Auth** with 6 pre-created accounts (5 users, 1 admin).
- **Implementation:** The login screen shows a "Who are you?" list. The user selects their name and enters their "Access Code" (which acts as their Supabase password).
- **Rationale:** This allows **Row Level Security (RLS)** in PostgreSQL, preventing users from voting more than once or modifying other people's votes, which a simple `.env` check in the frontend cannot guarantee.

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| **Maps** | **Leaflet** | Google Maps | Google requires a credit card even for the free tier; Leaflet is truly open-source and sufficient for simple markers. |
| **State** | **TanStack Query** | Redux Toolkit | Redux is overkill for a data-driven app where Supabase already handles the source of truth. |
| **Styling** | **Tailwind** | CSS Modules | Tailwind is faster for "Modern SaaS" layouts and integrates better with shadcn/ui. |

---

## Installation

```bash
# Core Dependencies
npm install @supabase/supabase-js @tanstack/react-query lucide-react leaflet react-leaflet clsx tailwind-merge date-fns

# UI Components (shadcn/ui)
npx shadcn@latest init
npx shadcn@latest add button card dialog dropdown-menu input label toast

# Map Specific (shadcn-map)
npx shadcn@latest add https://shadcn-map.vercel.app/registry/map.json

# Development Dependencies
npm install -D tailwindcss postcss autoprefixer @types/leaflet
```

## Sources

- [Supabase Documentation: React Quickstart](https://supabase.com/docs/guides/getting-started/quickstarts/react)
- [React 19 Hooks: useOptimistic vs TanStack Query](https://tanstack.com/query/v5/docs/framework/react/guides/optimistic-updates)
- [shadcn/ui Official Documentation](https://ui.shadcn.com/)
- [shadcn-map Registry](https://github.com/tonghohin/shadcn-map)
- [React Leaflet Integration Guide](https://react-leaflet.js.org/)
