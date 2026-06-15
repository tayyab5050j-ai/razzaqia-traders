import BackButton from "../components/BackButton";
import { useEffect, useState } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Products() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, [category, search]);

  const loadProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      let items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });

      if (category) {
        items = items.filter((product) => product.category === category);
      }
      if (search) {
        items = items.filter(
          (product) =>
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.category?.toLowerCase().includes(search.toLowerCase())
        );
      }
      setProducts(items);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <BackButton />

      <div className="products-page-wrapper">
        <h1>
          {search
            ? `Search Results For: ${search}`
            : category
            ? category
            : "All Products"}
        </h1>

        <div className="product-grid">
          {products.length === 0 && (
            <p style={{ color: "var(--text-muted)", fontSize: "17px", gridColumn: "1/-1" }}>
              No Products Found
            </p>
          )}

          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="product-card product-card-link"
            >
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{ width: "100%", height: "220px", objectFit: "contain", background: "var(--cream)", padding: "16px" }}
                />
              )}
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">Rs. {product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
