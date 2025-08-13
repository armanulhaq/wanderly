import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/slices/user/user";

const Navbar = () => {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    const logoutHandler = async () => {
        try {
            setLoading(true);
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                }
            );
            if (!res.ok) throw new Error("Failed to logout");
            dispatch(setUser({ name: "", email: "" }));
            navigate("/");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <header className="absolute top-0 left-0 right-0 z-10 bg-white backdrop-blur-sm">
            <nav className="max-w-6xl mx-auto px-8 md:px-12 py-4 flex justify-between items-center">
                <div
                    onClick={() => navigate("/")}
                    className="text-xl font-bold text-gray-900 cursor-pointer"
                >
                    Wanderly
                </div>

                <div className="flex items-center gap-4">
                    {user.name ? (
                        <div className="flex items-center gap-6">
                            <p className="cursor-pointer text-sm text-gray-600">
                                Hey, {user.name}
                            </p>
                            <button
                                onClick={logoutHandler}
                                className="px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 rounded-md text-sm font-medium transition-colors cursor-pointer"
                            >
                                {loading ? "Logging out..." : "Logout"}
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => navigate("/login")}
                            className="px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 rounded-md text-sm font-medium transition-colors cursor-pointer"
                        >
                            Sign In
                        </button>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
