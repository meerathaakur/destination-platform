// components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch("https://destination-platform.onrender.com/api/auth/me", {
                    method: "GET",
                    credentials: "include"
                });

                if (!res.ok) {
                    navigate("/login");
                } else {
                    setLoading(false);
                }
            } catch (err) {
                navigate("/login");
                console.log(err)
            }
        };

        checkAuth();
    }, [navigate]);

    if (loading) return <div className="text-center py-10 text-xl">Loading...</div>;

    return children;
};

export default ProtectedRoute;
