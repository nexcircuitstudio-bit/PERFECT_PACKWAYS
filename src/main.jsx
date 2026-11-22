import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import GalleryMosaic from './components/GalleryMosaic.jsx';
import AnimatedWords from './components/AnimatedWords.jsx';
import AnimatedSplitText from './components/AnimatedSplitText.jsx';
import HomeEnquiryForm from './components/HomeEnquiryForm.jsx';
import { WhyChooseUs, FAQSection, HomeCTA } from './components/HomeSections.jsx';
import { HomeReviews, ReviewsGrid } from './components/CustomerReviews.jsx';
import FloatingContactActions, { WhatsAppGlyph } from './components/FloatingContactActions.jsx';
import SmoothScroll, { scrollToTop } from './components/SmoothScroll.jsx';
import { applyPageMetadata, getSeoPage } from './seoConfig.js';
import { trackConversion } from './analytics.js';
const BlurText = React.lazy(() => import('./components/BlurText.jsx'));
const RotatingText = React.lazy(() => import('./components/RotatingText.jsx'));
const AnimatedContent = React.lazy(() => import('./components/AnimatedContent.jsx'));
const CountUp = React.lazy(() => import('./components/CountUp.jsx'));
const HERO_STATIC = '/homepage_image.webp';
const HERO_POSTER = '/hero-poster.jpg';
const LOGO = '/perfectpackwayslogo.png';
const PP_MARK = '/PP_cube_transparent.png';
const WHATSAPP_URL = `https://wa.me/917770045051?text=${encodeURIComponent('Hello Perfect Packways, I would like a quote for my move.')}`;
const ABOUT_IMAGE = '/hero-poster.jpg';
const ROTATING_SERVICE_TEXTS = ['homes', 'villa', 'vehicles transport'];

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Reviews', path: '/reviews' },
  { label: 'Contact', path: '/contact' }
];

const services = [
  { number: '01', title: 'Home shifting', copy: 'Thoughtful packing, careful loading, and a move plan that keeps your day on track.', accent: 'orange', icon: 'house' },
  { number: '02', title: 'Villa shifting', copy: 'Room-by-room protection and careful coordination for larger homes and complete villas.', accent: 'navy', icon: 'house' },
  { number: '03', title: 'Car & bike transportation', copy: 'Secure, documented movement for cars and two-wheelers on local or longer routes.', accent: 'cream', icon: 'truck' },
  { number: '04', title: 'Office shifting', copy: 'A calm, efficient transition for teams, equipment, archives, and everything in between.', accent: 'orange', icon: 'building' },
  { number: '05', title: 'Commercial shifting', copy: 'Planned movement for shops, workspaces, stock, and business-critical timelines.', accent: 'navy', icon: 'route' },
  { number: '06', title: 'Godown storage', copy: 'Organized short- or long-term storage with a clear handover whenever you need it.', accent: 'cream', icon: 'warehouse' }
];

