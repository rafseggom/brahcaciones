# Discussion Log: Phase 2 - Admin Control

**Date:** 12/05/2026
**Phase:** 2

## Discussion Summary

### Area: Gestión de Imágenes
- **Options presented:** Manual URL vs Supabase Storage.
- **User selection:** Manual URL (Airbnb/Booking).
- **Notes:** User wants speed. If possible, auto-filling from the property link is a plus, but not a blocker.

### Area: Características
- **Options presented:** Free text vs Predefined tags.
- **User selection:** Specific fixed features (Pool, BBQ, Beds, Beach).
- **Notes:** These represent the "essential" group requirements.

### Area: Flujo de Edición
- **Options presented:** Modal vs Slide-over vs Dedicated Page.
- **User selection:** Dedicated view with Save/Cancel.
- **Notes:** The admin view is purely for management, so it should be optimized for clear CRUD operations.

### Area: Geolocalización
- **Options presented:** Manual Lat/Lng vs Address Search.
- **User selection:** Address Search.
- **Notes:** To be implemented with free tools (Nominatim/OSM).

## Deferred Ideas
- Automatic data scraping from Airbnb (moved to v2 if complex).

## Claude's Discretion
- Database column names for boolean features.
- Choice of Geocoding library (Leaflet Control Geocoder recommended).

---
*Log generated after Phase 2 Discussion*
