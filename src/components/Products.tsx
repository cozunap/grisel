import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function Products() {
  const [productsData, setProductsData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDocs(collection(db, 'products'));
      let data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      data.sort((a: any, b: any) => (a.priority || 0) - (b.priority || 0));
      setProductsData(data);
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
          {productsData.map((product, index) => (
            <div className="product-card" key={index} style={{ display: "flex", flexDirection: "column", gap: "12px", textAlign: "center", paddingBottom: "24px", background: "#fff", border: "1px solid var(--line)", borderRadius: "8px", padding: "32px 24px" }}>
              {product.image && (
                <div style={{ 
                  backgroundImage: `url(${product.image})`, 
                  backgroundSize: "contain", 
                  backgroundRepeat: "no-repeat", 
                  backgroundPosition: "center", 
                  aspectRatio: "1/1", 
                  width: "100%",
                  marginBottom: "8px"
                }}></div>
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
