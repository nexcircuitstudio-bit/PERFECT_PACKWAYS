# Perfect Packways website implementation plan

## Scope and approach

Continue from the user-supplied ZIP, which contains the existing React/Vite website and its user-provided logo and homepage image. Preserve the current visual identity, section order, typography, spacing, animations, interactions, and working components; do not redesign or generate replacement artwork. Work only on the preview project and do not publish.

## Implementation

- Retain the existing Vite + React SPA, routes, components, GSAP/Motion/Lenis effects, CSS, and supplied media. First inspect the full source and existing project notes.
- Keep the included transparent Perfect Packways logo and homepage WebP as the approved visual assets, preserve aspect ratios, and avoid unnecessary image re-encoding.
- Apply the requested navy `#102D60`, burgundy `#A20D36`, and white brand palette consistently to brand elements while preserving appropriate neutral/photo backgrounds and checking contrast.
- Remove Instagram, LinkedIn, and Facebook only from CTA/social prompts in CTA areas; retain unrelated footer/social content unless it is itself part of a CTA, and preserve WhatsApp, telephone, quote and enquiry paths.
- Trace the review component and responsive rules to fix the actual mobile/tablet overlap/clipping/overflow cause while retaining existing desktop multi-card behavior, reviews, controls, and animations.
- Make focused responsive/accessibility/performance improvements only where source inspection or rendered preview shows a problem.
- Improve SEO using the verified existing routes and business facts: route-aware titles/descriptions/canonicals/social tags; route and image semantics; sitemap/robots and structured data with no fabricated claims; add build-time route documents only if compatible with the current stack and within the existing design.
- Declare the required Vite dev command and project port through Webdev configuration, then use the Manus sidebar preview and screenshots for the specified viewports. Keep the preview private/unpublished until the user explicitly asks to publish.

## Project structure

- `src/main.jsx`: route selection, page components, navigation, CTA and page-level content.
- `src/components/`: reusable animations, enquiry form, reviews, floating contact actions, and shared sections.
- `src/data/`: review records and site links.
- `src/styles.css` and component CSS: site styling, responsive rules, brand tokens, carousel presentation.
- `public/`: official logo, homepage image, gallery images, route manifest, favicon/static SEO files.
- `index.html`: initial shell and global metadata.
- `package.json`, lockfile, and `vite.config.js`: dependencies, build, and dev runtime.
- `plan.md` and `TODO.md`: approved implementation approach and requested outcomes.

## Constraints

No rebuild, redesign, fake reviews, fabricated service locations/business information, or AI-generated assets. No new analytics IDs or verification tokens. Preserve the requested maximum of 300 Manus credits by avoiding unnecessary asset generation and broad rewrites; actual platform credit use is not observable from project files. No publication during this task.
