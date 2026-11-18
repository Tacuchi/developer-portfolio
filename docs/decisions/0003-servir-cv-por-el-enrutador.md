---
status: accepted
date: 2026-11-18
---

# Servir /cv por el enrutador y conservar el contenedor estático

Motivo dado por la persona el 2026-11-18, al confirmar el que consta en el plan 002, «cv-en-el-sitio», del proyecto.

## Contexto y problema

El CV debe poder abrirse desde la dirección pública del sitio.
Había que decidir cómo llevar esa solicitud al archivo sin cambiar el contenedor del sitio.

## Opciones consideradas

- Servir `/cv` mediante el enrutador, con una regla más en el archivo de rutas existente.
- Añadir una función en Cloudflare que lea el almacén.

## Resultado de la decisión

Opción elegida: servir `/cv` por el enrutador y conservar el contenedor estático.
El plan explica que basta una regla más en el mismo archivo de rutas que ya usa el relé.
La alternativa descartada añade un segundo sitio donde desplegar para ahorrar un salto.

### Consecuencias

- «Sobre mí» solo añade un enlace «Descargar CV», cuyo destino es `/cv`.
- La imagen final sigue ejecutando Nginx sobre los archivos estáticos generados.
- Nginx no implementa una ruta especial para `/cv`; su entrega depende del enrutador.
- `/cv` no se genera como página del sitio y la comprobación exige excluirlo del sitemap.
