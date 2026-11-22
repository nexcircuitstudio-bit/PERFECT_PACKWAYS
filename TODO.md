# TODO

- [x] **Five-page premium packer and mover website**
  - Create Home, About, Gallery, Reviews, and Contact Us routes, with services presented on Home.
  - Use the Perfect Packways logo and the exact tagline “Perfect Packing • Safe delivery”.
  - Use a modern orange, navy blue, and white visual system with a premium feel.
  - Use the supplied transparent PNG logo consistently across the header, footer, favicon, and project branding.
  - Render the supplied logo at a larger, trimmed proportion so the brand name remains legible on desktop and mobile.
  - Replace standalone PP monograms throughout the site with the full Perfect Packways company logo.

- [x] **Scroll-driven home experience**
  - Build a sticky freight / vehicle-handling hero whose visual narrative scrubs with scroll.
  - Follow the hero with an animated services reveal and clear calls to action.

- [x] **Content and trust sections**
  - Present company story, positioning, values, trust-building content, service cards, and gallery showcase.
  - Include packing, moving, freight-handling, and interstate relocation offerings with clear descriptions.
  - Use an original generated About-section visual instead of a potentially copyrighted stock truck image.
  - Replace the generic competitive-edge stamp with an original box-inside-truck PP Care mark based on the brand's own logo motif.

- [x] **Responsive interaction system**
  - Add responsive navigation and footer connecting all five pages.
  - Add mobile-friendly menu behavior.
  - Add scroll reveals and page transitions with reduced-motion behavior.

- [x] **Contact conversion flow**
  - Include company contact details, inquiry calls to action, and a usable validated contact form.
  - Provide inline submission feedback to the visitor.
  - Provide floating and inline WhatsApp actions linked to +91 77700 45051 with a prefilled enquiry message.
  - Capture move type, origin, destination, and preferred date before the visitor submits an enquiry.

- [x] **First-stage site updates**
  - “First increase the logo size and font size”; increase the displayed logo size across the site while maintaining proportions and responsive behavior.
  - Increase text sizes to improve readability while retaining the existing typography and content hierarchy.
  - Preserve the existing Perfect Packways website content without adding or rewriting sections.
  - Keep the React/Vite implementation and ensure the updated site works responsively as a permanent production website.
  - Do not add placeholder images, reviews, or review sections before the client provides the final materials.

- [x] **Permanent public website launch**
  - “Turn it into a permanent website.”
  - Publish the current first-stage website as a permanent publicly accessible website.

- [x] **Replace secondary brand marks with the supplied PP cube image**
  - “In the about section gallery section and contact section remove the logo of perfect packways”; replace only the decorative/secondary marks with the supplied PP_perfect_packways.png where requested.
  - “Add this image in the area where it is written every box has a story in the home page written care from box to doorstep and everywhere where it's needed.”
  - “Just dont change the main logo”; preserve the existing primary Perfect Packways logo in the main site header/branding.

- [x] **Add Home testimonials and a Reviews page**
  - Add a Reviews destination alongside Home, About, Gallery, and Contact; services are presented on Home.
  - “Add these reviews on the home page”; use the authentic Google review text and reviewer names supplied in the user's attachments, omit owner replies, and do not invent, rewrite or misattribute review statements or ratings.
  - Add an “Add a review on Google” action that opens the business's Google review destination; do not imply an unverified average rating.
  - Replace the existing unattributed Ananya R. quote and unverified average-rating claim; show only individual, source-supported review ratings.

- [x] **Integrate the three supplied React Bits components**
  - Use the provided BlurText, RotatingText, and AnimatedContent components in appropriate parts of the existing site.
  - Add the required `motion` and `gsap` dependencies and include the AnimatedContent ScrollTrigger plugin.
  - Preserve readability, responsive layouts, reduced-motion behavior, and the site's existing brand styling.

- [x] **Increase typography further**
  - “Also increase the font size”; enlarge website text further while keeping a clear content hierarchy and responsive sizing.

- [x] **Improve initial page loading speed**
  - “The site is not opening fast; it is taking way too long.”
  - Keep the existing hero visual, but do not download its scroll-scrubbed video on the initial page load; show the poster and load video data only when scroll interaction needs it.
  - Update the hero’s progress only on scroll/resize rather than running an animation-frame loop while idle.
  - Defer the below-the-fold GSAP/AnimatedContent chunk until its callout nears the viewport.
  - Discover Google Fonts and the hero poster connection earlier, without blocking visible fallback text.
  - Preserve the current content, brand design, scroll behavior, responsive layout and reduced-motion support.

- [x] **Add a first-view Home enquiry form while keeping Contact unchanged**
  - “Keep the enquiry form in the contact section same but add one enquiry form on the home page too”; do not remove or alter the current Contact-page enquiry form.
  - Place a second enquiry form at the start of Home so it is available in the first view/first screen on desktop and mobile, without obscuring the main message or breaking the scroll-driven hero.
  - Ask for the user's name, email, phone number, pickup location, drop location, and relocation type, including home sizes (1/2/3 BHK), office, vehicle, packing-only, and intercity/interstate options.
  - Keep the enquiry action transparent: prepare the entered details for the existing business WhatsApp number and clearly let the visitor continue to send them; do not imply the site stores or sends enquiries to a backend.

