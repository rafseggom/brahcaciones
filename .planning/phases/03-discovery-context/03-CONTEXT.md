# Phase 3: Discovery & Context - Context

**Phase:** 3
**Domain:** Visualización de alojamientos en Mapa y Lista para usuarios.
**Status:** Decisions Locked
**Date:** 12/05/2026

## Domain
Implementación de la interfaz principal de usuario para la exploración y comparación de alojamientos, integrando un mapa interactivo y una lista detallada con métricas de precio.

## Decisions

### 1. Layout y Distribución
- **Split View:** Se implementará una vista de pantalla dividida. En pantallas grandes (Desktop), el mapa ocupará un lateral y la lista el otro. En móviles, se adaptará a una vista apilable o mediante tabs.
- **Side Panel:** La información detallada de cada alojamiento no se mostrará en popups intrusivos, sino en un panel lateral (Drawer o Slide-over) que se activará al seleccionar una casa desde la lista o el mapa.

### 2. Métricas y Visualización (Killer Metrics)
- **Pricing:** Se mostrará siempre el **Precio Total** acompañado de forma prominente por el **Precio por Persona (PPP)**.
- **Calculation:** El PPP se calculará automáticamente dividiendo el precio total entre **5** (tamaño fijo del grupo de amigos).
- **Features Icons:** Uso de iconos minimalistas (Lucide React) para representar las características clave (Piscina, Barbacoa, etc.) en las tarjetas de la lista.

### 3. Mapa (Leaflet)
- **Styling:** Se utilizará un tema de mapa minimalista (CartoDB Positron o similar).
- **Theme Sync:** El estilo del mapa cambiará automáticamente entre una variante clara y una oscura para sincronizarse con el toggle de modo de la aplicación.
- **Interactions:** Al hacer clic en un marcador, se centrará el mapa y se abrirá el panel lateral de detalles.

### 4. Modo Claro/Oscuro
- **Implementation:** Uso de Tailwind CSS (`dark:` classes) y `next-themes` o similar para la gestión del estado.
- **Persistence:** La preferencia del usuario se guardará en `localStorage`.

## Canonical Refs
- `.planning/PROJECT.md`
- `.planning/REQUIREMENTS.md`
- `.planning/phases/01-foundations-access/01-CONTEXT.md`
- `.planning/phases/02-admin-control/02-CONTEXT.md`

## Code Context
- **Map Components:** `react-leaflet`.
- **UI Components:** `shadcn/ui` (Drawer/Sheet para el Side Panel).
- **Group Size:** Constant `GROUP_SIZE = 5`.

---
*Last updated: 12/05/2026 after Phase 3 Discussion*
