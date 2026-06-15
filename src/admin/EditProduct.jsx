import BackButton from "../components/BackButton";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../services/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { uploadImage } from "../services/cloudinary";

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

const [loading, setLoading] = useState(false);

useEffect(() => {
loadProduct();
}, []);

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
}


};

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
    >
      <option value="">
        Select Category
      </option>

      <option value="Mobiles">
        Mobiles
      </option>

      <option value="Kitchen Appliances">
        Kitchen Appliances
      </option>

      <option value="Refrigerators">
        Refrigerators
      </option>

      <option value="Washing Machines">
        Washing Machines
      </option>

      <option value="Speakers">
        Speakers
      </option>

      <option value="Home Appliances">
        Home Appliances
      </option>
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
