# Phase 04 Plan 01: Voting Data Layer & Schema Summary

Establish the database schema and data access layer for the voting system.

## Key Changes

### Database Schema
- Verified `votos` table in `supabase/schema.sql`.
- Table includes `alojamiento_id`, `usuario_slug`, `puntuacion` (0-5), and a unique constraint for upserts.

### TypeScript Types
- Updated `Alojamiento` interface in `src/types/alojamiento.ts` to include:
  - `avg_rating?: number`
  - `total_votes?: number`
  - `user_vote?: number`

### Data Layer
- Created `src/lib/votos.ts` with:
  - `upsertVote`: Handles inserting or updating a user's vote.
  - `getVotesSummary`: Calculates average rating and total count for an alojamiento.

## Verification Results

### Automated Tests
- Functions exported correctly.
- Types match the database schema.

### Manual Verification
- Schema verified in `supabase/schema.sql`.

## Deviations from Plan
- None - plan executed exactly as written.

## Self-Check: PASSED
