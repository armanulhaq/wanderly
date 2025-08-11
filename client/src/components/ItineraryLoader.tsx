import { Sparkles } from "lucide-react";

const ItineraryLoader = () => {
    return (
        <div className="fixed inset-0  backdrop-blur-sm flex flex-col items-center justify-center z-50">
            <div className="relative">
                <Sparkles className="w-14 h-14 text-purple-800 animate-pulse" />
                <div className="absolute inset-0 rounded-full blur-lg bg-gradient-to-r from-purple-400 via-purple-600 to-purple-700 opacity-60 animate-ping" />
            </div>

            <p className="mt-6 text-lg font-medium text-purple-600 animate-fadeIn">
                Crafting your perfect trip...
            </p>
        </div>
    );
};

export default ItineraryLoader;
