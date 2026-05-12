# Phase 2: Admin Control - Context

**Phase:** 2
**Domain:** Gestión de alojamientos (CRUD) para el administrador.
**Status:** Decisions Locked
**Date:** 12/05/2026

## Domain
Implementación de la interfaz de administración para crear, editar y eliminar alojamientos en Supabase, integrando búsqueda de direcciones para geolocalización.

## Decisions

### 1. Gestión de Imágenes y Enlaces
- **Source:** Se utilizarán URLs externas (Airbnb/Booking). El admin pegará la URL de la imagen directamente.
- **Auto-scraping (Intent):** Si es técnicamente viable sin servidores complejos, se intentará extraer la imagen principal de los enlaces, pero el campo manual es el "fallback" principal.

### 2. Características del Alojamiento
- **Schema:** Se almacenarán como campos booleanos específicos en la base de datos para facilitar filtros futuros:
  - `has_pool` (Piscina)
  - `has_bbq` (Barbacoa)
  - `individual_beds` (Camas individuales)
  - `sofa_bed` (Sofá cama)
  - `near_beach` (Playa < 5min)
- **UI:** Se presentarán como interruptores (switches) o checkboxes en el formulario.

### 3. Interfaz de Edición
- **View Mode:** La vista de administrador será una tabla o lista donde todos los elementos son editables.
- **Form Flow:** Se usará un formulario dedicado (probablemente en una página o modal amplio) con botones claros de "Guardar" y "Cancelar". No habrá edición "inline" para evitar cambios accidentales sin confirmación.

### 4. Geolocalización
- **Geocoding:** Se integrará un buscador de direcciones (usando el plugin de Leaflet o la API de OpenStreetMap/Nominatim, que es gratuita) para que el admin busque el sitio y se obtengan automáticamente la Latitud y Longitud.

## Canonical Refs
- `.planning/PROJECT.md`
- `.planning/REQUIREMENTS.md`
- `.planning/phases/01-foundations-access/01-CONTEXT.md`

## Code Context
- **Supabase Table:** `alojamientos`.
- **Address Search:** Nominatim (OpenStreetMap) API.

---
*Last updated: 12/05/2026 after Phase 2 Discussion*
