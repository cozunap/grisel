import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { Link } from 'react-router';

export default function NotFound() {
  return (
    <Layout>
      <SEO title="Page Not Found" description="The page you are looking for does not exist." />
      
      <section style={{ 
        minHeight: "70vh", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center",
        textAlign: "center",
        padding: "40px 20px"
      }}>
        <div className="container center" style={{ maxWidth: "600px" }}>
          <span className="eyebrow center-line" style={{ color: "var(--gold)" }}>Error 404</span>
          <h1 style={{ fontSize: "3.5rem", marginBottom: "24px" }}>Page Not Found</h1>
          <p className="lede" style={{ marginBottom: "40px" }}>
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <div className="btn-row" style={{ justifyContent: "center" }}>
            <Link to="/" className="btn btn-primary">Return Home</Link>
            <Link to="/services" className="btn btn-outline">View Services</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
