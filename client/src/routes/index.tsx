import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";
import CartPage from "../pages/CartPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ManageFoodPage from "../pages/ManageFoodPage";
import ManageOrderPage from "../pages/ManageOrderPage";
import ManageRestaurantPage from "../pages/ManageRestaurantPage";
import ManageUserPage from "../pages/ManageUserPage";
import NotFoundPage from "../pages/NotFoundPage";
import OrderPage from "../pages/OrderPage";
import ProfilePage from "../pages/ProfilePage";
import RegisterPage from "../pages/RegisterPage";
import TransactionHistoryPage from "../pages/TransactionHistoryPage";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import ProtectedRoute from "./ProtectedRoute";

const Router: FC = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path={ROUTES.HOMEPAGE} element={<HomePage />} />
        <Route path={ROUTES.CART} element={<CartPage />} />
        <Route path={ROUTES.ORDER} element={<OrderPage />} />
        <Route
          path={ROUTES.TRANSACTION_HISTORY}
          element={
            <ProtectedRoute>
              <TransactionHistoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.PROFILE}
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route element={<AdminLayout />}>
        <Route
          path={ROUTES.MANAGE_USER}
          element={
            <ProtectedRoute roles={["admin"]}>
              <ManageUserPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.MANAGE_ORDER}
          element={
            <ProtectedRoute roles={["admin"]}>
              <ManageOrderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.MANAGE_RESTAURANT}
          element={
            <ProtectedRoute roles={["admin"]}>
              <ManageRestaurantPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.MANAGE_FOOD}
          element={
            <ProtectedRoute roles={["admin"]}>
              <ManageFoodPage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.UNAUTHORIZED} element={<UnauthorizedPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
