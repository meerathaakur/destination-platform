import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const URL = "https://destination-platform.onrender.com/api";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`${URL}/auth/me`, {
                    method: "GET",
                    credentials: "include", // crucial for cookie-based auth
                    headers: { "Content-Type": "application/json" },
                });

                if (!res.ok) throw new Error("Unauthorized");
                const data = await res.json();

                setUser(data.user);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = async (email, password) => {
        const res = await fetch(`${URL}/auth/login`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Login failed");

        setUser(data.user);
        navigate("/");
    };

    const register = async (name, email, password, phone) => {
        const res = await fetch(`${URL}/auth/register`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, phone }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Registration failed");

        setUser(data.user);
        navigate("/");
    };

    const logout = async () => {
        try {
            await fetch(`${URL}/auth/logout`, {
                method: "POST",
                credentials: "include",
            });
        } catch (err) {
            console.error("Logout failed", err);
        }
        setUser(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