- [x] **Add Home “Why choose us” and an accessible FAQ**
  - Add a Home-page “Why choose us” section using existing business/service information and the supplied customer feedback; do not invent guarantees, certifications, insurance, tracking, prices, or performance figures.
  - Add 5–8 Home FAQs, including packing materials, approximate move price, available relocation types, packing/unpacking, preparing for moving day, Goa/local service, and intercity/interstate moves.
  - Answer materials with source-qualified wording (the supplied review mentions bubble-sheet wrapping, corrugated protective sheets, and sturdy boxes; exact materials vary by item).
  - Do not fabricate an approximate numeric price: explain that a quote depends on move details and direct visitors to the enquiry form.
  - Use accessible, keyboard-operable disclosure controls and preserve reduced-motion support.

- [x] **Improve the full Home call-to-action and contact actions**
  - “In the CTA section add services add address that I will provide you and contact option also”; include service links, location, and clear phone/email/WhatsApp contact actions in the Home CTA.
  - “Keep a call now option just above the chat on whatsapp option”; add a fixed Call Now action directly above WhatsApp, using the current site phone number (+91 77700 45051) unless the client supplies another one.
  - “The whatsapp icon is broken fix its symmetry”; replace/refine the floating WhatsApp glyph so its geometry is balanced, centered, and correctly sized.
  - Use only the currently published location text (“Porvorim, Goa · Serving India”) until the client supplies a full street address; do not invent or imply an exact street address.
  - Add a Google review action in the testimonial area and CTA; use a Google Maps business search link if a direct review URL has not been supplied, and do not claim it is a direct-write link.
  - Do not display client counts, tenure, aggregate ratings, or other business metrics unless the client verifies exact figures; replace prior unverified Home statistics.

- [x] **Improve testimonial presentation with supplied animations**
  - Use the supplied LogoLoop component for a restrained, pause-on-hover/draggable Home testimonial strip, and use the full client-provided review set on the Reviews page.
  - Use the supplied BlurText animation for important headings sitewide where appropriate, preserving readable static text for assistive technology and respecting reduced motion.
  - Use the supplied CountUp only for individually sourced review ratings (each supplied excerpt shows five stars), not for unverified business totals or averages.
  - Use the supplied, keyboard-operable LineSidebar in the CTA service navigator; omit the optional TrueFocus effect because the page already uses BlurText and RotatingText and another cycling focus effect would add motion without improving navigation.
  - Keep testimonial text faithful to the supplied customer-authored excerpts, identify it as Google review copy, preserve reviewer attribution, omit business-owner replies, and mark any source-truncated excerpt as an excerpt without filling missing words.

- [x] **Make wheel scrolling smoother without taking control away from visitors**
  - “Make the scroll of my website smooth also like butter smooth but keep the UX good”; improve desktop wheel-scroll smoothness while retaining normal keyboard scrolling, native touch scrolling, and direct access to all content.
  - Do not use mandatory scroll snapping, hide content, force page-by-page movement, or make users scroll extra to reach the enquiry/reviews/FAQ.
  - Respect `prefers-reduced-motion`, keep the sticky scroll-driven hero and reveal animations synchronized, and avoid an idle animation loop or smooth-scroll initialization on reduced-motion devices.


- [x] **Use the supplied animations and increase site typography**
  - Use the supplied CountUp component for individual, source-supported customer review ratings in the testimonials area; do not animate or imply an aggregate rating or business metric.
  - Use the supplied SplitText animation selectively across site headings and use BlurText where it adds a distinct, accessible reveal; avoid stacking competing animations on the same words.
  - Preserve readable text and assistive-technology content, respect reduced-motion preferences, and keep the supplied testimonial text unchanged.
  - Increase typography throughout the site responsively; make testimonial review copy substantially larger than it is now while preserving the existing design, content, controls and routes.
  - Show the user a live Preview in the Manus sidebar after each requested change; do not publish unless the user asks.


- [x] **Add a moving-and-packing photo behind the Home hero**
  - “In the home page add an image in background which represent our work”; use a relevant work photo behind the existing Home hero text, composed for the wide hero and with enough contrast for legibility.
  - Keep the existing logo, headline copy, page content and routes unchanged; make the background responsive.

- [x] **Make the testimonials visibly animated**
  - “The testimonial dont have the animation”; give testimonial cards/a section a clear entrance or carousel animation so visitors can see the motion, while respecting `prefers-reduced-motion` and keeping cards accessible and readable.

- [x] **Increase testimonial copy and make it bold white**
  - “Increase the font size in it”; make the customer review copy significantly larger.
  - “The colors are grey make it white and make it bold”; render the testimonial text in bold white with a contrasting card background, keeping review wording and individual ratings intact.
  - Keep reviewer names, sources, navigation and non-testimonial site content unchanged.


