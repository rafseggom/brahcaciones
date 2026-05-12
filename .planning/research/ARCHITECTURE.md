# Architecture Patterns

**Domain:** Group Vacation Planning
**Researched:** 2025-05-24

## Recommended Architecture

A **Decoupled Client-BaaS Architecture** using Supabase as the backend and TanStack Query as the state orchestrator.

### Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| **Supabase (DB/Auth)** | Source of Truth, Persistence, RLS. | Client (via `supabase-js`). |
| **TanStack Query** | Server State Management, Caching, Optimistic Updates. | Supabase, UI Components. |
| **Leaflet Map** | Geospatial Visualization. | TanStack Query (reads list of pins). |
| **Admin Panel** | Data Entry (CRUD). | Supabase (via Server Actions / Mutations). |

### Data Flow

1. **Read:** App mounts → TanStack Query fetches `accommodations` and `votes` from Supabase → Data cached locally → Components (List/Map) render from cache.
2. **Update (Vote):** User clicks 5 stars → TanStack Query triggers `onMutate` (Optimistic Update) → UI updates immediately → Supabase request sent → On success/fail, cache is synced.
3. **Real-time:** Supabase Realtime channel broadcasts change → TanStack Query invalidates cache → Components re-fetch and re-render with latest group data.

---

## Patterns to Follow

### 1. Row Level Security (RLS) for Voting
Since the app is for a group, we must ensure User A cannot delete User B's vote.
**Pattern:**
```sql
-- PostgreSQL Policy
CREATE POLICY "Users can only modify their own votes"
ON public.votes
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
```

### 2. Functional Map Markers
Avoid re-rendering the whole map when one vote changes.
**Pattern:**
Wrap individual markers in a `Memo` or use TanStack Query selectors to only provide relevant data to each marker.
```typescript
const Marker = memo(({ accommodationId }) => {
  const { data: voteAvg } = useQuery({
    queryKey: ['votes', accommodationId],
    select: (votes) => calculateAverage(votes)
  });
  return <LeafletMarker ... />;
});
```

## Anti-Patterns to Avoid

### 1. The "Z-Index War"
**Problem:** Leaflet uses `z-index: 1000` for the map container, which can cover shadcn's Navbars or Dialogs.
**Instead:** Configure Tailwind's `z-index` scale or use `z-[1001]` explicitly for UI overlays (Modals/Dropdowns) to ensure they stay on top of the map.

### 2. Manual State for Supabase
**Problem:** Using `useEffect` + `useState` to fetch Supabase data.
**Instead:** Always use **TanStack Query** (or React 19 `use()`) to handle the loading, error, and cache invalidation logic. Manual state leads to "stale data" bugs in a collaborative voting environment.

## Scalability Considerations

| Concern | At 5 users | At 100 users |
|---------|--------------|--------------|
| **Realtime** | Negligible. | Use Supabase Channels efficiently; avoid broadcasting heavy payloads. |
| **DB Performance** | Simple queries. | Add indexes to `accommodation_id` and `user_id` in the `votes` table. |
| **Map Clustering** | Not needed. | Use `react-leaflet-cluster` if the group adds 50+ markers in a small area. |

## Sources

- [Supabase Architecture Best Practices](https://supabase.com/docs/guides/auth/row-level-security)
- [TanStack Query v5 Performance Guide](https://tanstack.com/query/v5/docs/framework/react/guides/performance)
