import { useEffect, useState } from "react";
//import { useAppSelector } from "../redux/hooks";
import ItineraryLoader from "../components/ItineraryLoader";
import { Calendar, MapPin, Star, Users } from "lucide-react";
import dummyDetails from "../constants/dummyDetails";
import details from "../assets/details.jpg";

const Itinerary = () => {
    //const trip = useAppSelector((state) => state.trip);
    //const user = useAppSelector((state) => state.user);
    const [itinerary, setItinerary] = useState(dummyDetails);
    const [loading, setLoading] = useState(false);

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

    // const onGenerateTrip = async () => {
    //     setLoading(true);
    //     try {
    //         const res = await fetch("http://localhost:3000/api/askgemini", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(trip),
    //         });
    //         if (res.ok) {
    //             const data = await res.json();
    //             console.log("Success in generating trip", data);
    //             setItinerary(data.response);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     onGenerateTrip();
    // }, []);

    console.log("Itinerary", itinerary);

    if (loading) {
        return <ItineraryLoader />;
    }
    return (
        <div className="min-h-screen bg-subtle-purple">
            <div className="relative h-72 overflow-hidden">
                <img
                    src={details}
                    alt="Itinerary Details"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

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
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-subtle-purple rounded-lg border-1 border-purple-900 p-4 text-center">
                        <Calendar className="w-6 h-6 text-white mx-auto mb-2" />
                        <p className="text-sm text-white">Duration</p>
                        <p className="font-semibold text-white">
                            {itinerary?.tripSummary?.durationDays} Days
                        </p>
                    </div>

                    <div className="bg-subtle-purple rounded-lg border-1 border-purple-900 p-4 text-center">
                        <Users className="w-6 h-6 text-white mx-auto mb-2" />
                        <p className="text-sm text-white">Travelers</p>
                        <p className="font-semibold text-white">
                            {itinerary?.tripSummary?.travelers}
                        </p>
                    </div>

                    <div className="bg-subtle-purple rounded-lg border-1 border-purple-900 p-4 text-center">
                        <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                        <p className="text-sm text-white">Trip Rating</p>
                        <p className="font-semibold text-white">
                            {itinerary?.tripSummary?.tripRating}/5
                        </p>
                    </div>

                    <div className="bg-subtle-purple rounded-lg border-1 border-purple-900 p-4 text-center">
                        <div className="w-6 h-6 text-2xl mx-auto mb-2">💰</div>
                        <p className="text-sm text-white">Total Budget</p>
                        <p className="font-semibold text-white">
                            ₹ {itinerary?.tripSummary?.totalBudget}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Itinerary;
