// components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                setLoading(true);
                const res = await fetch("https://destination-platform.onrender.com/api/auth/me", {
                    method: "GET",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                });

                if (res.ok) {
                    setIsAuthenticated(true);
                } else {
                    navigate("/login");
                }
            } catch (err) {
                console.error("Auth check failed:", err);
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) return <div className="text-center py-10 text-xl">Loading...</div>;

    return isAuthenticated ? children : null;
};

export default ProtectedRoute;
