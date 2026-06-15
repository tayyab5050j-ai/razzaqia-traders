import { Link } from "react-router-dom";

export default function Sidebar({ open, closeSidebar }) {
  return (
    <div className={`sidebar ${open ? "active" : ""}`}>
      <button className="close-btn" onClick={closeSidebar}>
        ✕
      </button>

      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/contact">Contact</Link>

      <div className="owner-menu">
        <Link to="/login">
          Owner Menu
          <small>Admin access required</small>
        </Link>
      </div>
    </div>
  );
}