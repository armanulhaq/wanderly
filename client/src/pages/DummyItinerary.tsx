import { useEffect, useState } from "react";
import ItineraryLoader from "../components/ItineraryLoader";
import { MapPin, Clock, Map } from "lucide-react";
import dummyDetails from "../constants/dummyDetails";
import details from "../assets/details.jpg";
import Navbar from "../components/Navbar";

const Itinerary = () => {
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
            <div className="relative max-w-6xl mx-auto h-72 overflow-hidden rounded-xl mt-18 shadow-lg">
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

            <div className="flex max-w-6xl mx-auto gap-6 flex-col md:flex-row pb-12 my-10">
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

                <div className="px-6 py-4 bg-white border border-gray-200 rounded-lg flex-1 shadow-sm h-fit space-y-8">
                    {/* <div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-4">
                            Trip Budget Breakdown
                        </h3>
                        <p className="text-gray-700 font-medium mb-1">
                            Total Budget ≈{" "}
                            <span className="text-purple-600 font-bold">
                                ₹ {itinerary?.budgetBreakdown?.totalBudget}
                            </span>
                        </p>
                        <ul className="space-y-2">
                            {itinerary?.budgetBreakdown?.categories &&
                                Object.entries(
                                    itinerary.budgetBreakdown.categories
                                ).map(([key, value]: any) => (
                                    <li
                                        key={key}
                                        className="flex justify-between items-center bg-purple-50 rounded-lg px-3 py-2 border border-purple-100"
                                    >
                                        <div>
                                            <p className="capitalize text-gray-800 font-medium">
                                                {key.replace(/_/g, " ")}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {value.percentage}%
                                            </p>
                                        </div>
                                        <span className="text-purple-700 font-semibold">
                                            ₹ {value.amount}
                                        </span>
                                    </li>
                                ))}
                        </ul>
                    </div> */}

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
                                            className="w-full h-48 object-cover mb-2"
                                        />
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium text-gray-900">
                                                {hotel.name}
                                            </p>
                                            <p className="text-xs bg-purple-200 rounded-xl px-2 py-1 text-gray-600">
                                                {hotel.type}
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
                            {itinerary?.diningOptions?.map((dining, idx) => (
                                <li
                                    key={idx}
                                    className="bg-gray-50 space-y-1 p-3 rounded-lg border border-gray-200"
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1574966739987-65e38db0f7ce?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        alt={dining.name}
                                        className="w-full h-48 object-cover mb-2"
                                    />
                                    <p className="font-medium text-gray-900">
                                        {dining.name}
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        {dining.location}
                                    </p>
                                    <div className="flex items-center justify-between gap-2">
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
                            ))}
                        </ul>
                    </div>

                    {/* Travel Tips */}
                    {/* <div>
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
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Itinerary;