const galleryImages = [
  { src: '/gallery/gallery-01.jpg', label: 'Motorbikes secured inside a shipping container', type: 'Vehicle transport', width: 1496, height: 1120 },
  { src: '/gallery/gallery-02.jpg', label: 'Packed cartons stacked for a move', type: 'Packing', width: 672, height: 1496 },
  { src: '/gallery/gallery-03.jpg', label: 'Household cartons arranged inside a container', type: 'Loading', width: 600, height: 888 },
  { src: '/gallery/gallery-04.jpg', label: 'Motorbike wrapped and protected for transport', type: 'Vehicle transport', width: 600, height: 1296 },
  { src: '/gallery/gallery-05.jpg', label: 'Empty container prepared for loading', type: 'Loading', width: 600, height: 800 },
  { src: '/gallery/gallery-07.jpg', label: 'Car positioned inside a transport container', type: 'Vehicle transport', width: 592, height: 792 },
  { src: '/gallery/gallery-08.jpg', label: 'Furniture wrapped and ready for a household move', type: 'Packing', width: 600, height: 264 },
  { src: '/gallery/gallery-09.jpg', label: 'Wrapped motorbike prepared for delivery', type: 'Vehicle transport', width: 600, height: 1328 },
  { src: '/gallery/gallery-11.jpg', label: 'Tall wrapped furniture item protected for moving', type: 'Packing', width: 592, height: 1328 },
  { src: '/gallery/gallery-12.jpg', label: 'Wooden crate secured for transport', type: 'Packing', width: 600, height: 1064 },
  { src: '/gallery/gallery-14.jpg', label: 'Car being loaded onto a vehicle carrier', type: 'Vehicle transport', width: 1200, height: 1600 },
  { src: '/gallery/gallery-15.jpg', label: 'Car secured inside a shipping container', type: 'Vehicle transport', width: 1200, height: 1600 },
  { src: '/gallery/gallery-16.jpg', label: 'Car positioned inside a transport carrier', type: 'Vehicle transport', width: 952, height: 1280 },
  { src: '/gallery/gallery-17.jpg', label: 'Car secured and ready for transportation', type: 'Vehicle transport', width: 976, height: 680 },
  { src: '/gallery/gallery-18.jpg', label: 'Vehicle carrier prepared for delivery', type: 'Vehicle transport', width: 880, height: 1568 },
  { src: '/gallery/gallery-19.jpg', label: 'Mover standing beside protected household furniture', type: 'Moving team', width: 664, height: 1496 },
  { src: '/gallery/gallery-20.jpg', label: 'Upright furniture wrapped and ready to move', type: 'Packing', width: 488, height: 1192 },
  { src: '/gallery/gallery-21.jpg', label: 'Wrapped household furniture prepared for relocation', type: 'Packing', width: 656, height: 1496 },
  { src: '/gallery/gallery-22.jpg', label: 'Wrapped furniture arranged for transport', type: 'Packing', width: 1496, height: 672 },
  { src: '/gallery/gallery-23.jpg', label: 'Wrapped scooter prepared for relocation', type: 'Vehicle transport', width: 1496, height: 1120 },
  { src: '/gallery/gallery-25.jpg', label: 'Protected household belongings loaded into a truck', type: 'Loading', width: 1120, height: 1496 },
  { src: '/gallery/gallery-26.jpg', label: 'Wrapped furniture arranged inside a home', type: 'Packing', width: 1120, height: 1496 },
  { src: '/gallery/gallery-27.jpg', label: 'Large wrapped furniture prepared for relocation', type: 'Packing', width: 1120, height: 1496 },
  { src: '/gallery/gallery-28.jpg', label: 'Wrapped boxes and furniture ready for delivery', type: 'Packing', width: 1496, height: 672 },
  { src: '/gallery/gallery-29.jpg', label: 'Wrapped household furniture ready for collection', type: 'Packing', width: 1496, height: 1120 },
  { src: '/gallery/gallery-30.jpg', label: 'Wrapped furniture protected inside a room', type: 'Packing', width: 1496, height: 672 },
  { src: '/gallery/gallery-31.jpg', label: 'Wooden crate prepared to protect a shipment', type: 'Packing', width: 1496, height: 592 },
  { src: '/gallery/gallery-32.jpg', label: 'Protected furniture loaded for delivery', type: 'Loading', width: 616, height: 184 },
  { src: '/gallery/gallery-33.jpg', label: 'Car secured inside a transport container', type: 'Vehicle transport', width: 1120, height: 1120 },
  { src: '/gallery/gallery-34.jpg', label: 'Wrapped cartons labelled for relocation', type: 'Packing', width: 544, height: 376 },
  { src: '/gallery/gallery-35.jpg', label: 'Packed cartons ready for delivery', type: 'Packing', width: 600, height: 264 }
];

