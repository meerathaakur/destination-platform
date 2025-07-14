import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const SignupPage = () => {
    const { register } = useAuth();
    // State to manage user input and feedback
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
            await register(user.name, user.email, user.password,user.phone);
            setSuccess("Account created successfully! Redirecting to login...");

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

                {/* <p className="mt-4 text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <span
                        className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                </p> */}
            </div>
        </div>
    );
};

export default SignupPage;
