# Feature Landscape

**Domain:** Group Vacation Planning
**Researched:** 2025-05-24

## Table Stakes

Features users expect in 2025 for this type of product.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Interactive Map** | Vital to see where accommodations are relative to points of interest. | Medium | Use Leaflet + Custom Markers. |
| **Real-time Voting** | Seeing votes appear as friends cast them reduces friction and adds "social" feel. | Medium | Use Supabase Realtime + TanStack Query. |
| **Mobile-First Design** | Friends will likely check options and vote from their phones. | Low | Tailwind's responsive classes. |
| **Dark/Light Mode** | Standard for modern SaaS apps; easier on eyes for night planning. | Low | Use `next-themes`. |
| **Admin Panel** | Need a way to quickly add links from Airbnb/Booking without manual DB entry. | Low | Simple CRUD with `useActionState`. |

## Differentiators

Features that set Brahcaciones apart from a simple shared spreadsheet.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Weighted Visuals** | Accommodations with higher average votes could appear larger or highlighted on the map. | Medium | Dynamic marker scaling based on average vote. |
| **Price per Person** | Automatically calculate cost per head based on the 5-person group size. | Low | Calculated field in UI. |
| **External Link Scraper** | (Future) Enter an Airbnb URL and auto-fill price/title. | High | Would require an Edge Function with Playwright/Puppeteer (complex). |
| **Conflict Highlights** | Warn if an accommodation is "Sold Out" or dates are unavailable (if status is tracked). | Low | Simple status flag in DB. |

## Anti-Features

Features to explicitly NOT build to keep the project lean.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **Chat System** | High maintenance, requires notification system. | Use existing WhatsApp/Telegram groups. |
| **Payment Handling** | Security risk, legal complexity. | Handle via Splitwise/Zelle/Venmo. |
| **Public Registration**| Not needed for a group of 6 friends. | Pre-create accounts. |

## Feature Dependencies

```
Supabase Auth → Voting System (Votes need an author)
Accommodations DB → Map View (Map needs data points)
Voting Data → Weighted Visuals (Visuals need vote averages)
```

## MVP Recommendation

Prioritize:
1. **Accommodations List & CRUD:** Basic data entry and display.
2. **Simple Map View:** Visualizing the points.
3. **Voting System:** 0-5 stars per user.
4. **Shared Access:** Login with personal codes.

Defer:
- **Weighted Map Markers:** Add in Phase 2 once basic voting is solid.
- **Auto-scraping:** Likely too complex for a zero-cost project.

## Sources

- [Project Requirements (.planning/PROJECT.md)](../PROJECT.md)
- [Competitor Analysis: Wanderlog, TripIt (simplified for niche use)](https://wanderlog.com)
