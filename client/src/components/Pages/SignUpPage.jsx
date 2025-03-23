import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Reset error messages
        setSuccess("");

        try {
            const response = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess("Account created successfully! Redirecting to login...");
                localStorage.setItem("token", data.token);
                setTimeout(() => navigate("/"), 2000); // Redirect to login page after 2 seconds
            } else {
                setError(data.message || "Signup failed. Try again.");
            }
        } catch (error) {
            setError("Something went wrong. Please try again.");
            console.error("Signup error:", error);
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-8 text-center text-2xl font-bold tracking-tight text-gray-900">
                    Create an account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {success && <p className="text-green-500 text-center">{success}</p>}

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

                    <div>
                        <label className="block text-sm font-medium text-gray-900">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            autoComplete="current-password"
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
                            Sign Up
                        </button>
                    </div>
                </form>

                <p className="mt-4 text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <span
                        className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
