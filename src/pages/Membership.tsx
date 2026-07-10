import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import '../index.css';

export default function Membership() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDoc(doc(db, 'content', 'membership'));
      if (snap.exists()) setData(snap.data());
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <SEO title="Membership" description="Experience relaxation and rejuvenation at Grisel Beauty Spa. Serving Silver Spring, MD and the greater DC/VA area." />

      <section className="page-header">
        <div className="container">
          <span className="eyebrow center-line">Membership</span>
          <h1>{data?.heroTitle || "Make wellness a habit, not a splurge"}</h1>
          <p className="lede">{data?.heroSubtitle || "Monthly membership means built-in service credits, member pricing, and priority booking, so your next facial, massage, or wax is already taken care of."}</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "20px" }}>
        <div className="container">
          <div className="grid grid-3">

            <div className="plan-card">
              <span className="eyebrow center-line">Essentials</span>
              <div className="plan-price">{data?.plan1Price || "$89"}<span>/month</span></div>
              <ul className="plan-list">
                {data?.plan1Perks ? data.plan1Perks.split('\\n').map((perk: string, i: number) => <li key={i}>{perk}</li>) : (
                  <>
                    <li>1 signature service credit each month (any facial, massage, or Brazilian wax)</li>
                    <li>10% off additional services booked same visit</li>
                    <li>Unused credits roll over up to 1 month</li>
                    <li>Member pricing on gift cards</li>
                  </>
                )}
              </ul>
              <a href="/booking" className="btn btn-outline" style={{ justifyContent: "center" }}>Start This Plan</a>
            </div>

            <div className="plan-card featured">
              <span className="plan-tag">Most Popular</span>
              <span className="eyebrow center-line">Renewal</span>
              <div className="plan-price">{data?.plan2Price || "$149"}<span>/month</span></div>
              <ul className="plan-list">
                {data?.plan2Perks ? data.plan2Perks.split('\\n').map((perk: string, i: number) => <li key={i}>{perk}</li>) : (
                  <>
                    <li>2 service credits each month, mix and match any treatment</li>
                    <li>15% off additional services and retail add-ons</li>
                    <li>Priority access to Saturday booking windows</li>
                    <li>Unused credits roll over up to 2 months</li>
                  </>
                )}
              </ul>
              <a href="/booking" className="btn btn-primary" style={{ justifyContent: "center" }}>Start This Plan</a>
            </div>

            <div className="plan-card">
              <span className="eyebrow center-line">Unlimited Wellness</span>
              <div className="plan-price">{data?.plan3Price || "$259"}<span>/month</span></div>
              <ul className="plan-list">
                {data?.plan3Perks ? data.plan3Perks.split('\\n').map((perk: string, i: number) => <li key={i}>{perk}</li>) : (
                  <>
                    <li>Unlimited waxing services</li>
                    <li>2 facial or massage credits each month</li>
                    <li>20% off everything else in the treatment menu</li>
                    <li>One guest pass per quarter</li>
                  </>
                )}
              </ul>
              <a href="/booking" className="btn btn-outline" style={{ justifyContent: "center" }}>Start This Plan</a>
            </div>

          </div>

          <p className="lede center" style={{ margin: "44px auto 0", maxWidth: "720px", fontSize: "0.92rem" }}>{data?.footerNote || "Membership pricing and perks above are default starter tiers for planning purposes. Confirm final pricing, credit rules, and cancellation terms with Grisel before this goes live."}</p>
        </div>
      </section>

      <section className="section--tight section--olive">
        <div className="container center">
          <h2>{data?.ctaTitle || "Ready to become a member?"}</h2>
          <p className="lede">{data?.ctaSubtitle || "Call, message, or book your first session and we'll get you set up on the plan that fits."}</p>
          <div className="btn-row">
            <a href="/booking" className="btn btn-primary">Book Appointment</a>
            <a href="/contact" className="btn btn-outline">Ask a Question</a>
          </div>
        </div>
      </section>

    </Layout>
  );
}
