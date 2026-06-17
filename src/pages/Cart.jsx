import { db } from "../services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import useStoreSettings from "../hooks/useStoreSettings";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import BackButton from "../components/BackButton";

export default function Cart() {
  const { cart, increaseQuantity, decreaseQuantity, removeItem } = useContext(CartContext);
  const settings = useStoreSettings();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  const totalPrice = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  const checkoutWhatsApp = async () => {
    if (!customerName || !customerPhone || !customerAddress) {
      alert("Please fill all customer details");
      return;
    }

    const number = settings?.whatsapp;
    if (!number) {
      alert("WhatsApp number not configured. Please contact the store.");
      return;
    }

    try {
      const orderItems = cart.map((item) => ({
        productId: item.id,
        productName: item.name,
        quantity: item.quantity,
        price: Number(item.price),
        imageUrl: item.imageUrl,
      }));

      const orderRef = await addDoc(collection(db, "orders"), {
        customerName,
        customerPhone,
        customerAddress,
        items: orderItems,
        total: totalPrice,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      let message =
        `Hello Razzaqia Traders,%0A%0A` +
        `Order ID: ${orderRef.id}%0A%0A` +
        `Customer Name: ${customerName}%0A` +
        `Phone: ${customerPhone}%0A` +
        `Address: ${customerAddress}%0A%0A` +
        `I want to order:%0A%0A`;

      cart.forEach((item) => {
        message += `• ${item.name} x ${item.quantity} - Rs. ${Number(item.price).toLocaleString()}%0A`;
      });

      message += `%0A--------------------%0A`;
      message += `Total: Rs. ${totalPrice.toLocaleString()}`;

      window.open(`https://wa.me/${number}?text=${message}`, "_blank");
    } catch (error) {
      console.error(error);
      alert("Failed to create order. Please try again.");
    }
  };

  return (
    <>
      <BackButton />

      <div className="cart-page-wrapper">
        <h1>Shopping Cart</h1>

        {cart.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontSize: "17px", marginTop: "20px" }}>
            Your cart is empty.
          </p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.imageUrl} alt={item.name} />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>Rs. {Number(item.price).toLocaleString()}</p>
                  <div className="qty-controls">
                    <button className="qty-btn" onClick={() => decreaseQuantity(item.id)}>−</button>
                    <span style={{ fontWeight: 700, minWidth: "24px", textAlign: "center" }}>{item.quantity}</span>
                    <button className="qty-btn" onClick={() => increaseQuantity(item.id)}>+</button>
                    <button className="remove-btn" onClick={() => removeItem(item.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}

            <h2 className="cart-total">
              Total: Rs. {totalPrice.toLocaleString()}
            </h2>

            <div className="checkout-form">
              <input
                placeholder="Customer Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              <input
                placeholder="Phone Number"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
              />
              <textarea
                placeholder="Delivery Address"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                rows="4"
              />
            </div>

            <button className="whatsapp-btn" onClick={checkoutWhatsApp}>
              💬 Checkout via WhatsApp
            </button>
          </>
        )}
      </div>
    </>
  );
}
