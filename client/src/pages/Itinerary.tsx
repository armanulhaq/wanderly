import { useEffect, useState } from "react";
import ItineraryLoader from "../components/ItineraryLoader";
import Navbar from "../components/Navbar";
import { useAppSelector } from "../redux/hooks";
import { useDispatch } from "react-redux";
import { setItinerary } from "../redux/slices/itinerary/itinerary";
import details from "../assets/details.jpg";
import {
    MapPin,
    Clock,
    Map,
    Calendar,
    Star,
    Sun,
    Utensils,
    Bed,
    Lightbulb,
} from "lucide-react";

const Itinerary = () => {
    const trip = useAppSelector((state) => state.trip);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const itinerary = useAppSelector((state) => state.itinerary.itinerary);

    useEffect(() => {
        async function generateItinerary() {
            try {
                setLoading(true);
                const res = await fetch("http://localhost:3000/api/askgemini", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(trip),
                });
                if (!res.ok) throw new Error("Failed to generate trip");
                const data = await res.json();
                const parsedItinerary = JSON.parse(data.response);
                dispatch(setItinerary(parsedItinerary));
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        generateItinerary();
    }, [trip, dispatch]);

    if (loading) {
        return <ItineraryLoader />;
    }
    console.log(itinerary);

    return (
        <div className="mx-5 ">
            <Navbar />
            <div className="min-h-screen max-w-6xl mx-auto">
                {/* HERO SECTION */}
                <div className="relative h-72 overflow-hidden rounded-xl mt-18 shadow-lg">
                    <img
                        src={details}
                        alt="Itinerary Details"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

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
                <div className="flex md:flex-col items-center">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8 w-full">
                        <div className="bg-white p-2 rounded-lg border border-gray-200 transition-all hover:-translate-y-1 animate-fade-in">
                            <div className="p-2 text-center">
                                <Calendar className="w-8 h-8  text-purple-600 mx-auto mb-2" />
                                <p className="text-sm">Duration</p>
                                <p className="font-semibold">
                                    {itinerary?.tripSummary?.duration} days
                                </p>
                            </div>
                        </div>

                        <div className="bg-white p-2 rounded-lg border border-gray-200 transition-all hover:-translate-y-1 animate-fade-in">
                            <div className="p-2 text-center">
                                <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                                <p className="text-sm">Trip Rating</p>
                                <p className="font-semibold">
                                    {itinerary?.tripSummary?.aiTripRating}/5
                                </p>
                            </div>
                        </div>

                        <div className="bg-white p-2 rounded-lg border border-gray-200 transition-all hover:-translate-y-1 animate-fade-in">
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

                    <div className="bg-white p-2 w-[30%] rounded-lg border border-gray-200 transition-all hover:-translate-y-1 animate-fade-in">
                        <div className="p-2 text-center">
                            <Sun className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                            <p className="text-sm font-bold">
                                Weather Forecast
                            </p>
                            <p className="text-xs">
                                {itinerary?.tripSummary?.overallWeather}
                            </p>
                        </div>
                    </div>
                </div>

                {/* MAIN CONTENT */}
                <div className="flex max-w-6xl mx-auto gap-6 flex-col md:flex-row pb-12 my-10">
                    {/* DAILY ITINERARY */}
                    <div className="px-6 py-4 flex-[3]">
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
                                        className="bg-white p-5 rounded-lg border mb-5 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-center gap-1 mb-2 bg-purple-50 w-fit p-2 rounded-full">
                                            <Clock className="w-4 h-4 text-purple-500" />
                                            <span className="text-xs text-gray-700">
                                                {activity.time}
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-lg text-gray-900 hover:text-purple-800 transition-all">
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
                    <div className="rounded-lg flex-2 h-fit space-y-8 ">
                        <div className="p-8 rounded-lg bg-white border border-gray-100">
                            <h3 className="font-semibold flex items-center gap-2 text-lg text-gray-900 mb-3">
                                <span>
                                    <Bed className="w-6 h-6 text-purple-600" />
                                </span>
                                Recommended Accommodations
                            </h3>
                            <ul className="space-y-3">
                                {itinerary?.recommendedAccommodations?.map(
                                    (hotel, idx) => (
                                        <li
                                            key={idx}
                                            className="bg-gray-50 space-y-2 p-5 rounded-lg border border-gray-200"
                                        >
                                            <img
                                                src="https://plus.unsplash.com/premium_photo-1687960116497-0dc41e1808a2?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                                alt={hotel.name}
                                                className="w-full h-48 object-cover mb-2 rounded"
                                            />
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <p className="font-medium text-gray-900">
                                                            {hotel.name}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <div>
                                                        <MapPin className="w-4 h-4 text-purple-600" />
                                                    </div>
                                                    <p className="text-xs text-purple-600">
                                                        {hotel.location}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-1 justify-between">
                                                <p className="text-xs bg-yellow-200 rounded-full px-2 py-1">
                                                    ⭐ {hotel.rating}
                                                </p>
                                                <p className="text-xs bg-green-100 text-green-600 rounded-full px-2 py-1">
                                                    Approx. ₹
                                                    {hotel.priceRangePerNight}
                                                    /night
                                                </p>
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                {hotel.description}
                                            </p>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>

                        {/* Dining Options */}
                        <div className="p-8 rounded-lg border border-gray-100">
                            <h3 className="font-semibold flex items-center gap-2 text-lg text-gray-900 mb-3">
                                <span>
                                    <Utensils className="w-6 h-6 text-purple-600" />
                                </span>
                                Dining Options
                            </h3>
                            <ul className="space-y-3">
                                {itinerary?.diningOptions?.map(
                                    (dining, idx) => (
                                        <li
                                            key={idx}
                                            className="bg-gray-50 space-y-2 p-5 rounded-lg border border-gray-200"
                                        >
                                            <img
                                                src="https://images.unsplash.com/photo-1574966739987-65e38db0f7ce?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                                alt={dining.name}
                                                className="w-full h-48 object-cover mb-2 rounded"
                                            />
                                            <div>
                                                <div className="flex items-center justify-between">
                                                    <p className="font-medium text-gray-900">
                                                        {dining.name}
                                                    </p>
                                                    <p className="text-xs bg-green-100 text-green-600 rounded-full px-2 py-1">
                                                        ₹
                                                        {
                                                            dining.priceRangePerPerson
                                                        }{" "}
                                                        /person
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="w-4 h-4 text-purple-600" />
                                                    <p className="text-xs text-purple-600">
                                                        {dining.location}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-1 justify-between">
                                                <p className="text-xs bg-yellow-200 rounded-full px-2 py-1">
                                                    ⭐ {dining.rating}
                                                </p>
                                                <p className="text-xs bg-purple-100 text-purple-700 rounded-full px-2 py-1">
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
                        <div className="p-8 rounded-lg bg-amber-50 border border-gray-100">
                            <h3 className="flex items-center gap-2 font-bold text-xl text-gray-900 mb-3">
                                <span>
                                    <Lightbulb className="w-6 h-6 text-amber-600" />
                                </span>
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

export default Itinerary;