function usePath() {
  const normalizePath = value => value.length > 1 ? value.replace(/\/+$/, '') : '/';
  const [path, setPath] = useState(() => normalizePath(window.location.pathname || '/'));
  useEffect(() => {
    const onPop = () => setPath(normalizePath(window.location.pathname || '/'));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  const navigate = (next) => {
    const normalizedNext = normalizePath(next);
    if (normalizedNext === path) {
      scrollToTop();
      return;
    }
    window.history.pushState({}, '', normalizedNext);
    setPath(normalizedNext);
    scrollToTop();
  };
  return [path, navigate];
}

function useReveal(threshold = 0.16) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold });
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function ScrollReveal({ children, className = '', delay = 0 }) {
  const [ref, visible] = useReveal();
  return <div ref={ref} style={{ '--delay': `${delay}ms` }} className={`reveal ${visible ? 'is-visible' : ''} ${className}`}>{children}</div>;
}

function Arrow({ direction = 'right' }) {
  return <span className={`arrow arrow-${direction}`} aria-hidden="true">↗</span>;
}

function Icon({ name, size = 32 }) {
  const common = { width: size, height: size, viewBox: '0 0 32 32', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', 'aria-hidden': 'true' };
  const paths = {
    house: <><path d="M4 14 16 4l12 10v14H4V14Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M12 28V18h8v10M9 14h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></>,
    box: <image href={PP_MARK} x="0" y="0" width="32" height="32" preserveAspectRatio="xMidYMid meet" />,
    building: <><path d="M6 28V6l11-3v25M17 11h9v17M3 28h26M10 10h2M10 15h2M10 20h2M21 15h2M21 20h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></>,
    truck: <><path d="M3 8h16v14H3zM19 13h5l5 5v4h-10" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M7 26a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM25 26a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="1.8"/><path d="M19 17h6" stroke="currentColor" strokeWidth="1.8"/></>,
    layers: <><path d="m4 10 12-6 12 6-12 6L4 10Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="m4 16 12 6 12-6M4 22l12 6 12-6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></>,
    warehouse: <><path d="M4 14 16 6l12 8v13H4V14Z" stroke="currentColor" strokeWidth="1.8"/><path d="M9 27V17h14v10M12 20h2M18 20h2" stroke="currentColor" strokeWidth="1.8"/></>,
    route: <><path d="M6 25c0-8 20-5 20-14 0-2.8-2.2-5-5-5-2.5 0-4.5 1.7-4.9 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="m14 8 2 2 2-2M6 25l3-2M6 25l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>,
    phone: <><path d="M8 4h4l2 6-3 2c1.3 2.8 3.5 5 6.3 6.3l2-3 6 2v4c0 1.1-.9 2-2 2C13.4 23.3 8.7 18.6 6.7 8c-.2-1.1.6-2 1.3-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></>,
    mail: <><rect x="4" y="7" width="24" height="18" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="m5 9 11 9L27 9" stroke="currentColor" strokeWidth="1.8"/></>,
    pin: <><path d="M26 13c0 7-10 15-10 15S6 20 6 13a10 10 0 1 1 20 0Z" stroke="currentColor" strokeWidth="1.8"/><circle cx="16" cy="13" r="3" stroke="currentColor" strokeWidth="1.8"/></>,
    clock: <><circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.8"/><path d="M16 9v7l5 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></>
  };
  return <svg {...common}>{paths[name] || paths.box}</svg>;
}

function Wordmark({ inline = false }) {
  return <span className={`inline-wordmark ${inline ? 'inline' : ''}`}><strong>PERFECT</strong><em>PACKWAYS</em></span>;
}

function LogoBadge({ className = '' }) {
  return <span className={`logo-badge ${className}`}><img src={PP_MARK} alt="Perfect Packways PP cube mark" /></span>;
}

function Logo({ compact = false }) {
  return <button className={`brand-lockup ${compact ? 'brand-compact' : ''}`} onClick={() => window.dispatchEvent(new CustomEvent('pp:navigate', { detail: '/' }))} aria-label="Perfect Packways home">
    <img src={LOGO} alt="Perfect Packways" />
  </button>;
}

function WhatsAppIcon() {
  return <WhatsAppGlyph />;
}

function BoxTruckMark() {
  return <svg className="box-truck-mark" viewBox="0 0 180 104" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M14 20h86v55H14V20Z" stroke="currentColor" strokeWidth="3"/>
    <path d="M100 39h34l29 22v14h-63V39Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
    <path d="M116 45h17l18 14h-35V45Z" stroke="currentColor" strokeWidth="3"/>
    <circle cx="46" cy="81" r="11" fill="var(--navy)" stroke="currentColor" strokeWidth="3"/>
    <circle cx="137" cy="81" r="11" fill="var(--navy)" stroke="currentColor" strokeWidth="3"/>
    <image href={PP_MARK} x="58" y="27" width="42" height="42" preserveAspectRatio="xMidYMid meet" />
  </svg>;
}

function Nav({ currentPath, navigate }) {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [currentPath]);
  return <header className="site-nav">
    <div className="container nav-inner">
      <Logo compact />
      <nav className={`nav-links ${open ? 'is-open' : ''}`} aria-label="Primary navigation">
        {navItems.map(item => <a key={item.path} className={currentPath === item.path ? 'active' : ''} href={item.path} onClick={(e) => { e.preventDefault(); navigate(item.path); }}>{item.label}</a>)}
        <a className="nav-cta" href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact'); }}>Get a quote <Arrow /></a>
      </nav>
      <button className={`menu-toggle ${open ? 'is-open' : ''}`} onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}><span /><span /></button>
    </div>
  </header>;
}

