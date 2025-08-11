import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import ItineraryLoader from "../components/ItineraryLoader";

const Itinerary = () => {
    const trip = useAppSelector((state) => state.trip);
    const user = useAppSelector((state) => state.user);
    const [loading, setLoading] = useState(false);

    const onGenerateTrip = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:3000/api/askgemini", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(trip),
            });
            if (res.ok) {
                const data = await res.json();
                console.log("Success in generating trip", data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        onGenerateTrip();
    }, []);

    if (loading) {
        return <ItineraryLoader />;
    }
    return (
        <div className="min-h-screen bg-subtle-purple text-gray-100">
            Itinerary
        </div>
    );
};

export default Itinerary;
