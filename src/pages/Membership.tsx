import Layout from '../components/Layout';
import SEO from '../components/SEO';

import { useEffect } from 'react';
import '../index.css';

export default function Membership() {
  useEffect(() => {
    // JS logic to initialize components can go here
  }, []);

  return (
    <Layout>
      <SEO title="Membership" description="Experience relaxation and rejuvenation at Grisel Beauty Spa. Serving Silver Spring, MD and the greater DC/VA area." />
      



<section className="page-header">
  <div className="container">
    <span className="eyebrow center-line">Membership</span>
    <h1>Make wellness a habit, not a splurge</h1>
    <p className="lede">Monthly membership means built-in service credits, member pricing, and priority booking, so your next facial, massage, or wax is already taken care of.</p>
  </div>
</section>

<section className="section" style={{ paddingTop: "20px" }}>
  <div className="container">
    <div className="grid grid-3">

      <div className="plan-card">
        <span className="eyebrow center-line">Essentials</span>
        <div className="plan-price">$89<span>/month</span></div>
        <ul className="plan-list">
          <li>1 signature service credit each month (any facial, massage, or Brazilian wax)</li>
          <li>10% off additional services booked same visit</li>
          <li>Unused credits roll over up to 1 month</li>
          <li>Member pricing on gift cards</li>
        </ul>
        <a href="/booking" className="btn btn-outline" style={{ justifyContent: "center" }}>Start This Plan</a>
      </div>

      <div className="plan-card featured">
        <span className="plan-tag">Most Popular</span>
        <span className="eyebrow center-line">Renewal</span>
        <div className="plan-price">$149<span>/month</span></div>
        <ul className="plan-list">
          <li>2 service credits each month, mix and match any treatment</li>
          <li>15% off additional services and retail add-ons</li>
          <li>Priority access to Saturday booking windows</li>
          <li>Unused credits roll over up to 2 months</li>
        </ul>
        <a href="/booking" className="btn btn-primary" style={{ justifyContent: "center" }}>Start This Plan</a>
      </div>

      <div className="plan-card">
        <span className="eyebrow center-line">Unlimited Wellness</span>
        <div className="plan-price">$259<span>/month</span></div>
        <ul className="plan-list">
          <li>Unlimited waxing services</li>
          <li>2 facial or massage credits each month</li>
          <li>20% off everything else in the treatment menu</li>
          <li>One guest pass per quarter</li>
        </ul>
        <a href="/booking" className="btn btn-outline" style={{ justifyContent: "center" }}>Start This Plan</a>
      </div>

    </div>

    <p className="lede center" style={{ margin: "44px auto 0", maxWidth: "720px", fontSize: "0.92rem" }}>Membership pricing and perks above are default starter tiers for planning purposes. Confirm final pricing, credit rules, and cancellation terms with Grisel before this goes live.</p>
  </div>
</section>

<section className="section--tight section--olive">
  <div className="container center">
    <h2>Ready to become a member?</h2>
    <p className="lede">Call, message, or book your first session and we'll get you set up on the plan that fits.</p>
    <div className="btn-row">
      <a href="/booking" className="btn btn-primary">Book Appointment</a>
      <a href="/contact" className="btn btn-outline">Ask a Question</a>
    </div>
  </div>
</section>




    </Layout>
  );
}