function Footer({ navigate }) {
  return <footer className="site-footer">
    <div className="container footer-grid">
      <div className="footer-main"><Logo /><p>Moving the things that matter, with a little more care.</p><a className="footer-mail" href="mailto:hello@perfectpackways.com">hello@perfectpackways.com <Arrow /></a></div>
      <div className="footer-links"><div><p className="eyebrow">Explore</p>{navItems.slice(1).map(item => <a key={item.path} href={item.path} onClick={(e) => { e.preventDefault(); navigate(item.path); }}>{item.label}</a>)}</div><div><p className="eyebrow">Keep in touch</p><a href="tel:+917770045051" aria-label="Call +91 77700 45051">+91 77700 45051</a><a href="mailto:hello@perfectpackways.com">Email the team</a><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">Chat on WhatsApp</a></div></div>
    </div>
    <div className="container footer-bottom"><span>© 2024 <Wordmark inline />. All rights reserved.</span><span>Perfect Packing <b>•</b> Safe delivery</span></div>
  </footer>;
}

function PageIntro({ eyebrow, titleLines, copy, accent = 'orange' }) {
  return <section className={`page-intro page-intro-${accent}`}><div className="container page-intro-inner"><ScrollReveal><p className="eyebrow">{eyebrow}</p><h1>{titleLines.map((line, index) => <React.Fragment key={line}>{index > 0 && <br />}<span className={index > 0 ? 'page-title-highlight' : ''}><span className="page-title-words">{line}</span></span></React.Fragment>)}</h1><p className="intro-copy">{copy}</p></ScrollReveal><div className="intro-mark" aria-hidden="true"><LogoBadge /><i /></div></div></section>;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' && Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
  );
  useEffect(() => {
    const query = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!query) return undefined;
    const update = () => setReduced(query.matches);
    if (query.addEventListener) query.addEventListener('change', update);
    else query.addListener?.(update);
    return () => {
      if (query.removeEventListener) query.removeEventListener('change', update);
      else query.removeListener?.(update);
    };
  }, []);
  return reduced;
}

