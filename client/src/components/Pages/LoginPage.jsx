import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "../ForgotPassword";
import SignupPage from "./SignUpPage";

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // 🔹 Check if user is already logged in when visiting the login page
    useEffect(() => {
        const token = localStorage.getItem("token"); // Check if token exists
        if (token) {
            navigate("/"); // Redirect to HomePage if user is already logged in
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Reset previous errors

        try {
            const response = await fetch("https://destination-platform.onrender.com/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // Ensures HttpOnly cookies are included
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token); // 🔹 Store token in localStorage
                navigate("/"); // Redirect to HomePage after successful login
            } else {
                console.log(data.message)
                setError(data.message || "Invalid email or password.");
            }
        } catch (error) {
            setError("Something went wrong. Please try again.");
            console.error("Login error:", error);
        }
    };
    

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://res.cloudinary.com/dagmoqwr5/image/upload/v1742725706/logo-removebg-preview-removebg-preview_rbuupm.png"
                        className="mx-auto h-12 w-auto"
                    />
                    <h2 className="mt-8 text-center text-2xl font-bold tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && <p className="text-red-500 text-center">{error}</p>}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">

                                    <ForgotPassword key={email} email={email} />

                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    {/* Updated: "Create Account" link */}
                <p className="mt-6 text-center text-sm text-gray-500">
                    Don't have an account?{" "}
                    <span
                        className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer"
                        onClick={() => navigate("/register")}
                    >
                        Create Account
                    </span>
                </p>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
