import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function CartWidget() {
  const { totalItems } = useCart();

  return (
    <Link to="/cart" style={{ position: "relative", textDecoration: "none", color: "inherit" }}>
      🛒
      {!!totalItems && (
        <span
          style={{
            position: "absolute",
            top: -8,
            right: -10,
            fontSize: 12,
            background: "#0ea5e9",
            color: "#fff",
            borderRadius: 9999,
            padding: "2px 6px",
            lineHeight: 1
          }}
        >
          {totalItems}
        </span>
      )}
    </Link>
  );
}
