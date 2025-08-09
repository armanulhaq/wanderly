import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { useAppDispatch } from "../redux/hooks";
import { useState } from "react";
import { setUser } from "../redux/slices/user/user";

const Navbar = () => {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user); // reads the current user from the store.
    const dispatch = useAppDispatch(); //gives a function you can call to write to the store.
    const [loading, setLoading] = useState<boolean>(false);

    const logoutHandler = async () => {
        try {
            setLoading(true);
            const res = await fetch("http://localhost:3000/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            if (!res.ok) {
                throw new Error("Failed to logout");
            }
            dispatch(setUser({ name: "", email: "" })); // I tell the backend to clear the cookie, then I clear the store and send the user to login.
            navigate("/login");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <header className="absolute top-0 left-0 right-0 z-10">
            <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                <div
                    onClick={() => navigate("/")}
                    className="text-xl font-bold text-white cursor-pointer"
                >
                    Wanderly
                </div>
                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-6">
                            <p className="cursor-pointer text-sm text-white">
                                Hey, {user.name}
                            </p>
                            <button
                                onClick={logoutHandler}
                                className="px-4 py-2 bg-purple-500/30 hover:bg-purple-600/30 text-gray-100 rounded-md text-sm font-medium transition-colors cursor-pointer"
                            >
                                {loading ? "Logging out..." : "Logout"}
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => {
                                navigate("/login");
                            }}
                            className="px-4 py-2 bg-purple-500/30 hover:bg-purple-600/30 text-gray-100 rounded-md text-sm font-medium transition-colors cursor-pointer"
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
