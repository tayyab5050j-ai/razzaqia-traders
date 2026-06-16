import { Link, useNavigate } from "react-router-dom";

export default function Sidebar({ open, closeSidebar }) {
  const handleLink = () => closeSidebar();

  return (
    <>
      {open && (
        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
        />
      )}
      <div className={`sidebar ${open ? "active" : ""}`}>
        <button className="close-btn" onClick={closeSidebar}>✕</button>

        <Link to="/" onClick={handleLink}>Home</Link>
        <Link to="/products" onClick={handleLink}>All Products</Link>
        <Link to="/products/Mobiles" onClick={handleLink}>📱 Mobiles</Link>
        <Link to="/products/Kitchen Appliances" onClick={handleLink}>🍳 Kitchen Appliances</Link>
        <Link to="/products/Refrigerators" onClick={handleLink}>❄️ Refrigerators</Link>
        <Link to="/products/Washing Machines" onClick={handleLink}>🧺 Washing Machines</Link>
        <Link to="/products/Speakers" onClick={handleLink}>🔊 Speakers</Link>
        <Link to="/products/Home Appliances" onClick={handleLink}>🏠 Home Appliances</Link>
        <Link to="/cart" onClick={handleLink}>🛒 My Cart</Link>
        <Link to="/contact" onClick={handleLink}>✉️ Contact Us</Link>

        <div className="owner-menu">
          <Link to="/login" onClick={handleLink}>
            Owner Menu
            <small>Admin access required</small>
          </Link>
        </div>
      </div>
    </>
  );
}
