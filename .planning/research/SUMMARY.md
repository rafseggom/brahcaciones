# Research Summary: Project Brahcaciones

**Project:** Group Vacation Planning Tool
**Date:** 2025-05-24
**Status:** Research Complete

## Executive Summary

Brahcaciones is a high-utility group vacation planner designed for a 6-person friend group to coordinate accommodation choices. The research confirms that the best approach is a **Real-time Map-Centric Application** that focuses on "Killer Metrics" like Price per Person (PPP) and Bathroom/Bedroom ratios to drive decision-making. 

The application will leverage a modern, lightweight stack (React 19 + Supabase) to minimize infrastructure costs while providing a "SaaS-like" experience. By using a "Pseudo-Auth" system, we bypass complex registration while maintaining data integrity via Postgres Row Level Security (RLS). This ensures a secure, private environment for friends to vote on their future vacation spot.

---

## Key Findings

### 1. The Technology Stack (Modern & Cost-Effective)
*   **Frontend:** **React 19** (for advanced hooks like `useActionState` and `useOptimistic`) + **Vite** (fastest build tool).
*   **Styling:** **Tailwind CSS 4** + **shadcn/ui** for a minimalist "Modern SaaS" aesthetic.
*   **Backend & DB:** **Supabase** (PostgreSQL) for Auth, Database, and Realtime sync.
*   **Maps:** **Leaflet** with **shadcn-map** components for a free, key-less mapping solution.
*   **State Management:** **TanStack Query v5** to handle server state, caching, and real-time invalidation.

### 2. "Pseudo-Auth" & Security
To satisfy the "login via .env" requirement while keeping voting secure:
*   **Pre-created Users:** 6 accounts (5 users, 1 admin) will be seeded in Supabase.
*   **Simple Login:** Users select their name and enter a "Personal Code" (acting as their password).
*   **RLS Enforcement:** Database policies will ensure a user can only create/edit their own votes and that one user cannot vote twice for the same place.

### 3. Killer Metrics
The UI will prioritize decision-making data:
*   **Price per Person (PPP):** Automatically calculated based on the 5-person guest count.
*   **Group Comfort Ratio:** Explicit display of Bedrooms vs. Bathrooms (e.g., "3 Bed / 2 Bath") to avoid morning bottlenecks.

### 4. Database Schema
*   **Table `alojamientos`**: Stores title, link (Airbnb/Booking), total price, lat/lng, and room counts.
*   **Table `votos`**: Stores `user_id`, `accommodation_id`, and a 0-5 star rating.
*   **Unique Constraint:** A composite unique key on `(user_id, accommodation_id)` prevents duplicate votes.

---

## Roadmap Implications

The research suggests a 4-phase execution plan:

### Phase 1: Foundations (Auth & Infrastructure)
*   **Rationale:** Establish the security layer before handling user data.
*   **Deliverables:** Supabase project setup, RLS policies, and the "Pseudo-Auth" login screen.
*   **Pitfall to Avoid:** Over-complicating Auth; stick to the 6 pre-defined codes.

### Phase 2: Data (Admin CRUD)
*   **Rationale:** Need data to visualize. Building the admin tool first allows the group to start adding links immediately.
*   **Deliverables:** Forms for adding/editing accommodations with validation (Zod) and image URL handling.

### Phase 3: Visualization (Map & List)
*   **Rationale:** The core value proposition. Transforming raw data into a spatial and list-based comparison.
*   **Deliverables:** Leaflet map with custom pins, list view with PPP and room ratios, and responsive mobile layout.

### Phase 4: Interaction (Voting & Polish)
*   **Rationale:** Adding social interaction and refining the experience.
*   **Deliverables:** 0-5 star voting, real-time updates (Supabase Realtime), optimistic UI updates, and Dark Mode sync for map tiles.

---

## Research Flags & Gaps

| Area | Confidence | Notes |
|------|------------|-------|
| **Stack** | HIGH | React 19 + Supabase is a proven, high-velocity pairing. |
| **Auth** | HIGH | Pseudo-Auth satisfies requirements while remaining secure. |
| **Mapping** | MEDIUM | Leaflet asset paths in Vite can be tricky; using `L.divIcon` is the recommended fix. |
| **Scraping** | LOW | Automatic link scraping was deferred as an "Anti-Feature" due to complexity. |

**Gaps:**
*   Need to decide on the specific Map Tile provider (CartoDB Dark/Light recommended).
*   Final list of 5 user names + 1 admin name for seeding.

---

## Sources

*   [Supabase RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security)
*   [React Leaflet + Vite Integration Issues](https://github.com/Leaflet/Leaflet/issues/4968)
*   [TanStack Query v5 Optimistic Updates](https://tanstack.com/query/v5/docs/framework/react/guides/optimistic-updates)
*   [shadcn-map Registry](https://github.com/tonghohin/shadcn-map)
