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

**Creative North Star: "La ficha técnica, con la persona a mano"**

En el inicio, un panel oscuro fijo a la izquierda presenta a la persona: isotipo, nombre, titular, una frase en lenguaje simple, el menú y sus enlaces. A la derecha el inicio se lee de corrido (Sobre mí, Experiencia, Proyectos, Contacto). Las subpáginas ocupan todo el ancho, con una barra para volver arriba y el pie con los enlaces. Cada herramienta conserva su página de catálogo industrial: nombre de modelo enorme, una figura de su mecanismo sobre cuadrícula de plano y una ficha numerada.

El sistema es sobrio y plano. No hay reglas ni sombras: todo se separa por cajas de tono. El único color es un acento lima que solo aparece como relleno; el fondo de agua deriva despacio hacia menta.

**Key Characteristics:**
- Una sola familia tipográfica (Archivo) hace todo el trabajo.
- Cajas de tono en lugar de líneas; una placa oscura para la ficha.
- Acento lima apagado en claro y fosforescente en oscuro.
- Figuras hechas solo de geometría, sin ilustración.
- Un fondo de agua: tres manchas lima y menta, difuminadas, que se cruzan despacio.
- Movimiento lento y escaso; nada con «reducir movimiento».

## Colors

Papel gris neutro, tinta casi negra y un único acento lima.

### Primary
- **Lima** (`act`): relleno de lo accionable y de la pieza clave de cada figura; color de los números dentro de la ficha. Fijo en chartreuse (118-128) en la página; solo el fondo de agua deriva hacia menta (giro de tono de 26 s, como filtro, para no repintar la página). En tema oscuro pasa a `act-dark`.

### Neutral
- **Papel** (`paper`): fondo de página.
- **Tinta** (`ink`): texto y conectores de las figuras.
- **Gris de apoyo** (`mute`): texto secundario.
- **Caja** (`card`): fondo de cajas y pestañas; tiñe, difuminado, el plano de la figura.
- **Pieza** (`raise`): cajas de paso dentro de la figura.
- **Placa** (`panel`, `panel-ink`, `panel-mute`): el panel lateral, la ficha y el estado activo o de paso del cursor.
- Las variantes `-dark` son el tema oscuro, compuesto aparte: la placa se aclara (`panel-dark`) en vez de invertirse.

### Named Rules
**La regla del relleno.** La lima nunca es texto ni trazo fino sobre el papel claro. Va como relleno con texto `on-act` encima, o como número sobre la placa oscura. El resaltado de una frase (`mark`) y el periodo del puesto vigente siguen la misma regla: relleno lima, texto `on-act`.


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

**Inicio:** armazón de hasta 80rem con margen lateral fluido (`gutter`). Desde 64rem, dos columnas 5/7: el panel fijo a la izquierda, con la altura de la ventana, y el contenido a la derecha. Bajo 64rem el panel se apila arriba sin quedar fijo y los títulos de sección quedan fijos al hacer scroll.

**Subpáginas** (Sobre mí, proyectos, cada proyecto, error): página de hasta 90rem a todo el ancho. Arriba, la barra con el botón «Volver» (placa) a la izquierda y el isotipo con el nombre a la derecha; abajo, el pie con perfiles, CV, correo y tema. En cada proyecto, el nombre de modelo va en fila propia y, debajo, dos columnas 7/5 (frase y figura a la izquierda, ficha a la derecha); bajo 64rem, una columna.

Las listas (proyectos, trayectoria, tecnologías) son pilas de cajas separadas por `box-gap`.

## Elevation & Depth

Plano. La profundidad se da por tono: papel, caja, pieza y placa. No hay sombras ni bordes.

### Named Rules
**La regla sin líneas.** Ninguna regla separa contenido. Si dos cosas deben separarse, van en cajas distintas o con espacio.

## Shapes

Cajas rectangulares con esquinas apenas redondeadas (`rounded.md` en cajas, `rounded.sm` en piezas y botones). Los únicos trazos son los conectores y flechas de las figuras (2px en tinta) y la cuadrícula del plano (24px), que no tiene borde: se desvanece.

## Components

### Buttons
- **Shape:** esquina `rounded.sm`.
- **Primary:** relleno lima con texto `on-act`, peso 700.
- **Hover / Focus:** sube 2px (160 ms); anillo de foco de 2px en tinta (claro) o lima (oscuro).

### Cards / Containers
- **Caja:** fondo `card`, esquina `rounded.md`, sin borde ni sombra.
- **Caja de proyecto:** toda la caja es el enlace; al pasar el cursor o recibir foco se vuelve placa y su número pasa a lima.
- **Tarjeta del inicio** (puesto o proyecto): caja `card` entera clicable. Al pasar el cursor, las demás tarjetas se apagan, la flecha avanza y aparece en la esquina la muesca lima del isotipo (también con foco). Nada sigue al cursor.
- **Panel:** placa con esquina de 0.75rem. Isotipo de 72px encima del nombre.
- **Ficha:** placa oscura con rótulo y números de fila en lima, fila «Hecho con» y botones al pie.

### Navigation
- **Menú del panel:** rótulos en mayúsculas con una línea delante; marca la sección que se está leyendo. La línea del activo se alarga y pasa a lima.
- **Volver:** en las subpáginas, botón placa con flecha («Volver al inicio» o «Volver a proyectos»).
- **Selector de tema:** tres opciones de texto al pie del panel o de la página; la activa lleva un punto lima.

### Fondo de agua
- Tres manchas difuminadas con el acento (lima, menta y un verde más oscuro) que se mueven, giran y se estiran solas en ciclos de 24, 29 y 34 s; un grano fino evita las bandas.
- Solo se anima `transform`, para no repintar el desenfoque. Con «reducir movimiento» queda quieto.

### Figura
- **Plano:** cuadrícula de 24px sin caja. Se extiende más allá de la figura y se desvanece hacia los cuatro lados; pasa por detrás del texto y de la ficha.
- **Piezas:** cajas `raise`; la pieza clave va en lima. Conectores y flechas en tinta.
- **Atajo:** una ruta que salta pasos va por fuera de la cadena, con su nombre en una pieza pequeña sobre la línea (en agent-workflow, «Quick»).
- **Movimiento:** las piezas entran en orden una sola vez cuando aparece la página del proyecto. Después, solo en los esquemas que representan un proceso (agent-workflow y system-updater), una cuenta recorre cada conector por turno (ciclo de 6 s; tinta en claro, lima en oscuro) y el retorno punteado avanza en su sentido. Los esquemas de estructura (agent-memory, agent-skills, Emotiva) no se mueven.
- Solo geometría: flujo en cadena o entradas, núcleo y salidas. En móvil la figura pasa a vertical.

## Do's and Don'ts

### Do:
- **Do** separar con cajas de tono o con espacio.
- **Do** usar la lima solo como relleno con texto negro, o como número sobre la placa.
- **Do** presentar primero a la persona, en lenguaje simple; los proyectos son la prueba.
- **Do** respetar `prefers-reduced-motion`: sin deriva de tono, fondo de agua, entradas, cuenta ni marcha del retorno.
- **Do** resaltar como mucho una o dos frases por página con `mark`.

### Don't:
- **Don't** añadir reglas, bordes ni sombras.
- **Don't** usar la lima como texto o trazo fino sobre el papel claro.
- **Don't** añadir emoji ni insignias de tecnología.
- **Don't** hacer que algo siga al cursor: fue la variante descartada por parecer copia de otro sitio.
- **Don't** sumar animación llamativa: el movimiento es lento y escaso.
- **Don't** usar una segunda familia tipográfica.
