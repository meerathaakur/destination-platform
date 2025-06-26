import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const URL = "https://destination-platform.onrender.com/api";

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
            try {
                const res = await fetch(`${URL}/auth/me`, {
                    method: "GET",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                });
                if (!res.ok) throw new Error("Unauthorized");

                const data = await res.json();
                setUser(data.user);
                localStorage.setItem("user", JSON.stringify(data.user));
            } catch {
                setUser(null);
                localStorage.removeItem("user");
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
            const res = await fetch(`${URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Login failed");

            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));

            setNavigationPath("/dashboard");
            setShouldNavigate(true);
        } catch (error) {
            throw new Error(error.message || "Login failed");
        }
    };

    const register = async (username, email, password) => {
        try {
            const res = await fetch(`${URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ name: username, email, password }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Registration failed");

            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            setNavigationPath("/dashboard");
            setShouldNavigate(true);
        } catch (error) {
            throw new Error(error.message || "Registration failed");
        }
    };

    const logout = async () => {
        try {
            await fetch(`${URL}/auth/logout`, {
                method: "POST",
                credentials: "include",
            });
        } catch(error) {
            throw new Error(error.message);
        }
        setUser(null);
        localStorage.removeItem("user");
        setNavigationPath("/login");
        setShouldNavigate(true);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
