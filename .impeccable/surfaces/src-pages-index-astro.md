---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/pages/about.astro","src/pages/projects/index.astro","src/pages/projects/[slug].astro"]
---

# Sitio completo (inicio, proyectos, detalle, Sobre mí)

Modo: Experience. Visitantes: devs que llegan por una herramienta y quien evalúa el perfil, con el mismo peso. Éxito: en diez segundos se llevan las herramientas. No cambia: rutas, textos aprobados, titular único, datos en `src/data/`.

## Direction contract

THESIS: cada herramienta es un producto de catálogo industrial, con nombre de modelo, figura de su mecanismo y ficha numerada. Rechaza la portada «Hola, soy» sobre una rejilla de tarjetas con insignias.

OWN-WORLD: papel gris neutro `#e6e6e2`, tinta `#111`, sin reglas: todo separa por cajas. La ficha es una placa oscura con números en el acento; listas y tablas van en cajas grises; la figura va sobre una cuadrícula de plano. Acento lima solo como relleno con texto negro, apagado en claro y fosforescente en oscuro. Una sola grotesca (Archivo); cifras tabulares. Sin sombras ni emoji.

STORY: ve Workline como algo real, entiende qué hace por la figura, confirma en la ficha, sale a npm o GitHub o baja a la lámina siguiente.

FIRST VIEWPORT: franja superior fija con nombre, titular y menú. Nombre de modelo a ~168 px en fila propia. Debajo, izquierda 7/12: frase y figura pedido → spec → plan → ejecución sobre cuadrícula; derecha 5/12: ficha oscura de cinco filas y botones. Abajo, índice de láminas 01–05 en pestañas.

SIGNATURE: el índice de láminas queda fijo y marca la lámina visible. Movimiento: el tono del acento deriva despacio entre chartreuse y menta, desfasado por lámina; las piezas de cada figura entran en orden una vez; estados de 120 a 160 ms. Nada con `prefers-reduced-motion`.

FORM: catálogo de producto y ficha técnica; posición 1 de 7; seed:6e1a13d9b39c2a7e.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
