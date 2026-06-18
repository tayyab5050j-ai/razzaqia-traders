import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";
import { FaChevronDown } from "react-icons/fa";

export default function Sidebar({ open, closeSidebar }) {
  const handleLink = () => closeSidebar();
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "settings", "store"),
      (settingsSnap) => {
        if (settingsSnap.exists()) {
          const data = settingsSnap.data();
          if (data.categories && Array.isArray(data.categories)) {
            setCategories(data.categories);
          } else {
            setCategories([
              { id: "mobiles", name: "Mobiles", icon: "📱" },
              { id: "kitchen-appliances", name: "Kitchen Appliances", icon: "🍳" },
              { id: "refrigerators", name: "Refrigerators", icon: "❄️" },
              { id: "washing-machines", name: "Washing Machines", icon: "🧺" },
              { id: "speakers", name: "Speakers", icon: "🔊" },
              { id: "home-appliances", name: "Home Appliances", icon: "🏠" },
            ]);
          }
        }
      }
    );
    return () => unsubscribe();
  }, []);

  const toggleCategories = (e) => {
    e.preventDefault();
    setShowCategories(!showCategories);
  };

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

        <div className="sidebar-category-dropdown">
          <button className="sidebar-category-trigger" onClick={toggleCategories} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", background: "none", border: "none", color: "rgba(255,255,255,0.8)", fontSize: "16px", fontWeight: 500, padding: "14px 0", cursor: "pointer", textAlign: "left", fontFamily: "inherit" }}>
            <span>Categories</span>
            <FaChevronDown style={{ fontSize: "12px", transition: "transform 0.2s", transform: showCategories ? "rotate(180deg)" : "rotate(0deg)" }} />
          </button>
          {showCategories && (
            <div className="sidebar-category-list" style={{ marginTop: "8px", marginBottom: "16px", paddingLeft: "8px" }}>
              {categories.map((cat) => (
                <Link key={cat.id} to={`/products/${cat.id}`} onClick={handleLink} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 0", color: "rgba(255,255,255,0.7)", fontSize: "15px", textDecoration: "none", transition: "color 0.2s" }}>
                  {cat.icon} {cat.name}
                </Link>
              ))}
            </div>
          )}
        </div>

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