function DeferredAnimatedContent({ children, className = '', ...animationProps }) {
  const sentinelRef = useRef(null);
  const [nearViewport, setNearViewport] = useState(false);
  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return undefined;
    if (!('IntersectionObserver' in window)) {
      setNearViewport(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setNearViewport(true);
        observer.disconnect();
      }
    }, { rootMargin: '320px 0px', threshold: 0 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  if (!nearViewport) return <div ref={sentinelRef} className={className}>{children}</div>;
  return <React.Suspense fallback={<div className={className}>{children}</div>}><AnimatedContent className={className} {...animationProps}>{children}</AnimatedContent></React.Suspense>;
}

function Hero() {
  return (
    <section className="hero-static" aria-labelledby="hero-title">
      <div className="hero-static-media"><img src={HERO_STATIC} alt="Perfect Packways professional movers packing furniture and preparing household goods for relocation." width={1755} height={896} fetchPriority="high" decoding="async" /></div>
      <div className="hero-static-shade" aria-hidden="true" />
      <div className="container hero-static-content">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow brand-eyebrow"><span className="pulse-dot" /><strong>Perfect</strong> <em>Packways</em></p>
          <h1 id="hero-title"><AnimatedSplitText text="Move what" className="hero-line hero-first-line" delay={24} duration={0.78} /><br /><AnimatedSplitText text="matters." className="hero-line hero-highlight" delay={24} duration={0.78} /></h1>
          <div className="hero-service-line" aria-label="Thoughtful moves for homes, villa, and vehicles transport">
            <span>Thoughtful moves for</span><React.Suspense fallback={<span className="hero-rotating-fallback">homes</span>}><RotatingText texts={ROTATING_SERVICE_TEXTS} effect="slide" direction="up" highlight highlightColor="#A20D36" rotationInterval={5000} staggerDuration={0.015} staggerFrom="last" animatePresenceMode="sync" mainClassName="hero-rotating-service" splitLevelClassName="hero-rotating-service-level" /></React.Suspense>
          </div>
          <p className="hero-subcopy">Premium packing, shifting, transportation, and storage for homes, teams, and the journeys in between.</p>
          <div className="hero-actions"><a className="button button-orange" href="#home-enquiry">Plan your move <Arrow /></a><span className="scroll-cue"><i /> Explore the difference</span></div>
        </div>
      </div>
    </section>
  );
}

function HomeEnquirySection() {
  return (
    <section className="home-enquiry-section section-cream" id="home-enquiry">
      <div className="container home-enquiry-section-inner">
        <div className="home-enquiry-intro">
          <p className="eyebrow">Start with the route</p>
          <AnimatedWords as="h2" text="Tell us what is changing." className="animated-heading home-enquiry-title" />
          <p>Share the basics and we’ll shape the right moving, packing, transport, or storage plan around your day.</p>
        </div>
        <HomeEnquiryForm />
      </div>
    </section>
  );
}

function AnimatedTrustMetric({ to, suffix, fallback }) {
  return <React.Suspense fallback={<span className="trust-metric-value">{fallback}</span>}><CountUp from={0} to={to} duration={1.1} suffix={suffix} direction="up" trigger="view" className="trust-metric-value" /></React.Suspense>;
}

function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Perfect Packways at a glance">
      <div className="container trust-strip-inner">
        <div className="trust-strip-quote"><p className="eyebrow">A move should feel lighter</p><p>“Careful hands, clear communication, and belongings handled as if they were our own.”</p></div>
        <div className="trust-strip-stats">
          <div><strong>10+</strong><span>years experience</span></div>
          <div><strong>5-star</strong><span>review on Google</span></div>
        </div>
      </div>
    </section>
  );
}

function ServicesReveal({ navigate }) {
  const goToEnquiry = event => { event.preventDefault(); navigate('/'); window.setTimeout(() => document.getElementById('home-enquiry')?.scrollIntoView({ behavior: 'smooth' }), 0); };
  return <section className="services-reveal section-dark" id="home-services"><div className="giant-word giant-word-light">OUR<br />SERVICES</div><div className="container services-reveal-inner"><ScrollReveal className="reveal-lead"><p className="eyebrow">One home for every move</p><h2>Services that<br />fit the way<br /><span>you move.</span></h2><p>From a single room to a full commercial handover, choose the support you need and we’ll keep the plan clear.</p><a className="text-link text-link-light" href="#home-enquiry" onClick={goToEnquiry}>Get a move estimate <Arrow /></a></ScrollReveal><div className="service-stack">{services.map((service, index) => <ScrollReveal key={service.number} delay={index * 70}><article className={`service-card service-card-${service.accent}`}><div className="service-icon"><Icon name={service.icon} /></div><div className="service-number">{service.number}</div><h3>{service.title}</h3><p>{service.copy}</p><span className="service-card-arrow"><Arrow /></span></article></ScrollReveal>)}</div></div></section>;
}

