import { products } from "../data/products";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Productos</h1>
      <div style={{
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "2rem",
  marginTop: "2rem"
}}>
        {products.map(item => (
          <article
            key={item.id}
            style={{
              padding: "1rem",
              border: "1px solid #333",
              borderRadius: "10px"
            }}
          >
            <img
              src={item.img}
              alt={item.title}
              style={{ width: "100%", borderRadius: "8px", marginBottom: ".5rem" }}
            />
            <h3>{item.title}</h3>
            <p>${item.price}</p>

           <Link to={`/producto/${item.id}`} style={{ color: "cyan", textDecoration: "underline" }}>
  Ver detalle
</Link>

          </article>
        ))}
      </div>
    </div>
  );
}
