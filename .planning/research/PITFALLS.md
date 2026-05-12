# Domain Pitfalls

**Domain:** Group Vacation Planning / Mapping Apps
**Researched:** 2025-05-24

## Critical Pitfalls

### 1. Leaflet Asset Loading in Vite
**What goes wrong:** Marker icons (the blue pins) often fail to load in production builds because Vite changes the asset paths, and Leaflet's internal CSS tries to load them relative to the CSS file.
**Consequences:** Broken map visuals; users can't see the markers.
**Prevention:** 
1. Manually set the Icon paths in Leaflet.
2. **Best Practice:** Use `L.divIcon` with a Lucide React icon inside it. This bypasses image asset issues and allows styling markers with Tailwind.

### 2. Double-Voting & Race Conditions
**What goes wrong:** Two users vote at the exact same time, or one user clicks "Vote" twice quickly.
**Consequences:** Multiple vote entries for the same user-accommodation pair, skewing results.
**Prevention:**
1. **DB Level:** Add a `UNIQUE` constraint on `(user_id, accommodation_id)` in the `votes` table.
2. **UI Level:** Disable the voting button immediately after the first click using TanStack Query's `isPending` or React 19's `useFormStatus`.

### 3. Missing Map Container Size
**What goes wrong:** Leaflet requires the map container to have an explicit `height` (e.g., `h-[500px]` or `h-screen`) before it initializes.
**Consequences:** The map renders as a gray box or a 0px height element.
**Prevention:** Always wrap the `<MapContainer />` in a parent div with a defined height and width.

---

## Moderate Pitfalls

### 1. Dark Mode Tile Sync
**What goes wrong:** The UI switches to dark mode, but the map tiles stay in "Light Voyager" mode, causing a jarring visual mismatch.
**Prevention:** Sync the `TileLayer` URL with the `theme` state from `next-themes`. Use CartoDB's "Dark Matter" for dark mode and "Voyager" for light mode.

### 2. Mobile Keyboard Layout Shifting
**What goes wrong:** When an admin enters accommodation details on mobile, the keyboard pops up and shifts the map or the form in a way that hides the "Submit" button.
**Prevention:** Use `resize-observer` or standard CSS `visualViewport` adjustments. Ensure the form is scrollable even when the keyboard is active.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| **Auth Implementation** | Over-complicating the login. | Stick to pre-created Supabase accounts + 6 "Personal Codes". Avoid complex registration flows. |
| **Map Visualization** | High Z-index conflicts. | Define a `z-index` strategy early. Map = 1000, Overlays = 1001, Modals = 2000+. |
| **Voting** | Votes not updating live. | Verify Supabase Realtime is enabled for the `votes` table in the Dashboard. |

## Sources

- [Leaflet Issue #4968: Marker Icons in Webpack/Vite](https://github.com/Leaflet/Leaflet/issues/4968)
- [Supabase Docs: Realtime Quotas and Limits](https://supabase.com/docs/guides/realtime/quotas)
- [Personal Experience with shadcn + Leaflet integrations]
