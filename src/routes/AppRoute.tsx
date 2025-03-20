import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/mainLayout/MainLayout";
import NotFound from "../pages/notFound";
import AdminPage from "../pages/admin";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../pages/home";
import ProducDetailPage from "../pages/product/ProductDetailPage";
import CartPage from "../pages/cart";
import CheckoutPage from "../pages/checkout";
import { CartProvider } from "../context/CartContext"; // Import CartProvider

const AppRoute = () => {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/products/:id" element={<ProducDetailPage />} />

          <Route path="/cart" element={<CartPage />} />
        </Route>

        <Route path="/checkout" element={<CheckoutPage />} />

        <Route
          path="/auth/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </CartProvider>
  );
};

export default AppRoute;
