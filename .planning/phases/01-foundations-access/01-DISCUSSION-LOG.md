# Discussion Log: Phase 1 - Foundations & Access

**Date:** 12/05/2026
**Phase:** 1

## Discussion Summary

### Area: Lógica de Identificación
- **Options presented:** Predefined list vs DB-based.
- **User selection:** Predefined list of 6 slugs: `molten`, `kevirolo`, `wargios`, `gonpar`, `dekker`, `admin`.
- **Notes:** Logic will derive the user identity directly from the entered code matching an environment variable.

### Area: Persistencia de Sesión
- **Options presented:** localStorage (long-lived) vs sessionStorage (volatile).
- **User selection:** localStorage (long-lived).
- **Notes:** User wants a convenient experience for friends where they don't have to login repeatedly.

### Area: Integración con Supabase
- **Options presented:** Supabase Auth vs Custom Pseudo-Auth.
- **User selection:** Custom Pseudo-Auth using slugs.
- **Notes:** Simple schema for votes: `alojamiento_id`, `usuario_slug`, `puntuacion`.

### Area: Experiencia de Login
- **Options presented:** Modal vs Dedicated page.
- **User selection:** Dedicated "Gate" page (Muro de entrada).
- **Notes:** Nothing should be visible until a valid code is provided.

## Deferred Ideas
- None during this phase.

## Claude's Discretion
- Formato de variables de entorno: `VITE_AUTH_NAME`.
- Estructura de componentes para la ruta protegida.

---
*Log generated after Phase 1 Discussion*
