import { useEffect, useState } from "react";
// import { useAppSelector } from "../redux/hooks";
import ItineraryLoader from "../components/ItineraryLoader";
import { Calendar, MapPin, Star, Users } from "lucide-react";
import dummyDetails from "../constants/dummyDetails";
import details from "../assets/details.jpg";

const Itinerary = () => {
    // const trip = useAppSelector((state) => state.trip);
    // const user = useAppSelector((state) => state.user);
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

    // API call logic (kept commented for future use)
    // const onGenerateTrip = async () => {
    //   setLoading(true);
    //   try {
    //     const res = await fetch("http://localhost:3000/api/askgemini", {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(trip),
    //     });
    //     if (res.ok) {
    //       const data = await res.json();
    //       console.log("Success in generating trip", data);
    //       setItinerary(data.response);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    if (loading) {
        return <ItineraryLoader />;
    }

    return (
        <div className="min-h-screen">
            {/* Hero section */}
            <div className="relative h-72 overflow-hidden">
                <img
                    src={details}
                    alt="Itinerary Details"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

                {/* Title & intro */}
                <div className="absolute bottom-8 left-8 right-8 text-white">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-5 h-5" />
                            <span className="text-sm">
                                {itinerary?.tripSummary?.location}
                            </span>
                        </div>
                        <h1 className="text-4xl font-bold mb-2">
                            {itinerary?.tripSummary?.title}
                        </h1>
                        <p className="text-md">
                            {itinerary?.tripSummary?.subtitle}
                        </p>
                    </div>
                </div>
            </div>

            {/* Key trip stats */}
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    <div className="rounded-lg bg-purple-50 border border-purple-200 p-4 text-center">
                        <Calendar className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="font-semibold text-gray-900">
                            {itinerary?.tripSummary?.durationDays} Days
                        </p>
                    </div>

                    <div className="rounded-lg bg-purple-50 border border-purple-200 p-4 text-center">
                        <Users className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Travelers</p>
                        <p className="font-semibold text-gray-900">
                            {itinerary?.tripSummary?.travelers}
                        </p>
                    </div>

                    <div className="rounded-lg bg-purple-50 border border-purple-200 p-4 text-center">
                        <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Trip Rating</p>
                        <p className="font-semibold text-gray-900">
                            {itinerary?.tripSummary?.tripRating}/5
                        </p>
                    </div>

                    <div className="rounded-lg bg-purple-50 border border-purple-200 p-4 text-center">
                        <div className="w-6 h-6 text-2xl mx-auto mb-2">💰</div>
                        <p className="text-sm text-gray-500">Total Budget</p>
                        <p className="font-semibold text-gray-900">
                            ₹ {itinerary?.tripSummary?.totalBudget}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Itinerary;
