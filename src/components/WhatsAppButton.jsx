import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const [whatsappNumber, setWhatsappNumber] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "settings", "store"),
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.whatsapp) {
            setWhatsappNumber(data.whatsapp.replace(/\D/g, ""));
          }
        }
      }
    );
    return () => unsubscribe();
  }, []);

  if (!whatsappNumber) return null;

  const message = encodeURIComponent(
    "Hello! I'm interested in your products. Could you please share more details?"
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp />
    </a>
  );
}