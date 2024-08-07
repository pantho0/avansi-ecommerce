/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import useAuth from "../Components/Hooks/useAuth";
import { RiseLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <RiseLoader
          color="#8C0327"
          className="w-full h-screen flex justify-center items-center"
        />
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
