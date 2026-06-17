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
  const [bannerImageDesktop, setBannerImageDesktop] = useState("");
  const [bannerImageMobile, setBannerImageMobile] = useState("");

  // About Section
  const [aboutTitle, setAboutTitle] = useState("");
  const [aboutContent, setAboutContent] = useState("");

  // Category Grid (6 categories)
  const [category1Text, setCategory1Text] = useState("Mobiles");
  const [category1Icon, setCategory1Icon] = useState("📱");
  const [category2Text, setCategory2Text] = useState("Kitchen Appliances");
  const [category2Icon, setCategory2Icon] = useState("🍳");
  const [category3Text, setCategory3Text] = useState("Refrigerators");
  const [category3Icon, setCategory3Icon] = useState("❄️");
  const [category4Text, setCategory4Text] = useState("Washing Machines");
  const [category4Icon, setCategory4Icon] = useState("🧺");
  const [category5Text, setCategory5Text] = useState("Speakers");
  const [category5Icon, setCategory5Icon] = useState("🔊");
  const [category6Text, setCategory6Text] = useState("Home Appliances");
  const [category6Icon, setCategory6Icon] = useState("🏠");

  // Featured Products Section
  const [featuredHeading, setFeaturedHeading] = useState("");

  // Footer Customization
  const [footerBrandText, setFooterBrandText] = useState("");
  const [footerTagline, setFooterTagline] = useState("");
  const [footerShopHeading, setFooterShopHeading] = useState("");
  const [footerCompanyHeading, setFooterCompanyHeading] = useState("");
  const [footerBottomText, setFooterBottomText] = useState("");

  useEffect(() => { loadSettings(); }, []);

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

      // Category Grid
      setCategory1Text(data.category1Text || "Mobiles");
      setCategory1Icon(data.category1Icon || "📱");
      setCategory2Text(data.category2Text || "Kitchen Appliances");
      setCategory2Icon(data.category2Icon || "🍳");
      setCategory3Text(data.category3Text || "Refrigerators");
      setCategory3Icon(data.category3Icon || "❄️");
      setCategory4Text(data.category4Text || "Washing Machines");
      setCategory4Icon(data.category4Icon || "🧺");
      setCategory5Text(data.category5Text || "Speakers");
      setCategory5Icon(data.category5Icon || "🔊");
      setCategory6Text(data.category6Text || "Home Appliances");
      setCategory6Icon(data.category6Icon || "🏠");

      // Featured Products
      setFeaturedHeading(data.featuredHeading || "Featured Products");

      // Footer
      setFooterBrandText(data.footerBrandText || "RAZZAQIA TRADERS");
      setFooterTagline(data.footerTagline || "Lahore's trusted destination for genuine electronics since 1978. Quality products, competitive prices, excellent service.");
      setFooterShopHeading(data.footerShopHeading || "Shop");
      setFooterCompanyHeading(data.footerCompanyHeading || "Company");
      setFooterBottomText(data.footerBottomText || "Made with ❤️ in Lahore");
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

  const saveSettings = async () => {
    try {
      await setDoc(doc(db, "settings", "store"), {
        // Store Info
        storeName, whatsapp, phone, email, address, hours, facebook,
        // About Section
        aboutTitle, aboutContent,
        // Category Grid
        category1Text, category1Icon,
        category2Text, category2Icon,
        category3Text, category3Icon,
        category4Text, category4Icon,
        category5Text, category5Icon,
        category6Text, category6Icon,
        // Featured Products
        featuredHeading,
        // Footer
        footerBrandText, footerTagline,
        footerShopHeading, footerCompanyHeading,
        footerBottomText,
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px", marginTop: "12px" }}>
          <div style={{ border: "1px solid var(--border)", borderRadius: "8px", padding: "12px", background: "#fafafa" }}>
            <h3 style={{ marginTop: "0", marginBottom: "8px", fontSize: "16px" }}>Category 1</h3>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px" }}>
              <input placeholder="Icon/Emoji (e.g. 📱)" value={category1Icon} onChange={(e) => setCategory1Icon(e.target.value)} style={{ width: "50px" }} />
              <input placeholder="Category Text (e.g. Mobiles)" value={category1Text} onChange={(e) => setCategory1Text(e.target.value)} style={{ flex: "1" }} />
            </div>
          </div>
          <div style={{ border: "1px solid var(--border)", borderRadius: "8px", padding: "12px", background: "#fafafa" }}>
            <h3 style={{ marginTop: "0", marginBottom: "8px", fontSize: "16px" }}>Category 2</h3>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px" }}>
              <input placeholder="Icon/Emoji (e.g. 🍳)" value={category2Icon} onChange={(e) => setCategory2Icon(e.target.value)} style={{ width: "50px" }} />
              <input placeholder="Category Text (e.g. Kitchen Appliances)" value={category2Text} onChange={(e) => setCategory2Text(e.target.value)} style={{ flex: "1" }} />
            </div>
          </div>
          <div style={{ border: "1px solid var(--border)", borderRadius: "8px", padding: "12px", background: "#fafafa" }}>
            <h3 style={{ marginTop: "0", marginBottom: "8px", fontSize: "16px" }}>Category 3</h3>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px" }}>
              <input placeholder="Icon/Emoji (e.g. ❄️)" value={category3Icon} onChange={(e) => setCategory3Icon(e.target.value)} style={{ width: "50px" }} />
              <input placeholder="Category Text (e.g. Refrigerators)" value={category3Text} onChange={(e) => setCategory3Text(e.target.value)} style={{ flex: "1" }} />
            </div>
          </div>
          <div style={{ border: "1px solid var(--border)", borderRadius: "8px", padding: "12px", background: "#fafafa" }}>
            <h3 style={{ marginTop: "0", marginBottom: "8px", fontSize: "16px" }}>Category 4</h3>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px" }}>
              <input placeholder="Icon/Emoji (e.g. 🧺)" value={category4Icon} onChange={(e) => setCategory4Icon(e.target.value)} style={{ width: "50px" }} />
              <input placeholder="Category Text (e.g. Washing Machines)" value={category4Text} onChange={(e) => setCategory4Text(e.target.value)} style={{ flex: "1" }} />
            </div>
          </div>
          <div style={{ border: "1px solid var(--border)", borderRadius: "8px", padding: "12px", background: "#fafafa" }}>
            <h3 style={{ marginTop: "0", marginBottom: "8px", fontSize: "16px" }}>Category 5</h3>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px" }}>
              <input placeholder="Icon/Emoji (e.g. 🔊)" value={category5Icon} onChange={(e) => setCategory5Icon(e.target.value)} style={{ width: "50px" }} />
              <input placeholder="Category Text (e.g. Speakers)" value={category5Text} onChange={(e) => setCategory5Text(e.target.value)} style={{ flex: "1" }} />
            </div>
          </div>
          <div style={{ border: "1px solid var(--border)", borderRadius: "8px", padding: "12px", background: "#fafafa" }}>
            <h3 style={{ marginTop: "0", marginBottom: "8px", fontSize: "16px" }}>Category 6</h3>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px" }}>
              <input placeholder="Icon/Emoji (e.g. 🏠)" value={category6Icon} onChange={(e) => setCategory6Icon(e.target.value)} style={{ width: "50px" }} />
              <input placeholder="Category Text (e.g. Home Appliances)" value={category6Text} onChange={(e) => setCategory6Text(e.target.value)} style={{ flex: "1" }} />
            </div>
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
        <h2>Homepage Banner — Images</h2>
        <p style={{ color: "var(--text-muted)", fontSize: "13px", marginTop: "8px" }}>
          Desktop image shows on the <strong>right side</strong> of the banner (recommended: tall product photo, transparent background, min 800×1000px).<br />
          Mobile image is <strong>hidden on mobile</strong> — only the text shows on small screens unless you set a mobile image.
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
