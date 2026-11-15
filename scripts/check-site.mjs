// Comprueba el sitio generado en dist/ contra lo que el perfil promete.
// Uso: npm run build && npm run check. Solo Node, sin dependencias.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');

const ORIGIN = 'https://tacuchi.dev';
const OLD_HOST = 'portfolio.tacuchi.dev';
const NAME = 'Jesús Loayza Tacuchi';
const HEADLINE =
  'Ingeniero de software senior · apps móviles y plataformas web · herramientas para agentes de IA';
const PROFILES = [
  'https://github.com/Tacuchi',
  'https://www.linkedin.com/in/tacuchi',
  'https://www.npmjs.com/~tacuchi',
];
const FEATURED = ['workline', 'agent-memory', 'agent-skills', 'system-updater', 'emotiva-app'];
const OTHERS = ['family-rag', 'soundfua-desktop', 'ui-spec-generator', 'developer-portfolio'];
// Proyectos con código privado: no deben enlazar a un repo ni a un paquete.
const PRIVATE = ['emotiva-app', 'family-rag'];
// [periodo, empleador, cliente, cargo], del más reciente al más antiguo.
const EXPERIENCE = [
  ['11/2024 – actualidad', 'QTC Servicios Financieros', null, 'Analista Programador Senior'],
  ['09/2023 – 08/2024', 'ValorA (Oregon Foods)', null, 'Desarrollador Senior'],
  ['04/2023 – 08/2023', 'CSTI Corp', 'Oregon Foods', 'Desarrollador Móvil'],
  ['03/2022 – 01/2023', 'Inetum', 'RENIEC', 'Software Engineer'],
  ['02/2020 – 01/2022', 'Experis Perú', 'Ferreyros', 'Desarrollador Android'],
  ['01/2019 – 12/2019', 'Software Enterprise Services (SES)', 'Luz del Sur', 'Analista Programador'],
  ['02/2016 – 12/2018', 'Stefanini IT Solutions', 'Luz del Sur', 'Analista Programador'],
  ['09/2015 – 11/2015', 'B&C Soluciones', 'World Vision Perú', 'Analista Programador'],
  ['09/2014 – 07/2015', 'Sociedad Nacional del Taxista Peruano (SNTP)', null, 'Técnico Programador'],
];

const failures = [];
let checks = 0;
const expect = (ok, message) => {
  checks += 1;
  if (!ok) failures.push(message);
};

if (!existsSync(dist)) {
  console.error('No existe dist/. Corre primero: npm run build');
  process.exit(1);
}

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)],
  );

const decode = (text) =>
  text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

const attr = (tag, name) => {
  const match = tag.match(new RegExp(`\\s${name}="([^"]*)"`));
  return match ? decode(match[1]) : null;
};
const tags = (html, name) => html.match(new RegExp(`<${name}\\b[^>]*>`, 'g')) ?? [];
const meta = (html, key) => {
  const tag = tags(html, 'meta').find(
    (t) => attr(t, 'property') === key || attr(t, 'name') === key,
  );
  return tag ? attr(tag, 'content') : null;
};
const hrefs = (html) =>
  tags(html, 'a')
    .map((t) => attr(t, 'href'))
    .filter(Boolean);

// dist/about/index.html -> /about/
const routeOf = (file) => {
  const parts = relative(dist, file).split(sep);
  parts.pop();
  return parts.length ? `/${parts.join('/')}/` : '/';
};
const fileOfRoute = (route) => join(dist, ...route.split('/').filter(Boolean), 'index.html');

const files = walk(dist);
const pages = files.filter((file) => file.endsWith(`${sep}index.html`) || file === join(dist, 'index.html'));
const htmlOf = new Map(pages.map((file) => [routeOf(file), readFileSync(file, 'utf8')]));

expect(pages.length > 0, 'dist/ no tiene páginas');

