import React from 'react';
import { BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_E164, BUSINESS_WHATSAPP_BASE } from '../data/siteLinks.js';

const WHATSAPP_URL = `${BUSINESS_WHATSAPP_BASE}?text=${encodeURIComponent('Hello Perfect Packways, I would like a quote for my move.')}`;

export function WhatsAppGlyph() {
  return (
    <svg className="whatsapp-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 2.25a9.32 9.32 0 0 0-8.02 14.07L3 21l4.8-1.25A9.34 9.34 0 1 0 12 2.25Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9.05 7.55c-.2-.45-.42-.46-.63-.47l-.54-.01c-.19 0-.5.07-.77.36-.27.29-1.01.99-1.01 2.42 0 1.42 1.03 2.8 1.17 2.99.15.19 1.99 3.2 4.91 4.36 2.44.97 2.94.78 3.47.73.53-.06 1.7-.7 1.94-1.37.24-.67.24-1.25.17-1.37-.07-.13-.27-.2-.56-.35-.29-.15-1.7-.84-1.97-.93-.27-.1-.46-.15-.66.15-.19.29-.75.93-.92 1.12-.17.19-.34.22-.63.08-.29-.15-1.22-.45-2.33-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.35.43-.52.14-.17.19-.29.29-.49.1-.19.05-.36-.02-.51-.08-.15-.65-1.58-.91-2.16Z" fill="currentColor" transform="translate(1.5 1.3) scale(.88)" />
    </svg>
  );
}

export default function FloatingContactActions() {
  return (
    <div className="floating-contact-actions" role="group" aria-label="Quick contact options">
      <a className="call-float" href={`tel:${BUSINESS_PHONE_E164}`} aria-label={`Call Perfect Packways now at ${BUSINESS_PHONE_DISPLAY}`}>
        <svg className="call-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M7.4 3.2h2.45l1.35 4.1-1.83 1.55a14.3 14.3 0 0 0 5.78 5.78l1.55-1.83 4.1 1.35v2.45a2 2 0 0 1-2.1 2.1C10.6 18.25 5.75 13.4 5.3 5.3a2 2 0 0 1 2.1-2.1Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>
        <span>Call Now</span>
      </a>
      <a className="whatsapp-float" href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Chat with Perfect Packways on WhatsApp">
        <WhatsAppGlyph />
        <span>Chat on WhatsApp</span>
      </a>
    </div>
  );
}
