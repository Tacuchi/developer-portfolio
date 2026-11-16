# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Dos visitantes con el mismo peso (confirmado el 2026-11-14):

- Desarrolladores que llegan desde npm o GitHub por una herramienta y quieren saber quién la hizo.
- Quien evalúa el perfil (reclutador o líder técnico) y llega desde LinkedIn o el CV.

Ambos llegan de paso, leen poco y deciden rápido si siguen. El idioma del sitio es español.

## Product Purpose

Sitio personal de Jesús Loayza Tacuchi en `tacuchi.dev`. Existe para tener el perfil listo «por si acaso», sin buscar trabajo ahora, y para que lo encuentren por sus herramientas y proyectos.

Éxito: quien mira el inicio diez segundos se lleva las herramientas que construye (agent-workflow, agent-memory, agent-skills, system-updater) como cosas reales y usables. El nombre va detrás de ellas.

## Positioning

Presencia pasiva: hablan los artefactos (sitio, README, páginas de paquetes), no la persona. Nada exige publicar seguido, comentar ni hacer contactos. El hilo del perfil es el criterio: evaluar si algo agrega valor antes de adoptarlo.

## Operating Context

- Tres páginas (inicio, Sobre mí, proyectos) y nueve páginas de detalle de proyecto. Las rutas no cambian.
- Perfiles enlazados: GitHub, LinkedIn y npm.
- Se despliega como sitio estático detrás de nginx; el despliegue lo dispara la persona.

## Capabilities and Constraints

- Astro 5 + Preact + Tailwind 4. Sin dependencias nuevas salvo aprobación.
- Los datos viven una sola vez en `src/data/site.ts`, `src/data/projects.ts` y `src/data/experience.ts`.
- `npm run build` y `npm run check` deben pasar. `scripts/check-site.mjs` revisa el HTML generado (canónica, vista previa, JSON-LD de persona, un solo correo, perfiles, orden de destacados, los nueve puestos, sitemap, robots, redirección).
- `public/og.png` se genera desde `scripts/og.svg`.
- `Dockerfile` y `nginx.conf` no se tocan sin confirmación explícita.
- Selector de tema claro, oscuro y sistema: función existente.

## Brand Commitments

- Nombre: Jesús Loayza Tacuchi. Alias: Tacuchi.
- Titular único, sin cambiar una letra: «Ingeniero de software senior · apps móviles y plataformas web · herramientas para agentes de IA».
- Se presenta como contribuidor individual senior. Ningún texto presenta jefatura o liderazgo formal.
- El contenido (titular, cinco destacados, nueve puestos) está aprobado: un rediseño cambia cómo se ve, no qué dice.
- Un resultado se siente equivocado si es llamativo o muy animado, si parece de diseñador y no de ingeniero, o si parece la plantilla típica de portafolio de desarrollador (confirmado el 2026-11-14).

## Evidence on Hand

- Cinco proyectos destacados y cuatro más, con enlaces reales a GitHub y npm (`src/data/projects.ts`).
- Nueve puestos de trayectoria, 2014 a la actualidad (`src/data/experience.ts`).
- No hay capturas, logos ni imágenes de los proyectos. No hay testimonios ni métricas: no se inventan.

## Product Principles

1. Los proyectos primero; la persona detrás.
2. Criterio sobre moda: cada elemento debe ganarse su lugar.
3. Presencia pasiva: nada que pida atención ni mantenimiento constante.
4. Lo que se afirma es verificable en un enlace.
