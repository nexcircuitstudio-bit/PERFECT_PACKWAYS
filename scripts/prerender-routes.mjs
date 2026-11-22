import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE_NAME, SITE_ORIGIN, SOCIAL_IMAGE, seoPages } from '../src/seoConfig.js';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const distRoot = join(projectRoot, 'dist');
const baseHtml = await readFile(join(distRoot, 'index.html'), 'utf8');
const startMarker = '<!--SEO_ROUTE_CONTENT_START-->';
const endMarker = '<!--SEO_ROUTE_CONTENT_END-->';

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

function replaceMeta(html, pattern, replacement) {
  return html.replace(pattern, replacement);
}

function staticRouteContent(page) {
  const paragraphs = page.paragraphs.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join('');
  const allLinks = seoPages.map(item => `<a href="${escapeHtml(item.path)}">${escapeHtml(item.path === '/' ? 'Home' : item.path.slice(1))}</a>`).join(' · ');
  return `<main class="seo-static-page" style="min-height:100vh;padding:clamp(28px,6vw,80px);font:16px/1.7 Arial,Helvetica,sans-serif;color:#102D60;background:#fff"><nav aria-label="Primary navigation" style="display:flex;flex-wrap:wrap;gap:16px;margin-bottom:48px">${allLinks}</nav><p style="color:#A20D36;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase">${escapeHtml(page.eyebrow)}</p><h1 style="max-width:900px;font-size:clamp(38px,7vw,76px);line-height:1.05">${escapeHtml(page.heading)}</h1>${paragraphs}<p><a href="${escapeHtml(page.linkHref)}" style="display:inline-block;background:#A20D36;color:#fff;padding:12px 18px;font-weight:700">${escapeHtml(page.linkLabel)}</a></p></main>`;
}

function routeJsonLd(page) {
  const canonical = `${SITE_ORIGIN}${page.path}`;
  const itemList = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
    ...(page.path === '/' ? [] : [{ '@type': 'ListItem', position: 2, name: page.title.split('|')[0].trim(), item: canonical }])
  ];
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.description,
    url: canonical,
    isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
    breadcrumb: { '@type': 'BreadcrumbList', itemListElement: itemList }
  };
  return `<script type="application/ld+json" data-route-seo>${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`;
}

for (const page of seoPages) {
  let html = baseHtml;
  const canonical = `${SITE_ORIGIN}${page.path}`;
  html = replaceMeta(html, /<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(page.title)}</title>`);
  html = replaceMeta(html, /<meta name="description"[^>]*>/i, `<meta name="description" content="${escapeHtml(page.description)}" />`);
  html = replaceMeta(html, /<meta name="robots"[^>]*>/i, '<meta name="robots" content="index, follow" />');
  html = replaceMeta(html, /<link rel="canonical"[^>]*>/i, `<link rel="canonical" href="${canonical}" />`);
  html = replaceMeta(html, /<meta property="og:type"[^>]*>/i, '<meta property="og:type" content="website" />');
  html = replaceMeta(html, /<meta property="og:title"[^>]*>/i, `<meta property="og:title" content="${escapeHtml(page.title)}" />`);
  html = replaceMeta(html, /<meta property="og:description"[^>]*>/i, `<meta property="og:description" content="${escapeHtml(page.description)}" />`);
  html = replaceMeta(html, /<meta property="og:url"[^>]*>/i, `<meta property="og:url" content="${canonical}" />`);
  html = replaceMeta(html, /<meta property="og:site_name"[^>]*>/i, `<meta property="og:site_name" content="${SITE_NAME}" />`);
  html = replaceMeta(html, /<meta property="og:image"[^>]*>/i, `<meta property="og:image" content="${SOCIAL_IMAGE}" />`);
  html = replaceMeta(html, /<meta name="twitter:card"[^>]*>/i, '<meta name="twitter:card" content="summary_large_image" />');
  html = replaceMeta(html, /<meta name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`);
  html = replaceMeta(html, /<meta name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`);
  html = replaceMeta(html, /<meta name="twitter:image"[^>]*>/i, `<meta name="twitter:image" content="${SOCIAL_IMAGE}" />`);
  html = html.replace('</head>', `${routeJsonLd(page)}\n  </head>`);

  if (page.path !== '/') {
    const start = html.indexOf(startMarker);
    const end = html.indexOf(endMarker, start + startMarker.length);
    if (start < 0 || end < 0) throw new Error(`SEO route-content markers are missing from index.html for ${page.path}`);
    html = `${html.slice(0, start + startMarker.length)}${staticRouteContent(page)}${html.slice(end)}`;
  }

  const output = page.path === '/' ? join(distRoot, 'index.html') : join(distRoot, page.path.slice(1), 'index.html');
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, html);
}

const sitemapEntries = seoPages.map(page => `  <url><loc>${SITE_ORIGIN}${page.path}</loc></url>`).join('\n');
await writeFile(join(distRoot, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`);
console.log(`Generated ${seoPages.length} clean-route HTML documents and sitemap.xml.`);
