# Brahcaciones

## What This Is

Una aplicación web diseñada para un grupo cerrado de amigos que facilita la elección de alojamientos para vacaciones. Permite listar opciones con detalles específicos (precio, fechas, ubicación), visualizarlas en un mapa y realizar votaciones ponderadas para tomar decisiones grupales de forma organizada y visual.

## Core Value

Facilitar la toma de decisiones grupal mediante un sistema de votación transparente y una visualización clara de las opciones de alojamiento, eliminando el caos de los chats de mensajería.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] **Acceso por Contraseña**: Sistema de login basado en contraseñas predefinidas en `.env` para distinguir entre 5 usuarios y 1 administrador.
- [ ] **Modo Usuario**: Visualización de alojamientos en lista y mapa (Leaflet).
- [ ] **Detalle de Alojamiento**: Vista expandida con características, fechas, precio y enlace externo (Airbnb/Booking).
- [ ] **Sistema de Votación**: Votación de 0 a 5 por alojamiento, permitiendo cambios y evitando duplicados por usuario.
- [ ] **Modo Admin**: Interfaz para insertar, editar y eliminar alojamientos.
- [ ] **Interfaz Dual**: Soporte para modo claro y oscuro con selector (toggle).
- [ ] **Persistencia**: Integración con Supabase para almacenar alojamientos y votos.

### Out of Scope

- [Registro Público] — La app es solo para un grupo privado de amigos.
- [Pagos Integrados] — La gestión de dinero se hace fuera de la plataforma.
- [Chat en vivo] — Se asume que la comunicación sigue ocurriendo en canales externos.

## Context

El proyecto busca una estética de "SaaS moderno": minimalista, limpia y profesional. Se utilizarán herramientas gratuitas (Leaflet para mapas) y una infraestructura serverless (Supabase) para mantener el coste en cero y la complejidad baja.

## Constraints

- **Tecnología**: React + Vite + Tailwind CSS.
- **Base de Datos**: Supabase.
- **Mapas**: Debe ser una solución gratuita (Leaflet).
- **Seguridad**: Autenticación simple basada en variables de entorno (sin sistema de usuarios complejo).

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Leaflet para Mapas | Google Maps requiere tarjeta/crédito; Leaflet es gratuito y suficiente para marcar puntos. | — Pending |
| Identificación por .env | Método más simple para un grupo de 5 personas sin necesidad de registro. | — Pending |
| Supabase | Facilidad de configuración para persistencia de datos y escalado rápido. | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 12/05/2026 after initialization*
