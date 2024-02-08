import { Outlet } from "react-router-dom";
import NavDrawer from "../Components/Shared/NavDrawer";
import Banner from "../Pages/Home/Banner/Banner";



const MainLayout = () => {
    return (
        <>
        <NavDrawer/>
        <Outlet/>
        </>
    );
};

export default MainLayout;