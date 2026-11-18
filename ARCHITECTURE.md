# Arquitectura de developer-portfolio

Revisado el 2026-11-18 contra la versión 0.0.1 (commit `a67fe67`).

Este documento da la vista general: qué partes existen, cómo se hablan y qué reglas no se rompen.
Describe el sitio público, su generación estática y su receta de publicación.
No describe la implementación de la api ni las rutas del enrutador.
Todos los valores son los de por defecto; nada aquí se midió en una máquina concreta.
Los dominios y destinos propios se representan con marcadores.

## 1. Propósito y metas de calidad

El sitio público presenta proyectos, trayectoria y contacto mediante un catálogo de fichas técnicas.
Astro genera las páginas desde datos TypeScript; Nginx sirve los archivos resultantes.
Un visitante puede recorrer proyectos, abrir perfiles externos y seguir el enlace al CV.

Qué no es:

- No es el panel: no tiene una pantalla para subir o administrar versiones del CV.
- No es la api: no genera ni guarda el documento enlazado en `/cv`.
- No ejecuta un servidor Node en la imagen final: ejecuta Nginx.
- No consulta la base de datos: el contenido del sitio procede de archivos del repositorio.

| Meta | Escenario |
|---|---|
| Contenido consistente | La lista y las fichas usan el mismo arreglo de proyectos; una comprobación revisa el HTML generado. |
| Identidad encontrable | La plantilla declara canónica, vista previa y datos estructurados; se genera un sitemap. |
| Errores recuperables | Una ruta inexistente responde 404 con `no-store`, sin dejar una hoja de estilos ausente en caché. |
| Tema persistente | El visitante elige claro, oscuro o sistema; la elección queda en su navegador. |
| Publicación comprobable | El flujo comprueba el sitio y el servidor de la imagen antes de publicar; verifica HTTP después del despliegue. |

## 2. Contexto y alcance

![Diagrama de contexto de developer-portfolio](docs/architecture/context.svg)

[Versión interactiva](docs/architecture/context.html): descarga el archivo y ábrelo en un navegador.

| Interfaz externa | Dirección | Cuándo ocurre |
|---|---|---|
| Visitante y buscadores | Entrante al servidor web | Al solicitar páginas, imágenes, estilos, fuentes o sitemap. |
| Perfiles y proyectos externos | Saliente desde el navegador | Al pulsar un enlace; no se consultan mediante un cliente HTTP de la aplicación. |
| Aplicación de correo | Saliente, enlace `mailto:` | Al pulsar el enlace de contacto. |
| La api, mediante `/cv` | Saliente desde el navegador | Al pulsar «Descargar CV». El código declara el destino y el enrutador. |
| GitHub Container Registry | Saliente desde GitHub Actions | Al publicar la imagen desde `main`, después de las comprobaciones. |
| El orquestador | Saliente desde GitHub Actions | Con los dos secretos configurados: cambia la etiqueta de imagen y solicita el despliegue. |
| El sitio público y su dominio antiguo | Saliente desde GitHub Actions | Después de solicitar el despliegue: comprueba respuesta 200 y redirección. |

El vínculo de CV es un contrato declarado; el enrutador no se implementa en este sitio.
Las rutas del enrutador viven en el repositorio de la api.
`nginx.conf` no define una ruta especial para `/cv`; tampoco hay una página Astro para ella.
Las rutas externas y la respuesta efectiva de la api quedan fuera de la evidencia de este repositorio.
No se observa una conexión con el panel, el lector local ni la base de datos.

## 3. Bloques de construcción

![Diagrama de contenedores de developer-portfolio](docs/architecture/containers.svg)

[Versión interactiva](docs/architecture/containers.html): descarga el archivo y ábrelo en un navegador.

| Bloque | Responsabilidad | Código |
|---|---|---|
| Datos de identidad | Define titular, contacto, perfiles, imagen y enlace al CV. | `src/data/site.ts` |
| Catálogo y trayectoria | Define proyectos, sus fichas y la experiencia profesional. | `src/data/projects.ts`, `src/data/experience.ts` |
| Páginas estáticas | Compone inicio, catálogo, fichas, trayectoria y error 404. | `src/pages/` |
| Plantilla común | Comparte cabecera, pie, metadatos y arranque del tema. | `src/layouts/BaseLayout.astro` |
| Componentes visuales | Presenta fichas, esquemas, navegación y enlaces. | `src/components/` |
| Tema | Guarda la preferencia y aplica el modo claro, oscuro o del sistema. | `src/stores/theme.ts`, `src/components/ThemeToggle.tsx` |
| Estilos y fuente | Compila Tailwind y carga Archivo desde el propio sitio. | `src/styles/global.css`, `public/fonts/` |
| Construcción | Integra Preact, sitemap y Tailwind con Astro. | `astro.config.mjs`, `package.json` |
| Servidor final | Sirve el contenido estático y aplica error, caché y redirección. | `Dockerfile`, `nginx.conf` |
| Comprobaciones y publicación | Revisa HTML, prueba la imagen y pide el despliegue. | `scripts/check-site.mjs`, `scripts/smoke-server.sh`, `.github/workflows/deploy.yml` |

