import { Sparkles } from "lucide-react";
import Navbar from "../components/Navbar";
import homeIllustration from "../assets/Home.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <Navbar />
            <section className="bg-subtle-purple min-h-screen text-gray-100 flex items-center">
                <main className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
                    <div className="flex flex-col justify-center">
                        <div className="inline-flex items-center gap-2 bg-purple-600/30 px-3 py-1 rounded-full text-purple-300 text-sm w-fit">
                            <Sparkles className="w-4 h-4" />
                            <span>AI Powered Trip Planner</span>
                        </div>

                        <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                            Plan your next trip with{" "}
                            <span className="bg-gradient-to-r from-purple-400 via-purple-600 to-purple-700 bg-clip-text text-transparent">
                                Wanderly
                            </span>
                        </h1>
                        <p className="mt-4 text-lg text-gray-400 max-w-lg">
                            Discover hidden gems, craft the perfect itinerary,
                            and make every moment of your journey unforgettable.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => navigate("/plan")}
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-500/50 hover:bg-purple-600/50 text-white rounded-lg font-medium transition-colors cursor-pointer"
                            >
                                <Sparkles className="w-5 h-5" />
                                Plan My Trip
                            </button>
                            <button className="px-6 py-3 bg-gray-800 text-white hover:text-purple-500/70 rounded-lg font-medium transition-colors cursor-pointer">
                                See Sample Trips
                            </button>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center justify-center">
                        <div className="w-full h-80 flex items-center justify-center">
                            <img
                                src={homeIllustration}
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
