import useStoreSettings from "../hooks/useStoreSettings";
import { useEffect, useState } from "react";
import Navbar from "../components/NavbarTemp";
import Sidebar from "../components/Sidebar";
import { db } from "../services/firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] =
  useState(false);

const [products, setProducts] =
  useState([]);

const [banner, setBanner] =
  useState(null);

const [bannerLoading, setBannerLoading] =
  useState(true);

  const settings =
    useStoreSettings();

  useEffect(() => {

    loadProducts();
    loadBanner();

  }, []);

  const loadBanner = async () => {

  try {

    const bannerSnap =
      await getDoc(
        doc(db, "banners", "homepage")
      );

    if (bannerSnap.exists()) {
      setBanner(bannerSnap.data());
    }

  } catch (error) {
    console.error(error);
  } finally {
    setBannerLoading(false);
  }
};

  const loadProducts = async () => {

    const snapshot = await getDocs(
      collection(db, "products")
    );

    const items = [];

    snapshot.forEach((doc) => {

      items.push({
        id: doc.id,
        ...doc.data(),
      });

    });

    setProducts(
      items.filter(
        (product) =>
          product.featured === true
      )
    );
  };

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

      {!bannerLoading && (
<section className="hero">
  


        <div className="hero-content">

          <p className="location">
            📍 LAHORE, PAKISTAN
          </p>

          <h1>
            {banner?.title}
          </h1>

          <p className="hero-description">
            {banner?.subtitle}
          </p>

          <div className="hero-buttons">

            <button
              className="shop-btn"
              onClick={() => {

                if (
                  banner?.buttonLink
                ) {

                  navigate(
                    banner.buttonLink
                  );

                } else {

                  navigate(
                    "/products"
                  );

                }

              }}
            >
              {banner?.buttonText}
            </button>

          </div>

        </div>

        {banner?.image && (

          <div
            className="hero-image"
          >

            <img
              src={banner.image}
              alt="Homepage Banner"
            />

          </div>

        )}

      </section>
)}

      <div className="category-grid">

        <Link
          to="/products/Mobiles"
          className="category-card"
        >
          📱
          <span>Mobiles</span>
        </Link>

        <Link
          to="/products/Kitchen Appliances"
          className="category-card"
        >
          🍳
          <span>
            Kitchen Appliances
          </span>
        </Link>

        <Link
          to="/products/Refrigerators"
          className="category-card"
        >
          ❄️
          <span>
            Refrigerators
          </span>
        </Link>

        <Link
          to="/products/Washing Machines"
          className="category-card"
        >
          🧺
          <span>
            Washing Machines
          </span>
        </Link>

        <Link
          to="/products/Speakers"
          className="category-card"
        >
          🔊
          <span>Speakers</span>
        </Link>

        <Link
          to="/products/Home Appliances"
          className="category-card"
        >
          🏠
          <span>
            Home Appliances
          </span>
        </Link>

      </div>

      <section className="about-section">

        <h2>
          Why Choose Razzaqia
          Traders?
        </h2>

        <p>
          We provide genuine
          electronics,
          competitive prices and
          excellent customer
          support for all our
          customers.
        </p>

      </section>

      <section className="featured-products">

        <h2>
          Featured Products
        </h2>

        <div className="product-grid">

          {products.map(
            (product) => (

              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="product-card product-card-link"
              >

                <img
                  src={
                    product.imageUrl
                  }
                  alt={
                    product.name
                  }
                />

                <div className="product-info">

                  <span className="category-badge">
                    NEW
                  </span>

                  <h3>
                    {product.name}
                  </h3>

                  <p className="price">
                    Rs.{" "}
                    {
                      product.price
                    }
                  </p>

                  <div className="card-buttons">

                    <button className="details-btn">
                      Add To Cart
                    </button>

                    <button
                      className="order-btn"
                      onClick={(
                        e
                      ) => {

                        e.preventDefault();

                        e.stopPropagation();

                        navigate(
                          `/product/${product.id}`
                        );

                      }}
                    >
                      Order Now
                    </button>

                  </div>

                </div>

              </Link>

            )
          )}

        </div>

      </section>

    </>
  );
}