import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <>
      <BackButton />

      <div className="admin-wrapper">
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>

        <h1>Razzaqia Traders Dashboard</h1>
        <p>Welcome, Owner</p>

        <div className="dashboard-grid">
          <Link to="/add-product" style={{ textDecoration: "none" }}>
            <button className="dashboard-card">📦 Add Product</button>
          </Link>

          <Link to="/manage-products" style={{ textDecoration: "none" }}>
            <button className="dashboard-card">🛒 Manage Products</button>
          </Link>

          <Link to="/orders" style={{ textDecoration: "none" }}>
            <button className="dashboard-card">📋 Order Requests</button>
          </Link>

          <button className="dashboard-card">📂 Categories</button>

          <Link to="/store-settings" style={{ textDecoration: "none" }}>
            <button className="dashboard-card">⚙️ Store Settings</button>
          </Link>
        </div>
      </div>
    </>
  );
}
