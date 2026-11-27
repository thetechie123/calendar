import { getRobotsDirective, getRouteMetadata } from '../src/utils/seoMetadata.js';

const ROUTE_METADATA_BLOCK = /<!-- route-metadata:start -->[\s\S]*?<!-- route-metadata:end -->/;

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

export function renderRouteHtml(appShell, pathname) {
  if (!ROUTE_METADATA_BLOCK.test(appShell)) {
    throw new Error('Missing route metadata block in index.html');
  }

  const meta = getRouteMetadata(pathname);
  const tags = [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="robots" content="${getRobotsDirective(meta)}" />`,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:title" content="${escapeHtml(meta.ogTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.ogDescription)}" />`,
    `<meta property="og:url" content="${escapeHtml(meta.ogUrl)}" />`,
    `<meta name="twitter:title" content="${escapeHtml(meta.twitterTitle)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.twitterDescription)}" />`,
  ];

  if (meta.canonical) {
    tags.push(`<link rel="canonical" href="${escapeHtml(meta.canonical)}" />`);
  }

  return appShell.replace(ROUTE_METADATA_BLOCK, () => tags.join('\n    '));
}

export default function staticSeoPages() {
  return {
    name: 'static-seo-pages',
    apply: 'build',
    generateBundle: {
      order: 'post',
      handler(_options, bundle) {
        const appShell = bundle['index.html'].source;
        this.emitFile({
          type: 'asset',
          fileName: 'about.html',
          source: renderRouteHtml(appShell, '/about'),
        });
      },
    },
  };
}
