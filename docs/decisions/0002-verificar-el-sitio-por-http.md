---
status: accepted
date: 2026-11-14
---

# El despliegue se verifica por la respuesta pública del sitio

Motivo tomado del comentario del paso «Verificar el sitio publicado» en `.github/workflows/deploy.yml`.

## Contexto y problema

El flujo solicita un despliegue al orquestador y necesita comprobar su resultado.
El comentario indica que la aplicación no tiene healthcheck y el estado del orquestador oscila.
Esa es la justificación registrada; no sustituye una inspección de su configuración externa.

## Opciones consideradas

- Tomar como criterio el estado que anuncia el orquestador.
- Comprobar las respuestas HTTP del sitio y de su dominio antiguo.

## Resultado de la decisión

Opción elegida: comprobar el sitio publicado.
El inicio debe responder 200 y el dominio antiguo debe redirigir a la ruta equivalente.
El flujo repite la comprobación hasta 30 veces y termina con error si no se cumple.

### Consecuencias

- Una solicitud de despliegue aceptada no basta para considerar el flujo correcto.
- La comprobación posterior necesita acceso al sitio publicado y a su dominio antiguo.
- Este criterio verifica disponibilidad y redirección; no compara el contenido con el SHA publicado.
