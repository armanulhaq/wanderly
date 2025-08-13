import { Sparkles } from "lucide-react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const Home = () => {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user);
    console.log("user", user);
    return (
        <>
            <Navbar />
            <section className="min-h-screen text-gray-900 flex items-center bg-white">
                <main className="max-w-6xl mx-auto px-8 md:px-12 py-16 grid md:grid-cols-2 gap-12">
                    <div className="flex flex-col justify-center">
                        <div className="inline-flex items-center gap-2 bg-purple-100 px-3 py-1 rounded-full text-purple-700 text-sm w-fit">
                            <Sparkles className="w-4 h-4" />
                            <span>AI Powered Trip Planner</span>
                        </div>
                        <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                            Plan your next trip with{" "}
                            <span className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 bg-clip-text text-transparent">
                                Wanderly
                            </span>
                        </h1>

                        <p className="mt-4 text-md text-gray-700 max-w-lg">
                            Discover hidden gems, craft the perfect itinerary,
                            and make every moment of your journey unforgettable.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => {
                                    if (user.name) {
                                        navigate("/plan");
                                    } else {
                                        navigate("/login");
                                    }
                                }}
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors cursor-pointer"
                            >
                                <Sparkles className="w-5 h-5" />
                                Plan My Trip
                            </button>
                            <button
                                onClick={() => navigate("/sample-itinerary")}
                                className="px-6 py-3 bg-gray-100 text-gray-800 hover:text-purple-600 rounded-lg font-medium transition-colors cursor-pointer"
                            >
                                See Sample Trips
                            </button>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center justify-center">
                        <div className="w-full h-80 flex items-center justify-center">
                            <img
                                src="https://cdn.dribbble.com/userupload/22252781/file/original-2be370bf85228f17e472da81f9179bbf.gif"
                                alt="Illustration"
                                className="w-full h-full object-cover rounded-xl"
                            />
                        </div>
                    </div>
                </main>
            </section>
        </>
    );
};

export default Home;
