import { Lock, Mail } from "lucide-react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-subtle-purple flex items-center justify-center min-h-screen">
            <Navbar />
            <form className="max-w-md w-full bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl px-8 py-10 shadow-lg">
                <div className="mb-6 flex flex-col justify-center items-center gap-2">
                    <h1 className="text-3xl font-bold text-white">Login</h1>
                    <p className="text-gray-400 text-sm">
                        Please sign in to continue
                    </p>
                </div>

                <div className="flex items-center w-full mt-8 bg-gray-800/60 border border-gray-700/60 h-12 rounded-full  pl-6 gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <input
                        type="email"
                        placeholder="Email address"
                        className="bg-transparent text-gray-200 placeholder-gray-500 outline-none text-sm w-full h-full"
                        required
                    />
                </div>

                <div className="flex items-center mt-4 w-full bg-gray-800/60 border border-gray-700/60 h-12 rounded-full pl-6 gap-3">
                    <Lock className="w-5 h-5 text-gray-400" />
                    <input
                        type="password"
                        placeholder="Password"
                        className="bg-transparent text-gray-200 placeholder-gray-500 outline-none text-sm w-full h-full"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="mt-6 w-full h-11 rounded-full text-white bg-purple-500/50 hover:bg-purple-600/50 transition-colors font-medium"
                >
                    Login
                </button>
                <p className="text-gray-400 text-sm mt-6 text-center">
                    Don’t have an account?{" "}
                    <a
                        className="text-purple-400 hover:text-purple-300 cursor-pointer"
                        onClick={() => {
                            navigate("/register");
                        }}
                    >
                        Sign up
                    </a>
                </p>
            </form>
        </div>
    );
};

export default Login;
