import Orders from "./admin/Orders";
import StoreSettings from "./admin/StoreSettings";
import ProtectedRoute from "./components/ProtectedRoute";
import Cart from "./pages/Cart";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/product";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Dashboard from "./admin/Dashboard";
import AddProduct from "./admin/AddProduct";
import ProductDetails from "./pages/ProductDetails";
import ManageProducts from "./admin/ManageProducts";
import EditProduct from "./admin/EditProduct";

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/products"
        element={<Product />}
      />

      <Route
        path="/products/:category"
        element={<Product />}
      />

      <Route
        path="/product/:id"
        element={<ProductDetails />}
      />

      <Route
        path="/cart"
        element={<Cart />}
      />

      <Route
        path="/contact"
        element={<Contact />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-product"
        element={
          <ProtectedRoute>
            <AddProduct />
          </ProtectedRoute>
        }
      />

      <Route
        path="/manage-products"
        element={
          <ProtectedRoute>
            <ManageProducts />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-product/:id"
        element={
          <ProtectedRoute>
            <EditProduct />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/store-settings"
        element={
          <ProtectedRoute>
            <StoreSettings />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;