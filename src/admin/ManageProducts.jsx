import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../services/firebase";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import BackButton from "../components/BackButton";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Delete this product?");
    if (!confirmDelete) return;
    await deleteDoc(doc(db, "products", id));
    loadProducts();
  };

  const loadProducts = async () => {
    const snapshot = await getDocs(collection(db, "products"));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setProducts(data);
  };

  return (
    <>
      <BackButton />

      <div className="admin-wrapper">
        <h1>Manage Products</h1>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="products-search-input"
          style={{ marginBottom: "8px" }}
        />

        {products
          .filter((product) =>
            product.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((product) => (
            <div key={product.id} className="manage-item">
              <img src={product.imageUrl} alt={product.name} />

              <div className="manage-item-info">
                <h3>{product.name}</h3>
                <p>Rs. {product.price}</p>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <Link to={`/edit-product/${product.id}`}>
                  <button className="edit-btn">Edit</button>
                </Link>
                <button className="delete-btn" onClick={() => deleteProduct(product.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
