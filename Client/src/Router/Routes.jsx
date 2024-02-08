import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";

export const router = createBrowserRouter([
    {
        path : "/",
        element: <MainLayout/>
    }
])