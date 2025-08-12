import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { useState } from "react";
import { setUser } from "../redux/slices/user/user";
import Navbar from "../components/Navbar";
import { Lock, Mail } from "lucide-react";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                    credentials: "include",
                }
            );
            if (!res.ok) throw new Error("Failed to login");
            const data = await res.json();
            dispatch(setUser(data.user));
            navigate("/plan");
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
                onSubmit={handleLogin}
                className="max-w-md w-full bg-white border border-gray-200 rounded-2xl mx-auto px-8 md:px-12 py-10 shadow-lg"
            >
                {/* Heading */}
                <div className="mb-6 flex flex-col justify-center items-center gap-2">
                    <h1 className="text-3xl font-bold text-gray-900">Login</h1>
                    <p className="text-gray-600 text-sm">
                        Please sign in to continue
                    </p>
                </div>

                {/* Email */}
                <div className="flex items-center w-full mt-8 bg-white border border-gray-300 h-12 rounded-full pl-6 gap-3">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <input
                        type="email"
                        placeholder="Email address"
                        className="bg-transparent text-gray-900 placeholder-gray-400 outline-none text-sm w-full h-full rounded-r-full"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Password */}
                <div className="flex items-center mt-4 w-full bg-white border border-gray-300 h-12 rounded-full pl-6 gap-3">
                    <Lock className="w-5 h-5 text-gray-500" />
                    <input
                        type="password"
                        placeholder="Password"
                        className="bg-transparent text-gray-900 placeholder-gray-400 outline-none text-sm w-full h-full rounded-r-full"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="mt-6 w-full h-11 rounded-full text-white bg-purple-600 hover:bg-purple-700 transition-colors font-medium cursor-pointer"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                {/* Signup link */}
                <p className="text-gray-600 text-sm mt-6 text-center">
                    Don’t have an account?{" "}
                    <span
                        className="text-purple-600 hover:text-purple-500 cursor-pointer"
                        onClick={() => navigate("/register")}
                    >
                        Sign up
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;
