import useStoreSettings from "../hooks/useStoreSettings";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import BackButton from "../components/BackButton";
import Navbar from "../components/NavbarTemp";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../services/firebase";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  limit
} from "firebase/firestore";

export default function ProductDetails() {

  const [sidebarOpen, setSidebarOpen] =
  useState(false);
   
    const [showOrderPopup, setShowOrderPopup] =
  useState(false);

    const [customerName, setCustomerName] =
  useState("");

const [customerPhone, setCustomerPhone] =
  useState("");

const [customerAddress, setCustomerAddress] =
  useState("");

  const { id } = useParams();
  const settings =
  useStoreSettings();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] =
  useState("");

const [name, setName] = useState("");

const [reviewText, setReviewText] = useState("");
const [rating, setRating] = useState(5);
 useEffect(() => {
  console.log("USE EFFECT RUNNING");

  loadProduct();
  loadReviews();
  
}, [id]);
  const loadProduct = async () => {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {

    const productData = {
      id: docSnap.id,
      ...docSnap.data(),
    };

    setProduct(productData);

setSelectedImage(
  productData.imageUrl
);

    loadRelatedProducts(
      productData.category
    );
  }
};
  const loadReviews = async () => {

  const q = query(
    collection(db, "reviews"),
    where("productId", "==", id)
  );

  const snapshot = await getDocs(q);

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  setReviews(data);
};

const submitReview = async () => {

  if (!name.trim() || !reviewText.trim()) {
    alert("Please fill all fields");
    return;
  }

  await addDoc(
    collection(db, "reviews"),
    {
      productId: id,
      name,
      review: reviewText,
      rating,
      createdAt: Date.now(),
    }
  );

  setName("");
  setReviewText("");
  setRating(5);

  loadReviews();
};
const loadRelatedProducts = async (
  currentCategory
) => {

  const snapshot = await getDocs(
    collection(db, "products")
  );

  const data = snapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .filter(
      (item) =>
        item.id !== id &&
        item.category === currentCategory
    )
    .slice(0, 4);

  setRelatedProducts(data);
};

 const placeOrder = async () => {

  if (
    !customerName ||
    !customerPhone ||
    !customerAddress
  ) {
    alert(
      "Please fill all fields"
    );
    return;
  }

  const orderRef = await addDoc(
    collection(db, "orders"),
    {
      customerName,
      customerPhone,
      customerAddress,

      items: [
        {
          productId: product.id,
          productName: product.name,
          quantity: 1,
          price: product.price,
        },
      ],

      total: Number(product.price),

      status: "pending",

      createdAt: Date.now(),
    }
  );

  let message =
    `Hello Razzaqia Traders%0A%0A` +

    `Order ID: ${orderRef.id}%0A%0A` +

    `Customer Name: ${customerName}%0A` +
    `Phone: ${customerPhone}%0A` +
    `Address: ${customerAddress}%0A%0A` +

    `Product: ${product.name}%0A` +

    `Price: Rs. ${product.price}`;

  window.open(
    `https://wa.me/${settings.whatsapp}?text=${message}`,
    "_blank"
  );

  setShowOrderPopup(false);
};

 if (!product) {

  return (
    <>
      <Navbar />
      <BackButton />
      <div style={{ padding: "30px" }}>
        Loading...
      </div>
    </>
  );
}
return (

    
<>
  <Navbar
  openSidebar={() =>
    setSidebarOpen(true)
  }
/>

<Sidebar
  open={sidebarOpen}
  closeSidebar={() =>
    setSidebarOpen(false)
  }
/>
  <BackButton />

  <div className="product-details">

    <div className="product-details-image">

  <img
    src={selectedImage}
    alt={product.name}
  />

  <div className="product-thumbnails">

    <img
      src={product.imageUrl}
      alt=""
      onClick={() =>
        setSelectedImage(
          product.imageUrl
        )
      }
    />

    {product.imageUrl2 && (

      <img
        src={product.imageUrl2}
        alt=""
        onClick={() =>
          setSelectedImage(
            product.imageUrl2
          )
        }
      />

    )}

  </div>

</div>

    <div className="product-details-info">

      <span className="product-page-badge">
        NEW
      </span>

      <h1>{product.name}</h1>

      <div className="product-rating">
        ★★★★★ 4.9 Rating
      </div>

      <h2>
        Rs. {product.price}
      </h2>

      <p>
        Premium electronics product
        available at Razzaqia Traders.
      </p>

      <div className="product-page-buttons">

        <button
  className="add-cart-btn"
  onClick={() => {
    addToCart(product);
    alert("Added to cart");
  }}
>
  Add To Cart
</button>



       <button
  className="order-btn"
  onClick={() =>
    setShowOrderPopup(true)
  }
>
  Order Now
</button>

      </div>

    </div>

  </div>
  <div className="product-bottom-layout">

  <div className="related-products-sidebar">

    <h2>Related Products</h2>
{relatedProducts.map((item) => (

  <Link
    key={item.id}
    to={`/product/${item.id}`}
    className="related-mini-card"
  >

    <img
      src={item.imageUrl}
      alt={item.name}
      className="related-product-image"
    />

    <h4>{item.name}</h4>

    <p>
      Rs. {item.price}
    </p>

  </Link>

))}

  </div>

  <div className="product-content-right">

    <div className="product-accordion">

      <details>
        <summary>Description</summary>

        <p>
          {product.description}
        </p>

      </details>

      <details>
        <summary>Specifications</summary>

        <ul>
           {product.specifications
      ?.split("\n")
      .map((item, index) => (
        <li key={index}>
          {item}
        </li>
      ))}
        </ul>

      </details>

    </div>

    <div className="reviews-section">

      <h2>Customer Reviews</h2>

      <div className="review-form">

        <input
  type="text"
  placeholder="Your Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
        <div className="rating-selector">

  {[1,2,3,4,5].map((star) => (

    <span
      key={star}
      className={
        star <= rating
        ? "star active-star"
        : "star"
      }
      onClick={() => setRating(star)}
    >
      ★
    </span>

  ))}

</div>
<textarea
  placeholder="Write your review..."
  value={reviewText}
  onChange={(e) => setReviewText(e.target.value)}
></textarea>

       <button onClick={submitReview}>
  Submit Review
</button>

      </div>

     {reviews.map((review) => (

  <div
    key={review.id}
    className="review-card"
  >

   <h4>{review.name}</h4>

<div className="review-stars">
  {"★".repeat(review.rating || 5)}
</div>

    <p>{review.review}</p>

  </div>
))}

    </div>
  </div>

</div>

{showOrderPopup && (

  <div className="popup-overlay">

    <div className="popup-box">

      <h2>Order Details</h2>

      <input
        placeholder="Your Name"
        value={customerName}
        onChange={(e) =>
          setCustomerName(e.target.value)
        }
      />

      <input
        placeholder="Phone Number"
        value={customerPhone}
        onChange={(e) =>
          setCustomerPhone(e.target.value)
        }
      />

      <textarea
        placeholder="Address"
        value={customerAddress}
        onChange={(e) =>
          setCustomerAddress(e.target.value)
        }
      />

      <div className="popup-buttons">

        <button
          onClick={() =>
            setShowOrderPopup(false)
          }
        >
          Cancel
        </button>

        <button
          onClick={placeOrder}
        >
          Confirm Order
        </button>

      </div>

    </div>

  </div>

)}

</>

);
}