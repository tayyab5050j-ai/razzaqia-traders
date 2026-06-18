import BackButton from "../components/BackButton";
import { useState, useEffect } from "react";
import { db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";
import { uploadImage } from "../services/cloudinary";
import useCategories from "../hooks/useCategories";

export default function AddProduct() {
  const [featured, setFeatured] = useState(false);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [description, setDescription] = useState("");
  const [specifications, setSpecifications] = useState("");
  const [loading, setLoading] = useState(false);
  const [stock, setStock] = useState("");
  const [badgeText, setBadgeText] = useState("");
  const [badgeBgColor, setBadgeBgColor] = useState("#C9892A");
  const [badgeTextColor, setBadgeTextColor] = useState("#FFFFFF");
  const { categories, loading: categoriesLoading } = useCategories();

  const saveProduct = async () => {
    try {
      setLoading(true);

      let imageUrl = "";
      let imageUrl2 = "";

      if (image) {
        imageUrl = await uploadImage(image);
      }

      if (image2) {
        imageUrl2 = await uploadImage(image2);
      }

      await addDoc(
        collection(db, "products"),
        {
          name,
          price,
          category,
          imageUrl,
          imageUrl2,
          description,
          specifications,
          featured,
          stock: Number(stock),
          badgeText,
          badgeBgColor,
          badgeTextColor,
        }
      );

      alert("Product Saved!");

      setName("");
      setPrice("");
      setCategory("");
      setDescription("");
      setSpecifications("");
      setImage(null);
      setImage2(null);

      setLoading(false);
    } catch (error) {
      console.error("FULL ERROR:", error);

      if (error.response) {
        console.error("STATUS:", error.response.status);
        console.log(
          "CLOUDINARY ERROR:",
          JSON.stringify(
            error.response.data,
            null,
            2
          )
        );
      }

      alert(error.message);
    }
  };

  return (
    <>
      <BackButton />

      <div style={{ padding: "30px" }}>
        <h1>Add Product</h1>

        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px",
          }}
        />
        <input
          type="number"
          placeholder="Stock Quantity"
          value={stock}
          onChange={(e) =>
            setStock(e.target.value)
          }
        />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px",
          }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px",
          }}
          disabled={categoriesLoading}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px",
            minHeight: "120px",
          }}
        />

        <textarea
          placeholder="Specifications (one per line)"
          value={specifications}
          onChange={(e) => setSpecifications(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px",
            minHeight: "120px",
          }}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImage(e.target.files[0])
          }
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImage2(e.target.files[0])
          }
          style={{
            marginTop: "15px",
          }}
        />

        <div
          style={{
            marginTop: "15px",
          }}
        >
          <label>
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) =>
                setFeatured(
                  e.target.checked
                )
              }
            />
            {" "}
            Featured Product
          </label>
        </div>

        <hr style={{ marginTop: "20px", marginBottom: "10px" }} />
        <h3 style={{ marginTop: "0", marginBottom: "12px", fontSize: "16px" }}>Custom Badge (Optional)</h3>
        <input
          placeholder="Badge Text (e.g. NEW, SALE, BESTSELLER)"
          value={badgeText}
          onChange={(e) => setBadgeText(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "8px",
          }}
        />
        <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontSize: "13px", marginBottom: "4px", fontWeight: 600 }}>
              Badge Background Color
            </label>
            <input
              type="color"
              value={badgeBgColor}
              onChange={(e) => setBadgeBgColor(e.target.value)}
              style={{ width: "100%", height: "40px", border: "1px solid var(--border)", borderRadius: "6px", cursor: "pointer" }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontSize: "13px", marginBottom: "4px", fontWeight: 600 }}>
              Badge Text Color
            </label>
            <input
              type="color"
              value={badgeTextColor}
              onChange={(e) => setBadgeTextColor(e.target.value)}
              style={{ width: "100%", height: "40px", border: "1px solid var(--border)", borderRadius: "6px", cursor: "pointer" }}
            />
          </div>
        </div>

        <button
          onClick={saveProduct}
          style={{
            marginTop: "20px",
            padding: "12px 25px",
            background: "#E56717",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Uploading..." : "Save Product"}
        </button>
      </div>
    </>
  );
}