function HomePage({ navigate }) {
  return <main><Hero /><HomeEnquirySection /><TrustStrip /><HomeReviews /><ServicesReveal navigate={navigate} /><WhyChooseUs /><section className="process-section"><div className="container"><div className="section-heading-row"><ScrollReveal><p className="eyebrow">A better way to move</p><h2>Good moves have<br /><span>a rhythm.</span></h2></ScrollReveal><ScrollReveal delay={120}><p className="heading-side-copy">One clear plan, a thoughtful crew, and a handover that feels as good as the hello.</p></ScrollReveal></div><div className="process-grid">{[['01', 'Plan', 'We listen first, then build a move plan around your timeline, space, and priorities.'], ['02', 'Pack', 'Our team brings the right materials and the right method for every item, room, and route.'], ['03', 'Settle in', 'We arrive on time, handle the handover, and leave you with a lighter next chapter.']].map(([number, title, copy], index) => <ScrollReveal key={number} delay={index * 110}><article className="process-step"><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article></ScrollReveal>)}</div></div></section><FAQSection /><HomeCTA navigate={navigate} /></main>;
}

function AboutPage() {
  return <main><PageIntro eyebrow="A little about us" titleLines={['Moving is our work.', 'Care is our way.']} copy={<><Wordmark inline /> began with a simple belief: the way a move feels matters just as much as where it ends. Today, we bring that belief to every box, route, and doorstep.</>} /><section className="about-story about-principles section-cream"><div className="container"><div className="about-principles-heading"><ScrollReveal><p className="eyebrow">The Perfect Packways way</p><h2>Clear plans.<br /><span>Careful hands.</span></h2></ScrollReveal><ScrollReveal delay={120}><p>We make moving feel more considered by bringing together practical experience, thoughtful protection, and communication you can rely on.</p></ScrollReveal></div><div className="about-principles-grid">{[['01', 'Who we are', 'Perfect Packways is a packing, moving, transportation, and storage team built around one simple idea: your move should feel clear, calm, and cared for from the first conversation to the final handover.'], ['02', 'What we do', 'We support home and villa shifting, office and commercial relocation, car and bike transportation, packing, unpacking, and godown storage for local and longer routes.'], ['03', 'How we do it', 'We listen first, plan the route, protect each item with the right materials, and keep you informed as the move takes shape. Our team handles the details so you can focus on what comes next.']].map(([number, title, copy], index) => <ScrollReveal key={number} delay={index * 110}><article className="about-principle-card"><span>{number}</span><h3>{title}</h3><p>{copy}</p><i /></article></ScrollReveal>)}</div></div></section><section className="values-section"><div className="container"><div className="section-heading-row"><ScrollReveal><p className="eyebrow">What we stand for</p><h2>Strong hands.<br /><span>Soft edges.</span></h2></ScrollReveal><ScrollReveal delay={120}><p className="heading-side-copy">We keep the process crisp so you can keep your attention on the people and moments that matter.</p></ScrollReveal></div><div className="values-grid">{[['01', 'Own the details', 'No vague handovers, no “we’ll see.” We make the plan visible and stay close to it.'], ['02', 'Respect the room', 'Your things, time, and space deserve the same care we would give our own.'], ['03', 'Leave it better', 'A good move is not only about getting there. It is about making the arrival feel easy.']].map(([number, title, copy], index) => <ScrollReveal key={number} delay={index * 100}><article className="value-card"><span>{number}</span><h3>{title}</h3><p>{copy}</p><i /></article></ScrollReveal>)}</div></div></section><section className="about-manifesto"><div className="container manifesto-inner"><ScrollReveal><p className="eyebrow">Our promise</p><h2>Pack with purpose.<br /><span>Move with confidence.</span></h2><p>For homes, teams, and every next chapter in between.</p></ScrollReveal></div></section></main>;
}

