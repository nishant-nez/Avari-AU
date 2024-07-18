import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const RequireAuth = ({ allowedRole }) => {
    const { authState } = useContext(AuthContext);
    const location = useLocation();


    return (
        authState.role === allowedRole
            ? <Outlet />
            : <Navigate to={ `/${ allowedRole }/login` } state={ { from: location } } replace />
    );
}

export default RequireAuth;