Reglas que no se rompen:

- Las páginas de detalle se generan desde el arreglo de proyectos con `getStaticPaths`.
- La lista separa destacados y otros proyectos a partir del mismo arreglo.
- `/cv` es un enlace: no se genera como página ni entra al sitemap.
- El componente Preact del selector se hidrata cuando el pie se hace visible.
- El tema inicial se aplica en la cabecera, antes de renderizar el cuerpo.
- Una ruta inexistente responde 404; la página de error lleva `noindex` y `no-store`.
- Un push que solo cambia `README.md`, `ARCHITECTURE.md` o `docs/**` no ejecuta el flujo.
- El trabajo que publica la imagen y despliega solo corre en `main`; sin secretos omite el despliegue.

## 4. Vista de ejecución

Construir y leer el sitio:

1. `npm run build` ejecuta Astro y carga los datos TypeScript y los recursos públicos.
2. `getStaticPaths` enumera los proyectos y crea una ficha por cada `slug`.
3. La plantilla añade metadatos, navegación y pie a cada página; sitemap se integra en la construcción.
4. La imagen final copia `dist/` y Nginx atiende las solicitudes sin ejecutar Astro.
5. Al recibir HTML, el navegador lee `theme`, con `system` como valor inicial si falta.
6. Al hacerse visible el selector, Preact permite cambiar el tema y persistir la elección.
7. Un clic en «Descargar CV» abre `/cv`; la entrega necesita el enrutador declarado.

Publicar desde el flujo automatizado:

1. Un push que supera el filtro de rutas, o una ejecución manual, inicia el flujo.
2. El trabajo `test` instala, construye y comprueba el HTML generado.
3. Construye y arranca una imagen temporal; el script comprueba códigos HTTP, caché y redirección.
4. Solo en `main`, el siguiente trabajo publica una imagen `linux/amd64` con etiquetas SHA y `latest`.
5. Si existen ambos secretos, cambia la imagen del orquestador a la etiqueta SHA y solicita el despliegue.
6. Comprueba hasta 30 veces el inicio y la redirección del dominio antiguo; espera 10 segundos entre intentos fallidos.
7. Si ninguna comprobación cumple ambas condiciones, el trabajo termina con error.

## 5. Vista de despliegue

| Qué | Por defecto | Cuándo aplica | Cómo cambiarlo |
|---|---|---|---|
| Construcción | `npm run build`, salida `dist/` | Al generar el sitio | Script `build` y configuración de Astro. |
| Runtime de construcción | `node:22-alpine`; Node 22 en CI | Imagen de construcción y comprobaciones | `Dockerfile` y paso `setup-node`. No se declara `engines` en el paquete. |
| Runtime final | `nginx:alpine` | Imagen publicada | Etapa final del `Dockerfile`; las bases no están fijadas por digest. |
| Puerto del servidor final | HTTP 80 | Dentro del contenedor | `listen` en Nginx y `EXPOSE` en la imagen; el mapeo exterior pertenece al despliegue. |
| Raíz de archivos | `/usr/share/nginx/html` | Dentro del contenedor | `root` de Nginx y destino del `COPY`. |
| Dominio canónico | Fijado en código; aquí `https://<tu-dominio>` | Canónicas, vista previa, sitemap y comprobaciones | Coordinar Astro, robots, Nginx, scripts de comprobación y workflow. No hay variable de entorno para ello. |
| Dominio antiguo | Fijado en código; aquí `<dominio-anterior>` | Solicitudes con ese host | Bloque de redirección Nginx y comprobaciones; responde 301 y conserva la ruta. |
| Estilos generados y fuentes | `/_astro/` y `/fonts/`: un año, `immutable` | Respuestas de esos recursos | Bloques `location` de Nginx. |
| Imágenes sin huella | Un día | Extensiones de imagen configuradas | Bloque por extensiones de Nginx. |
| Errores | `/404.html`, interno, `no-store` | Ruta o recurso inexistente | `error_page` y bloque exacto de Nginx. |
| Tema | Clave `theme`, valor `system` | Navegador sin preferencia guardada | Selector; valor inicial en store y plantilla. |
| Imagen publicada | `ghcr.io/<owner>/developer-portfolio`, etiquetas SHA y `latest` | Trabajo de publicación en `main` | `IMAGE` y etiquetas del workflow. El despliegue usa SHA. |
| Orquestador | Dirección fijada en el workflow; aquí `https://<tu-orquestador>` | Solo con ambos secretos | `COOLIFY_URL`, secretos `COOLIFY_TOKEN` y `COOLIFY_APP_UUID`. |
| Serialización | Una ejecución por referencia; no cancela las anteriores | Flujo automatizado | `concurrency` del workflow. |