function GalleryPage() {
  return <main><PageIntro eyebrow="The work, in motion" titleLines={['Small details.', 'Big difference.']} copy={<>A glimpse into the people, spaces, and careful in-between moments that make up a <Wordmark inline /> move.</>} accent="orange" /><section className="gallery-section"><div className="container"><div className="gallery-intro"><ScrollReveal><p className="eyebrow">Field notes / Perfect Packways</p></ScrollReveal><ScrollReveal delay={100}><p>Our gallery is less about the before and after, and more about everything that happens between. The tape lines. The clean handovers. The little signs that someone cared.</p></ScrollReveal></div><GalleryMosaic images={galleryImages} /></div></section><section className="gallery-close"><div className="container gallery-close-inner"><ScrollReveal><span className="gallery-circle"><LogoBadge /></span><h2>Every box<br /><span>has a story.</span></h2><p>Let us help you carry it forward.</p></ScrollReveal></div></section></main>;
}

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', moveFrom: '', moveTo: '', moveDate: '', moveType: 'Home shifting', message: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [whatsappHref, setWhatsappHref] = useState('');
  const update = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setWhatsappHref('');
    setStatus('idle');
  };
  const submit = (event) => {
    event.preventDefault();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    const validPhone = /^[+()\d][\d\s().-]{6,}$/.test(form.phone.trim());
    if (!form.name.trim() || !validEmail || !validPhone || !form.moveFrom.trim() || !form.moveTo.trim() || !form.message.trim()) {
      setError('Please add your name, a valid email, phone number, route, and a few details about your move.');
      setStatus('error');
      return;
    }
    trackConversion('enquiry_prepared', { form_name: 'contact_enquiry' });
    const message = [
      'Hello Perfect Packways, I would like a moving quote.',
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      `Phone number: ${form.phone.trim()}`,
      `Pickup location: ${form.moveFrom.trim()}`,
      `Drop location: ${form.moveTo.trim()}`,
      `Relocation type: ${form.moveType}`,
      `Preferred date: ${form.moveDate || 'Not specified'}`,
      `Additional details: ${form.message.trim()}`
    ].join('\n');
    setError('');
    setWhatsappHref(`${WHATSAPP_URL.split('?')[0]}?text=${encodeURIComponent(message)}`);
    setStatus('success');
  };
  return <main><PageIntro eyebrow="Let’s talk" titleLines={['A better move', 'starts here.']} copy="Tell us a little about what’s changing. We’ll get back to you with a thoughtful next step, usually within one working day." accent="navy" /><section className="contact-section"><div className="container contact-grid"><ScrollReveal className="contact-details"><p className="eyebrow">Come say hello</p><h2>Tell us what<br /><span>matters.</span></h2><p>Whether you are moving across town, across the country, or across a state line, our team is here to make the next step feel lighter.</p><div className="contact-list"><a href="tel:+917770045051"><span><Icon name="phone" size={24} /></span><div><small>Call us</small><strong>+91 77700 45051</strong></div></a><a href="mailto:hello@perfectpackways.com"><span><Icon name="mail" size={24} /></span><div><small>Email</small><strong>hello@perfectpackways.com</strong></div></a><div><span><Icon name="pin" size={24} /></span><div><small>Visit</small><strong>Porvorim, Goa · Serving India</strong></div></div></div><a className="whatsapp-contact" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><WhatsAppIcon /> Chat on WhatsApp <Arrow /></a></ScrollReveal><ScrollReveal className="contact-form-wrap" delay={130}><form className="contact-form" onSubmit={submit} noValidate><div className="form-topline"><p className="eyebrow">Quick enquiry</p><span>01 / 01</span></div><h3>Let’s plan the<br /><em>next chapter.</em></h3><div className="form-grid"><label><span>Your name</span><input name="name" value={form.name} onChange={update} placeholder="e.g. Ananya Rao" required /></label><label><span>Email address</span><input name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" required /></label><label><span>Phone number</span><input name="phone" type="tel" inputMode="tel" value={form.phone} onChange={update} placeholder="+91 ..." required /></label><label><span>Move type</span><select name="moveType" value={form.moveType} onChange={update} required>{services.map(item => <option key={item.title}>{item.title}</option>)}</select></label><label><span>Moving from</span><input name="moveFrom" value={form.moveFrom} onChange={update} placeholder="City or pincode" required /></label><label><span>Moving to</span><input name="moveTo" value={form.moveTo} onChange={update} placeholder="City or pincode" required /></label><label><span>Preferred date</span><input name="moveDate" type="date" value={form.moveDate} onChange={update} /></label><label className="full"><span>Tell us a little more</span><textarea name="message" value={form.message} onChange={update} placeholder="What matters most about your move?" rows="4" required /></label></div>{status === 'error' && <p className="form-feedback form-error">{error}</p>}{status === 'success' && whatsappHref && <p className="form-feedback form-success">Your enquiry is ready. <a href={whatsappHref} target="_blank" rel="noreferrer">Continue to WhatsApp and tap Send</a>.</p>}<button className="button button-orange" type="submit">Prepare my enquiry <Arrow /></button><small className="form-note">No spam. No pressure. Just a clear next step.</small></form></ScrollReveal></div></section><section className="contact-bottom"><div className="container contact-bottom-inner"><ScrollReveal><span className="contact-bottom-mark"><LogoBadge /></span><h2>Perfect packing.<br /><span>Safe delivery.</span></h2></ScrollReveal></div></section></main>;
}

