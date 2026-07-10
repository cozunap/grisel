import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import localProducts from '../../shop_data.json';

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  priority: number;
}

export default function Products() {
  // Start with local JSON immediately — no loading flicker, works on all deployments
  const [productsData, setProductsData] = useState<Product[]>(
    localProducts.map((p, i) => ({ id: p.title, title: p.title, price: p.price, image: p.image || '', priority: i + 1 }))
  );

  useEffect(() => {
    // Try to upgrade to Firestore data if available (for CMS edits)
    const fetchData = async () => {
      try {
        const snap = await getDocs(collection(db, 'products'));
        if (!snap.empty) {
          const data: Product[] = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
          data.sort((a, b) => (a.priority || 0) - (b.priority || 0));
          setProductsData(data);
        }
        // If Firestore empty, keep showing the local JSON (already set as default state)
      } catch {
        // Network / permission error — keep showing local JSON
      }
    };
    fetchData();
  }, []);

  return (
    <section className="section">
      <div className="container center" style={{ marginBottom: "24px" }}>
        <span className="eyebrow center-line">Our Products</span>
        <h2>Product Catalogue</h2>
      </div>
      <div className="container">
        <div className="tile-grid tile-grid--3">
          {productsData.map((product) => (
            <div
              className="product-card"
              key={product.id}
              style={{ display: "flex", flexDirection: "column", gap: "12px", textAlign: "center", background: "#fff", border: "1px solid var(--line)", borderRadius: "8px", padding: "32px 24px" }}
            >
              {product.image && (
                <div style={{
                  backgroundImage: `url(${product.image})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  aspectRatio: "1/1",
                  width: "100%",
                  marginBottom: "8px"
                }} />
              )}
              <h3 style={{ fontSize: "1.05rem", margin: 0, fontWeight: 600, color: "var(--ink)" }}>{product.title}</h3>
              <div style={{ color: "var(--gold)", fontWeight: 600, fontSize: "1.1rem" }}>${product.price.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
