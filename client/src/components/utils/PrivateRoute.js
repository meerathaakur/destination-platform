import { Navigate, Outlet } from "react-router-dom";


export const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirect user to login page
};


const PrivateRoute = () => {
    const isAuthenticated = !!localStorage.getItem("token"); // Replace with real authentication check
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
