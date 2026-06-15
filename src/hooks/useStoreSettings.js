import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";

export default function useStoreSettings() {

  const [settings, setSettings] =
    useState(null);

  useEffect(() => {

    const loadSettings = async () => {

      const docRef = doc(
        db,
        "settings",
        "store"
      );

      const docSnap =
        await getDoc(docRef);

      if (docSnap.exists()) {
        setSettings(
          docSnap.data()
        );
      }

    };

    loadSettings();

  }, []);

  return settings;

}