import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const AdminRoute = ({ children }) => {
  const { admin, token } = useContext(StoreContext);

  if (!admin || !token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
