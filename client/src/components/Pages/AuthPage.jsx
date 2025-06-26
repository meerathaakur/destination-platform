import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
    });
    const [isSignup, setIsSignup] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Reset previous errors

        try {
            // Step 1: Check if user exists
            const checkResponse = await fetch("https://destination-platform.onrender.com/api/auth/check-user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: user.email }),
            });

            const checkData = await checkResponse.json();

            if (checkResponse.ok && checkData.exists) {
                // User exists → Login with email & password only
                const loginResponse = await fetch("https://destination-platform.onrender.com/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ email: user.email, password: user.password }),
                });

                const loginData = await loginResponse.json();

                if (loginResponse.ok) {
                    navigate("/"); // Redirect to HomePage
                } else {
                    setError(loginData.message || "Invalid password.");
                }
            } else {
                // User does NOT exist → Require full signup details
                if (!isSignup) {
                    setIsSignup(true);
                    setError("User not found! Please complete signup.");
                    return;
                }

                // Proceed with signup
                const signupResponse = await fetch("https://destination-platform.onrender.com/api/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(user),
                });

                const signupData = await signupResponse.json();

                if (signupResponse.ok) {
                    navigate("/"); // Redirect to HomePage
                } else {
                    setError(signupData.message || "Signup failed. Try again.");
                }
            }
        } catch (error) {
            setError("Something went wrong. Please try again.");
            console.error("Auth error:", error);
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-8 text-center text-2xl font-bold tracking-tight text-gray-900">
                    {isSignup ? "Create an account" : "Sign in to your account"}
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && <p className="text-red-500 text-center">{error}</p>}

                    {isSignup && (
                        <div>
                            <label className="block text-sm font-medium text-gray-900">Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={user.name}
                                onChange={handleChange}
                                className="block w-full rounded-md px-3 py-1.5 text-gray-900 outline-1 outline-gray-300"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-900">Email address</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={user.email}
                            onChange={handleChange}
                            className="block w-full rounded-md px-3 py-1.5 text-gray-900 outline-1 outline-gray-300"
                        />
                    </div>

                    {isSignup && (
                        <div>
                            <label className="block text-sm font-medium text-gray-900">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                required
                                value={user.phone}
                                onChange={handleChange}
                                className="block w-full rounded-md px-3 py-1.5 text-gray-900 outline-1 outline-gray-300"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-900">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            value={user.password}
                            onChange={handleChange}
                            className="block w-full rounded-md px-3 py-1.5 text-gray-900 outline-1 outline-gray-300"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500"
                        >
                            {isSignup ? "Sign up" : "Sign in"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AuthPage;