// --- Identidad: cabecera y contenido de cada página ---
const emails = new Set();
for (const [route, html] of htmlOf) {
  const at = `página ${route}`;
  const canonical = tags(html, 'link').find((t) => attr(t, 'rel') === 'canonical');
  const canonicalHref = canonical ? attr(canonical, 'href') : null;
  expect(canonicalHref === `${ORIGIN}${route}`, `${at}: canónica esperada ${ORIGIN}${route}, llegó ${canonicalHref}`);

  const title = decode((html.match(/<title>([^<]*)<\/title>/) ?? [])[1] ?? '');
  expect(title.includes(NAME), `${at}: el título no contiene «${NAME}» (llegó «${title}»)`);
  expect(Boolean(meta(html, 'description')), `${at}: falta la descripción`);

  expect(Boolean(meta(html, 'og:title')), `${at}: falta og:title`);
  expect(Boolean(meta(html, 'og:description')), `${at}: falta og:description`);
  expect(meta(html, 'og:url') === canonicalHref, `${at}: og:url no coincide con la canónica`);
  const image = meta(html, 'og:image');
  expect(Boolean(image?.startsWith(`${ORIGIN}/`)), `${at}: og:image debe ser absoluta en ${ORIGIN} (llegó ${image})`);
  if (image?.startsWith(`${ORIGIN}/`)) {
    expect(existsSync(join(dist, image.slice(ORIGIN.length + 1))), `${at}: la imagen ${image} no existe en dist/`);
  }
  expect(meta(html, 'twitter:card') === 'summary_large_image', `${at}: falta twitter:card`);

  const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  let person = null;
  try {
    person = ld ? JSON.parse(ld[1]) : null;
  } catch {
    person = null;
  }
  expect(person?.['@type'] === 'Person', `${at}: faltan los datos estructurados de persona`);
  expect(person?.name === NAME, `${at}: persona.name esperado «${NAME}», llegó «${person?.name}»`);
  expect(person?.jobTitle === HEADLINE, `${at}: persona.jobTitle no es el titular único`);
  for (const profile of PROFILES) {
    expect(Boolean(person?.sameAs?.includes(profile)), `${at}: persona.sameAs no incluye ${profile}`);
  }

  for (const href of hrefs(html)) {
    if (/linkedin\.com/i.test(href)) {
      expect(href === PROFILES[1], `${at}: enlace de LinkedIn inesperado ${href}`);
    }
  }
  for (const profile of PROFILES) {
    expect(hrefs(html).includes(profile), `${at}: falta el enlace al perfil ${profile}`);
  }
  for (const found of decode(html).match(/[\w.+-]+@[\w-]+(\.[\w-]+)+/g) ?? []) emails.add(found.toLowerCase());
}

const home = htmlOf.get('/') ?? '';
const h1 = decode((home.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/) ?? [])[1] ?? '').replace(/<[^>]+>/g, '');
expect(h1.includes(NAME), `inicio: el encabezado no muestra «${NAME}»`);
expect(decode(home.replace(/<head>[\s\S]*?<\/head>/, '')).includes(HEADLINE), 'inicio: el titular único no está visible');

expect(emails.size === 1, `se esperaba un solo correo en el sitio, hay ${emails.size}`);

for (const file of files.filter((f) => /\.(html|xml|txt|js|css|json|svg)$/.test(f))) {
  expect(!readFileSync(file, 'utf8').includes('jloayzaloayza'), `${relative(dist, file)}: contiene el LinkedIn antiguo`);
}

// --- Proyectos: destacados primero, con sus enlaces ---
const projectOrder = (html) => [
  ...new Set(
    hrefs(html)
      .map((href) => (href.match(/^\/projects\/([^/]+)\/?$/) ?? [])[1])
      .filter(Boolean),
  ),
];
const listOrder = projectOrder(htmlOf.get('/projects/') ?? '');
expect(
  listOrder.slice(0, FEATURED.length).join() === FEATURED.join(),
  `proyectos: los primeros deben ser ${FEATURED.join(', ')}; llegó ${listOrder.slice(0, FEATURED.length).join(', ')}`,
);
for (const slug of OTHERS) {
  expect(listOrder.indexOf(slug) >= FEATURED.length, `proyectos: ${slug} debe seguir visible debajo de los destacados`);
}
expect(
  projectOrder(home).join() === FEATURED.join(),
  `inicio: los destacados deben ser ${FEATURED.join(', ')}; llegó ${projectOrder(home).join(', ')}`,
);

const isRepo = (href) => /^https:\/\/github\.com\/Tacuchi\/.+/.test(href);
const isPackage = (href) => /^https:\/\/www\.npmjs\.com\/package\/.+/.test(href);
for (const slug of [...FEATURED, ...OTHERS]) {
  expect(htmlOf.has(`/projects/${slug}/`), `proyectos: falta la página de detalle de ${slug}`);
}
const hasCode = (slug) =>
  hrefs(htmlOf.get(`/projects/${slug}/`) ?? '').some((href) => isRepo(href) || isPackage(href));
for (const slug of FEATURED.filter((slug) => !PRIVATE.includes(slug))) {
  expect(hasCode(slug), `proyectos: ${slug} debe enlazar a su repo o a su paquete`);
}
for (const slug of PRIVATE) {
  expect(!hasCode(slug), `proyectos: ${slug} no debe enlazar a código`);
}
expect(!htmlOf.has('/projects/let-me-know/'), 'proyectos: Let Me Know ya no se publica');
const memoryLinks = hrefs(htmlOf.get('/projects/agent-memory/') ?? '');
expect(
  memoryLinks.includes('https://www.npmjs.com/package/@tacuchi/agent-memory'),
  'proyectos: agent-memory debe enlazar a su paquete de npm',
);
expect(!memoryLinks.some(isRepo), 'proyectos: agent-memory no debe enlazar a un repo');

