import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";

export default function useStoreSettings() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "settings", "store"),
      (docSnap) => {
        if (docSnap.exists()) {
          setSettings(docSnap.data());
        }
      },
      (error) => {
        console.error("Store settings listener error:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  return settings;
}