import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import BackButton from "../components/BackButton";

export default function StoreSettings() {
  const [storeName, setStoreName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [hours, setHours] = useState("");
  const [facebook, setFacebook] = useState("");

  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [heroButtonText, setHeroButtonText] = useState("");
  const [heroButtonLink, setHeroButtonLink] = useState("");
  const [bannerImageDesktop, setBannerImageDesktop] = useState("");
  const [bannerImageMobile, setBannerImageMobile] = useState("");

  useEffect(() => { loadSettings(); }, []);

  const loadSettings = async () => {
    const settingsSnap = await getDoc(doc(db, "settings", "store"));
    if (settingsSnap.exists()) {
      const data = settingsSnap.data();
      setStoreName(data.storeName || "");
      setWhatsapp(data.whatsapp || "");
      setPhone(data.phone || "");
      setEmail(data.email || "");
      setAddress(data.address || "");
      setHours(data.hours || "");
      setFacebook(data.facebook || "");
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
        storeName, whatsapp, phone, email, address, hours, facebook,
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
