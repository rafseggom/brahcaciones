# Requirements: Brahcaciones

**Defined:** 12/05/2026
**Core Value:** Facilitar la toma de decisiones grupal mediante un sistema de votación transparente y una visualización clara de las opciones de alojamiento.

## v1 Requirements

### Acceso (Pseudo-Auth)

- [ ] **AUTH-01**: El sistema debe validar contraseñas del `.env` (5 usuarios + 1 admin).
- [ ] **AUTH-02**: El estado de sesión debe persistir localmente (sessionStorage/localStorage) para mantener el acceso tras refrescar.
- [ ] **AUTH-03**: Redirección automática a la vista correspondiente (User/Admin) según el código introducido.
- [ ] **AUTH-04**: El usuario debe poder cerrar la sesión mediante un botón de logout, limpiando el estado persistido.

### Gestión de Alojamientos (Admin)

- [ ] **ADM-01**: El admin puede añadir alojamientos con: Título, Precio, Fechas, Ubicación (Lat/Lng), Características y Enlace (Airbnb/Booking).
- [ ] **ADM-02**: El admin puede editar cualquier detalle de un alojamiento existente.
- [ ] **ADM-03**: El admin puede eliminar alojamientos.

### Visualización y Comparación (Usuario)

- [ ] **USER-01**: Lista de alojamientos con tarjetas modernas mostrando precio total y **Precio por Persona (PPP)**.
- [ ] **USER-02**: Mapa interactivo (Leaflet) con marcadores para cada alojamiento.
- [ ] **USER-03**: Vista de detalle para cada alojamiento con toda la información y botón para ir al enlace original.
- [ ] **USER-04**: Selector de Modo Claro/Oscuro con toggle y persistencia de preferencia.

### Decisiones (Votaciones)

- [ ] **VOTE-01**: Cada uno de los 5 usuarios puede votar cada alojamiento de 0 a 5.
- [ ] **VOTE-02**: El sistema debe mostrar la media de votos por alojamiento de forma clara.
- [ ] **VOTE-03**: Un usuario puede cambiar su voto en cualquier momento, sobreescribiendo el anterior.

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
| AUTH-01 | Phase 1 | Pending |
| AUTH-02 | Phase 1 | Pending |
| AUTH-03 | Phase 1 | Pending |
| AUTH-04 | Phase 1 | Pending |
| ADM-01 | Phase 2 | Pending |
| ADM-02 | Phase 2 | Pending |
| ADM-03 | Phase 2 | Pending |
| USER-01 | Phase 3 | Pending |
| USER-02 | Phase 3 | Pending |
| USER-03 | Phase 3 | Pending |
| USER-04 | Phase 3 | Pending |
| VOTE-01 | Phase 4 | Pending |
| VOTE-02 | Phase 4 | Pending |
| VOTE-03 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 14 total
- Mapped to phases: 14
- Unmapped: 0 ✓

---
*Requirements defined: 12/05/2026*
*Last updated: 12/05/2026 after initial definition*
