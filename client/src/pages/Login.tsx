import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { useState } from "react";
import { setUser } from "../redux/slices/user/user";
import Navbar from "../components/Navbar";
import { Lock, Mail } from "lucide-react";

const GUEST_CREDENTIALS = { email: "guest@gmail.com", password: "guest" };

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (
        e:
            | React.FormEvent<HTMLFormElement>
            | React.MouseEvent<HTMLButtonElement>,
        isGuest = false
    ) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const credentials = isGuest
                ? GUEST_CREDENTIALS
                : { email, password };
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(credentials),
                    credentials: "include",
                }
            );
            if (!res.ok) {
                let data;
                try {
                    data = await res.json();
                } catch {
                    data = {};
                }
                throw new Error(
                    data.message ||
                        (isGuest ? "Failed to login as guest" : "Login failed")
                );
            }
            const data = await res.json();
            dispatch(setUser(data.user));
            navigate("/plan");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-subtle-purple-light flex items-center justify-center min-h-screen">
            <Navbar />
            <form
                onSubmit={(e) => handleLogin(e)}
                className="max-w-md w-full bg-white border border-gray-200 rounded-2xl mx-auto px-8 md:px-12 py-10 shadow-lg"
            >
                {/* Heading */}
                <div className="mb-6 flex flex-col justify-center items-center gap-2">
                    <h1 className="text-3xl font-bold text-gray-900">Login</h1>
                    <p className="text-gray-600 text-sm">
                        Please sign in to continue
                    </p>
                </div>
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
                <button
                    type="submit"
                    className="mt-6 w-full h-11 rounded-full text-white bg-purple-600 hover:bg-purple-700 transition-colors font-medium cursor-pointer"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <button
                    type="button"
                    onClick={(e) => handleLogin(e, true)}
                    className="mt-3 w-full h-11 rounded-full text-purple-600 bg-white border-2 border-purple-600 hover:bg-purple-50 transition-colors font-medium cursor-pointer"
                    disabled={loading}
                >
                    Continue as Guest
                </button>
                {error && (
                    <div
                        className="mt-4 text-red-600 text-sm"
                        aria-live="polite"
                    >
                        {error}
                    </div>
                )}

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
