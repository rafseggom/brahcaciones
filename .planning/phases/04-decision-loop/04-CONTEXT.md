# Phase 4: Decision Loop - Context

**Phase:** 4
**Domain:** Sistema de votación y pulido final de la experiencia grupal.
**Status:** Decisions Locked
**Date:** 12/05/2026

## Domain
Implementación del motor de votación y la lógica de ordenación basada en el consenso del grupo, finalizando el ciclo de toma de decisiones.

## Decisions

### 1. Sistema de Votación
- **UI:** Interfaz de estrellas clásica (0 a 5).
- **Persistence:** El voto se guarda asociado al `usuario_slug` y `alojamiento_id`. Si el usuario vuelve a votar, se actualiza su registro anterior (Upsert).

### 2. Visibilidad y Sesgo
- **Blind Voting:** La media de votos del grupo y el número de votos totales para un alojamiento estarán **ocultos** hasta que el usuario actual haya emitido su propio voto para esa propiedad.
- **State:** Una vez que el usuario vota, se desbloquea la visualización de la media grupal de forma permanente para ese alojamiento.

### 3. Ordenación y Ranking
- **Sort Logic:** Por defecto, los alojamientos se mostrarán en el orden de inserción.
- **Auto-Sort:** Una vez que el usuario ha participado en las votaciones (ha emitido al menos un voto), la lista se reordenará automáticamente situando los alojamientos con mayor media de votos en la parte superior.

### 4. Sincronización de Datos
- **Strategy:** Se priorizará la simplicidad mediante el refresco manual de datos o al navegar. No se implementará Supabase Realtime para evitar complejidad innecesaria en este MVP.

## Canonical Refs
- `.planning/PROJECT.md`
- `.planning/REQUIREMENTS.md`
- `.planning/phases/01-foundations-access/01-CONTEXT.md`
- `.planning/phases/02-admin-control/02-CONTEXT.md`
- `.planning/phases/03-discovery-context/03-CONTEXT.md`

## Code Context
- **Icons:** `lucide-react` (Star icons).
- **Ranking Logic:** Array sorting based on `avg_rating` calculated from the `votos` table.

---
*Last updated: 12/05/2026 after Phase 4 Discussion*
