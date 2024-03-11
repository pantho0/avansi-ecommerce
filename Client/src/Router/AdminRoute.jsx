import { Navigate } from "react-router-dom";
import useAdmin from "../Components/Hooks/useAdmin";
import useAuth from "../Components/Hooks/useAuth";
import LodaingState from "../Components/Loading State/LodaingState";


const AdminRoute = ({children}) => {
    const {user, loading} =useAuth()
    const [isAdmin, isAdminLoading] = useAdmin()

    console.log(isAdmin);

    if(loading || isAdminLoading){
        return <LodaingState/>
    }

    if(user && isAdmin){
        return children;
    }

    return <Navigate to="/"/>
};

export default AdminRoute;