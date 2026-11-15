---
name: tacuchi.dev
description: Sitio personal de Jesús Loayza Tacuchi, presentado como catálogo de fichas técnicas.
colors:
  paper: "#e6e6e2"
  ink: "#111111"
  mute: "#5c5c56"
  card: "#d9d9d4"
  raise: "#f1f1ee"
  panel: "#111111"
  panel-ink: "#e6e6e2"
  panel-mute: "#a3a39b"
  act: "oklch(0.87 0.125 128)"
  on-act: "#111111"
  paper-dark: "#121211"
  ink-dark: "#e6e6e2"
  mute-dark: "#a3a39b"
  card-dark: "#1c1c1a"
  raise-dark: "#2b2b28"
  panel-dark: "#262624"
  act-dark: "oklch(0.9 0.21 128)"
typography:
  display:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "10.5rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  lead:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1.4375rem"
    fontWeight: 400
    lineHeight: 1.3
  body:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    letterSpacing: "0.08em"
rounded:
  sm: "0.375rem"
  md: "0.5rem"
spacing:
  box-gap: "0.375rem"
  gutter: "clamp(1rem, 4.4vw, 4rem)"
components:
  button:
    backgroundColor: "{colors.act}"
    textColor: "{colors.on-act}"
    rounded: "{rounded.sm}"
    padding: "0.625rem 1.125rem"
  ficha:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.panel-ink}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.5rem 1.5rem"
  box:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "1.125rem 1.25rem 1.25rem"
  figure-step:
    backgroundColor: "{colors.raise}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    height: "4.25rem"
  figure-step-key:
    backgroundColor: "{colors.act}"
    textColor: "{colors.on-act}"
    rounded: "{rounded.sm}"
  index-tab:
    backgroundColor: "{colors.card}"
    textColor: "{colors.mute}"
    rounded: "{rounded.md}"
  index-tab-current:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.panel-ink}"
    rounded: "{rounded.md}"
  nav-current:
    backgroundColor: "{colors.act}"
    textColor: "{colors.on-act}"
    rounded: "{rounded.sm}"
---

# Design System: tacuchi.dev

## Overview

**Creative North Star: "La ficha técnica"**

Cada herramienta se presenta como un producto de catálogo industrial: nombre de modelo enorme, una figura de su mecanismo sobre cuadrícula de plano y una ficha numerada. El nombre de la persona va detrás de las herramientas, en una franja discreta.

El sistema es sobrio y plano. No hay reglas ni sombras: todo se separa por cajas de tono. El único color es un acento lima que solo aparece como relleno y que deriva despacio de tono.

**Key Characteristics:**
- Una sola familia tipográfica (Archivo) hace todo el trabajo.
- Cajas de tono en lugar de líneas; una placa oscura para la ficha.
- Acento lima apagado en claro y fosforescente en oscuro.
- Figuras hechas solo de geometría, sin ilustración.
- Movimiento lento y escaso; nada con «reducir movimiento».

## Colors

Papel gris neutro, tinta casi negra y un único acento lima.

### Primary
- **Lima** (`act`): relleno de lo accionable y de la pieza clave de cada figura; color de los números dentro de la ficha. El tono deriva entre 118 (chartreuse) y 160 (menta) en un ciclo de 26 s, desfasado por lámina. En tema oscuro pasa a `act-dark`.

### Neutral
- **Papel** (`paper`): fondo de página.
- **Tinta** (`ink`): texto y conectores de las figuras.
- **Gris de apoyo** (`mute`): texto secundario.
- **Caja** (`card`): fondo de cajas, pestañas y del plano de la figura.
- **Pieza** (`raise`): cajas de paso dentro de la figura.
- **Placa** (`panel`, `panel-ink`, `panel-mute`): la ficha y el estado activo o de paso del cursor.
- Las variantes `-dark` son el tema oscuro, compuesto aparte: la placa se aclara (`panel-dark`) en vez de invertirse.

### Named Rules
**La regla del relleno.** La lima nunca es texto ni trazo fino sobre el papel claro. Va como relleno con texto `on-act` encima, o como número sobre la placa oscura.

**La regla del tono propio.** Cada lámina y cada pestaña lleva su propio tono del acento (`data-hue` con índice `--i`).

