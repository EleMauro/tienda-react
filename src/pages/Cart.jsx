import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeItem, clearCart, totalPrice } = useCart();
  const [buyer, setBuyer] = useState({ nombre: "", email: "", telefono: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBuyer((b) => ({ ...b, [name]: value }));
  };

  const submitOrder = (e) => {
    e.preventDefault();
    if (!buyer.nombre.trim() || !buyer.email.trim() || !buyer.telefono.trim()) {
      return alert("Completá tus datos para continuar");
    }

    alert("✅ Orden generada con éxito (modo demo)");
    clearCart();
  };

  if (!cart.length) return <h2 className="empty">Tu carrito está vacío 🛒</h2>;

  return (
    <div className="cart-container">

      <h2>Carrito</h2>

      <div className="cart-list">
        {cart.map((p) => (
          <div className="cart-item" key={p.id}>
            <img src={p.img} alt={p.title} />

            <div className="cart-info">
              <h4>{p.title}</h4>
              <p>Precio: <strong>${p.price.toLocaleString("es-AR")}</strong></p>
              <p>Cantidad: {p.qty}</p>
              <p>Subtotal: <strong>${(p.qty * p.price).toLocaleString("es-AR")}</strong></p>
            </div>

            <button className="btn-outline" onClick={() => removeItem(p.id)}>
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <strong>Total a pagar: ${totalPrice.toLocaleString("es-AR")}</strong>
        <button className="btn-red" onClick={clearCart}>Vaciar Carrito</button>
      </div>

      <h3>Finalizar compra</h3>

      <form className="cart-form" onSubmit={submitOrder}>
        <input name="nombre" placeholder="Tu nombre" value={buyer.nombre} onChange={handleChange} required />
        <input name="email" placeholder="tu@email.com" type="email" value={buyer.email} onChange={handleChange} required />
        <input name="telefono" placeholder="+54 9 11 1234 5678" value={buyer.telefono} onChange={handleChange} required />
        <button className="btn" type="submit">Crear orden (demo)</button>
      </form>

    </div>
  );
}
