import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import BackButton from "../components/BackButton";

export default function StoreSettings() {

  const [storeName, setStoreName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [heroButtonText, setHeroButtonText] = useState("");
  const [heroButtonLink, setHeroButtonLink] = useState("");
  const [bannerImage, setBannerImage] = useState("");

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {

    const settingsSnap = await getDoc(
      doc(db, "settings", "store")
    );

    if (settingsSnap.exists()) {

      const data = settingsSnap.data();

      setStoreName(data.storeName || "");
      setWhatsapp(data.whatsapp || "");
    }

    const bannerSnap = await getDoc(
      doc(db, "banners", "homepage")
    );

    if (bannerSnap.exists()) {

      const bannerData =
        bannerSnap.data();

      setHeroTitle(
        bannerData.title || ""
      );

      setHeroSubtitle(
        bannerData.subtitle || ""
      );

      setHeroButtonText(
        bannerData.buttonText || ""
      );

      setHeroButtonLink(
        bannerData.buttonLink || ""
      );

      setBannerImage(
        bannerData.image || ""
      );
    }
  };

  const saveSettings = async () => {

    try {

      await setDoc(
        doc(db, "settings", "store"),
        {
          storeName,
          whatsapp,
        }
      );

      await setDoc(
        doc(db, "banners", "homepage"),
        {
          title: heroTitle,
          subtitle: heroSubtitle,
          buttonText: heroButtonText,
          buttonLink: heroButtonLink,
          image: bannerImage,
        }
      );

      alert(
        "Settings Saved Successfully"
      );

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

        <input
          type="text"
          placeholder="Store Name"
          value={storeName}
          onChange={(e) =>
            setStoreName(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="WhatsApp Number"
          value={whatsapp}
          onChange={(e) =>
            setWhatsapp(e.target.value)
          }
        />

        <hr
          style={{
            margin: "20px 0",
          }}
        />

        <h2>
          Homepage Banner
        </h2>

        <input
          placeholder="Banner Title"
          value={heroTitle}
          onChange={(e) =>
            setHeroTitle(e.target.value)
          }
        />

        <input
          placeholder="Banner Subtitle"
          value={heroSubtitle}
          onChange={(e) =>
            setHeroSubtitle(e.target.value)
          }
        />

        <input
          placeholder="Button Text"
          value={heroButtonText}
          onChange={(e) =>
            setHeroButtonText(e.target.value)
          }
        />

        <input
          placeholder="Button Link"
          value={heroButtonLink}
          onChange={(e) =>
            setHeroButtonLink(e.target.value)
          }
        />

        <input
          placeholder="Banner Image URL"
          value={bannerImage}
          onChange={(e) =>
            setBannerImage(e.target.value)
          }
        />

        <button
          className="settings-save-btn"
          onClick={saveSettings}
        >
          Save Settings
        </button>

      </div>
    </>
  );
}