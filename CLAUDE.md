# Brahcaciones - Project Guide

## Project Context
Brahcaciones is a modern, minimalist web application for a group of friends to plan and vote on vacation accommodations. It uses a dual-mode access system (Admin/User) based on predefined codes.

## Tech Stack
- **Frontend:** React 19 + Vite + Tailwind CSS 4
- **Backend:** Supabase (PostgreSQL, RLS, Realtime)
- **Maps:** Leaflet (via react-leaflet)
- **Styling:** modern, minimalist, "SaaS-like" aesthetic

## GSD Workflow Mandates
This project follows the **Get Shit Done (GSD)** workflow.
- Always check `.planning/ROADMAP.md` for current phase and status.
- Requirements are tracked in `.planning/REQUIREMENTS.md`.
- Use `/gsd:discuss-phase [N]` to start a new phase.
- Use `/gsd:plan-phase [N]` to generate an implementation plan.
- Use `/gsd:execute-phase [N]` to implement the plan.

## Development Standards
- **Surgical Changes:** Modify only what is necessary for the current task.
- **Validation:** Always verify changes with tests or manual checks before completion.
- **Types:** Ensure TypeScript safety across the application.
- **Styling:** Follow the minimalist/SaaS aesthetic using Tailwind.

---
*Generated: 12/05/2026*