// --- Trayectoria: todos los puestos, consultora primero y sin jefatura ---
const text = (html) => decode(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const about = htmlOf.get('/about/') ?? '';
const entries = about.split(/<div data-experience\b/).slice(1).map((chunk) => {
  const paragraphs = [...chunk.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)].map((m) => text(m[1]));
  return {
    role: text((chunk.match(/<h3\b[^>]*>([\s\S]*?)<\/h3>/) ?? [])[1] ?? ''),
    period: text((chunk.match(/<span\b[^>]*>([\s\S]*?)<\/span>/) ?? [])[1] ?? ''),
    company: paragraphs[0] ?? '',
    description: paragraphs[1] ?? '',
  };
});
expect(entries.length === EXPERIENCE.length, `sobre mí: se esperaban ${EXPERIENCE.length} puestos, hay ${entries.length}`);
EXPERIENCE.forEach(([period, employer, client, role], index) => {
  const entry = entries[index];
  const at = `sobre mí, puesto ${index + 1} (${employer})`;
  expect(entry?.period === period, `${at}: periodo esperado «${period}», llegó «${entry?.period}»`);
  expect(Boolean(entry?.role.startsWith(role)), `${at}: cargo esperado «${role}», llegó «${entry?.role}»`);
  const company = client ? `${employer} · Cliente: ${client}` : employer;
  expect(entry?.company === company, `${at}: se esperaba «${company}», llegó «${entry?.company}»`);
  expect((entry?.description.length ?? 0) > 40, `${at}: falta la descripción`);
});
const aboutText = text(about.replace(/<head>[\s\S]*?<\/head>/, ''));
for (const word of [/\bl[ií]der/i, /\bjef[ea]s?\b/i]) {
  expect(!word.test(aboutText), `sobre mí: no debe presentar jefatura (${word})`);
}

// --- Un solo dominio: sitemap, robots y redirección ---
const xml = (name) => (existsSync(join(dist, name)) ? readFileSync(join(dist, name), 'utf8') : '');
const locs = (text) => [...text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1]));
const sitemapIndex = xml('sitemap-index.xml');
expect(Boolean(sitemapIndex), 'falta sitemap-index.xml');
const pageLocs = locs(sitemapIndex).flatMap((loc) => {
  expect(loc.startsWith(`${ORIGIN}/`), `sitemap: ${loc} no está en ${ORIGIN}`);
  return locs(xml(loc.slice(ORIGIN.length + 1)));
});
expect(pageLocs.length === htmlOf.size, `sitemap: lista ${pageLocs.length} direcciones y hay ${htmlOf.size} páginas`);
for (const loc of pageLocs) {
  const ok = loc.startsWith(`${ORIGIN}/`) && existsSync(fileOfRoute(loc.slice(ORIGIN.length)));
  expect(ok, `sitemap: ${loc} no corresponde a una página generada`);
}

const robots = xml('robots.txt');
expect(robots.includes(`Sitemap: ${ORIGIN}/sitemap-index.xml`), 'robots.txt no indica la ubicación del sitemap');

const nginx = readFileSync(join(root, 'nginx.conf'), 'utf8');
const serverBlocks = nginx.split(/^server\s*\{/m).slice(1);
const redirectBlock = serverBlocks.find((block) => new RegExp(`server_name\\s+${OLD_HOST.replaceAll('.', '\\.')}\\s*;`).test(block));
expect(Boolean(redirectBlock), `nginx.conf: falta el bloque de ${OLD_HOST}`);
expect(
  Boolean(redirectBlock?.includes(`return 301 ${ORIGIN}$request_uri;`)),
  'nginx.conf: la redirección debe ser 301 y conservar la ruta ($request_uri)',
);
const defaultBlock = serverBlocks.find((block) => /listen\s+80\s+default_server\s*;/.test(block));
expect(Boolean(defaultBlock) && !defaultBlock.includes('return 301'), 'nginx.conf: el servidor por defecto debe servir el sitio, no redirigir');

// --- Rutas inexistentes: 404 de verdad y sin caché ---
expect(existsSync(join(dist, '404.html')), 'falta la página de error 404.html');
expect(xml('404.html').includes('content="noindex"'), '404.html debe pedir a los buscadores que no la listen');
expect(!pageLocs.some((loc) => loc.includes('/404')), 'sitemap: la página de error no debe listarse');
const tryFiles = (defaultBlock?.match(/try_files\s+([^;]+);/) ?? [])[1] ?? '';
expect(tryFiles.trim().endsWith('=404'), `nginx.conf: una ruta inexistente debe responder 404, no otra página (try_files ${tryFiles})`);
expect(/error_page\s+404\s+\/404\.html\s*;/.test(defaultBlock ?? ''), 'nginx.conf: el 404 debe mostrar /404.html');
const errorLocation = (defaultBlock?.match(/location\s+=\s+\/404\.html\s*\{([^}]*)\}/) ?? [])[1] ?? '';
expect(/add_header\s+Cache-Control\s+"no-store"\s+always\s*;/.test(errorLocation), 'nginx.conf: el 404 no debe guardarse en caché (no-store always)');

if (failures.length) {
  console.error(`check: ${failures.length} de ${checks} comprobaciones fallaron`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}
console.log(`check: ${checks} comprobaciones en ${htmlOf.size} páginas, todas pasan`);
