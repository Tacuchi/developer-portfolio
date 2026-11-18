---
status: accepted
date: 2026-11-14
---

# Las respuestas 404 no se guardan en caché

Motivo tomado del comentario de `nginx.conf` que precede al bloque de la página de error.

## Contexto y problema

Durante un despliegue conviven dos versiones del sitio durante unos segundos.
Un proxy puede recibir un 404 al solicitar la hoja de estilos de una de ellas.

## Opciones consideradas

- Permitir que un proxy guarde ese 404.
- Marcar la respuesta de error como `no-store`.

## Resultado de la decisión

Opción elegida: responder con `Cache-Control: no-store` también en los errores.
El comentario explica que un 404 almacenado de la hoja de estilos deja el sitio sin estilos.
La página de error es interna y recibe la cabecera con `always`.

### Consecuencias

- Las solicitudes posteriores pueden recuperar el recurso cuando la nueva versión esté disponible.
- La comprobación del servidor cubre una ruta inexistente y un CSS inexistente.
- La política de errores queda separada de la caché larga de recursos existentes.
