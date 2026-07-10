import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Products from '../components/Products';
import { FadeIn } from '../components/FadeIn';

export default function Catalogue() {
  return (
    <Layout>
      <SEO 
        title="Premium Spa Products | Exclusive Beauty Lounge MD" 
        description="Browse our curated catalogue of high-end skin care products. Achieve clinical anti-aging results with our customized botanical collections."
        canonical="/catalogue"
        keywords="high-end skin care bethesda, premium spa gift certificates MD, organic luxury facials MD, advanced skincare products Maryland"
      />
      
      <section className="hero-banner" style={{ minHeight: "300px", padding: "80px 0 40px", backgroundImage: "linear-gradient(180deg, rgba(33,29,25,0.38), rgba(33,29,25,0.58)), url('https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1800&q=80')" }}>
        <div className="container center">
          <FadeIn>
            <h1>Catalogue</h1>
            <p className="lede">Discover our curated collection of professional skincare products.</p>
          </FadeIn>
        </div>
      </section>

      <FadeIn delay={0.2} direction="up">
        <Products />
      </FadeIn>

    </Layout>
  );
}
