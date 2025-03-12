import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/mainLayout/MainLayout";
import NotFound from "../pages/notFound";
import AdminPage from "../pages/admin";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../pages/home";
import ProducDetailPage from "../pages/product/ProductDetailPage";
import CartPage from "../pages/cart";

const AppRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout></MainLayout>}>
          <Route index element={<HomePage></HomePage>}></Route>
          <Route
            path="/products/:productId"
            element={<ProducDetailPage></ProducDetailPage>}
          ></Route>
          <Route path="/cart" element={<CartPage></CartPage>}></Route>
        </Route>
        <Route
          path="/auth/admin"
          element={
            <ProtectedRoute>
              <AdminPage></AdminPage>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </>
  );
};

export default AppRoute;
