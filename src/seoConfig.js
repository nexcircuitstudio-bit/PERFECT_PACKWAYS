export const SITE_ORIGIN = 'https://www.perfectpackways.com';
export const SITE_NAME = 'Perfect Packways';
export const SOCIAL_IMAGE = `${SITE_ORIGIN}/homepage_image.webp`;

export const seoPages = [
  {
    path: '/',
    title: 'Perfect Packways | Packers and Movers in Goa',
    description: 'Perfect Packways provides reliable packers and movers services in Goa, including household shifting, office relocation, furniture packing and interstate moving with safe handling.',
    heading: 'Move what matters.',
    eyebrow: 'Packers & movers · Porvorim, Goa',
    paragraphs: [
      'Premium packing, shifting, transportation, and storage for homes, teams, and the journeys in between.',
      'Perfect Packways lists home shifting, villa shifting, car and bike transportation, office shifting, commercial shifting, and godown storage.'
    ],
    linkLabel: 'Plan your move',
    linkHref: '/contact'
  },
  {
    path: '/about',
    title: 'About Perfect Packways | Careful Moving Team',
    description: 'Learn how Perfect Packways plans packing, household shifting, transportation, and storage with careful handling and clear communication.',
    heading: 'Moving is our work. Care is our way.',
    eyebrow: 'About Perfect Packways',
    paragraphs: [
      'Perfect Packways began with a simple belief: the way a move feels matters just as much as where it ends.',
      'The team lists packing, moving, transportation, and storage services, with a focus on practical planning and careful handling.'
    ],
    linkLabel: 'Discuss your move',
    linkHref: '/contact'
  },
  {
    path: '/gallery',
    title: 'Perfect Packways Moving & Packing Gallery',
    description: 'View Perfect Packways packing, moving, and transportation work. Explore the people and careful details behind each move.',
    heading: 'Small details. Big difference.',
    eyebrow: 'Perfect Packways gallery',
    paragraphs: [
      'A glimpse into the people, spaces, and careful in-between moments that make up a Perfect Packways move.',
      'The gallery brings together supplied photographs from packing, moving, and transportation work.'
    ],
    linkLabel: 'Ask about a service',
    linkHref: '/contact'
  },
  {
    path: '/reviews',
    title: 'Perfect Packways Customer Reviews',
    description: 'Read customer-authored Perfect Packways review excerpts about packing, household moves, and vehicle transport. Each rating belongs to its individual review.',
    heading: 'Real words. From real moves.',
    eyebrow: 'Customer stories',
    paragraphs: [
      'Customer-authored review excerpts were supplied for Perfect Packways. Each displayed rating belongs to the individual review; the page does not imply an average rating.',
      'Review excerpts mention packing, local Goa moves, longer routes, and vehicle transportation.'
    ],
    linkLabel: 'Contact Perfect Packways',
    linkHref: '/contact'
  },
  {
    path: '/contact',
    title: 'Contact Perfect Packways | Plan a Move',
    description: 'Contact Perfect Packways in Porvorim, Goa to discuss packing, household shifting, office relocation, interstate moves, and transportation.',
    heading: 'A better move starts here.',
    eyebrow: 'Contact Perfect Packways',
    paragraphs: [
      'Perfect Packways is listed in Porvorim, Goa and serves India. Share your pickup and drop locations to discuss availability for your route.',
      'Call +91 77700 45051, email hello@perfectpackways.com, or prepare an enquiry to continue to WhatsApp.'
    ],
    linkLabel: 'Call +91 77700 45051',
    linkHref: 'tel:+917770045051'
  }
];

export function getSeoPage(pathname = '/') {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/';
  return seoPages.find(page => page.path === normalized) ?? null;
}

function upsertMeta(attribute, key, content) {
  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.append(tag);
  }
  tag.setAttribute('content', content);
}

function upsertCanonical(href) {
  let tag = document.head.querySelector('link[rel="canonical"]');
  if (!tag) {
    tag = document.createElement('link');
    tag.rel = 'canonical';
    document.head.append(tag);
  }
  tag.href = href;
}

export function applyPageMetadata(pathname) {
  if (typeof document === 'undefined') return;
  const page = getSeoPage(pathname);
  if (!page) {
    document.title = 'Page not found | Perfect Packways';
    upsertMeta('name', 'robots', 'noindex, follow');
    upsertMeta('name', 'description', 'The requested Perfect Packways page could not be found.');
    document.head.querySelector('link[rel="canonical"]')?.remove();
    upsertMeta('property', 'og:title', document.title);
    upsertMeta('property', 'og:description', 'The requested Perfect Packways page could not be found.');
    document.head.querySelector('meta[property="og:url"]')?.remove();
    upsertMeta('name', 'twitter:title', document.title);
    upsertMeta('name', 'twitter:description', 'The requested Perfect Packways page could not be found.');
    document.querySelector('script[data-route-seo]')?.remove();
    return;
  }

  const canonical = `${SITE_ORIGIN}${page.path}`;
  document.title = page.title;
  upsertMeta('name', 'description', page.description);
  upsertMeta('name', 'robots', 'index, follow');
  upsertMeta('property', 'og:type', 'website');
  upsertMeta('property', 'og:title', page.title);
  upsertMeta('property', 'og:description', page.description);
  upsertMeta('property', 'og:url', canonical);
  upsertMeta('property', 'og:site_name', SITE_NAME);
  upsertMeta('property', 'og:image', SOCIAL_IMAGE);
  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', page.title);
  upsertMeta('name', 'twitter:description', page.description);
  upsertMeta('name', 'twitter:image', SOCIAL_IMAGE);
  upsertCanonical(canonical);

  document.querySelector('script[data-route-seo]')?.remove();
  const schema = document.createElement('script');
  schema.type = 'application/ld+json';
  schema.dataset.routeSeo = 'true';
  schema.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.description,
    url: canonical,
    isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
        ...(page.path === '/' ? [] : [{ '@type': 'ListItem', position: 2, name: page.title.split('|')[0].trim(), item: canonical }])
      ]
    }
  });
  document.head.append(schema);
}
