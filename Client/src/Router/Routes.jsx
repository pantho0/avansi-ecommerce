import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login & Signup/Login";
import Signup from "../Pages/Login & Signup/Signup";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import Dashboard from "../Layouts/Dashboard";
import Profile from "../Pages/User_Dashboard/Profile";
import PrivateRoute from "./PrivateRoute";
import Cart from "../Pages/User_Dashboard/Cart";
import Users from "../Pages/AdminDashboard/Users";
import AddProducts from "../Pages/AdminDashboard/AddProducts";
import Inventory from "../Pages/AdminDashboard/Inventory";
import MyOrders from "../Pages/User_Dashboard/MyOrders";
import Cateories from "../Pages/Categories/Cateories";
import SearchResult from "../Pages/SearchResult/SearchResult";
import AdminRoute from "./AdminRoute";
import DashboardAdmin from "../Pages/AdminDashboard/DashboardAdmin";
import PaymentSuccess from "./../Pages/PaymentSuccess/PaymentSuccess";
import PaymentFailed from "../Pages/PaymentFailed/PaymentFailed";
import AllProductsView from "../Pages/AllProductsView/AllProductsView";
import AddBanner from "../Pages/AdminDashboard/AddBanner";
import OrderAll from "../Pages/AdminDashboard/OrdersAll";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
        loader: ({ params }) =>
          fetch(
            `https://avansi-backend.vercel.app/api/v1/singleproducts/${params.id}`
          ),
      },
      {
        path: "categories",
        element: <Cateories />,
      },
      {
        path: "searchResult",
        element: <SearchResult />,
      },
      {
        path: "payment-success/:tranId",
        element: <PaymentSuccess />,
      },
      {
        path: "payment-failed/:tranId",
        element: <PaymentFailed />,
      },
      {
        path: "allproducts",
        element: <AllProductsView />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <Users />
          </AdminRoute>
        ),
      },
      {
        path: "addProducts",
        element: (
          <AdminRoute>
            <AddProducts />
          </AdminRoute>
        ),
      },
      {
        path: "inventory",
        element: (
          <AdminRoute>
            <Inventory />
          </AdminRoute>
        ),
      },
      {
        path: "myorders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <AdminRoute>
            <OrderAll />
          </AdminRoute>
        ),
      },
      {
        path: "adminDashboard",
        element: (
          <AdminRoute>
            <DashboardAdmin />
          </AdminRoute>
        ),
      },
      {
        path: "addbanner",
        element: (
          <AdminRoute>
            <AddBanner />
          </AdminRoute>
        ),
      },
    ],
  },
]);
