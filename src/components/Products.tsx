import products from '../../shop_data.json';

export default function Products() {
  return (
    <section className="section">
      <div className="container center" style={{ marginBottom: "24px" }}>
        <span className="eyebrow center-line">Our Products</span>
        <h2>Product Catalogue</h2>
      </div>
      <div className="container">
        <div className="tile-grid tile-grid--3">
          {products.map((product, index) => (
            <div className="product-card" key={index} style={{ display: "flex", flexDirection: "column", gap: "12px", textAlign: "center", paddingBottom: "24px" }}>
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
              <button className="btn" style={{ 
                width: "100%", 
                justifyContent: "center", 
                marginTop: "auto",
                backgroundColor: "transparent",
                border: "1px solid var(--line)",
                color: "var(--ink)"
              }}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
