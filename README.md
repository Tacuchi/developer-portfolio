# developer-portfolio

> Sitio público de proyectos, trayectoria y contacto, generado con Astro y servido con Nginx.

El sitio público presenta proyectos como fichas técnicas: descripción, esquema, características y enlaces.
Incluye trayectoria profesional, contacto y un enlace al CV.

Los datos viven en TypeScript y las páginas se generan antes de publicar.
Una comprobación revisa el HTML resultante; el tema claro, oscuro o de sistema se guarda en el navegador.

## Instalación

### Antes de instalar: lo que necesitas

- Node.js y npm. La receta de construcción y el flujo usan Node 22; el paquete no declara un mínimo.
- Git para obtener el repositorio.
- Docker solo para trabajar con la imagen de publicación.

### Instalar el paquete

Desde un clon del repositorio:

```sh
git clone https://github.com/<owner>/developer-portfolio.git
cd developer-portfolio
npm ci
```

### Preparar una copia propia

Adapta la identidad, los proyectos y la trayectoria antes de publicar una copia.
Coordina también el dominio canónico, los enlaces y las comprobaciones que fijan esos valores.
Los archivos y ajustes están en [ARCHITECTURE.md](ARCHITECTURE.md#5-vista-de-despliegue).

### Actualización

Trae los cambios del repositorio y reinstala las dependencias con `npm ci`.
Para generar una nueva versión, ejecuta `npm run build` y después `npm run check`.

### Desinstalar

Detén el servidor de desarrollo con `Ctrl+C`.
El proyecto no instala un servicio ni un comando global; puedes retirar tu copia local cuando deje de ser necesaria.

### Plataformas

El repositorio no declara una matriz de sistemas operativos.
El flujo usa Linux y publica una imagen para `linux/amd64`.

## Uso

### Qué puedes recorrer

- Inicio con proyectos destacados y sus fichas.
- Catálogo completo y detalle de cada proyecto.
- «Sobre mí», trayectoria, contacto y enlace «Descargar CV».
- Selector de tema claro, oscuro o del sistema.

El enlace al CV depende de la api mediante el enrutador.
El servidor incluido en este repositorio no entrega ese documento por sí solo.

### Comandos

```sh
npm run dev       # desarrollo con recarga
npm run build     # genera el sitio estático
npm run check     # comprueba el resultado de build
npm run preview   # vista previa del resultado
npm run astro -- --help
```

### Desarrollo y comprobaciones

La guía de [desarrollo](docs/desarrollo.md) explica dónde editar el contenido y qué comprueban los scripts.
La vista previa de Astro y la prueba del servidor Nginx cubren comportamientos diferentes.

## Cómo funciona

Astro convierte los datos y componentes en páginas estáticas.
La imagen final sirve esos archivos con Nginx; Preact activa el selector cuando el pie se hace visible.
La preferencia del tema queda en el navegador, y el CV se abre mediante un enlace a la api.

![Diagrama de contexto de developer-portfolio](docs/architecture/context.svg)

El cuadro completo está en [ARCHITECTURE.md](ARCHITECTURE.md).

## Contribuir

Es un proyecto personal y privado: no se aceptan contribuciones externas. Para trabajar
en el código, ver [docs/desarrollo.md](docs/desarrollo.md).

## Licencia

No hay archivo de licencia ni campo `license` en el manifiesto del paquete.
