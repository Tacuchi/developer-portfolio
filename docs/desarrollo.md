# Desarrollo del sitio público

## Editar el contenido

| Qué cambiar | Dónde |
|---|---|
| Identidad, titular, contacto, perfiles y vínculo al CV | `src/data/site.ts` |
| Proyectos, orden, enlaces y destacados | `src/data/projects.ts` |
| Trayectoria profesional | `src/data/experience.ts` |
| Inicio, catálogo, fichas y «Sobre mí» | `src/pages/` |
| Metadatos y estructura compartida | `src/layouts/BaseLayout.astro` |
| Esquemas y fichas | `src/components/` |
| Estilos y fuente local | `src/styles/global.css`, `public/fonts/` |
| Tema persistente | `src/stores/theme.ts`, `src/components/ThemeToggle.tsx` |

El arreglo de proyectos define el orden de presentación.
Las fichas individuales se generan con `getStaticPaths`; no se crean a mano por cada proyecto.
Un cambio de contenido requiere volver a generar el sitio antes de publicarlo.

## Comprobar una edición

```sh
npm ci
npm run build
npm run check
```

`check` lee los archivos generados; si no existen, pide ejecutar primero la construcción.
Comprueba identidad, metadatos, enlaces, proyectos, trayectoria, sitemap, accesibilidad y reglas del servidor.
Las expectativas incluyen valores propios del perfil: adapta esos controles si creas una copia distinta.
No es una prueba de las respuestas reales del Nginx publicado.

```sh
npm run dev
npm run preview
npm run astro -- --help
```

`dev` sirve el código durante la edición; `preview` permite revisar el resultado de la construcción.
Detén cualquiera de los servidores con `Ctrl+C`.

## Probar el servidor de la imagen

Necesitas Docker, Bash y curl. Usa únicamente un destino local para esta prueba.

```sh
docker build -t portfolio:prueba .
docker run --rm --name portfolio-prueba -p 8080:80 portfolio:prueba
```

Cuando el servidor esté listo, en otra terminal:

```sh
scripts/smoke-server.sh http://127.0.0.1:8080
```

El script comprueba páginas válidas, 404 reales, caché de errores y recursos, y redirección del dominio anterior.
La configuración de Nginx y las expectativas del script deben coincidir.
Detén el contenedor con `Ctrl+C` en su terminal al terminar.

## Publicación automatizada

Un push que solo cambia `README.md`, `ARCHITECTURE.md` o `docs/**` no ejecuta el flujo.
Una ejecución manual sí puede ejecutarlo.
Las comprobaciones se hacen antes de publicar la imagen; el trabajo de publicación solo corre en `main`.
Sin los dos secretos del orquestador, la imagen se publica y el despliegue se omite.
Con ambos secretos, el flujo pide el despliegue y consulta el sitio publicado.

Los puertos, cachés, variables y límites externos están en [la vista de despliegue](../ARCHITECTURE.md#5-vista-de-despliegue).
Los motivos documentados están en [las decisiones](../ARCHITECTURE.md#7-decisiones).
