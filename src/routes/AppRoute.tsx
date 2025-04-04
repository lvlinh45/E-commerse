import { Route, Routes, useLocation } from "react-router-dom";
import MainLayout from "../layouts/mainLayout/MainLayout";
import NotFoundPage from "../pages/notFound";
import AdminPage from "../pages/admin"; // Import AdminPage
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../pages/home";
import ProducDetailPage from "../pages/product/ProductDetailPage";
import CartPage from "../pages/cart";
import CheckoutPage from "../pages/checkout";
import SeekingPage from "../pages/seeking";
import AdminProduct from "../pages/admin/adminProduct/AdminProduct";
import AdminAllProduct from "../pages/admin/adminAllProduct/AdminAllProduct";
import { useEffect } from "react";
import HeaderCheckout from "../layouts/headerCheckout";
import LoginPage from "../pages/login";
import AdminVoucher from "../pages/admin/adminVoucher/AdminVoucher";

const AppRoute = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/products/:id" element={<ProducDetailPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/collection/all" element={<SeekingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="/checkout" element={<HeaderCheckout />}>
        <Route index element={<CheckoutPage />} />
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
        <Route path="voucher" element={<AdminVoucher />} />
      </Route>
    </Routes>
  );
};

export default AppRoute;
