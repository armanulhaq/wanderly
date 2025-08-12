import { Lock, Mail, User } from "lucide-react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, email, password }),
                }
            );
            if (!res.ok) {
                throw new Error("Failed to register");
            }
            const data = await res.json();
            console.log(data);
            navigate("/login");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-subtle-purple-light flex items-center justify-center min-h-screen">
            <Navbar />
            <form
                onSubmit={handleRegister}
                className="max-w-md w-full mx-auto px-8 md:px-12 bg-white border border-gray-200 rounded-2xl py-10 shadow-lg"
            >
                <div className="mb-6 flex flex-col justify-center items-center gap-2">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Create an account
                    </h1>
                    <p className="text-gray-600 text-sm">
                        Join us and get started
                    </p>
                </div>

                {/* Name Input */}
                <div className="flex items-center w-full mt-4 bg-white border border-gray-300 h-12 rounded-full overflow-hidden pl-6 gap-3">
                    <User className="w-5 h-5 text-gray-600" />
                    <input
                        type="text"
                        placeholder="Full name"
                        className="bg-transparent text-gray-900 placeholder-gray-400 outline-none text-sm w-full h-full"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                {/* Email Input */}
                <div className="flex items-center w-full mt-4 bg-white border border-gray-300 h-12 rounded-full overflow-hidden pl-6 gap-3">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <input
                        type="email"
                        placeholder="Email address"
                        className="bg-transparent text-gray-900 placeholder-gray-400 outline-none text-sm w-full h-full"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Password Input */}
                <div className="flex items-center mt-4 w-full bg-white border border-gray-300 h-12 rounded-full overflow-hidden pl-6 gap-3">
                    <Lock className="w-5 h-5 text-gray-600" />
                    <input
                        type="password"
                        placeholder="Password"
                        className="bg-transparent text-gray-900 placeholder-gray-400 outline-none text-sm w-full h-full"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="mt-6 w-full h-11 rounded-full text-white bg-purple-600 hover:bg-purple-700 transition-colors font-medium cursor-pointer"
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Sign Up"}
                </button>

                {/* Login Link */}
                <p className="text-gray-600 text-sm mt-6 text-center">
                    Already have an account?{" "}
                    <span
                        className="text-purple-600 hover:text-purple-500 cursor-pointer"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Register;
