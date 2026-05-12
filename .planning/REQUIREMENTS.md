# Requirements: Brahcaciones

**Defined:** 12/05/2026
**Core Value:** Facilitar la toma de decisiones grupal mediante un sistema de votación transparente y una visualización clara de las opciones de alojamiento.

## v1 Requirements

### Acceso (Pseudo-Auth)

- [x] **AUTH-01**: El sistema debe validar contraseñas del `.env` (5 usuarios + 1 admin).
- [x] **AUTH-02**: El estado de sesión debe persistir localmente (sessionStorage/localStorage) para mantener el acceso tras refrescar.
- [x] **AUTH-03**: Redirección automática a la vista correspondiente (User/Admin) según el código introducido.
- [x] **AUTH-04**: El usuario debe poder cerrar la sesión mediante un botón de logout, limpiando el estado persistido.

### Gestión de Alojamientos (Admin)

- [x] **ADM-01**: El admin puede añadir alojamientos con: Título, Precio, Fechas, Ubicación (Lat/Lng), Características y Enlace (Airbnb/Booking).
- [x] **ADM-02**: El admin puede editar cualquier detalle de un alojamiento existente.
- [x] **ADM-03**: El admin puede eliminar alojamientos.

### Visualización y Comparación (Usuario)

- [x] **USER-01**: Lista de alojamientos con tarjetas modernas mostrando precio total y **Precio por Persona (PPP)**.
- [x] **USER-02**: Mapa interactivo (Leaflet) con marcadores para cada alojamiento.
- [x] **USER-03**: Vista de detalle para cada alojamiento con toda la información y botón para ir al enlace original.
- [x] **USER-04**: Selector de Modo Claro/Oscuro con toggle y persistencia de preferencia.

### Decisiones (Votaciones)

- [x] **VOTE-01**: Cada uno de los 5 usuarios puede votar cada alojamiento de 0 a 5.
- [x] **VOTE-02**: El sistema debe mostrar la media de votos por alojamiento de forma clara.
- [x] **VOTE-03**: Un usuario puede cambiar su voto en cualquier momento, sobreescribiendo el anterior.

## Milestone 2: Frontend Refactor & Visual Overhaul

### UI/UX Overhaul
- [ ] **REF-05**: Implementar una estética "Playful/Travel" avanzada con paleta de colores vibrantes pero equilibrada (no solo dark mode).
- [ ] **REF-06**: Transiciones suaves y animaciones de entrada para tarjetas y modales (Framer Motion).
- [ ] **REF-07**: Mejorar legibilidad de tipografías y jerarquía visual.

### Admin Experience
- [ ] **ADM-04**: Implementar Toggle Buttons con estados visuales activos/inactivos claros (colores, sombras, iconos) para las características del alojamiento.

### Discovery & Map
- [ ] **MAP-01**: Añadir popups o tooltips a los marcadores de Leaflet que muestren el nombre y precio al pasar el ratón (hover) o hacer click.
- [ ] **MAP-02**: Centrar y ajustar el zoom del mapa automáticamente al seleccionar un alojamiento.

### Accommodation Detail View
- [ ] **USER-07**: Refactorizar la Side Sheet a un Modal Central grande.
- [ ] **USER-08**: Integrar un mapa secundario dentro del modal que muestre la ubicación exacta con un nivel de zoom alto.
- [ ] **USER-09**: Organización de la información en el modal (fotos, descripción, características, mapa, enlace) con un layout de rejilla moderna.

## v2 Requirements (Deferred)


- **REAL-01**: Actualización en tiempo real de votos mediante Supabase Realtime.
- **SCRP-01**: Autocompletado de datos de alojamiento pegando el enlace (Scraping).
- **STAT-01**: Gráficos comparativos de precio/votos.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Registro Público | App privada para grupo cerrado. |
| Pagos Integrados | Complejidad innecesaria para el MVP. |
| Chat Interno | Uso de canales externos (WhatsApp/Telegram). |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| AUTH-01 | Phase 1 | Completed |
| AUTH-02 | Phase 1 | Completed |
| AUTH-03 | Phase 1 | Completed |
| AUTH-04 | Phase 1 | Completed |
| ADM-01 | Phase 2 | Completed |
| ADM-02 | Phase 2 | Completed |
| ADM-03 | Phase 2 | Completed |
| USER-01 | Phase 3 | Completed |
| USER-02 | Phase 3 | Completed |
| USER-03 | Phase 3 | Completed |
| USER-04 | Phase 3 | Completed |
| VOTE-01 | Phase 4 | Completed |
| VOTE-02 | Phase 4 | Completed |
| VOTE-03 | Phase 4 | Completed |

**Coverage:**
- v1 requirements: 14 total
- Mapped to phases: 14
- Unmapped: 0 ✓

---
*Requirements defined: 12/05/2026*
*Last updated: 12/05/2026 after milestone audit*
