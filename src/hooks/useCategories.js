import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "settings", "store"),
      (settingsSnap) => {
        try {
          if (settingsSnap.exists()) {
            const data = settingsSnap.data();
            if (data.categories && Array.isArray(data.categories)) {
              setCategories(data.categories);
            } else {
              // Default categories for backward compatibility
              setCategories([
                { id: "mobiles", name: "Mobiles", icon: "📱" },
                { id: "kitchen-appliances", name: "Kitchen Appliances", icon: "🍳" },
                { id: "refrigerators", name: "Refrigerators", icon: "❄️" },
                { id: "washing-machines", name: "Washing Machines", icon: "🧺" },
                { id: "speakers", name: "Speakers", icon: "🔊" },
                { id: "home-appliances", name: "Home Appliances", icon: "🏠" },
              ]);
            }
          }
        } catch (error) {
          console.error("Failed to load categories:", error);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Categories listener error:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { categories, loading };
}