# Arquitectura de developer-portfolio

Revisado el 2026-11-18 contra la versión 0.0.1 (commit `5afb0a3`).

Este documento da la vista general: qué partes existen, cómo se hablan y qué reglas no se rompen.
Describe el sitio público, su generación estática y su receta de publicación.
No describe la implementación de la api ni las rutas del enrutador.
Todos los valores son los de por defecto; nada aquí se midió en una máquina concreta.
Los dominios y destinos propios se representan con marcadores.

En resumen:

- Presenta proyectos, trayectoria, contacto y un enlace al CV.
- Lo recorren visitantes y buscadores, sin autenticación en el sitio.
- El navegador abre perfiles y la api; el flujo publica en GHCR y llama al orquestador.
- Los datos viven en TypeScript; el tema queda en el navegador.
- Nginx entrega archivos estáticos y nunca guarda errores 404 en caché.

## 1. Propósito y metas de calidad

El sitio público presenta proyectos, trayectoria y contacto mediante un catálogo de fichas técnicas.
Astro genera las páginas desde datos TypeScript; Nginx sirve los archivos resultantes.
Un visitante puede recorrer proyectos, abrir perfiles externos y seguir el enlace al CV.

Qué no es:

- No es el panel: no tiene una pantalla para subir o administrar versiones del CV.
- No es la api: no genera ni guarda el documento enlazado en `/cv`.
- No ejecuta un servidor Node en la imagen final: ejecuta Nginx.

