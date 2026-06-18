import Navbar from "../components/NavbarTemp";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import useCategories from "../hooks/useCategories";

export default function Products() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sort, setSort] = useState("default");
  const { categories, loading: categoriesLoading } = useCategories();

  useEffect(() => {
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
      if (category) {
        const catLower = category.toLowerCase();
        items = items.filter((p) => 
          p.category?.toLowerCase() === catLower ||
          p.category?.toLowerCase() === catLower.replace(/-/g, ' ')
        );
      }
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

      {categoriesLoading && (
        <div className="products-page" style={{ padding: "60px 32px", textAlign: "center" }}>
          <div className="loading-spinner" style={{ margin: "0 auto 16px" }} />
          <p>Loading categories...</p>
        </div>
      )}

      {!categoriesLoading && (
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
              <Link
                to="/products"
                className={`category-nav-item ${!category ? "active" : ""}`}
              >
                All
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/products/${cat.id}`}
                  className={`category-nav-item ${cat.id === category ? "active" : ""}`}
                >
                  {cat.icon} {cat.name}
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
                      {product.badgeText && (
                        <span className="product-badge-custom" style={{ position: 'absolute', top: '8px', left: '8px', zIndex: 2, background: product.badgeBgColor || '#C9892A', color: product.badgeTextColor || '#FFFFFF', whiteSpace: 'nowrap', padding: '4px 10px', borderRadius: '40px', fontSize: '10px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>
                          {product.badgeText}
                        </span>
                      )}
                    </div>
                    <div className="product-info">
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
      )}

      <Footer />
    </>
  );
}
