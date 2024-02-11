import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login & Signup/Login";

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
            }
        ]
    }
])