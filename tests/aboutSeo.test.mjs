import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { test } from 'node:test';
import staticSeoPages, { renderRouteHtml } from '../scripts/staticSeoPages.mjs';
import { getRobotsDirective, getRouteMetadata } from '../src/utils/seoMetadata.js';

const appShell = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const publicDir = new URL('../public/', import.meta.url);
const sitemap = readFileSync(new URL('sitemap.xml', publicDir), 'utf8');
const origin = 'https://thetirumalaverse.in';
const aboutUrl = `${origin}/about`;
const title = 'About The Tirumala Verse | Independent Tirumala Guide';
const description = 'Learn about The Tirumala Verse, an independent guide to Tirumala and Tirupati festivals, sevas, and darshan, and the sources behind its calendars and guides.';

test('About metadata is indexable with a clean canonical and matching social metadata', () => {
  for (const pathname of ['/about', '/about/?utm_source=test#mission']) {
    const meta = getRouteMetadata(pathname);
    assert.equal(getRobotsDirective(meta), 'index, follow');
    assert.equal(meta.canonical, aboutUrl);
    assert.equal(meta.title, title);
    assert.equal(meta.description, description);
    assert.equal(meta.ogTitle, title);
    assert.equal(meta.ogDescription, description);
    assert.equal(meta.ogUrl, aboutUrl);
  }
});

test('The initial About HTML contains exactly one set of route metadata', () => {
  const head = renderRouteHtml(appShell, '/about').split('</head>')[0];
  assert.deepEqual(head.match(/<title>[^<]+<\/title>/g), [`<title>${title}</title>`]);
  for (const [attribute, value] of [
    ['name="robots"', 'index, follow'],
    ['name="description"', description],
    ['property="og:title"', title],
    ['property="og:description"', description],
    ['property="og:url"', aboutUrl],
    ['property="og:type"', 'website'],
    ['property="og:image"', `${origin}/logo-512.png`],
    ['name="twitter:title"', title],
    ['name="twitter:description"', description],
  ]) {
    assert.deepEqual(head.match(new RegExp(`<meta\\s+${attribute}[^>]*>`, 'g')), [
      `<meta ${attribute} content="${value}" />`,
    ]);
  }
  assert.deepEqual(head.match(/<link rel="canonical"[^>]*>/g), [
    `<link rel="canonical" href="${aboutUrl}" />`,
  ]);
  assert.ok(!head.includes('noindex'));
});

test('About is in the sitemap and removed routes retain their indexing exclusions', () => {
  assert.equal(sitemap.split(`<loc>${aboutUrl}</loc>`).length, 2);
  const sitemapPaths = readdirSync(publicDir, { recursive: true })
    .filter(file => /sitemap.*\.xml$/i.test(file));
  const listedPaths = sitemapPaths.flatMap(file => {
    const xml = readFileSync(new URL(file, publicDir), 'utf8');
    return Array.from(xml.matchAll(/<loc>\s*(.*?)\s*<\/loc>/g), ([, url]) =>
      new URL(url).pathname.replace(/\/+$/, ''));
  });
  for (const pathname of ['/references', '/temples', '/faqs']) {
    const meta = getRouteMetadata(pathname);
    assert.equal(getRobotsDirective(meta), 'noindex, nofollow');
    assert.equal(meta.canonical, null);
    assert.ok(!listedPaths.includes(pathname));
  }
});

test('The SEO build and hosting rewrites keep About and the SPA fallback', () => {
  const emitted = [];
  staticSeoPages().generateBundle.handler.call(
    { emitFile: file => emitted.push(file) }, {}, { 'index.html': { source: appShell } },
  );
  assert.deepEqual(emitted.map(file => file.fileName), ['about.html']);
  assert.equal(emitted[0].source, renderRouteHtml(appShell, '/about'));
  const redirects = readFileSync(new URL('_redirects', publicDir), 'utf8');
  assert.deepEqual(redirects.trim().split(/\r?\n/).map(line => line.split(/\s+/)), [
    ['/about', '/about.html', '200'],
    ['/*', '/index.html', '200'],
  ]);
});

test('Calendar search, event links, and the calendar alias keep their base canonicals', () => {
  for (const pathname of ['/calendar?search=Garuda', '/calendar?event=123#details', '/calendar-page?event=123']) {
    assert.equal(getRouteMetadata(pathname).canonical, `${origin}/calendar`);
  }
  assert.equal(getRouteMetadata('/?event=123').canonical, `${origin}/`);
});
