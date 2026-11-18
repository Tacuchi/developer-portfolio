# Configuración y funcionamiento del sitio público

## Metas y alcance

La plantilla declara canónica, vista previa y datos estructurados para facilitar que encuentren el sitio.

## Bloques y archivos

| Detalle | Archivo |
|---|---|
| Titular, contacto, perfiles, imagen y vínculo al CV | `src/data/site.ts` |
| Catálogo de proyectos y fichas | `src/data/projects.ts` |
| Trayectoria profesional | `src/data/experience.ts` |
| Tailwind y fuente Archivo local | `src/styles/global.css`, `public/fonts/` |
| Integración de Preact, sitemap y Tailwind con Astro | `astro.config.mjs`, `package.json` |

## Publicación automatizada

- Una ejecución manual también inicia el flujo.
- El trabajo `test` instala las dependencias antes de las comprobaciones.
- El script prueba códigos HTTP, caché y redirección sobre una imagen temporal arrancada.
- La verificación intenta hasta 30 veces comprobar el inicio y la redirección del dominio antiguo.
- Espera 10 segundos entre intentos fallidos.
- Si ningún intento cumple ambas condiciones, el trabajo termina con error.

## Valores de despliegue

### Construcción y servidor

| Detalle | Valor | Ajuste |
|---|---|---|
| Base de construcción | `node:22-alpine` | Etapa de construcción del `Dockerfile`. |
| Paso de preparación de Node en CI | `setup-node` | Paso del workflow. |
| Base final | `nginx:alpine`, sin bases fijadas por digest | Etapa final del `Dockerfile`. |
| Puerto interno | 80 | `listen` de Nginx y `EXPOSE` de la imagen, con mapeo exterior definido por el despliegue. |
| Raíz de archivos | `/usr/share/nginx/html` | `root` de Nginx y destino del `COPY`. |

### Dominios y caché

| Detalle | Valor | Ajuste |
|---|---|---|
| Dominio canónico | `https://<tu-dominio>` | Coordinar Astro, robots, Nginx, scripts de comprobación y workflow, sin variable de entorno para ello. |
| Dominio antiguo | `<dominio-anterior>` | Bloque de redirección Nginx y comprobaciones, con respuesta 301 que conserva la ruta. |
| Estilos generados y fuentes | `/_astro/` y `/fonts/`: un año, `immutable` | Bloques `location` de Nginx. |
| Imágenes sin huella | Un día | Bloque por extensiones de imagen configuradas en Nginx. |
| Página de error interna | `/404.html` | `error_page` y bloque exacto de Nginx. |

### Publicación de la imagen

| Detalle | Valor | Ajuste |
|---|---|---|
| Ruta de la imagen | `ghcr.io/<owner>/developer-portfolio` | El despliegue usa la etiqueta SHA. |
| Dirección del orquestador | `https://<tu-orquestador>`, fijada en el workflow | `COOLIFY_URL`, secretos `COOLIFY_TOKEN` y `COOLIFY_APP_UUID`. |

## Datos, seguridad y persistencia

- No se configuran aquí retenciones de registros, imágenes del registry ni del CV.
- El código de envío del CI está en el workflow.
- No hay interruptor para desactivar la persistencia del tema.
