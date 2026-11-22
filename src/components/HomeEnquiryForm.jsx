import React, { useState } from 'react';
import { BUSINESS_WHATSAPP_BASE } from '../data/siteLinks.js';
import { trackConversion } from '../analytics.js';

const moveTypes = [
  'Home shifting — 1 BHK',
  'Home shifting — 2 BHK',
  'Home shifting — 3 BHK',
  'Home shifting — 4+ BHK / villa',
  'Office / commercial relocation',
  'Vehicle transport',
  'Packing only',
  'Intercity / interstate relocation',
  'Other'
];

export default function HomeEnquiryForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', pickup: '', dropoff: '', moveType: '' });
  const [whatsappHref, setWhatsappHref] = useState('');
  const update = event => {
    setForm(current => ({ ...current, [event.target.name]: event.target.value }));
    setWhatsappHref('');
  };
  const submit = event => {
    event.preventDefault();
    const message = [
      'Hello Perfect Packways, I would like a moving quote.',
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      `Phone number: ${form.phone.trim()}`,
      `Pickup location: ${form.pickup.trim()}`,
      `Drop location: ${form.dropoff.trim()}`,
      `Relocation type: ${form.moveType}`
    ].join('\n');
    setWhatsappHref(`${BUSINESS_WHATSAPP_BASE}?text=${encodeURIComponent(message)}`);
    trackConversion('enquiry_prepared', { form_name: 'home_enquiry' });
  };

  return (
    <form className="home-enquiry-card" id="home-enquiry" onSubmit={submit}>
      <div className="home-enquiry-heading">
        <p className="eyebrow">Quick move estimate</p>
        <h2>Tell us the route.</h2>
        <p>Share six details to start your quote.</p>
      </div>
      <div className="home-enquiry-grid">
        <label>
          <span>Your name</span>
          <input name="name" autoComplete="name" value={form.name} onChange={update} placeholder="Full name" required />
        </label>
        <label>
          <span>Email address</span>
          <input name="email" type="email" autoComplete="email" value={form.email} onChange={update} placeholder="you@example.com" required />
        </label>
        <label>
          <span>Phone number</span>
          <input name="phone" type="tel" autoComplete="tel" inputMode="tel" value={form.phone} onChange={update} placeholder="+91 98765 43210" required />
        </label>
        <label>
          <span>Pickup location</span>
          <input name="pickup" autoComplete="address-level2" value={form.pickup} onChange={update} placeholder="City or pincode" required />
        </label>
        <label>
          <span>Drop location</span>
          <input name="dropoff" autoComplete="off" value={form.dropoff} onChange={update} placeholder="City or pincode" required />
        </label>
        <label className="home-enquiry-type">
          <span>What are you moving?</span>
          <select name="moveType" value={form.moveType} onChange={update} required>
            <option value="" disabled>Select a move type</option>
            {moveTypes.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </label>
      </div>
      <button className="button button-orange home-enquiry-submit" type="submit">Prepare my enquiry <span className="arrow" aria-hidden="true">↗</span></button>
      <p className="home-enquiry-note">Opens WhatsApp with your details. Nothing is stored on this page.</p>
      {whatsappHref && (
        <p className="home-enquiry-success" role="status" aria-live="polite">
          Your enquiry is ready. <a href={whatsappHref} target="_blank" rel="noreferrer">Continue to WhatsApp and tap Send</a>.
        </p>
      )}
    </form>
  );
}