function ReviewsPage() {
  return <main><PageIntro eyebrow="Customer stories" titleLines={['Real words.', 'From real moves.']} copy="Customer-authored review excerpts shared for Perfect Packways. Each rating belongs to the individual review; no average or client-count claim is implied." accent="navy" /><ReviewsGrid /></main>;
}

function NotFoundPage() {
  return <main><PageIntro eyebrow="Page not found" titleLines={['This page', 'is not here.']} copy="The link may be out of date. Visit the home page or contact Perfect Packways to plan your move." accent="navy" /><section className="container" style={{ padding: '0 0 100px' }}><a className="button button-orange" href="/" onClick={(event) => { event.preventDefault(); window.dispatchEvent(new CustomEvent('pp:navigate', { detail: '/' })); }}>Return home <Arrow /></a></section></main>;
}

function App() {
  const [path, navigate] = usePath();
  useEffect(() => { applyPageMetadata(path); }, [path]);
  useEffect(() => {
    const trackLink = event => {
      const link = event.target instanceof Element ? event.target.closest('a') : null;
      if (!link) return;
      const href = link.getAttribute('href') || '';
      const label = (link.textContent || '').replace(/\s+/g, ' ').trim();
      if (href.startsWith('tel:')) trackConversion('phone_click', { link_url: href });
      else if (href.startsWith('https://wa.me/')) trackConversion('whatsapp_click', { link_url: href });
      else if (link.classList.contains('nav-cta') || /get a quote|plan your move|talk to our team|move estimate/i.test(label)) {
        trackConversion('quote_click', { link_url: href, link_text: label });
      }
    };
    document.addEventListener('click', trackLink, true);
    return () => document.removeEventListener('click', trackLink, true);
  }, []);
  useEffect(() => {
    const onNavigate = (event) => navigate(event.detail);
    window.addEventListener('pp:navigate', onNavigate);
    return () => window.removeEventListener('pp:navigate', onNavigate);
  }, [navigate]);
  const page = useMemo(() => {
    if (path === '/about') return <AboutPage />;
    if (path === '/gallery') return <GalleryPage />;
    if (path === '/reviews') return <ReviewsPage />;
    if (path === '/contact') return <ContactPage />;
    if (getSeoPage(path)) return <HomePage navigate={navigate} />;
    return <NotFoundPage />;
  }, [path, navigate]);
  const reducedMotion = usePrefersReducedMotion();
  return <><SmoothScroll reducedMotion={reducedMotion} /><Nav currentPath={path} navigate={navigate} /><div className="page-shell">{page}</div><Footer navigate={navigate} /><FloatingContactActions /></>;
}

createRoot(document.getElementById('root')).render(<App />);
