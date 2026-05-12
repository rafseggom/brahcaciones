---
phase: 04-decision-loop
plan: 03
subsystem: Ranking & Sync
tags: [sorting, ranking, sync]
requirements: [VOTE-02]
status: complete
---

# Phase 04 Plan 03: Auto-Ranking and Sync Summary

Finalized the decision loop by implementing participation-based sorting and manual synchronization.

## Key Changes

### Data Fetching
- **getAlojamientos**: Updated to perform a client-side join/aggregation of votes. It now returns `avg_rating`, `total_votes`, and `user_vote` for each alojamiento.

### Ranking Logic
- **Participation-based Sorting**: The list in `DiscoveryView` now automatically switches from "Sort by date" to "Sort by rating" as soon as the user casts at least one vote.
- The sorting algorithm prioritizes `avg_rating`, then `total_votes`, and finally `created_at`.

### Manual Sync
- Added a **Refresh** button to the `DiscoveryView` header to allow users to manually pull latest votes from other participants without a full page reload.

## Deviations from Plan
- None - plan executed as written.

## Verification Results
- Automatic ranking activates correctly after voting.
- Refresh button triggers a re-fetch and updates the list.
- Map view stays in sync with the sorted list.
