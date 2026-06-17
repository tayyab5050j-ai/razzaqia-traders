import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAppSelector } from '../hooks/useAppSelector';
import debounce from 'lodash.debounce';

export default function HeroSection({ bannerId = 'homepage' }) {
  const navigate = useNavigate();
  const { cartLength } = useCart();
  const showSearch = useAppSelector(state => state.ui.showSearch);

  const [banner, setBanner] = useState(null);
  const [bannerLoading, setBannerLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load banner data without blocking render
  useEffect(() => {
    const loadBanner = async () => {
      try {
        const response = await fetch(`/api/banners/${bannerId}`);
        if (response.ok) {
          const data = await response.json();
          setBanner(data);
        }
      } catch (err) {
        console.warn('Banner load failed', err);
      } finally {
        setBannerLoading(false);
      }
    };

    loadBanner();
  }, [bannerId]);

  // Debounced search handler
  const handleSearch = debounce(e => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 2) {
      navigate(`/products?search=${encodeURIComponent(value)}`);
    }
  }, 300);

  // Close sidebar on escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [sidebarOpen]);

  return (
    <header className="hero-container" style={{
      minHeight: '88vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      overflow: 'hidden',
      position: 'relative',
      background:
        'radial-gradient(ellipse at 70% 20%, rgba(201,137,42,0.18) 0%, transparent 55%),' +
        'radial-gradient(ellipse at 10% 80%, rgba(30,47,130,0.35) 0%, transparent 50%),' +
        'linear-gradient(160deg, #060C2A 0%, #0B1340 45%, #112070 100%)'
    }}>
      {/* Search Box */}
      <div
        className="search-box"
        onClick={() => setSidebarOpen(false)}
        style={{
          flex: 1,
          maxWidth: '480px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.14)',
          borderRadius: 'var(--radius-md)',
          padding: '10px 16px',
          gap: '10px',
          transition: 'all 0.2s'
        }}
      >
        <FaSearch className="search-icon" style={{ color: 'rgba(255,255,255,0.5)' }} />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => handleSearch(e)}
          style={{
            flex: 1,
            background: 'transparent',
            outline: 'none',
            color: 'white',
            fontSize: '15px',
            caretColor: 'white'
          }}
        />
      </div>

      {/* Cart Button */}
      <Link
        to="/cart"
        className="cart-btn"
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'linear-gradient(135deg, var(--gold-bright), var(--gold))',
          color: 'white',
          padding: '11px 22px',
          borderRadius: 'var(--radius-md)',
          fontWeight: '700',
          fontSize: '14px',
          textDecoration: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(201,137,42,0.35)',
          transition: 'all 0.2s',
          zIndex: 10
        }}
      >
        <FaShoppingCart /> Cart {cartLength}
      </Link>

      {/* Banner Content */}
      {!bannerLoading && banner && (
        <section
          style={{
            position: 'relative',
            width: '100%',
            padding: '0 1rem',
            color: 'white'
          }}
        >
          <div className="hero-content" style={{ maxWidth: '960px', margin: '0 auto' }}>
            <p className="location" style={{
              display: 'inline-block',
              background: 'rgba(201,137,42,0.12)',
              border: '1px solid rgba(201,137,42,0.25)',
              padding: '8px 20px',
              borderRadius: '40px',
              marginBottom: '28px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '4px'
            }}>
              LAHORE, PAKISTAN
            </p>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(48px, 8vw, 88px)',
              fontWeight: '800',
              fontWeight: '800',
              lineHeight: '1.05',
              letterSpacing: '-1px',
              margin: '0'
            }}>
              {banner.title}
            </h1>
            <p className="hero-description" style={{
              fontSize: 'clamp(16px, 2.2vw, 20px)',
              maxWidth: '620px',
              margin: '28px auto 0',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: '1.7'
            }}>
              {banner.subtitle}
            </p>

            <div className="hero-buttons" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              marginTop: '44px',
              flexWrap: 'wrap'
            }}>
              <button
                className="shop-btn"
                style={{
                  background: 'linear-gradient(135deg, var(--gold-bright), var(--gold))',
                  color: 'white',
                  border: 'none',
                  padding: '18px 56px',
                  fontSize: '17px',
                  fontWeight: '700',
                  borderRadius: 'var(--radius-lg)',
                  cursor: 'pointer',
                  boxShadow: '0 12px 32px rgba(201,137,42,0.4)',
                  transition: 'all 0.25s',
                  letterSpacing: '0.3px',
                  fontFamily: "'Inter', sans-serif"
                }}
                onClick={() => navigate(banner.buttonLink || '/products')}
              >
                {banner.buttonText}
              </button>

              <button
                className="about-btn"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.2)',
                  padding: '18px 40px',
                  fontSize: '17px',
                  fontWeight: '600',
                  borderRadius: 'var(--radius-lg)',
                  cursor: 'pointer',
                  transition: 'all 0.25s'
                }}
                onClick={() => navigate('/products')}
              >
                Shop Now
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Persistent Hero Overlay Elements */}
      <div className="hero-overlay-elements" style={{
        position: 'relative',
        zIndex: 1,
        width: '100%'
      }}>
        <div className="hero-stats" style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '80px',
          marginTop: '72px',
          flexWrap: 'wrap'
        }}>
          {banner?.stats?.map((stat, i) => (
            <div key={i} style={{
              textAlign: 'center',
              flex: 1
            }}>
              <h2 style={{
                background: 'linear-gradient(135deg, var(--gold-bright), #f5c85a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: "'Playfair Display', serif",
                fontWeight: '800',
                fontSize: '44px',
                margin: 0
              }}>
                {stat.value}
              </h2>
              <p style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.5)',
                textTransform: 'uppercase',
                fontWeight: '500'
              }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}