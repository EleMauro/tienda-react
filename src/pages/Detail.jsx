import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

export default function Detail() {
  const { id } = useParams();
  const { addItem, stock } = useCart();

  const product = products.find(item => item.id === id);
  if (!product) return <h2>Producto no encontrado</h2>;

  const remaining = stock[product.id] ?? product.stock;
  const handleAdd = () => {
    const ok = addItem(product, 1);
    if (!ok) alert("Sin stock disponible");
  };

  return (
    <div style={{ padding: "40px" }}>
      <img
        src={product.img}
        alt={product.title}
        style={{ width: "45vw", maxWidth: 520, borderRadius: 12 }}
      />
      <h1>{product.title}</h1>
      <p>${product.price.toLocaleString("es-AR")}</p>
      <p>Stock: {remaining}</p>

      <button
        onClick={handleAdd}
        disabled={remaining <= 0}
        style={{
          padding: "12px 25px",
          background: remaining <= 0 ? "#999" : "#00eaff",
          border: "none",
          borderRadius: "6px",
          marginTop: "15px",
          cursor: remaining <= 0 ? "not-allowed" : "pointer",
          fontWeight: "bold",
          color: "#000"
        }}
      >
        {remaining > 0 ? "Agregar al Carrito" : "Sin stock"}
      </button>
    </div>
  );
}
