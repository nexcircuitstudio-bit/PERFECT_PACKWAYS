export function trackConversion(eventName, parameters = {}) {
  if (typeof window === 'undefined') return;
  const detail = { eventName, ...parameters };
  window.dispatchEvent(new CustomEvent('pp:conversion', { detail }));
  if (typeof window.gtag === 'function') window.gtag('event', eventName, parameters);
  else if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event: eventName, ...parameters });
}
