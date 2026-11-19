const role = 'Ingeniero de software senior';

export const site = {
  name: 'Jesús Loayza Tacuchi',
  alias: 'Tacuchi',
  role,
  headline: `${role} · apps móviles y plataformas web · herramientas para agentes de IA`,
  // La frase del panel: quién es y a qué se dedica, para quien no es técnico.
  tagline: 'Hago apps y sistemas web desde 2014. Hoy también construyo herramientas para que la IA programe con orden.',
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
