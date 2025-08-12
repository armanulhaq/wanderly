import { useEffect, useState } from "react";
import ItineraryLoader from "../components/ItineraryLoader";
import { MapPin, Clock, Map, Calendar, Star, Sun, User } from "lucide-react";
import dummyDetails from "../constants/dummyDetails";
import details from "../assets/details.jpg";
import Navbar from "../components/Navbar";

const DummyItinerary = () => {
    const [itinerary, setItinerary] = useState(dummyDetails);
    const [loading, setLoading] = useState(false);

    // Dummy loading simulation
    const dummyGenerateTrip = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setItinerary(dummyDetails);
        }, 2000);
    };

    useEffect(() => {
        dummyGenerateTrip();
    }, []);

    if (loading) {
        return <ItineraryLoader />;
    }

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="min-h-screen max-w-6xl mx-auto">
                {/* HERO SECTION */}
                <div className="relative h-72 overflow-hidden rounded-xl mt-18 shadow-lg">
                    <img
                        src={details}
                        alt="Itinerary Details"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

                    <div className="absolute bottom-8 left-8 right-8 text-white">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center gap-2 mb-2 text-purple-200">
                                <MapPin className="w-5 h-5" />
                                <span className="text-sm">
                                    {itinerary?.tripSummary?.location}
                                </span>
                            </div>
                            <h1 className="text-4xl font-bold mb-2 drop-shadow-lg">
                                {itinerary?.tripSummary?.title}
                            </h1>
                            <p className="text-md text-gray-200 drop-shadow">
                                {itinerary?.tripSummary?.subtitle}
                            </p>
                        </div>
                    </div>
                </div>

                {/* TRIP SUMMARY CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8">
                    <div className="bg-purple-50 p-2 rounded-lg border border-purple-800">
                        <div className="p-2 text-center">
                            <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                            <p className="text-sm">Duration</p>
                            <p className="font-semibold">
                                {itinerary?.tripSummary?.duration} days
                            </p>
                        </div>
                    </div>

                    <div className="bg-purple-50 p-2 rounded-lg border border-purple-800">
                        <div className="p-2 text-center">
                            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                            <p className="text-sm">Trip Rating</p>
                            <p className="font-semibold">
                                {itinerary?.tripSummary?.aiTripRating}/5
                            </p>
                        </div>
                    </div>

                    <div className="bg-purple-50 p-2 rounded-lg border border-purple-800">
                        <div className="p-2 text-center">
                            <div className="w-8 h-8 text-2xl mx-auto mb-2">
                                💰
                            </div>
                            <p className="text-sm">Estimated Cost</p>
                            <p className="font-semibold">
                                ₹ {itinerary?.tripSummary?.estimatedCost}
                            </p>
                        </div>
                    </div>
                </div>

                {/* WEATHER CARD */}
                <div className="bg-purple-50 p-2 rounded-lg border border-purple-800">
                    <div className="p-2 text-center">
                        <Sun className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                        <p className="text-sm font-bold">Weather Forecast</p>
                        <p className="text-xs">
                            {itinerary?.tripSummary?.overallWeather}
                        </p>
                    </div>
                </div>

                {/* MAIN CONTENT */}
                <div className="flex max-w-6xl mx-auto gap-6 flex-col md:flex-row pb-12 my-10">
                    {/* DAILY ITINERARY */}
                    <div className="px-6 py-4 flex-[2]">
                        {itinerary?.dailyItinerary?.map((day, dayIndex) => (
                            <div
                                key={dayIndex}
                                className="mb-10 relative pl-8 border-l-2 border-purple-300"
                            >
                                <div className="absolute -left-4 top-2 w-8 h-8 bg-purple-800 text-white rounded-full flex items-center justify-center font-bold shadow-md">
                                    {dayIndex + 1}
                                </div>

                                <h2 className="font-bold text-xl text-purple-700">
                                    Day {dayIndex + 1}
                                </h2>
                                <p className="text-gray-500 text-sm mb-4">
                                    {day.date}
                                </p>

                                {day.activities.map((activity, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-purple-50 p-5 rounded-lg border mb-5 border-purple-700/60 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-center gap-1 mb-2">
                                            <Clock className="w-4 h-4 text-purple-500" />
                                            <span className="text-sm text-gray-700">
                                                {activity.time}
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-lg text-gray-900">
                                            {activity.title}
                                        </h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                                            <Map className="w-4 h-4 text-gray-400" />
                                            {activity.location}
                                        </div>
                                        <p className="text-gray-800/70 text-sm leading-relaxed">
                                            {activity.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* SIDEBAR */}
                    <div className="px-6 py-4 bg-white rounded-lg flex-1 border border-gray-100 h-fit space-y-8">
                        {/* Recommended Accommodations */}
                        <div>
                            <h3 className="font-semibold text-lg text-gray-900 mb-3">
                                Recommended Accommodations
                            </h3>
                            <ul className="space-y-3">
                                {itinerary?.recommendedAccommodations?.map(
                                    (hotel, idx) => (
                                        <li
                                            key={idx}
                                            className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                                        >
                                            <img
                                                src="https://plus.unsplash.com/premium_photo-1687960116497-0dc41e1808a2?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                                alt={hotel.name}
                                                className="w-full h-48 object-cover mb-2 rounded"
                                            />
                                            <div className="flex items-center justify-between gap-2">
                                                <p className="font-medium text-gray-900">
                                                    {hotel.name}
                                                </p>
                                                <p className="text-xs rounded-xl px-2 py-1 text-gray-600">
                                                    ₹{hotel.priceRangePerNight}
                                                </p>
                                            </div>

                                            <p className="text-xs text-gray-600">
                                                {hotel.location}
                                            </p>

                                            <p className="text-xs text-yellow-500">
                                                ⭐ {hotel.rating}
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                {hotel.description}
                                            </p>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>

                        {/* Dining Options */}
                        <div>
                            <h3 className="font-semibold text-lg text-gray-900 mb-3">
                                Dining Options
                            </h3>
                            <ul className="space-y-3">
                                {itinerary?.diningOptions?.map(
                                    (dining, idx) => (
                                        <li
                                            key={idx}
                                            className="bg-gray-50 space-y-1 p-3 rounded-lg border border-gray-200"
                                        >
                                            <img
                                                src="https://images.unsplash.com/photo-1574966739987-65e38db0f7ce?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                                alt={dining.name}
                                                className="w-full h-48 object-cover mb-2 rounded"
                                            />
                                            <div className="flex items-center justify-between">
                                                <p className="font-medium text-gray-900">
                                                    {dining.name}
                                                </p>
                                                <div className="flex items-center gap-1">
                                                    <User className="w-4 h-4 text-gray-400" />
                                                    <p className="text-xs text-gray-600">
                                                        ₹
                                                        {
                                                            dining.priceRangePerPerson
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-600">
                                                {dining.location}
                                            </p>
                                            <div className="flex items-center justify-between gap-1">
                                                <p className="text-xs text-yellow-500">
                                                    ⭐ {dining.rating}
                                                </p>
                                                <p className="text-xs underline text-gray-500">
                                                    Speciality: {dining.cuisine}
                                                </p>
                                            </div>

                                            <p className="text-xs text-gray-500">
                                                {dining.description}
                                            </p>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>

                        {/* Travel Tips */}
                        <div>
                            <h3 className="font-semibold text-lg text-gray-900 mb-3">
                                Travel Tips
                            </h3>
                            <ul className="list-none space-y-3 text-sm text-gray-700">
                                {itinerary?.travelTips?.map((tip, idx) => (
                                    <li key={idx} className="space-y-1">
                                        <div className="font-bold text-md">
                                            {tip.title}:
                                        </div>
                                        <div className="text-sm text-gray-600/70">
                                            {tip.description}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DummyItinerary;