Requisitos: Node y npm para construir; la receta y CI usan Node 22.
El repositorio no fija una versión mínima mediante `engines` ni una matriz de sistemas operativos.
La publicación configurada construye para `linux/amd64` y requiere Docker en el ejecutor de CI.
Los secretos viven en GitHub Actions; sus valores no forman parte del sitio ni de esta documentación.

Para desarrollo y vista previa existen los comandos de Astro del paquete.
No hay una segunda receta de hosting en el repositorio.
TLS, DNS, la ruta de `/cv` y la configuración del orquestador no están definidos aquí.

## 6. Conceptos transversales

Datos y privacidad:

| Pregunta | Respuesta |
|---|---|
| ¿Qué sale de la máquina y adónde va? | El servidor entrega páginas y recursos públicos. El navegador solicita esos archivos y, por clic, abre destinos externos o `/cv`. El CI publica la imagen en GHCR y llama al orquestador. |
| ¿Qué nunca sale de ella? | El código no envía la preferencia `theme` a un servidor. No implementa cargas de CV, formularios ni telemetría del visitante. |
| ¿Cuándo ocurre? | Al cargar páginas, seguir enlaces o ejecutar el flujo. Elegir tema solo actualiza el estado y almacenamiento del navegador. |
| ¿Dónde se guarda y por cuánto tiempo? | El contenido fuente queda en el repositorio y el generado en `dist/` e imagen. `theme` no tiene caducidad programada. No se configuran aquí retenciones de registros, imágenes del registry ni del CV. |
| ¿Cómo ver exactamente lo enviado? | La pestaña Red del navegador muestra las solicitudes; Almacenamiento muestra `theme`. El código de envío del CI está en el workflow. No hay un visor propio de tráfico. |
| ¿Cómo se apaga? | No abrir los enlaces evita esas navegaciones. Borrar `theme` restablece el modo sistema; no hay interruptor de persistencia. El flujo omite despliegue sin ambos secretos, pero en `main` sigue publicando la imagen. |

Seguridad:

- Las páginas se sirven sin autenticación; este repositorio no configura el proxy de acceso.
- Los enlaces que abren otra pestaña declaran `noopener noreferrer`.
- El CV no pasa por un cliente HTTP con credenciales dentro del sitio.
- GitHub Actions usa permiso de lectura para comprobar y permiso de escritura de paquetes para publicar.
- Las llamadas al orquestador llevan un token obtenido de secretos; aquí solo se nombran las variables.
- El puerto de Nginx es HTTP; este repositorio no demuestra dónde termina TLS.

Persistencia:

- Datos del perfil, proyectos y trayectoria: archivos TypeScript versionados, leídos durante la construcción.
- Preferencia de tema: `localStorage`, a través de Nanostores; sin base de datos ni migraciones propias.
- Los archivos del CV y su historial no se almacenan ni administran en este repositorio.

## 7. Decisiones

| Decisión | Registro |
|---|---|
| No guardar respuestas 404 en caché durante cambios de versión | [0001](docs/decisions/0001-no-guardar-404-en-cache.md) |
| Verificar el despliegue por la respuesta pública del sitio | [0002](docs/decisions/0002-verificar-el-sitio-por-http.md) |
| Servir `/cv` por el enrutador y conservar el contenedor estático | [0003](docs/decisions/0003-servir-cv-por-el-enrutador.md) |

No registrado aún:

- Motivo de elegir Astro estático y Nginx, frente a renderizar cada solicitud.
- Motivo de elegir Preact y Nanostores para el tema.

## Anexo: evidencia

Los números de línea refieren al commit `a67fe67`. El texto de arriba no enlaza al código a propósito.

