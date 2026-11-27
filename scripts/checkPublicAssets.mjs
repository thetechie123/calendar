import { readdirSync } from 'node:fs';

// Vite publishes every file in public, including files ignored by Git.
const approvedFiles = new Set([
  '404.html',
  '_redirects',
  'favicon.ico',
  'llms.txt',
  'logo-192.png',
  'logo-512.png',
  'logo-64.png',
  'manifest.json',
  'robots.txt',
  'sitemap.xml',
  'sitemap_index.xml',
  'sw.js',
]);

const unapproved = readdirSync(new URL('../public/', import.meta.url), { withFileTypes: true })
  .filter(entry => !entry.isFile() || !approvedFiles.has(entry.name))
  .map(entry => entry.name);

if (unapproved.length > 0) {
  throw new Error('Unapproved files in public/: ' + unapproved.join(', ') + '. Move local files out of public/ or build from a clean checkout.');
}
