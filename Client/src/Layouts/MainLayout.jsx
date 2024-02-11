import { Outlet } from "react-router-dom";
import NavDrawer from "../Components/Shared/NavDrawer";

const MainLayout = () => {
  return (
    <>
      <NavDrawer />
      <Outlet />
    </>
  );
};

export default MainLayout;
