import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import '../index.css';

export default function Contact() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDoc(doc(db, 'content', 'contact'));
      if (snap.exists()) setData(snap.data());
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <SEO title="Contact Us" description="Get in touch with Grisel Beauty Spa. Call, email, or visit our location in Silver Spring, MD." />

      <section className="page-header">
        <div className="container">
          <span className="eyebrow center-line">Contact</span>
          <h1>{data?.heroTitle || "Contact Us"}</h1>
          <p className="lede">{data?.heroSubtitle || "Questions about a treatment, a gift card, or your appointment? Send a message or call us directly."}</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid grid-2">
            <div>
              <div className="contact-info-block" style={{ marginBottom: "32px" }}>
                <span className="eyebrow">Location</span>
                <address style={{ fontStyle: "normal", fontSize: "1.1rem", lineHeight: 1.6, color: "var(--ink-soft)" }}>
                  {data?.address ? data.address.split('\\n').map((line: string, i: number) => <span key={i}>{line}<br/></span>) : (
                    <>
                      1620 Elton Rd, Suite 205<br />
                      Silver Spring, MD 20903
                    </>
                  )}
                </address>
              </div>

              <div className="contact-info-block" style={{ marginBottom: "32px" }}>
                <span className="eyebrow">Phone</span>
                <p style={{ fontSize: "1.1rem", margin: 0 }}>
                  <a href={data?.phoneLink || "tel:2407010731"} style={{ color: "var(--ink)" }}>{data?.phone || "(240) 701-0731"}</a>
                </p>
              </div>

              <div className="contact-info-block">
                <span className="eyebrow">Hours</span>
                <p style={{ fontSize: "1.1rem", margin: 0, color: "var(--ink-soft)", lineHeight: 1.6 }}>
                  {data?.hours ? data.hours.split('\\n').map((line: string, i: number) => <span key={i}>{line}<br/></span>) : (
                    <>
                      Saturday: 10:00 am - 7:00 pm<br />
                      Mon - Fri: By appointment
                    </>
                  )}
                </p>
              </div>
            </div>

            <div>
              <div style={{ background: "#f1f3f0", borderRadius: "12px", overflow: "hidden", height: "100%", minHeight: "400px" }}>
                <iframe
                  src={data?.mapUrl || "https://www.google.com/maps?q=1620+Elton+Rd+Suite+205+Silver+Spring+MD+20903&output=embed"}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
}
