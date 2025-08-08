import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
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
                    <button
                        onClick={() => {
                            navigate("/login");
                        }}
                        className="px-4 py-2 bg-purple-500/30 hover:bg-purple-600/30 text-gray-100 rounded-md text-sm font-medium transition-colors cursor-pointer"
                    >
                        Sign In
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
