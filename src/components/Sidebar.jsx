import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";

export default function Sidebar({ open, closeSidebar }) {
  const handleLink = () => closeSidebar();
  const [categories, setCategories] = useState([]);

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
        {categories.map((cat) => (
          <Link key={cat.id} to={`/products/${cat.id}`} onClick={handleLink}>
            {cat.icon} {cat.name}
          </Link>
        ))}
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
