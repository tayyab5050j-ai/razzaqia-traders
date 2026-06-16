import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo-white">RAZZAQIA</span>
            <span className="logo-orange"> TRADERS</span>
          </div>
          <p className="footer-tagline">
            Lahore's trusted destination for genuine electronics since 1978. Quality products, competitive prices, excellent service.
          </p>
          <div className="footer-social">
            <a href="https://wa.me/923079459966" target="_blank" rel="noreferrer" className="social-btn whatsapp">
              WhatsApp
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-btn facebook">
              Facebook
            </a>
          </div>
        </div>

        <div className="footer-links-col">
          <h4>Shop</h4>
          <Link to="/products">All Products</Link>
          <Link to="/products/Mobiles">Mobiles</Link>
          <Link to="/products/Refrigerators">Refrigerators</Link>
          <Link to="/products/Washing Machines">Washing Machines</Link>
          <Link to="/products/Kitchen Appliances">Kitchen Appliances</Link>
          <Link to="/products/Speakers">Speakers</Link>
        </div>

        <div className="footer-links-col">
          <h4>Company</h4>
          <Link to="/">Home</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/cart">My Cart</Link>
          <Link to="/login">Owner Login</Link>
        </div>

        <div className="footer-links-col">
          <h4>Contact</h4>
          <p className="footer-contact-item">📍 MODEL TOWN, LAHORE, PAKISTAN</p>
          <p className="footer-contact-item">📞 +92 321 9459966</p>
          <p className="footer-contact-item">🕐 Mon–Sat: 11am – 9pm</p>
          <p className="footer-contact-item">✉️ info@razzaqiatraders.PK</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Razzaqia Traders. All rights reserved.</p>
        <p>Made with ❤️ in Lahore</p>
      </div>
    </footer>
  );
}
