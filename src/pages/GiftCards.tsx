import Layout from '../components/Layout';
import SEO from '../components/SEO';

import { useEffect } from 'react';
import '../index.css';

export default function GiftCards() {
  useEffect(() => {
    // JS logic to initialize components can go here
  }, []);

  return (
    <Layout>
      <SEO title="Gift Cards" description="Experience relaxation and rejuvenation at Grisel Beauty Spa. Serving Silver Spring, MD and the greater DC/VA area." />
      



<section className="hero-banner hero-banner--page" style={{ backgroundImage: "linear-gradient(180deg, rgba(33,29,25,0.42), rgba(33,29,25,0.6)), url('https://images.unsplash.com/photo-1672015521020-ab4f86d5cc00?auto=format&fit=crop&w=1800&q=80')" }}>
  <div className="container">
    <span className="eyebrow">Gift Cards</span>
    <h1>Give the gift of a moment of <em>wellness</em></h1>
    <p className="lede">A Grisel Beauty Spa gift card lets someone you care about choose their own escape, a facial, a massage, or a full afternoon of treatments.</p>
  </div>
</section>

<section className="section">
  <div className="container">
    <div className="grid grid-3">
      <div className="plain-card">
        <div className="icon-ring">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M20 12v9H4v-9"/><path d="M2 7h20v5H2z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
        </div>
        <h3>Birthdays</h3>
        <p>Skip the candles and give a day of rest instead. Pairs well with a hot stone massage or luxury facial.</p>
      </div>
      <div className="plain-card">
        <div className="icon-ring">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M12 2v4"/><path d="M5 10h14l-1.5 10h-11z"/><path d="M9 10a3 3 0 0 1 6 0"/></svg>
        </div>
        <h3>Holidays</h3>
        <p>An easy, meaningful gift for family, friends, or coworkers who could use a break from the season.</p>
      </div>
      <div className="plain-card">
        <div className="icon-ring">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
        </div>
        <h3>Just Because</h3>
        <p>A thank-you gift for a new mom, a retiring colleague, or anyone due for a little care.</p>
      </div>
    </div>
  </div>
</section>

<section className="cta-banner">
  <div className="container">
    <span className="eyebrow center-line" style={{ color: "var(--gold)" }}>How It Works</span>
    <h2>Gift cards are available by <em>phone or in person</em></h2>
    <p className="lede">Online gift card purchases are coming soon. For now, call or email us and we'll set up any amount, mail or email the card, and even suggest a treatment to match the occasion.</p>
    <div className="btn-row" style={{ justifyContent: "center" }}>
      <a href="tel:2407010731" className="btn btn-outline">Call (240) 701-0731</a>
      <a href="/contact" className="btn btn-outline">Email Us</a>
    </div>
  </div>
</section>

<section className="section--tight section--olive">
  <div className="container center">
    <h2>Ready to book your own visit?</h2>
    <p className="lede">While you're here, treat yourself too.</p>
    <div className="btn-row">
      <a href="/booking" className="btn btn-primary">Book Appointment</a>
      <a href="/services" className="btn btn-outline">View Services</a>
    </div>
  </div>
</section>




    </Layout>
  );
}
