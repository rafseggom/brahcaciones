# Phase 1: Foundations & Access - Context

**Phase:** 1
**Domain:** Infraestructura base y sistema de acceso seguro (Pseudo-Auth).
**Status:** Decisions Locked
**Date:** 12/05/2026

## Domain
Establecimiento de la base técnica (React + Vite + Supabase) y creación de un "muro de acceso" privado basado en códigos predefinidos para un grupo de 6 personas.

## Decisions

### Access & Security (Pseudo-Auth)
- **Codes:** Se validarán 6 códigos específicos desde `.env`: `molten`, `kevirolo`, `wargios`, `gonpar`, `dekker` (usuarios) y `admin` (administrador).
- **Environment Variables:** Formato `VITE_AUTH_[NAME]=clave`.
- **Persistent Session:** Uso de `localStorage` para persistir el slug del usuario tras el login exitoso, permitiendo que la sesión dure tiempo sin necesidad de re-logueo constante.
- **Protected Route:** Implementación de un "Muro de entrada" (Login View) que bloquea todo el contenido de la aplicación hasta que se introduzca un código válido.
- **Logout:** Botón dedicado para limpiar el slug de `localStorage` y redirigir al muro de entrada.

### Supabase Integration
- **Database Identity:** Los usuarios no se registrarán en Supabase Auth. Se utilizará el "slug" (ej: `molten`) como identificador único en la tabla de votos.
- **Schema Initial (Votos):** Tabla `votos` con columnas `alojamiento_id` (UUID/FK), `usuario_slug` (TEXT), `puntuacion` (INT, 0-5).
- **Security:** Se utilizarán políticas de RLS (Row Level Security) básicas o una Service Role Key si la simplicidad lo requiere, dado el entorno privado.

## Canonical Refs
- `.planning/PROJECT.md`
- `.planning/REQUIREMENTS.md`
- `.planning/ROADMAP.md`

## Code Context
- **Stack:** React 19 + Vite + Tailwind 4.
- **UI:** modern/minimalist/SaaS aesthetic.
- **Maps:** Leaflet (deferred to Phase 3).

---
*Last updated: 12/05/2026 after Phase 1 Discussion*
