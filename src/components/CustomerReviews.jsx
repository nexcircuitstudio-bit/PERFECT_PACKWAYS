import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { reviews } from '../data/reviews.js';
import { GOOGLE_MAPS_REVIEWS_URL } from '../data/siteLinks.js';
import AnimatedWords from './AnimatedWords.jsx';

const LogoLoop = React.lazy(() => import('./LogoLoop.jsx'));
const CountUp = React.lazy(() => import('./CountUp.jsx'));
const featuredIndexes = [0, 4, 7, 9, 12, 16, 17, 20, 21];
const featuredReviews = featuredIndexes.map(index => reviews[index]);
const loopItems = featuredReviews.map(review => ({ title: review.author, node: null, ariaLabel: `Google customer review by ${review.author}` }));

function Rating({ animated = false }) {
  return (
    <div className="review-rating">
      <span className="review-stars" aria-hidden="true">★★★★★</span>
      <span className="review-rating-value" aria-hidden="true">
        {animated ? (
          <React.Suspense fallback="5/5">
            <CountUp from={0} to={5} mode="roll" duration={1.25} delay={0.12} suffix="/5" separator="," decimals={0} direction="up" trigger="view" replayOnHover className="review-count-up" />
          </React.Suspense>
        ) : '5/5'}
      </span>
      <span className="sr-only">Rated five out of five stars</span>
    </div>
  );
}

function ReviewCard({ review, animatedRating = false, excerptLabel = review.excerpt, fullReview = false }) {
  const prefersReducedMotion = useReducedMotion();
  const isServiceHighlight = review.type === 'service-highlight';
  return (
    <motion.article
      className={`review-card ${fullReview ? 'review-card-full' : ''}`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 26, scale: 0.985 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      whileHover={prefersReducedMotion ? undefined : { y: -5, transition: { duration: 0.22 } }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.68, ease: [0.2, 0.75, 0.25, 1] }}
    >
      <div className="review-card-top"><span className="review-source">{isServiceHighlight ? 'Service highlight' : 'Google review'}</span>{isServiceHighlight ? null : <Rating animated={animatedRating} />}</div>
      <blockquote><p>{review.text}</p></blockquote>
      <div className="review-card-footer">
        <div className="review-avatar" aria-hidden="true">{review.author.trim().slice(0, 1).toUpperCase()}</div>
        <div><strong>{review.author}</strong><span>{isServiceHighlight ? 'Perfect Packways service information' : excerptLabel ? 'Excerpt from supplied review' : 'Customer review'}</span></div>
      </div>
    </motion.article>
  );
}

export function HomeReviews() {
  const renderItem = (item, key) => {
    const index = Number(key.split('-').at(-1));
    return <ReviewCard review={featuredReviews[index]} excerptLabel animatedRating />;
  };
  return (
    <section className="home-reviews-section" id="customer-reviews">
      <div className="container home-reviews-heading">
        <div>
          <p className="eyebrow">Good words, from real moves</p>
          <AnimatedWords as="h2" text="Care, in their own words." className="animated-heading home-reviews-title" />
        </div>
        <p>Customer-authored review excerpts supplied for this site. Each displayed rating belongs to that individual review—not an average.</p>
      </div>
      <React.Suspense fallback={<div className="reviews-loop-fallback" aria-label="Customer reviews">Loading customer reviews…</div>}>
        <LogoLoop
          logos={loopItems}
          renderItem={renderItem}
          speed={36}
          direction="left"
          logoHeight={410}
          gap={20}
          pauseOnHover
          hoverSpeed={0}
          fadeOut
          fadeOutWidth={0.035}
          draggable
          intro
          ariaLabel="Customer Google review excerpts. Pause by hovering or drag to explore."
          className="reviews-loop"
        />
      </React.Suspense>
      <div className="container home-reviews-actions">
        <a className="button button-navy" href="/reviews" onClick={event => { event.preventDefault(); window.dispatchEvent(new CustomEvent('pp:navigate', { detail: '/reviews' })); }}>Read all supplied reviews <span className="arrow" aria-hidden="true">↗</span></a>
        <a className="text-link" href={GOOGLE_MAPS_REVIEWS_URL} target="_blank" rel="noreferrer">Find us on Google Maps and add a review <span className="arrow" aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}

export function ReviewsGrid() {
  return (
    <section className="reviews-page-section">
      <div className="container reviews-page-intro">
        <p className="eyebrow">Customer stories</p>
        <p>These customer-authored excerpts and names were supplied for the site. Source-truncated text is marked as an excerpt; owner replies have not been included.</p>
        <a className="button button-orange" href={GOOGLE_MAPS_REVIEWS_URL} target="_blank" rel="noreferrer">Find us on Google Maps and add a review <span className="arrow" aria-hidden="true">↗</span></a>
      </div>
      <div className="container reviews-grid">
        {reviews.map(review => <ReviewCard key={review.author} review={review} animatedRating fullReview />)}
      </div>
    </section>
  );
}
