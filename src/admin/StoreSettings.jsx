import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import BackButton from "../components/BackButton";

export default function StoreSettings() {
  // Store Info
  const [storeName, setStoreName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [hours, setHours] = useState("");
  const [facebook, setFacebook] = useState("");

  // Homepage Banner
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [heroButtonText, setHeroButtonText] = useState("");
  const [heroButtonLink, setHeroButtonLink] = useState("");
  const [showHeroButton, setShowHeroButton] = useState(true);
  const [showLocation, setShowLocation] = useState(true);
  const [bannerImageDesktop, setBannerImageDesktop] = useState("");
  const [bannerImageMobile, setBannerImageMobile] = useState("");

  // About Section
  const [aboutTitle, setAboutTitle] = useState("");
  const [aboutContent, setAboutContent] = useState("");

  // Dynamic Categories
  const [categories, setCategories] = useState([
    { id: "mobiles", name: "Mobiles", icon: "📱" },
    { id: "kitchen-appliances", name: "Kitchen Appliances", icon: "🍳" },
    { id: "refrigerators", name: "Refrigerators", icon: "❄️" },
    { id: "washing-machines", name: "Washing Machines", icon: "🧺" },
    { id: "speakers", name: "Speakers", icon: "🔊" },
    { id: "home-appliances", name: "Home Appliances", icon: "🏠" },
  ]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryIcon, setNewCategoryIcon] = useState("");

  // Featured Products Section
  const [featuredHeading, setFeaturedHeading] = useState("");

  // Footer Customization
  const [footerBrandText, setFooterBrandText] = useState("");
  const [footerTagline, setFooterTagline] = useState("");
  const [footerShopHeading, setFooterShopHeading] = useState("");
  const [footerCompanyHeading, setFooterCompanyHeading] = useState("");
  const [footerBottomText, setFooterBottomText] = useState("");

  const loadSettings = async () => {
    const settingsSnap = await getDoc(doc(db, "settings", "store"));
    if (settingsSnap.exists()) {
      const data = settingsSnap.data();
      // Store Info
      setStoreName(data.storeName || "");
      setWhatsapp(data.whatsapp || "");
      setPhone(data.phone || "");
      setEmail(data.email || "");
      setAddress(data.address || "");
      setHours(data.hours || "");
      setFacebook(data.facebook || "");

      // About Section
      setAboutTitle(data.aboutTitle || "");
      setAboutContent(data.aboutContent || "");

      // Dynamic Categories
      if (data.categories && Array.isArray(data.categories)) {
        setCategories(data.categories);
      }

      // Featured Products
      setFeaturedHeading(data.featuredHeading || "Featured Products");

      // Footer
      setFooterBrandText(data.footerBrandText || "RAZZAQIA TRADERS");
      setFooterTagline(data.footerTagline || "Lahore's trusted destination for genuine electronics since 1978. Quality products, competitive prices, excellent service.");
      setFooterShopHeading(data.footerShopHeading || "Shop");
      setFooterCompanyHeading(data.footerCompanyHeading || "Company");
      setFooterBottomText(data.footerBottomText || "Made with ❤️ in Lahore");

      // Hero Banner Visibility
      setShowHeroButton(data.showHeroButton !== false);
      setShowLocation(data.showLocation !== false);
    }

    const bannerSnap = await getDoc(doc(db, "banners", "homepage"));
    if (bannerSnap.exists()) {
      const b = bannerSnap.data();
      setHeroTitle(b.title || "");
      setHeroSubtitle(b.subtitle || "");
      setHeroButtonText(b.buttonText || "");
      setHeroButtonLink(b.buttonLink || "");
      setBannerImageDesktop(b.imageDesktop || b.image || "");
      setBannerImageMobile(b.imageMobile || "");
    }
  };

  useEffect(() => { loadSettings(); }, []);

  const saveSettings = async () => {
    try {
      await setDoc(doc(db, "settings", "store"), {
        // Store Info
        storeName, whatsapp, phone, email, address, hours, facebook,
        // About Section
        aboutTitle, aboutContent,
        // Dynamic Categories
        categories,
        // Featured Products
        featuredHeading,
        // Footer
        footerBrandText, footerTagline,
        footerShopHeading, footerCompanyHeading,
        footerBottomText,
        // Hero Banner Visibility
        showHeroButton,
        showLocation,
      });

      await setDoc(doc(db, "banners", "homepage"), {
        title: heroTitle,
        subtitle: heroSubtitle,
        buttonText: heroButtonText,
        buttonLink: heroButtonLink,
        imageDesktop: bannerImageDesktop,
        imageMobile: bannerImageMobile,
        image: bannerImageDesktop, // keep old field for backward compatibility
      });

      alert("Settings Saved Successfully ✅");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <>
      <BackButton />
      <div className="settings-card">

        <h1>Store Settings</h1>
        <p style={{ color: "var(--text-muted)", marginBottom: "8px" }}>
          All changes reflect live on the website instantly after saving.
        </p>

        <hr />
        <h2>Store Info</h2>
        <input type="text" placeholder="Store Name (e.g. Razzaqia Traders)" value={storeName} onChange={(e) => setStoreName(e.target.value)} />
        <input type="text" placeholder="Address (e.g. Main Boulevard, Lahore)" value={address} onChange={(e) => setAddress(e.target.value)} />
        <input type="text" placeholder="Business Hours (e.g. Mon–Sat: 10am – 8pm)" value={hours} onChange={(e) => setHours(e.target.value)} />

        <hr />
        <h2>Contact Details</h2>
        <input type="text" placeholder="WhatsApp Number with country code (e.g. 923001234567)" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
        <input type="text" placeholder="Display Phone Number (e.g. +92 300 123 4567)" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input type="text" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="Facebook Page URL" value={facebook} onChange={(e) => setFacebook(e.target.value)} />

        <hr />
        <h2>About Section</h2>
        <input placeholder="Section Title (e.g. Why Choose Razzaqia Traders?)" value={aboutTitle} onChange={(e) => setAboutTitle(e.target.value)} />
        <textarea placeholder="Section Content" value={aboutContent} onChange={(e) => setAboutContent(e.target.value)} style={{ width: "100%", height: "80px", marginTop: "8px", padding: "10px", border: "1px solid var(--border)", borderRadius: "4px", fontFamily: "inherit" }} />

        <hr />
        <h2>Category Grid (Homepage)</h2>
        <div style={{ marginTop: "12px" }}>
          {categories.map((cat, idx) => (
            <div key={cat.id} style={{ border: "1px solid var(--border)", borderRadius: "8px", padding: "12px", background: "#fafafa", marginBottom: "12px", display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
              <input
                placeholder="Icon/Emoji"
                value={cat.icon}
                onChange={(e) => setCategories(categories.map((c, i) => i === idx ? { ...c, icon: e.target.value } : c))}
                style={{ width: "50px" }}
              />
              <input
                placeholder="Category Name"
                value={cat.name}
                onChange={(e) => setCategories(categories.map((c, i) => i === idx ? { ...c, name: e.target.value } : c))}
                style={{ flex: "1", minWidth: "150px" }}
              />
              <input
                placeholder="URL ID (e.g. mobiles)"
                value={cat.id}
                onChange={(e) => setCategories(categories.map((c, i) => i === idx ? { ...c, id: e.target.value.toLowerCase().replace(/\s+/g, '-') } : c))}
                style={{ width: "150px", fontSize: "13px", color: "var(--text-muted)" }}
              />
              <button
                type="button"
                onClick={() => setCategories(categories.filter((_, i) => i !== idx))}
                style={{ background: "#fee2e2", color: "#dc2626", border: "none", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}
              >
                Delete
              </button>
            </div>
          ))}
          <div style={{ display: "flex", gap: "8px", marginTop: "16px", flexWrap: "wrap" }}>
            <input
              placeholder="New Category Name (e.g. Tablets)"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              style={{ flex: "1", minWidth: "180px", padding: "10px 12px", border: "1px solid var(--border)", borderRadius: "6px" }}
            />
            <input
              placeholder="Icon/Emoji (e.g. 📱)"
              value={newCategoryIcon}
              onChange={(e) => setNewCategoryIcon(e.target.value)}
              style={{ width: "60px", padding: "10px 12px", border: "1px solid var(--border)", borderRadius: "6px", textAlign: "center" }}
            />
            <button
              type="button"
              onClick={() => {
                if (newCategoryName.trim() && newCategoryIcon.trim()) {
                  const newId = newCategoryName.toLowerCase().replace(/\s+/g, '-');
                  if (!categories.some(c => c.id === newId)) {
                    setCategories([...categories, { id: newId, name: newCategoryName.trim(), icon: newCategoryIcon.trim() }]);
                    setNewCategoryName("");
                    setNewCategoryIcon("");
                  }
                }
              }}
              style={{ padding: "10px 16px", background: "var(--navy)", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: 600 }}
            >
              Add Category
            </button>
          </div>
        </div>

        <hr />
        <h2>Featured Products Section</h2>
        <input placeholder="Section Heading (e.g. Featured Products)" value={featuredHeading} onChange={(e) => setFeaturedHeading(e.target.value)} />

        <hr />
        <h2>Footer Customization</h2>
        <input placeholder="Brand Text (e.g. RAZZAQIA TRADERS)" value={footerBrandText} onChange={(e) => setFooterBrandText(e.target.value)} />
        <textarea placeholder="Tagline/Description" value={footerTagline} onChange={(e) => setFooterTagline(e.target.value)} style={{ width: "100%", height: "60px", marginTop: "8px", padding: "10px", border: "1px solid var(--border)", borderRadius: "4px", fontFamily: "inherit" }} />
        <input placeholder="Shop Column Heading (e.g. Shop)" value={footerShopHeading} onChange={(e) => setFooterShopHeading(e.target.value)} />
        <input placeholder="Company Column Heading (e.g. Company)" value={footerCompanyHeading} onChange={(e) => setFooterCompanyHeading(e.target.value)} />
        <input placeholder="Footer Bottom Text (e.g. Made with ❤️ in Lahore)" value={footerBottomText} onChange={(e) => setFooterBottomText(e.target.value)} />

        <hr />
        <h2>Homepage Banner — Text</h2>
        <input placeholder="Banner Title" value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} />
        <input placeholder="Banner Subtitle" value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} />
        <input placeholder="Button Text (e.g. Shop Now)" value={heroButtonText} onChange={(e) => setHeroButtonText(e.target.value)} />
        <input placeholder="Button Link (e.g. /products)" value={heroButtonLink} onChange={(e) => setHeroButtonLink(e.target.value)} />

        <hr />
        <h2>Homepage Banner — Visibility</h2>
        <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", fontSize: "15px" }}>
            <input
              type="checkbox"
              checked={showHeroButton}
              onChange={(e) => setShowHeroButton(e.target.checked)}
              style={{ width: "18px", height: "18px", accentColor: "var(--gold)" }}
            />
            <span>Show "Shop Now" Button on Hero Banner</span>
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", fontSize: "15px" }}>
            <input
              type="checkbox"
              checked={showLocation}
              onChange={(e) => setShowLocation(e.target.checked)}
              style={{ width: "18px", height: "18px", accentColor: "var(--gold)" }}
            />
            <span>Show Location Tag (LAHORE, PAKISTAN) on Hero Banner</span>
          </label>
        </div>

        <hr />
        <h2>Homepage Banner — Images</h2>
        <p style={{ color: "var(--text-muted)", fontSize: "13px", marginTop: "8px", lineHeight: 1.6 }}>
          <strong>Exact Banner Dimensions (no cropping — images use <code>object-fit: contain</code>):</strong><br />
          • <strong>Desktop Banner:</strong> Shows on right side of hero. Recommended: <strong>800×1000px</strong> (4:5 aspect ratio) or <strong>1000×1250px</strong>. Tall product photo with transparent background works best.<br />
          • <strong>Mobile Banner:</strong> Hidden by default on mobile (≤768px). If provided, displays full-width above text. Recommended: <strong>1200×600px</strong> (2:16:3 aspect ratio).<br />
          • Images are <strong>never cropped</strong> — they scale to fit within their container maintaining aspect ratio.
        </p>

        <label style={{ display: "block", marginTop: "16px", fontWeight: 600, fontSize: "14px", color: "var(--text-dark)" }}>
          🖥️ Desktop Banner Image URL
        </label>
        <input
          placeholder="https://res.cloudinary.com/... (desktop image)"
          value={bannerImageDesktop}
          onChange={(e) => setBannerImageDesktop(e.target.value)}
        />
        {bannerImageDesktop && (
          <img src={bannerImageDesktop} alt="Desktop preview" style={{ marginTop: "10px", height: "120px", objectFit: "contain", borderRadius: "8px", border: "1px solid var(--border)", background: "#eee", padding: "8px" }} />
        )}

        <label style={{ display: "block", marginTop: "20px", fontWeight: 600, fontSize: "14px", color: "var(--text-dark)" }}>
          📱 Mobile Banner Image URL <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(optional)</span>
        </label>
        <input
          placeholder="https://res.cloudinary.com/... (mobile image, optional)"
          value={bannerImageMobile}
          onChange={(e) => setBannerImageMobile(e.target.value)}
        />
        {bannerImageMobile && (
          <img src={bannerImageMobile} alt="Mobile preview" style={{ marginTop: "10px", height: "120px", objectFit: "contain", borderRadius: "8px", border: "1px solid var(--border)", background: "#eee", padding: "8px" }} />
        )}

        <button className="settings-save-btn" onClick={saveSettings} style={{ marginTop: "32px" }}>
          Save All Settings
        </button>

      </div>
    </>
  );
}
