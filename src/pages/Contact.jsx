import Navbar from "../components/NavbarTemp";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useState } from "react";

export default function Contact() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleWhatsApp = () => {
    if (!form.name || !form.phone || !form.message) {
      alert("Please fill all fields");
      return;
    }
    const text =
      `Hello Razzaqia Traders!%0A%0A` +
      `Name: ${form.name}%0A` +
      `Phone: ${form.phone}%0A%0A` +
      `Message: ${form.message}`;
    window.open(`https://wa.me/923079459966?text=${text}`, "_blank");
    setSent(true);
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <>
      <Navbar openSidebar={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />

      <div className="contact-page">

        <div className="contact-hero">
          <span className="contact-badge">📍 MODEL TOWN, LAHORE, PAKISTAN</span>
          <h1>Get In Touch</h1>
          <p>Have a question or want to place a custom order? We're here to help.</p>
        </div>

        <div className="contact-body">

          <div className="contact-info-cards">

            <div className="contact-info-card">
              <div className="contact-icon">📞</div>
              <h3>Call Us</h3>
              <p>+92 321 9459966</p>
              <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>Mon–Sat, 10am–8pm</p>
            </div>

            <div className="contact-info-card">
              <div className="contact-icon">📍</div>
              <h3>Visit Us</h3>
              <p>MODEL TOWN, LAHORE, PAKISTAN</p>
              <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>Pakistan</p>
            </div>

            <div className="contact-info-card">
              <div className="contact-icon">💬</div>
              <h3>WhatsApp</h3>
              <p>+92 307 9459966</p>
              <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>Quick replies</p>
            </div>

            <div className="contact-info-card">
              <div className="contact-icon">✉️</div>
              <h3>Email</h3>
              <p>info@razzaqiatraders.pk</p>
              <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>24hr response</p>
            </div>

          </div>

          <div className="contact-form-card">
            <h2>Send Us a Message</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "28px", fontSize: "15px" }}>
              Fill the form below and we'll get back to you on WhatsApp instantly.
            </p>

            {sent && (
              <div className="contact-success">
                ✅ Message sent! We'll get back to you shortly.
              </div>
            )}

            <div className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. Ahmed Khan"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="e.g. 0300-1234567"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  placeholder="Tell us about your inquiry or product you're looking for..."
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                />
              </div>

              <button className="contact-submit-btn" onClick={handleWhatsApp}>
                💬 Send via WhatsApp
              </button>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}
