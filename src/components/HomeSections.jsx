import React from 'react';
import AnimatedWords from './AnimatedWords.jsx';
import LineSidebar from './LineSidebar.jsx';
import { BUSINESS_EMAIL, BUSINESS_LOCATION, BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_E164, GOOGLE_MAPS_REVIEWS_URL } from '../data/siteLinks.js';

const advantages = [
  {
    number: '01',
    title: 'Protection with a plan',
    copy: 'Customer feedback mentions bubble-sheet wrapping, corrugated outer protection and sturdy boxes. We confirm the right packing approach for your items when preparing a quote.'
  },
  {
    number: '02',
    title: 'Support for different moves',
    copy: 'Home shifting, villa shifting, car and bike transportation, office shifting, commercial shifting, and godown storage are all listed on this home page.'
  },
  {
    number: '03',
    title: 'From local to longer routes',
    copy: 'The supplied customer stories include local Goa moves and journeys to other cities. Share your complete route so the team can confirm what is available.'
  },
  {
    number: '04',
    title: 'A human handover',
    copy: 'Reviewers describe helpful teams, careful handling and belongings arriving safely. Tell us what matters most, and we can discuss it before the move.'
  }
];

const faqs = [
  {
    question: 'Which packing materials are used?',
    answer: 'Our packing approach uses bubble sheet, sturdy boxes, and thick cartons. For fragile items, we add bubble-sheet wrapping and corrugated outer protection. The exact materials and packing scope are confirmed for the service you choose.'
  },
  {
    question: 'What is the approximate price of a move?',
    answer: 'Pricing depends on the type of service you choose, along with the route, volume, packing needs, access, and timing. Share your pickup, drop location, and move type in the enquiry form for a tailored estimate.'
  },
  {
    question: 'What kinds of relocation can I ask about?',
    answer: 'The home page covers home shifting, villa shifting, car and bike transportation, office shifting, commercial shifting, and godown storage. Choose the closest option in the enquiry form and add your route details.'
  },
  {
    question: 'Can you pack fragile household items?',
    answer: 'Packing and unpacking are listed services, and a supplied reviewer describes bubble-sheet wrapping and corrugated outer protection for breakable items. Tell the team which fragile pieces you have so the packing plan can be confirmed for your move.'
  },
  {
    question: 'Do you handle moves within Goa and to other states?',
    answer: 'The site lists local and interstate relocation, and the supplied customer reviews describe both local Goa moves and routes to other cities. Share the exact pickup and drop locations to confirm availability for your date.'
  },
  {
    question: 'Can I request car or two-wheeler transport?',
    answer: 'Vehicle transport is included in the current service list, and one supplied customer review describes a vehicle move. Include the vehicle type and route in your enquiry so the team can confirm the service details.'
  },
  {
    question: 'How should I prepare before moving day?',
    answer: 'Keep essentials and important documents separate, identify any fragile or especially valuable items, and share access or timing constraints with the move coordinator in advance. The team can confirm any additional preparation needed for your specific move.'
  },
  {
    question: 'How do I get a quote?',
    answer: 'Fill in your name, email, pickup and drop locations, and relocation type above. The form prepares a message for WhatsApp; review it and choose Send in WhatsApp to contact the business. You can also call or use the Contact page.'
  }
];

function InternalLink({ to, navigate, className = '', children }) {
  return <a className={className} href={to} onClick={event => { event.preventDefault(); navigate(to); }}>{children}</a>;
}

export function WhyChooseUs() {
  return (
    <section className="why-section" id="why-choose-us">
      <div className="container">
        <div className="why-heading">
          <p className="eyebrow">The details make the difference</p>
          <AnimatedWords as="h2" text="A more considered move." className="animated-heading why-title" />
          <p className="why-intro">Useful, specific reasons grounded in the services and customer feedback shared with us.</p>
        </div>
        <div className="why-grid">
          {advantages.map(item => (
            <article className="why-card" key={item.number}>
              <span className="why-number">{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQSection() {
  return (
    <section className="faq-section" id="faq">
      <div className="container faq-layout">
        <div className="faq-heading">
          <p className="eyebrow">Good to know</p>
          <AnimatedWords as="h2" text="A few useful answers." className="animated-heading faq-title" />
          <p>Not sure what your move needs? Start with the route and the things that matter most.</p>
          <a className="text-link" href="#home-enquiry">Get a move estimate <span className="arrow" aria-hidden="true">↗</span></a>
        </div>
        <div className="faq-list">
          {faqs.map((item, index) => (
            <details className="faq-item" key={item.question}>
              <summary><span>{item.question}</span><span className="faq-toggle" aria-hidden="true">+</span></summary>
              <div className="faq-answer"><p>{item.answer}</p></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeCTA({ navigate }) {
  const serviceLinks = ['Home shifting', 'Villa shifting', 'Car & bike transportation', 'Office shifting', 'Commercial shifting', 'Godown storage'];
  const goToServices = event => { event?.preventDefault?.(); if (window.location.pathname !== '/') navigate('/'); window.setTimeout(() => document.getElementById('home-services')?.scrollIntoView({ behavior: 'smooth' }), 0); };
  return (
    <section className="cta-panel" id="home-cta">
      <div className="container">
        <div className="cta-panel-inner">
          <div>
            <p className="eyebrow">Your next move starts here</p>
            <AnimatedWords as="h2" text="Let’s make room for what’s next." className="animated-heading cta-title" />
          </div>
          <InternalLink className="button button-navy" to="/contact" navigate={navigate}>Talk to our team <span className="arrow" aria-hidden="true">↗</span></InternalLink>
        </div>
        <div className="cta-details-grid">
          <div className="cta-detail-card cta-services-card">
            <p className="eyebrow">Services</p>
            <LineSidebar items={serviceLinks} accentColor="#102D60" textColor="#102D60" markerColor="rgba(16,45,96,.44)" showIndex={false} showMarker proximityRadius={110} maxShift={12} falloff="smooth" markerLength={22} markerGap={7} tickScale={0.38} scaleTick itemGap={9} fontSize={0.92} smoothing={140} ariaLabel="Perfect Packways services" onItemClick={goToServices} />
            <a className="cta-small-link cta-service-link" href="#home-services" onClick={goToServices}>Explore all services <span aria-hidden="true">↗</span></a>
          </div>
          <div className="cta-detail-card">
            <p className="eyebrow">Based in</p>
            <a href={GOOGLE_MAPS_REVIEWS_URL} target="_blank" rel="noreferrer">{BUSINESS_LOCATION}<span className="cta-small-link">Open Google Maps ↗</span></a>
          </div>
          <div className="cta-detail-card">
            <p className="eyebrow">Talk to us</p>
            <a href={`tel:${BUSINESS_PHONE_E164}`}>{BUSINESS_PHONE_DISPLAY}</a>
            <a href={`mailto:${BUSINESS_EMAIL}`}>{BUSINESS_EMAIL}</a>
          </div>
          <div className="cta-detail-card cta-review-card">
            <p className="eyebrow">Customer feedback</p>
            <p>Read the reviews shared by customers, or open the business on Google Maps to leave your own feedback.</p>
            <a href={GOOGLE_MAPS_REVIEWS_URL} target="_blank" rel="noreferrer">Find us on Google Maps ↗</a>
          </div>
        </div>
      </div>
    </section>
  );
}
