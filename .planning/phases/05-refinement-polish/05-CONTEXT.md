# Phase 5: Refinement & Visual Polish - Context

**Phase:** 5
**Domain:** Refinamiento visual, simplificación de datos y UX.
**Status:** Decisions Locked
**Date:** 12/05/2026

## Domain
Evolución de la interfaz hacia un estilo visual más atractivo (Playful/Travel), expansión de la UI a pantalla completa y limpieza del modelo de datos para centrarse en lo esencial.

## Decisions

### 1. Estética Visual
- **Style:** Opción B (Playful/Travel). Uso de colores más cálidos, gradientes suaves y una paleta menos monocromática.
- **Dark Mode:** Debe ser manual y global, persistiendo en toda la aplicación y afectando a todos los componentes.
- **Visual Effects:** Introducción de sombras más suaves, bordes redondeados y micro-interacciones.

### 2. Layout y UX
- **Full Screen:** Eliminación de contenedores con anchos máximos. La aplicación ocupará el 100% del ancho del viewport.
- **Modals:** Los modales/dialogs serán completamente opacos y tendrán un "overlay" que oscurezca o desenfoque el fondo de forma efectiva para evitar confusiones visuales.

### 3. Modelo de Datos (Simplificación)
- **Campos Eliminados:** `dates` (ya no es relevante).
- **Campos Añadidos:** `rooms` (Integer) para indicar el número de habitaciones.
- **Precios:** El campo `price` representa el **Precio Total**. Se mostrará siempre el total como dato principal, con el cálculo por persona (Total / 5) como dato secundario pero visible.
- **Características:** Implementación de "Toggle Buttons" visuales en el Admin para marcar Piscina, Barbacoa, etc. Asegurar persistencia real en la DB.

### 4. Vista de Usuario
- **Display:** Mostrar prominentemente el Precio Total y el Precio por Persona.
- **Layout:** Ajustar las tarjetas y el panel lateral para que no haya recortes visuales al usar el modo pantalla completa.

## Canonical Refs
- `.planning/PROJECT.md`
- `.planning/REQUIREMENTS.md`
- `.planning/ROADMAP.md`

## Code Context
- **Theme:** `next-themes` (for manual toggle).
- **Icons:** `lucide-react`.
- **Database:** Alter `alojamientos` table (remove `dates`, add `rooms`).

---
*Last updated: 12/05/2026 after Phase 5 Discussion*
