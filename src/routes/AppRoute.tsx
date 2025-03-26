import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/mainLayout/MainLayout";
import NotFound from "../pages/notFound";
import AdminPage from "../pages/admin"; // Import AdminPage
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../pages/home";
import ProducDetailPage from "../pages/product/ProductDetailPage";
import CartPage from "../pages/cart";
import CheckoutPage from "../pages/checkout";
import { CartProvider } from "../context/CartContext";
import SeekingPage from "../pages/seeking";
import AdminProduct from "../pages/admin/adminProduct/AdminProduct"; // Import AdminProduct
import AdminAllProduct from "../pages/admin/adminAllProduct/AdminAllProduct"; // Import AdminAllProduct
import { ProductProvider } from "../context/ProductContext";

const AppRoute = () => {
  return (
    <ProductProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/products/:id" element={<ProducDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/collection/all" element={<SeekingPage />} />
          </Route>

          <Route
            path="/auth/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminProduct />} />
            <Route path="products" element={<AdminAllProduct />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartProvider>
    </ProductProvider>
  );
};

export default AppRoute;
