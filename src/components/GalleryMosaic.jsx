import React, { useEffect, useRef, useState } from 'react';

const INITIAL_VISIBLE = 6;
const BATCH_SIZE = 6;

export default function GalleryMosaic({ images }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [activeIndex, setActiveIndex] = useState(null);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const openerRef = useRef(null);
  const touchStartX = useRef(null);
  const isOpen = activeIndex !== null;

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    const onKeyDown = event => {
      if (event.key === 'Escape') {
        setActiveIndex(null);
        return;
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setActiveIndex(current => (current - 1 + images.length) % images.length);
        return;
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setActiveIndex(current => (current + 1) % images.length);
        return;
      }
      if (event.key === 'Tab') {
        const controls = dialogRef.current?.querySelectorAll('button:not([disabled])');
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      openerRef.current?.focus();
    };
  }, [isOpen, images.length]);

  const openLightbox = (index, event) => {
    openerRef.current = event.currentTarget;
    setActiveIndex(index);
  };

  const showPrevious = () => setActiveIndex(current => (current - 1 + images.length) % images.length);
  const showNext = () => setActiveIndex(current => (current + 1) % images.length);
  const showMore = () => setVisibleCount(current => Math.min(current + BATCH_SIZE, images.length));

  const handleTouchStart = event => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = event => {
    if (touchStartX.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) < 48) return;
    if (distance < 0) showNext();
    else showPrevious();
  };

  const activeImage = isOpen ? images[activeIndex] : null;

  return (
    <>
      <div className="gallery-grid" aria-label="Perfect Packways moving and packing photographs">
        {images.slice(0, visibleCount).map((image, index) => (
          <button
            className="gallery-item"
            key={image.src}
            type="button"
            onClick={event => openLightbox(index, event)}
            aria-label={`Open photo ${index + 1} of ${images.length}: ${image.label}`}
          >
            <figure>
              <img
                src={image.src}
                alt={image.label}
                width={image.width}
                height={image.height}
                loading="lazy"
                decoding="async"
                draggable="false"
              />
            </figure>
          </button>
        ))}
      </div>

      <div className="gallery-load-more">
        <p className="gallery-count" aria-live="polite">Showing {Math.min(visibleCount, images.length)} of {images.length} photographs</p>
        {visibleCount < images.length && (
          <button className="gallery-more-button" type="button" onClick={showMore}>
            Load more photos <span aria-hidden="true">↗</span>
          </button>
        )}
      </div>

      {activeImage && (
        <div className="gallery-lightbox" onClick={event => { if (event.target === event.currentTarget) setActiveIndex(null); }}>
          <section
            className="gallery-lightbox-dialog"
            role="dialog"
            aria-modal="true"
            aria-label={`Photo ${activeIndex + 1} of ${images.length}: ${activeImage.label}`}
            ref={dialogRef}
          >
            <div className="gallery-lightbox-toolbar">
              <p>{String(activeIndex + 1).padStart(2, '0')} <span>/ {String(images.length).padStart(2, '0')}</span></p>
              <button className="gallery-lightbox-close" type="button" onClick={() => setActiveIndex(null)} ref={closeButtonRef} aria-label="Close photo viewer">
                <span aria-hidden="true">×</span> Close
              </button>
            </div>
            <div className="gallery-lightbox-stage" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
              <button className="gallery-lightbox-nav gallery-lightbox-prev" type="button" onClick={showPrevious} aria-label="Previous photo">‹</button>
              <div className="gallery-lightbox-image-wrap">
                <img className="gallery-lightbox-image" src={activeImage.src} alt={activeImage.label} width={activeImage.width} height={activeImage.height} decoding="async" draggable="false" />
              </div>
              <button className="gallery-lightbox-nav gallery-lightbox-next" type="button" onClick={showNext} aria-label="Next photo">›</button>
            </div>
            <p className="gallery-lightbox-caption">{activeImage.label}</p>
          </section>
        </div>
      )}
    </>
  );
}
