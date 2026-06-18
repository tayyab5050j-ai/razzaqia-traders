import useStoreSettings from "../hooks/useStoreSettings";
import useCategories from "../hooks/useCategories";
import { useEffect, useState } from "react";
import Navbar from "../components/NavbarTemp";
import Sidebar from "../components/Sidebar";
import { db } from "../services/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function Home() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [banner, setBanner] = useState(null);
  const [bannerLoading, setBannerLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const settings = useStoreSettings();
  const { categories } = useCategories();
  const showLocation = settings?.showLocation !== false;
  const showHeroButton = settings?.showHeroButton !== false;

  useEffect(() => {
    loadProducts();
    loadBanner();
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const loadBanner = async () => {
    try {
      const bannerSnap = await getDoc(doc(db, "banners", "homepage"));
      if (bannerSnap.exists()) setBanner(bannerSnap.data());
    } catch (error) {
      console.error(error);
    } finally {
      setBannerLoading(false);
    }
  };

  const loadProducts = async () => {
    const snapshot = await getDocs(collection(db, "products"));
    const items = [];
    snapshot.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
    setProducts(items.filter((product) => product.featured === true));
  };

  // Pick correct image: mobile uses imageMobile, desktop uses imageDesktop, fallback to old image field
  const heroImage = isMobile
    ? (banner?.imageMobile || banner?.image || null)
    : (banner?.imageDesktop || banner?.image || null);

  return (
    <>
      <Navbar openSidebar={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />

      {!bannerLoading && (
        <section className="hero">
          <div className="hero-content">
            {showLocation && <p className="location">📍 LAHORE, PAKISTAN</p>}
            <h1>{banner?.title}</h1>
            <p className="hero-description">{banner?.subtitle}</p>
            {showHeroButton && (
              <div className="hero-buttons">
                <button
                  className="shop-btn"
                  onClick={() => navigate(banner?.buttonLink || "/products")}
                >
                  {banner?.buttonText}
                </button>
              </div>
            )}
          </div>

          {heroImage && (
            <div className="hero-image">
              <img
                src={heroImage}
                alt="Homepage Banner"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          )}
        </section>
      )}

      <div className="category-grid">
        {categories.map((cat) => (
          <Link key={cat.id} to={`/products/${cat.id}`} className="category-card">
            {cat.icon}<span>{cat.name}</span>
          </Link>
        ))}
      </div>

      <section className="about-section">
        <h2>Why Choose Razzaqia Traders?</h2>
        <p>We provide genuine electronics, competitive prices and excellent customer support for all our customers.</p>
      </section>

      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="product-card product-card-link"
            >
              <img src={product.imageUrl} alt={product.name} />
              <div className="product-info">
                <span className="category-badge">NEW</span>
                <h3>{product.name}</h3>
                <p className="price">Rs. {Number(product.price).toLocaleString()}</p>
                <div className="card-buttons">
                  <button className="details-btn">Add To Cart</button>
                  <button
                    className="order-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      navigate(`/product/${product.id}`);
                    }}
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
