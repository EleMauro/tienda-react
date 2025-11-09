import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Detail from "./pages/Detail.jsx";
import Cart from "./pages/Cart.jsx";
import CartWidget from "./components/CartWidget.jsx";

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <nav style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", alignItems: "center" }}>
        <Link to="/">Inicio</Link>

        {}
        <CartWidget />
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/producto/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

