export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  features: string[];
  links: ProjectLink[];
  featured?: boolean;
}

const github = (repo: string): ProjectLink => ({
  label: 'Ver en GitHub',
  href: `https://github.com/Tacuchi/${repo}`,
});

const npm = (pkg: string): ProjectLink => ({
  label: 'Ver en npm',
  href: `https://www.npmjs.com/package/${pkg}`,
});

// El orden de este arreglo es el orden en que se muestran.
export const projects: Project[] = [
  {
    slug: 'agent-workflow',
    title: 'agent-workflow',
    featured: true,
    description:
      'Sistema de trabajo para agentes de código: lleva un pedido de spec a plan y a ejecución verificable, con la CLI aw.',
    longDescription: `
      agent-workflow organiza el trabajo con agentes de código en etapas, bucles y artefactos.
      Un requerimiento pasa de borrador a spec refinada, de ahí a un plan de fases verificables
      y luego a la ejecución, con commits que la persona aprueba.

      Su CLI (agent-workflow, o aw) no depende del host: instala los mismos comandos
      en Claude Code, Codex, Gemini CLI, OpenCode y otros.
    `,
    tags: ['TypeScript', 'Node.js', 'CLI', 'Agentes de IA'],
    links: [github('agent-workflow-cli'), npm('@tacuchi/agent-workflow-cli')],
    features: [
      'Flujos SPEC, PLAN y QUICK con comandos /w:*',
      'Planes como secuencia de estados funcionales, cada fase con su prueba',
      'Git seguro: verifica la rama y propone los commits',
      'Base de datos solo por scripts: nunca ejecuta DML ni DDL',
      'Instalable en varios hosts de agentes',
    ],
  },
  {
    slug: 'agent-memory',
    title: 'agent-memory',
    featured: true,
    description:
      'Memoria local para agentes de código: SQLite con búsqueda híbrida, servidor MCP, CLI e integración con Claude Code.',
    longDescription: `
      agent-memory guarda lecciones, decisiones, preferencias y referencias en una base SQLite
      en tu máquina. Las busca por texto y por significado con embeddings locales, y las entrega
      a los agentes mediante un servicio local, un servidor MCP y una integración con Claude Code.

      Todo corre en la máquina. El único paso de red es descargar una vez el modelo de embeddings.
    `,
    tags: ['TypeScript', 'SQLite', 'MCP', 'Embeddings'],
    links: [github('agent-memory'), npm('@tacuchi/agent-memory')],
    features: [
      'Búsqueda híbrida: por texto y por significado',
      'Servidor MCP y servicio local con token',
      'Índice compacto al iniciar cada sesión de Claude Code',
      'Nada se guarda sin que la persona confirme el borrador',
      'Comando doctor para diagnosticar la instalación',
    ],
  },
  {
    slug: 'agent-skills',
    title: 'agent-skills',
    featured: true,
    description:
      'Catálogo personal de skills para agentes de código, agrupadas por dominio y publicadas con versión.',
    longDescription: `
      Repositorio de skills independientes para agentes de código, organizadas por dominio:
      ingeniería, git, backend, frontend, datos, diseño, arquitectura, documentación
      y orquestación de agentes.

      Cada skill se adquiere por separado, en una ruta y una versión exactas,
      y declara su licencia y su historial.
    `,
    tags: ['Agent Skills', 'Markdown', 'JavaScript'],
    links: [github('agent-skills')],
    features: [
      '20 skills propias en 10 dominios',
      'Cada skill con versión, notas de release y licencia',
      'Catálogo generado y verificado por script',
      'Estándares de código, revisión, pruebas y seguridad',
      'Coordinación de agentes bajo cualquier orquestador',
    ],
  },
  {
    slug: 'system-updater',
    title: 'system-updater',
    featured: true,
    description:
      'TUI multiplataforma para actualizar todos los gestores de paquetes del sistema desde un solo flujo.',
    longDescription: `
      Detecta los gestores de paquetes instalados, busca actualizaciones en paralelo y las aplica
      en un flujo lineal: detectar, seleccionar, confirmar, actualizar y resumen.
      Funciona en macOS, Linux y Windows.

      Cada actualización se verifica volviendo a listar los paquetes desactualizados:
      un fallo nunca se reporta como éxito.
    `,
    tags: ['TypeScript', 'Node.js', 'TUI', 'CLI'],
    links: [github('system-updater'), npm('@tacuchi/updater')],
    features: [
      '27 gestores soportados: brew, apt, npm, pip, winget, cargo, flutter y más',
      'Verificación real de cada actualización',
      'Resumen claro: qué se actualizó, qué falló y por qué',
      'Sin permisos de administrador, salvo los gestores que los exigen',
      'Se ejecuta sin instalar: npx @tacuchi/updater',
    ],
  },
  {
    slug: 'emotiva-app',
    title: 'Emotiva App',
    featured: true,
    description:
      'Aplicación móvil para centro psicológico con gestión de citas, notificaciones y autenticación Firebase.',
    longDescription: `
      Aplicación móvil para el Centro Psicológico Emotiva. Permite a los pacientes
      gestionar sus citas, recibir notificaciones y comunicarse con sus terapeutas.
    `,
    tags: ['Flutter', 'Firebase', 'Riverpod', 'Cloud Functions', 'Firestore'],
    links: [],
    features: [
      'Autenticación con Firebase',
      'Gestión de citas',
      'Notificaciones push',
      'Chat en tiempo real',
      'Almacenamiento en la nube',
    ],
  },
  {
    slug: 'family-rag',
    title: 'family-rag',
    description:
      'Asistente familiar con memoria: un agente de IA que conversa por Telegram, recuerda datos y recordatorios de la familia y los busca con RAG híbrido.',
    longDescription: `
      family-rag es un asistente personal para mi familia. Cada miembro le escribe por Telegram:
      el agente guarda lo que importa, lo recuerda cuando hace falta y avisa de los recordatorios.

      Está separado en dos planos. El plano de datos guarda los hechos y la memoria en SQLite,
      con búsqueda por texto y por significado, y es el único que toca la base. El plano de agente
      conecta el modelo de IA con esos datos y aplica permisos por rol y por miembro antes de
      cada consulta. Un panel web administra familias, miembros, memorias y aprobaciones.

      Es un proyecto personal y privado: el código no es público.
    `,
    tags: ['Python', 'FastAPI', 'SQLite', 'RAG', 'SvelteKit', 'TypeScript'],
    links: [],
    features: [
      'Búsqueda híbrida: vectores y texto completo, con fusión RRF',
      'Hechos con vigencia: un dato nuevo invalida al anterior',
      'Permisos por rol y por miembro antes de cada consulta',
      'Recordatorios y resumen diario por Telegram',
      'Panel web de administración y despliegue automático desde CI',
    ],
  },
  {
    slug: 'soundfua-desktop',
    title: 'Soundfua Desktop',
    description:
      'Reproductor de música de escritorio multiplataforma con soporte para hotkeys globales, bandeja del sistema y múltiples ventanas.',
    longDescription: `
      Soundfua es un reproductor de música de escritorio construido con Flutter.
      Soporta Windows, macOS y Linux con funcionalidades nativas como hotkeys globales,
      integración con la bandeja del sistema y múltiples ventanas.
    `,
    tags: ['Flutter', 'Riverpod', 'Drift', 'Desktop', 'Media Kit', 'FFI'],
    links: [github('soundfua_desktop')],
    features: [
      'Reproducción de audio con Media Kit',
      'Hotkeys globales para control',
      'Integración con bandeja del sistema',
      'Soporte multi-ventana',
      'Base de datos local con Drift',
    ],
  },
  {
    slug: 'ui-spec-generator',
    title: 'UI Spec Generator',
    description:
      'Herramienta MCP para generar especificaciones de UI desde diseños de Figma usando IA.',
    longDescription: `
      Herramienta que utiliza el Model Context Protocol (MCP) para conectar con Figma
      y generar especificaciones de UI utilizando inteligencia artificial.
    `,
    tags: ['TypeScript', 'MCP', 'Figma API', 'OpenAI', 'Node.js'],
    links: [],
    features: [
      'Integración con Figma API',
      'Generación de specs con IA',
      'Protocolo MCP',
      'CLI interactivo',
    ],
  },
  {
    slug: 'developer-portfolio',
    title: 'Developer Portfolio',
    description:
      'Este mismo sitio web. Un catálogo de fichas técnicas construido con Astro, Preact y Tailwind CSS.',
    longDescription: `
      Este mismo sitio web. Cada proyecto se presenta como una ficha técnica: nombre, esquema de su
      mecanismo y características numeradas.

      Los datos del perfil, los proyectos y la trayectoria se definen una sola vez, y un script
      comprueba el HTML generado antes de publicar.
    `,
    tags: ['Astro', 'Preact', 'Tailwind CSS', 'Nanostores', 'TypeScript'],
    links: [github('developer-portfolio')],
    features: [
      'Generación estática con Astro',
      'Perfil, proyectos y trayectoria definidos una sola vez',
      'Comprobación automática del HTML generado',
      'Temas claro, oscuro y de sistema',
      'Datos estructurados, vista previa al compartir y sitemap',
    ],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
export const otherProjects = projects.filter((project) => !project.featured);
