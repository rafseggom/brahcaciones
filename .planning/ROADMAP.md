# Roadmap: Brahcaciones

## Phases

- [ ] **Phase 1: Foundations & Access** - Supabase setup and Pseudo-Auth implementation.
- [ ] **Phase 2: Admin Control** - Interface and logic for accommodation management (CRUD).
- [ ] **Phase 3: Discovery & Context** - Map and list views for exploring accommodations.
- [ ] **Phase 4: Decision Loop** - Voting system, price calculations, and final polish.

## Phase Details

### Phase 1: Foundations & Access
**Goal**: Establish the project infrastructure and a secure access layer for users and admin.
**Mode**: mvp
**Depends on**: Nothing
**Requirements**: AUTH-01, AUTH-02, AUTH-03, AUTH-04
**Success Criteria** (what must be TRUE):
  1. A user can enter a code from `.env` and be redirected to the correct dashboard (User/Admin).
  2. The session remains active after a page refresh.
  3. Clicking "Logout" clears the session and returns the user to the login screen.
**Plans**: TBD

### Phase 2: Admin Control
**Goal**: Provide the administrator with tools to manage the vacation options.
**Mode**: mvp
**Depends on**: Phase 1
**Requirements**: ADM-01, ADM-02, ADM-03
**Success Criteria** (what must be TRUE):
  1. The admin can successfully create, update, and delete an accommodation record.
  2. Data is persisted in Supabase and visible in the admin interface.
**Plans**: TBD
**UI hint**: yes

### Phase 3: Discovery & Context
**Goal**: Enable users to visualize and explore the available accommodations.
**Mode**: mvp
**Depends on**: Phase 2
**Requirements**: USER-01, USER-02, USER-03, USER-04
**Success Criteria** (what must be TRUE):
  1. User can see all accommodations as pins on a Leaflet map.
  2. User can toggle between light and dark modes, with the setting persisting across sessions.
  3. User can view specific details of an accommodation by clicking on a list item or map pin.
**Plans**: TBD
**UI hint**: yes

### Phase 4: Decision Loop
**Goal**: Implement the core logic for group decision-making via voting and cost analysis.
**Mode**: mvp
**Depends on**: Phase 3
**Requirements**: VOTE-01, VOTE-02, VOTE-03
**Success Criteria** (what must be TRUE):
  1. Each of the 5 users can submit a 0-5 star vote for any accommodation.
  2. The system displays the average rating and Price per Person (PPP) for each option.
  3. Updating a vote immediately reflects the new average without duplicate entries in the DB.
**Plans**: TBD

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundations & Access | 0/0 | Not started | - |
| 2. Admin Control | 0/0 | Not started | - |
| 3. Discovery & Context | 0/0 | Not started | - |
| 4. Decision Loop | 0/0 | Not started | - |