## Typography

**Display Font:** Archivo (con Helvetica Neue, Helvetica, Arial)
**Body Font:** Archivo

**Character:** grotesca pesada y apretada para los nombres de modelo; el mismo dibujo en peso normal para leer. Cifras tabulares en todo el sitio.

### Hierarchy
- **Display** (700, hasta 10.5rem, 1): nombre de modelo. Su tamaño se calcula para que el nombre llene el ancho disponible.
- **Headline** (700, 1.75 a 2.25rem, 1.1): títulos de sección.
- **Title** (700, 1.25rem, 1.2): cargo en la trayectoria y títulos de caja.
- **Lead** (400, 1.19 a 1.44rem, 1.3): frase de cada herramienta; máximo 40rem.
- **Body** (400, 1.0625rem, 1.5): texto corrido; máximo 68ch.
- **Label** (700, 0.8125rem, +0.08em, mayúsculas): rótulo de la ficha.

### Named Rules
**La regla del nombre a medida.** El nombre de modelo nunca se parte en escritorio: su cuerpo baja hasta caber en la fila.

## Layout

Página de hasta 90rem con margen lateral fluido (`gutter`). Franja superior fija con nombre, titular y menú; en móvil se recoge y deja solo el menú.

Cada lámina ocupa una pantalla en escritorio: nombre de modelo en fila propia y, debajo, dos columnas 7/5 (frase y figura a la izquierda, ficha a la derecha). Bajo 64rem todo pasa a una columna.

El índice de láminas (01–05) queda fijo al pie mientras se recorre el catálogo y marca la lámina visible.

Las listas (proyectos, trayectoria, tecnologías) son pilas de cajas separadas por `box-gap`.

## Elevation & Depth

Plano. La profundidad se da por tono: papel, caja, pieza y placa. No hay sombras ni bordes.

### Named Rules
**La regla sin líneas.** Ninguna regla separa contenido. Si dos cosas deben separarse, van en cajas distintas o con espacio.

## Shapes

Cajas rectangulares con esquinas apenas redondeadas (`rounded.md` en cajas, `rounded.sm` en piezas y botones). Los únicos trazos son los conectores y flechas de las figuras (2px en tinta) y la cuadrícula del plano (24px).

## Components

### Buttons
- **Shape:** esquina `rounded.sm`.
- **Primary:** relleno lima con texto `on-act`, peso 700.
- **Hover / Focus:** sube 2px (160 ms); anillo de foco de 2px en tinta (claro) o lima (oscuro).

### Cards / Containers
- **Caja:** fondo `card`, esquina `rounded.md`, sin borde ni sombra.
- **Caja de proyecto:** toda la caja es el enlace; al pasar el cursor o recibir foco se vuelve placa y su número pasa a lima.
- **Ficha:** placa oscura con rótulo y números de fila en lima, fila «Hecho con» y botones al pie.

### Navigation
- **Menú:** texto simple; la página actual va resaltada con relleno lima.
- **Índice de láminas:** cinco pestañas `card`; la actual es placa con su número en lima.
- **Selector de tema:** tres opciones de texto en el pie; la activa lleva un punto lima.

### Figura
- **Plano:** caja `card` con cuadrícula de 24px.
- **Piezas:** cajas `raise`; la pieza clave va en lima. Conectores y flechas en tinta.
- **Movimiento:** las piezas entran en orden una sola vez cuando aparece la lámina.
- Solo geometría: flujo en cadena o entradas, núcleo y salidas. En móvil la figura pasa a vertical.

## Do's and Don'ts

### Do:
- **Do** separar con cajas de tono o con espacio.
- **Do** usar la lima solo como relleno con texto negro, o como número sobre la placa.
- **Do** dejar que los proyectos lleven el peso; el nombre de la persona va en la franja.
- **Do** respetar `prefers-reduced-motion`: sin deriva de tono ni entradas.

### Don't:
- **Don't** añadir reglas, bordes ni sombras.
- **Don't** usar la lima como texto o trazo fino sobre el papel claro.
- **Don't** añadir emoji, insignias de tecnología ni una portada «Hola, soy».
- **Don't** sumar animación llamativa: el movimiento es lento y escaso.
- **Don't** usar una segunda familia tipográfica.