| Sección | Evidencia |
|---|---|
| 1. Propósito | `src/data/projects.ts:214-227`, `src/pages/index.astro:20-40`, `src/pages/about.astro:49-83`, `Dockerfile:1-12` |
| 1. Qué no es | `src/data/site.ts:10-11`, `Dockerfile:8-12`, `src/pages/projects/[slug].astro:6-13`. La búsqueda de clientes HTTP, formularios y acceso a bases de datos en el código no muestra esos mecanismos. |
| 1. Metas | `src/pages/projects/index.astro:16-29`, `src/layouts/BaseLayout.astro:16-28`, `src/layouts/BaseLayout.astro:43-63`, `astro.config.mjs:9-11`, `nginx.conf:14-18`, `src/stores/theme.ts:3-16`, `.github/workflows/deploy.yml:37-50` |
| 2. Contexto | `src/components/Footer.astro:7-19`, `src/components/Ficha.astro:29-36`, `src/pages/about.astro:75-81`, `src/data/site.ts:10-11`, `nginx.conf:10-12`, `.github/workflows/deploy.yml:73-97`, `.github/workflows/deploy.yml:99-111` |
| 3. Bloques | `src/data/site.ts:3-17`, `src/data/projects.ts:6-15`, `src/pages/about.astro:49-66`, `src/layouts/BaseLayout.astro:2-5`, `src/stores/theme.ts:1-16`, `src/components/ThemeToggle.tsx:10-19`, `src/styles/global.css:1-9`, `astro.config.mjs:2-12`, `scripts/check-site.mjs:7-13`, `scripts/smoke-server.sh:30-55` |
| 3. Reglas | `src/pages/projects/[slug].astro:8-13`, `src/data/projects.ts:232-233`, `src/data/site.ts:10-11`, `scripts/check-site.mjs:324-328`, `src/components/Footer.astro:23`, `src/layouts/BaseLayout.astro:65-71`, `src/pages/404.astro:5`, `nginx.conf:7-18`, `.github/workflows/deploy.yml:8-15`, `.github/workflows/deploy.yml:52-61` |
| 4. Lectura y tema | `package.json:5-10`, `src/pages/projects/[slug].astro:8-13`, `astro.config.mjs:7-12`, `Dockerfile:6-12`, `src/layouts/BaseLayout.astro:65-83`, `src/components/Footer.astro:23`, `src/components/ThemeToggle.tsx:10-19`, `src/stores/theme.ts:5-16`, `src/pages/about.astro:75-81` |
| 4. Publicación | `.github/workflows/deploy.yml:8-15`, `.github/workflows/deploy.yml:27-50`, `.github/workflows/deploy.yml:52-61`, `.github/workflows/deploy.yml:73-97`, `.github/workflows/deploy.yml:99-111` |
| 5. Despliegue | `Dockerfile:1-12`, `package.json:5-10`, `astro.config.mjs:7-12`, `nginx.conf:1-5`, `nginx.conf:7-34`, `nginx.conf:40-45`, `public/robots.txt:1-4`, `scripts/check-site.mjs:10-13`, `scripts/smoke-server.sh:53-55`, `.github/workflows/deploy.yml:17-24`, `.github/workflows/deploy.yml:33-35`, `.github/workflows/deploy.yml:59-61`, `.github/workflows/deploy.yml:73-97`, `src/layouts/BaseLayout.astro:65-70`, `src/stores/theme.ts:3-5` |
| 6. Privacidad | `src/layouts/BaseLayout.astro:65-71`, `src/stores/theme.ts:1-16`, `src/components/Ficha.astro:29-36`, `src/pages/about.astro:75-81`, `.github/workflows/deploy.yml:73-97`. La búsqueda de `fetch`, `axios`, `XMLHttpRequest`, `WebSocket`, cookies y formularios en `src/` no encontró implementaciones; no se deduce la retención de proveedores externos. |
| 6. Seguridad y persistencia | `nginx.conf:1-12`, `src/components/Footer.astro:7-19`, `src/components/Ficha.astro:29-36`, `src/pages/about.astro:75-81`, `.github/workflows/deploy.yml:27-30`, `.github/workflows/deploy.yml:52-61`, `.github/workflows/deploy.yml:84-97`, `src/data/projects.ts:27-28`, `src/pages/about.astro:3-4`, `src/stores/theme.ts:1-9` |
| 7. Decisiones | `nginx.conf:14-18`, `.github/workflows/deploy.yml:99-111`, `src/data/site.ts:10-11`, `src/pages/about.astro:75-81`, `Dockerfile:8-12`, `nginx.conf:10-12`, `scripts/check-site.mjs:324-328` |
| README y desarrollo | `package.json:1-24`, `Dockerfile:1-12`, `src/components/Header.astro:4-8`, `src/data/projects.ts:214-227`, `scripts/check-site.mjs:1-13`, `scripts/check-site.mjs:46-49`, `scripts/check-site.mjs:95-113`, `scripts/check-site.mjs:315-353`, `scripts/smoke-server.sh:1-6`, `.github/workflows/deploy.yml:8-15`, `.github/workflows/deploy.yml:27-50` |
