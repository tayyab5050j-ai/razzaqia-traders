import BackButton from "../components/BackButton";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../services/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { uploadImage } from "../services/cloudinary";
import useCategories from "../hooks/useCategories";

export default function EditProduct() {

const { id } = useParams();
const navigate = useNavigate();

const [featured, setFeatured] = useState(false);
const [category, setCategory] = useState("");
const [name, setName] = useState("");
const [stock, setStock] = useState("");
const [price, setPrice] = useState("");

const [image, setImage] = useState(null);
const [image2, setImage2] = useState(null);

const [imageUrl, setImageUrl] = useState("");
const [imageUrl2, setImageUrl2] = useState("");

const [description, setDescription] = useState("");
const [specifications, setSpecifications] = useState("");

const [badgeText, setBadgeText] = useState("");
const [badgeBgColor, setBadgeBgColor] = useState("#C9892A");
const [badgeTextColor, setBadgeTextColor] = useState("#FFFFFF");

const [loading, setLoading] = useState(false);
const { categories, loading: categoriesLoading } = useCategories();

const loadProduct = async () => {


const docRef = doc(db, "products", id);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {

  const data = docSnap.data();

  setCategory(data.category || "");
  setName(data.name || "");
  setPrice(data.price || "");
  setStock(data.stock || 0);

  setImageUrl(data.imageUrl || "");
  setImageUrl2(data.imageUrl2 || "");

  setDescription(data.description || "");
  setSpecifications(data.specifications || "");
  setFeatured(data.featured || false);
  setBadgeText(data.badgeText || "");
  setBadgeBgColor(data.badgeBgColor || "#C9892A");
  setBadgeTextColor(data.badgeTextColor || "#FFFFFF");
}


};

useEffect(() => {
  loadProduct();
}, []);

const updateProduct = async () => {


try {

  setLoading(true);

  let finalImageUrl = imageUrl;
  let finalImageUrl2 = imageUrl2;

  if (image) {
    finalImageUrl = await uploadImage(image);
  }

  if (image2) {
    finalImageUrl2 = await uploadImage(image2);
  }

  await updateDoc(
    doc(db, "products", id),
    {
      name,
      price,
      category,

      imageUrl: finalImageUrl,
      imageUrl2: finalImageUrl2,

      description,
      specifications,
      featured,
      stock: Number(stock),
      badgeText,
      badgeBgColor,
      badgeTextColor,
    }
  );

  alert("Product Updated!");

  navigate("/manage-products");

} catch (error) {

  alert(error.message);

} finally {

  setLoading(false);

}


};

return (
<> <BackButton />

```
  <div
    style={{
      padding: "30px",
      maxWidth: "700px",
      margin: "auto",
    }}
  >

    <h1>Edit Product</h1>

    {imageUrl && (
      <img
        src={imageUrl}
        alt={name}
        style={{
          width: "100%",
          maxHeight: "300px",
          objectFit: "contain",
          marginTop: "20px",
        }}
      />
    )}

    {imageUrl2 && (
      <img
        src={imageUrl2}
        alt={name}
        style={{
          width: "100%",
          maxHeight: "300px",
          objectFit: "contain",
          marginTop: "20px",
        }}
      />
    )}

    <input
      type="text"
      placeholder="Product Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      style={{
        width: "100%",
        padding: "12px",
        marginTop: "20px",
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
      type="text"
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
      <option value="">
        Select Category
      </option>
      {categories.map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      ))}
    </select>

    <textarea
      placeholder="Product Description"
      value={description}
      onChange={(e) =>
        setDescription(e.target.value)
      }
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
      onChange={(e) =>
        setSpecifications(e.target.value)
      }
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
      style={{
        marginTop: "15px",
      }}
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
      onClick={updateProduct}
      style={{
        marginTop: "20px",
        padding: "12px 25px",
        background: "#1D2088",
        color: "white",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
      }}
    >
      {loading
        ? "Updating..."
        : "Save Changes"}
    </button>

  </div>
 </>
 


);
}