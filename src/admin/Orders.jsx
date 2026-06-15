import { useEffect, useState } from "react";
import { collection, getDocs, getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import BackButton from "../components/BackButton";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    try {
      const snapshot = await getDocs(collection(db, "orders"));
      const items = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setOrders(items);
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const approveOrder = async (order) => {
    if (order.status === "approved") return;
    try {
      for (const item of order.items) {
        const productRef = doc(db, "products", item.productId);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
          const productData = productSnap.data();
          const currentStock = Number(productData.stock || 0);
          const newStock = Math.max(0, currentStock - Number(item.quantity));
          await updateDoc(productRef, { stock: newStock });
        }
      }
      await updateDoc(doc(db, "orders", order.id), { status: "approved" });
      loadOrders();
    } catch (error) {
      console.error(error);
      alert("Failed to approve order");
    }
  };

  const rejectOrder = async (orderId) => {
    try {
      await updateDoc(doc(db, "orders", orderId), { status: "rejected" });
      loadOrders();
    } catch (error) {
      console.error(error);
      alert("Failed to reject order");
    }
  };

  return (
    <>
      <BackButton />

      <div className="admin-wrapper">
        <h1>Order Requests</h1>

        {orders.length === 0 ? (
          <p style={{ color: "var(--text-muted)" }}>No orders found.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="order-card">
              <h3>Order #{order.id}</h3>

              <p><strong>Name:</strong> {order.customerName}</p>
              <p><strong>Phone:</strong> {order.customerPhone}</p>
              <p><strong>Address:</strong> {order.customerAddress}</p>

              <p className={
                order.status === "approved"
                  ? "order-status-approved"
                  : order.status === "rejected"
                  ? "order-status-rejected"
                  : "order-status-pending"
              }>
                Status: {order.status}
              </p>

              <p style={{ marginTop: "8px" }}>
                <strong>Total:</strong> Rs. {order.total}
              </p>

              <h4 style={{ marginTop: "12px", marginBottom: "6px" }}>Items:</h4>
              {order.items?.map((item, index) => (
                <p key={index} style={{ color: "var(--text-muted)" }}>
                  {item.productName} × {item.quantity}
                </p>
              ))}

              {order.status === "pending" && (
                <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                  <button className="approve-btn" onClick={() => approveOrder(order)}>
                    Approve
                  </button>
                  <button className="reject-btn" onClick={() => rejectOrder(order.id)}>
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}
