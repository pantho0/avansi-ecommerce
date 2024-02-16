import { Outlet } from "react-router-dom";
import NavDrawer from "../Components/Shared/NavDrawer";
import Footer from "../Components/Shared/Footer";

const MainLayout = () => {
  return (
    <div className="bg-white">
      <NavDrawer />
      <Outlet />
      <Footer/>
    </div>
  );
};

export default MainLayout;