El alcance y las metas complementarias están en [la guía de configuración](docs/configuracion.md#metas-y-alcance).

| Meta | Escenario |
|---|---|
| Contenido consistente | La lista y las fichas usan el mismo arreglo de proyectos; una comprobación revisa el HTML generado. |
| Errores recuperables | Una ruta inexistente responde 404 con `no-store`, sin dejar una hoja de estilos ausente en caché. |
| Publicación comprobable | El flujo comprueba el sitio y el servidor de la imagen antes de publicar; verifica HTTP después del despliegue. |

## 2. Contexto y alcance

![Diagrama de contexto de developer-portfolio](docs/architecture/context.svg)

[Versión interactiva](https://tacuchi.github.io/developer-portfolio/architecture/context.html).

| Interfaz externa | Dirección | Cuándo ocurre |
|---|---|---|
| Visitante y buscadores | Entrante al servidor web | Al solicitar páginas, imágenes, estilos, fuentes o sitemap. |
| Perfiles y proyectos externos | Saliente desde el navegador | Al pulsar un enlace; no se consultan mediante un cliente HTTP de la aplicación. |
| Aplicación de correo | Saliente, enlace `mailto:` | Al pulsar el enlace de contacto. |
| La api, mediante `/cv` | Saliente desde el navegador | Al pulsar «Descargar CV», cuyo destino y enrutador declara el código. |
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

[Versión interactiva](https://tacuchi.github.io/developer-portfolio/architecture/containers.html).

| Bloque | Responsabilidad | Código |
|---|---|---|
| Datos del sitio | Define identidad, contacto, perfiles, CV, proyectos y trayectoria. | `src/data/` |
| Páginas estáticas | Compone inicio, catálogo, fichas, trayectoria y error 404. | `src/pages/` |
| Plantilla común | Comparte cabecera, pie, metadatos y arranque del tema. | `src/layouts/BaseLayout.astro` |
| Componentes visuales | Presenta fichas, esquemas, navegación y enlaces. | `src/components/` |
| Tema | Guarda la preferencia y aplica el modo claro, oscuro o del sistema. | `src/stores/theme.ts`, `src/components/ThemeToggle.tsx` |
| Servidor final | Sirve el contenido estático y aplica error, caché y redirección. | `Dockerfile`, `nginx.conf` |
| Comprobaciones y publicación | Revisa HTML, prueba la imagen y pide el despliegue. | `scripts/check-site.mjs`, `scripts/smoke-server.sh`, `.github/workflows/deploy.yml` |

Los archivos de datos, estilos, fuentes e integraciones se detallan en [bloques y archivos](docs/configuracion.md#bloques-y-archivos).

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

El segundo recorrido es la [publicación automatizada](docs/configuracion.md#publicación-automatizada): comprueba HTML y servidor, publica la imagen y verifica HTTP tras desplegar.

## 5. Vista de despliegue

| Qué | Por defecto | Cuándo aplica | Cómo cambiarlo |
|---|---|---|---|
| Construcción | `npm run build`, salida `dist/` | Al generar el sitio | Script `build` y configuración de Astro. |
| Construcción y servidor | Node 22 y Nginx | Imagen de contenedor | Etapas del `Dockerfile` y configuración de CI. |
| Dominios y caché | Destinos y políticas fijados en código | Respuestas del sitio | Configuración coordinada en [valores de despliegue](docs/configuracion.md#valores-de-despliegue). |
| Tema | Clave `theme`, valor `system` | Navegador sin preferencia guardada | Selector; valor inicial en store y plantilla. |
| Imagen publicada | Etiquetas SHA y `latest` | Publicación en `main` | `IMAGE` y etiquetas del workflow. |
| Orquestador | Despliegue con ambos secretos | Después de publicar | Variables descritas en [publicación de la imagen](docs/configuracion.md#publicación-de-la-imagen). |
| Serialización | Una ejecución por referencia; no cancela las anteriores | Flujo automatizado | `concurrency` del workflow. |

Los puertos, rutas, cachés y destinos completos están en [valores de despliegue](docs/configuracion.md#valores-de-despliegue).

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
| ¿Qué sale de la máquina y adónde va? | El servidor entrega recursos públicos; el navegador abre enlaces y `/cv`; CI publica en GHCR y llama al orquestador. |
| ¿Qué nunca sale de ella? | La preferencia `theme` permanece en el navegador, sin cargas de CV, formularios ni telemetría del visitante. |
| ¿Cuándo ocurre? | Al cargar páginas, seguir enlaces o ejecutar el flujo, mientras elegir tema solo actualiza el navegador. |
| ¿Dónde se guarda y por cuánto tiempo? | Las fuentes quedan en el repositorio, el sitio generado en `dist/` e imagen y `theme` sin caducidad programada. |
| ¿Cómo ver exactamente lo enviado? | Red muestra solicitudes y Almacenamiento muestra `theme`, sin un visor propio de tráfico. |
| ¿Cómo se apaga? | Evitar enlaces impide navegaciones, borrar `theme` restablece sistema y retirar secretos omite el despliegue, conservando la publicación en `main`. |

El detalle de retenciones, envío del CI y persistencia está en [datos, seguridad y persistencia](docs/configuracion.md#datos-seguridad-y-persistencia).

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

Los tres registros están en [la carpeta de decisiones](docs/decisions/).

| Decisión | Registro |
|---|---|
| No guardar respuestas 404 en caché durante cambios de versión | [0001](docs/decisions/0001-no-guardar-404-en-cache.md) |
| Verificar el despliegue por la respuesta pública del sitio | [0002](docs/decisions/0002-verificar-el-sitio-por-http.md) |
| Servir `/cv` por el enrutador y conservar el contenedor estático | [0003](docs/decisions/0003-servir-cv-por-el-enrutador.md) |

No registrado aún:

- Motivo de elegir Astro estático y Nginx, frente a renderizar cada solicitud.
- Motivo de elegir Preact y Nanostores para el tema.

## Anexo: evidencia

Los números de línea refieren al commit `5afb0a3`. El texto de arriba no enlaza al código a propósito.

| Sección | Evidencia |
|---|---|
| 1. Propósito y metas | `src/data/projects.ts:214-227`, `src/pages/projects/index.astro:16-29`, `Dockerfile:1-12`, `nginx.conf:14-18`, `.github/workflows/deploy.yml:37-50` |
| 2. Contexto | `src/components/Footer.astro:7-19`, `src/components/Ficha.astro:29-36`, `src/pages/about.astro:75-81`, `.github/workflows/deploy.yml:73-97`, `.github/workflows/deploy.yml:99-111` |
| 3. Bloques y reglas | `src/pages/projects/[slug].astro:8-13`, `src/layouts/BaseLayout.astro:65-71`, `nginx.conf:7-18`, `.github/workflows/deploy.yml:8-15`, `.github/workflows/deploy.yml:52-61` |
| 4. Ejecución | `astro.config.mjs:7-12`, `Dockerfile:6-12`, `src/layouts/BaseLayout.astro:65-83`, `src/components/Footer.astro:23`, `src/components/ThemeToggle.tsx:10-19` |
| 5. Despliegue | `Dockerfile:1-12`, `package.json:5-10`, `src/stores/theme.ts:3-5`, `.github/workflows/deploy.yml:17-24`, `.github/workflows/deploy.yml:73-97` |
| 6. Transversales | `src/stores/theme.ts:1-16`, `src/components/Ficha.astro:29-36`, `.github/workflows/deploy.yml:52-61`, `.github/workflows/deploy.yml:84-97`, `src/pages/about.astro:3-4` |
| 7. Decisiones | `nginx.conf:14-18`, `.github/workflows/deploy.yml:99-111`, `src/data/site.ts:10-11`, `Dockerfile:8-12`, `scripts/check-site.mjs:324-328` |

La búsqueda de clientes HTTP, formularios y acceso a bases de datos en el código no muestra esos mecanismos.

La búsqueda de `fetch`, `axios`, `XMLHttpRequest`, `WebSocket`, cookies y formularios en `src/` no encontró implementaciones; no se deduce la retención de proveedores externos.
