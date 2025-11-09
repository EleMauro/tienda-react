import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { products } from "../data/products"; // ojo con la ruta

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  // carrito persistido
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // mapa de stock por id, persistido
  const [stock, setStock] = useState(() => {
    const saved = localStorage.getItem("stock");
    if (saved) return JSON.parse(saved);
    const initial = {};
    products.forEach(p => (initial[p.id] = p.stock));
    return initial;
  });

  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem("stock", JSON.stringify(stock)), [stock]);

  // Agregar con control de stock (devuelve true/false)
  const addItem = (item, qty = 1) => {
    const available = stock[item.id] ?? 0;
    if (available <= 0) return false;

    const toAdd = Math.min(qty, available);

    setCart(prev => {
      const exist = prev.find(p => p.id === item.id);
      if (exist) {
        return prev.map(p =>
          p.id === item.id ? { ...p, qty: p.qty + toAdd } : p
        );
      }
      return [...prev, { ...item, qty: toAdd }];
    });

    setStock(prev => ({ ...prev, [item.id]: prev[item.id] - toAdd }));
    return true;
  };

  // Quitar un ítem (restituye stock de la cantidad que estaba en el carrito)
  const removeItem = (id) => {
    const found = cart.find(p => p.id === id);
    if (found) {
      setStock(prev => ({ ...prev, [id]: (prev[id] ?? 0) + found.qty }));
    }
    setCart(prev => prev.filter(p => p.id !== id));
  };

  // Vaciar carrito (restituye todo el stock)
  const clearCart = () => {
    setStock(prev => {
      const next = { ...prev };
      cart.forEach(p => { next[p.id] = (next[p.id] ?? 0) + p.qty; });
      return next;
    });
    setCart([]);
  };

  const { totalItems, totalPrice } = useMemo(() => ({
    totalItems: cart.reduce((acc, p) => acc + p.qty, 0),
    totalPrice: cart.reduce((acc, p) => acc + p.qty * p.price, 0),
  }), [cart]);

  return (
    <CartContext.Provider
      value={{ cart, stock, addItem, removeItem, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}