- [x] **Apply the approved identity and preserve the existing site**
  - Use the supplied official transparent PNG logo; preserve its proportions and avoid cropping/distortion.
  - Use navy `#102D60`, burgundy `#A20D36`, and white for brand styling, while retaining neutral/photo backgrounds.
  - Use the supplied moving/packing hero photograph, preserve the hero design and motion, maintain its proportions, and add descriptive alternative text.
  - Remove Instagram, LinkedIn and Facebook only from CTA sections; keep WhatsApp, phone, quote buttons, enquiry forms, and unrelated footer links.

- [x] **Fix and verify the review layout responsively**
  - Size each `/reviews` card to its grid cell at every width so long review text cannot spill into adjacent cards; keep the Home LogoLoop's fixed-size cards, pause-on-hover, and drag interactions separate from the grid.
  - Preserve every supplied testimonial's wording, reviewer attribution, and individual rating.
  - Capture the Reviews route at 360, 375, 390, 430, 768, 1024, 1280 and 1440 px; inspect complete mobile and desktop page captures for clipping/overlap.

- [x] **Restore confirmed trust claims and refine the shared cube mark and header**
  - Display the user-confirmed claims “10+ years experience” and “5-star review on Google” in the trust strip; do not present the Google claim as an average rating or change customer review content.
  - Use the newly supplied cube artwork as a PNG for the shared decorative mark throughout the site, preserving its full artwork and aspect ratio; keep the main Perfect Packways wordmark unchanged.
  - Replace remaining drawn/icon-style box symbols with the supplied cube PNG; leave real packing and moving photographs unchanged.
  - Reduce the fixed header height and logo box dimensions proportionately while preserving logo proportions and mobile navigation alignment.
  - Keep the site in the Manus sidebar Preview and unpublished; do not enable auto-publish or submit a publication.

- [x] **Make the existing public pages crawlable and measurable**
  - Provide distinct page titles, descriptions, canonical URLs, robots directives, Open Graph and Twitter metadata for Home, About, Gallery, Reviews and Contact.
  - Include meaningful initial HTML for the homepage and clean routes, JSON-LD, internal route navigation, sitemap.xml, robots.txt and an accurate route manifest.
  - Use only supplied/known company facts; do not fabricate address, reviews, ratings, analytics IDs, or verification codes. Keep conversion events optional until a GA4/dataLayer is configured.

- [x] **Improve accessibility and loading behavior without a redesign**
  - Add visible keyboard focus styles, descriptive image alternatives, verified intrinsic hero image dimensions, high hero loading priority, and lazy loading for gallery images; preserve reduced-motion behavior and existing design/animation.

- [x] **Measure production Lighthouse results; do not overstate target compliance**
  - Run Lighthouse against a production build for mobile and desktop. Final measured: mobile Performance 66, Accessibility 94, Best Practices 100, SEO 100; desktop Performance 92, Accessibility 94, Best Practices 100, SEO 100.
  - Mobile simulated LCP reported 10.4 s while the same report's observed LCP was 454 ms; report the discrepancy. Desktop LCP was 1.8 s, CLS 0.004; mobile CLS 0.034. INP was not measured by this lab run, so no INP or field Core Web Vitals pass is claimed. The requested mobile Lighthouse target is not met.


- [ ] **Restore the mobile Home CTA and use the latest transparent cube mark**
  - Make the “Plan your move” action available on the mobile Home screen without disrupting the first-view enquiry form or compact header.
  - Use the newly supplied transparent cube logo for the box marks on About, Reviews, and Contact and sitewide for decorative cube marks; preserve its full artwork and aspect ratio and leave photographs untouched.
  - Preserve all supplied testimonials, reviewer names, and ratings and keep the main Perfect Packways wordmark unchanged.
  - Keep the website unpublished and its Preview in the Manus sidebar; do not enable auto-publish or publish.

- [x] **Update only the Gallery and phone CTA**
  - Use all 28 supplied Gallery PDF photographs via the existing WebP assets; do not modify, recrop, recompress, or watermark them.
  - Show six photos initially and reveal the remaining photos in batches; use native lazy loading, asynchronous decoding, and explicit image dimensions.
  - Keep a responsive Gallery grid with the images' original proportions and an accessible lightbox with close, previous/next, keyboard navigation, and touch gestures.
  - Display only “+91 77700 45051” as the footer phone CTA label.
  - Preserve unrelated pages and site behavior; leave the updated site in Preview, unpublished for review.

- [x] **Replace gallery photos and apply centered protection watermark**
  - Remove `gallery-06.jpg`, `gallery-10.jpg`, `gallery-13.jpg`, and `gallery-24.jpg` identified in `to_be_removed_updated.pdf`.
  - Add the seven replacement photos extracted from `updated_gallery_PP.pdf` as `gallery-29.jpg` through `gallery-35.jpg`.
  - Apply a centered, semi-transparent Perfect Packways wordmark directly to every retained and replacement gallery image so the work remains visible while discouraging reuse.
  - Preserve the existing six-photo initial reveal, batch loading, lazy loading, explicit dimensions, responsive grid, and accessible lightbox behavior.
  - Keep the site private in Manus Preview and unpublished until the owner explicitly approves publication.
