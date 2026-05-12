# Brahcaciones

## What This Is

Una aplicación web diseñada para un grupo cerrado de amigos que facilita la elección de alojamientos para vacaciones. Permite listar opciones con detalles específicos (precio, fechas, ubicación), visualizarlas en un mapa y realizar votaciones ponderadas para tomar decisiones grupales de forma organizada y visual.

## Core Value

Facilitar la toma de decisiones grupal mediante un sistema de votación transparente y una visualización clara de las opciones de alojamiento, eliminando el caos de los chats de mensajería.

## Requirements

### Validated

- [x] **v1: Functional MVP** — Auth, CRUD, Voting, Map/List View, Basic Polish.

### Active

- [ ] **Overhaul Estético**: Interfaz moderna, menos oscura, con estética de alta calidad y animaciones fluidas.
- [ ] **Feedback Admin**: Estados visuales claros para los selectores de características (Piscina, Barbacoa, etc.).
- [ ] **Contexto en Mapa**: Popups/Tooltips al pasar el ratón por los pinpoints para identificar alojamientos.
- [ ] **Refactor Detalle**: Cambio de barra lateral (Side Sheet) a Modal Central grande con mapa integrado y zoom específico.

### Out of Scope

- [Registro Público] — La app es solo para un grupo privado de amigos.
- [Pagos Integrados] — La gestión de dinero se hace fuera de la plataforma.
- [Chat en vivo] — Se asume que la comunicación sigue ocurriendo en canales externos.

## Context

El proyecto busca una estética de "SaaS moderno": minimalista, limpia y profesional. Tras el MVP, el foco es la excelencia visual y de experiencia de usuario (UX).

## Constraints

- **Tecnología**: React + Vite + Tailwind CSS + Framer Motion.
- **Base de Datos**: Supabase.
- **Mapas**: Debe ser una solución gratuita (Leaflet).
- **Seguridad**: Autenticación simple basada en variables de entorno.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Leaflet para Mapas | Gratuito y suficiente. | ✅ Functional |
| Identificación por .env | Simplicidad para grupo cerrado. | ✅ Functional |
| Modal Central p/ Detalle | Mayor espacio para info y mapas; mejor jerarquía visual que el side sheet. | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

---
*Last updated: 12/05/2026 after Milestone 2 initialization*
