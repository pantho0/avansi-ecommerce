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

export const router = createBrowserRouter([
    {
        path : "/",
        element: <MainLayout/>,
        children :[
            {
                index : true,
                element : <Home/>
            },
            {
                path : "login",
                element: <Login/>
            },
            {
                path : "signup",
                element : <Signup/>
            },
            {
                path : "product/:id",
                element : <ProductDetails/>,
                loader:({params}) => fetch(`http://localhost:5000/api/v1/products/${params.id}`)
            }
        ]
    },
    {
        path : "dashboard",
        element : <Dashboard/>,
        children:[
            {
                path:"profile",
                element: <PrivateRoute><Profile/></PrivateRoute>
            },
            {
                path : "cart",
                element :<PrivateRoute><Cart/></PrivateRoute>, 
            },
            {
                path : 'users',
                element : <Users/>
            },
            {
                path : 'addProducts',
                element : <AddProducts/>
            }
        ]
    }
])