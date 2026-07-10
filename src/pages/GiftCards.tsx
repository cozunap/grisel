import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import '../index.css';

export default function GiftCards() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDoc(doc(db, 'content', 'giftcards'));
      if (snap.exists()) setData(snap.data());
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <SEO title="Gift Cards" description="Give the gift of wellness with Grisel Beauty Spa gift cards." />

      <section className="page-header">
        <div className="container">
          <span className="eyebrow center-line">Gift Cards</span>
          <h1>{data?.heroTitle || "Give the gift of a moment of wellness"}</h1>
          <p className="lede">{data?.heroSubtitle || "A Grisel Beauty Spa gift card lets someone you care about choose their own escape, a facial, a massage, or a full afternoon of treatments."}</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid grid-3">
            <div className="plain-card">
              <h3>{data?.use1Title || "Birthdays"}</h3>
              <p>{data?.use1Desc || "Skip the candles and give a day of rest instead. Pairs well with a hot stone massage or luxury facial."}</p>
            </div>
            <div className="plain-card">
              <h3>{data?.use2Title || "Holidays"}</h3>
              <p>{data?.use2Desc || "An easy, meaningful gift for family, friends, or coworkers who could use a break from the season."}</p>
            </div>
            <div className="plain-card">
              <h3>{data?.use3Title || "Just Because"}</h3>
              <p>{data?.use3Desc || "A thank-you gift for a new mom, a retiring colleague, or anyone due for a little care."}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section--tight section--olive">
        <div className="container center">
          <h2>{data?.ctaTitle || "Gift cards are available by phone or in person"}</h2>
          <p className="lede">{data?.ctaSubtitle || "Online gift card purchases are coming soon. For now, call or email us and we'll set up any amount, mail or email the card, and even suggest a treatment to match the occasion."}</p>
          <div className="btn-row" style={{ marginTop: "32px" }}>
            <a href={data?.ctaPhoneLink || "tel:2407010731"} className="btn btn-primary">{data?.ctaPhone || "(240) 701-0731"}</a>
            <a href="/contact" className="btn btn-outline">Send a Message</a>
          </div>
        </div>
      </section>

    </Layout>
  );
}
