import BackButton from "../components/BackButton";

export default function Contact() {
  return (
    <>
      <BackButton />

      <div className="contact-wrapper">
        <h1>Contact Us</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "17px", marginTop: "12px", lineHeight: "1.8" }}>
          Get in touch with Razzaqia Traders for any inquiries.
        </p>
      </div>
    </>
  );
}
