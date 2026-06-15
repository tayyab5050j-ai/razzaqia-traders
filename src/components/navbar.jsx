import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { FaBars, FaShoppingCart, FaSearch } from "react-icons/fa";

export default function Navbar({ openSidebar }) {

  const { cart } = useContext(CartContext);

  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleSearch = (e) => {

  if (e.key === "Enter") {

    navigate(
      `/products?search=${encodeURIComponent(search)}`
    );

  }

};

  return (
    <header className="navbar">

      <button className="menu-btn" onClick={openSidebar}>
        <FaBars />
      </button>

      <Link to="/" className="logo">
        <span className="logo-white">RAZZAQIA</span>
        <span className="logo-orange"> TRADERS</span>
      </Link>

      <div className="search-box">
        <FaSearch className="search-icon" />
      <input
  type="text"
  placeholder="Search products..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  onKeyDown={handleSearch}
  style={{
    color: "#111",
  }}
/>
      </div>

      <Link
  to="/cart"
  className="cart-btn"
  style={{
    textDecoration: "none",
    color: "inherit",
  }}
>
  <FaShoppingCart />

  <span>
    Cart {cart.length}
  </span>
</Link>

    </header>
  );
}