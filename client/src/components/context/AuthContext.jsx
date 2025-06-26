import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// const URL = "http://localhost:3000/api"
const URL = "https://destination-platform.onrender.com/api"

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [shouldNavigate, setShouldNavigate] = useState(false);
    const [navigationPath, setNavigationPath] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem("user_token");
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const res = await fetch(`${URL}/auth/me`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                if (!res.ok) throw new Error("Failed to authenticate");
                const data = await res.json();
                setUser(data.user); // assumes response shape is { user: { ... } }
                localStorage.setItem("user", JSON.stringify(data.user));
            } catch {
                setUser(null);
                localStorage.removeItem("user");
                localStorage.removeItem("user_token");
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    useEffect(() => {
        if (shouldNavigate && navigationPath) {
            navigate(navigationPath);
            setShouldNavigate(false);
            setNavigationPath("");
        }
    }, [shouldNavigate, navigationPath, navigate]);

    const login = async (email, password) => {
        try {
            // TODO: Replace with actual API call
            const res = await fetch(`${URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ email, password })
            });
            const data = await res.json()
            if (!res.ok) {
                throw new Error(data.messase || "Login failed")
            }

            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("user_token", data.token)

            setNavigationPath("/dashboard");
            setShouldNavigate(true);
        } catch (error) {
            throw new Error(error.messase || "Login failed");
        }
    };

    const register = async (username, email, password) => {
        try {
            // TODO: Replace with actual API call
            const res = await fetch(`${URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: username, email, password }),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || "Registration failed");
            }
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("user_token", data.token);
            setNavigationPath("/dashboard");
            setShouldNavigate(true);
        } catch (error) {
            throw new Error(error.message || "Registration failed");
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("user_token");
        setNavigationPath("/login");
        setShouldNavigate(true);
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 