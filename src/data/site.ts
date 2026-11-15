const role = 'Ingeniero de software senior';

export const site = {
  name: 'Jesús Loayza Tacuchi',
  alias: 'Tacuchi',
  role,
  headline: `${role} · apps móviles y plataformas web · herramientas para agentes de IA`,
  email: 'jloayza.dev@gmail.com',
  ogImage: '/og.png',
  // La sirve perfil-api por el proxy del servidor: no es una página del sitio ni entra al sitemap.
  cv: '/cv',
  profiles: [
    { label: 'GitHub', href: 'https://github.com/Tacuchi' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tacuchi' },
    { label: 'npm', href: 'https://www.npmjs.com/~tacuchi' },
  ],
};
