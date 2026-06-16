import Navbar from "../components/NavbarTemp";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";

const CATEGORIES = [
  "All", "Mobiles", "Kitchen Appliances", "Refrigerators",
  "Washing Machines", "Speakers", "Home Appliances"
];

export default function Products() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(category || "All");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    setActiveCategory(category || "All");
    loadProducts();
  }, [category, search]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      let items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      if (category) items = items.filter((p) => p.category === category);
      if (search) items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.category?.toLowerCase().includes(search.toLowerCase())
      );
      setProducts(items);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const sorted = [...products].sort((a, b) => {
    if (sort === "price-asc") return Number(a.price) - Number(b.price);
    if (sort === "price-desc") return Number(b.price) - Number(a.price);
    if (sort === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <>
      <Navbar openSidebar={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />

      <div className="products-page">

        <div className="products-page-header">
          <div>
            <h1>
              {search ? `Results for "${search}"` : category ? category : "All Products"}
            </h1>
            <p className="products-count">
              {loading ? "Loading..." : `${sorted.length} product${sorted.length !== 1 ? "s" : ""} found`}
            </p>
          </div>
          <select
            className="products-sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name: A–Z</option>
          </select>
        </div>

        <div className="products-layout">

          <aside className="products-sidebar">
            <h3>Categories</h3>
            <nav className="category-nav">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat}
                  to={cat === "All" ? "/products" : `/products/${cat}`}
                  className={`category-nav-item ${
                    (cat === "All" && !category) || cat === category
                      ? "active"
                      : ""
                  }`}
                >
                  {cat}
                </Link>
              ))}
            </nav>
          </aside>

          <div className="products-grid-area">
            {loading ? (
              <div className="products-loading">
                <div className="loading-spinner" />
                <p>Loading products...</p>
              </div>
            ) : sorted.length === 0 ? (
              <div className="products-empty">
                <p style={{ fontSize: "48px" }}>🔍</p>
                <h3>No Products Found</h3>
                <p>Try a different category or search term.</p>
                <Link to="/products" className="shop-btn" style={{ display: "inline-block", marginTop: "16px", textDecoration: "none" }}>
                  View All Products
                </Link>
              </div>
            ) : (
              <div className="product-grid">
                {sorted.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="product-card product-card-link"
                  >
                    <div className="product-card-image-wrap">
                      {product.imageUrl && (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                        />
                      )}
                      {product.featured && (
                        <span className="product-badge-featured">Featured</span>
                      )}
                    </div>
                    <div className="product-info">
                      <span className="category-badge">{product.category || "NEW"}</span>
                      <h3>{product.name}</h3>
                      <p className="price">Rs. {Number(product.price).toLocaleString()}</p>
                      <div className="product-card-footer">
                        <span className="product-card-rating">★★★★★</span>
                        <span className="product-card-view">View Details →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}
