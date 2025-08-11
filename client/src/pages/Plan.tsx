import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import { SelectBudgetOptions, SelectTravelList } from "../constants/options";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setTrip } from "@/redux/slices/trip/trip";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Plan = () => {
    type PlacePrediction = {
        description: string;
        place_id: string;
    };

    const navigate = useNavigate();

    // stores input
    const [query, setQuery] = useState("");

    // stores matched places from Google
    const [results, setResults] = useState<PlacePrediction[]>([]);

    // stores open state for dropdown
    const [open, setOpen] = useState(false);

    // stores debounce timer reference
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    const dispatch = useAppDispatch();

    const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
    const [selectedPerson, setSelectedPerson] = useState<string | null>(null);

    const today = new Date().toISOString().split("T")[0];
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const trip = useAppSelector((state) => state.trip);

    // Utility function to add days to a date string (YYYY-MM-DD)
    const addDays = (dateStr: string, days: number) => {
        const date = new Date(dateStr);
        date.setDate(date.getDate() + days);
        return date.toISOString().split("T")[0];
    };

    // When we come to Plan.tsx clear trip data as it was persisting from Itinerary.tsx
    useEffect(() => {
        dispatch(
            setTrip({
                destination: "",
                from: "",
                to: "",
                budget: "",
                people: "",
            })
        );
    }, [dispatch]);

    const fetchPlaces = async (input: string) => {
        if (!input.trim()) {
            setResults([]);
            return;
        }

        try {
            const res = await fetch(
                `http://localhost:3000/api/google/places?input=${encodeURIComponent(
                    input
                )}`
            );
            const data = await res.json();

            if (data.predictions) {
                // for performance I am storing only description and id
                const filteredResults: PlacePrediction[] = data.predictions.map(
                    (place: PlacePrediction) => ({
                        description: place.description,
                        place_id: place.place_id,
                    })
                );
                setResults(filteredResults);
            } else {
                setResults([]);
            }
        } catch (err) {
            console.error("Error fetching places:", err);
        }
    };

    const handleChange = (value: string) => {
        setQuery(value);
        setOpen(true);
        // when user types, if timer is already running, clear it
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        // when user types, if timer is not running, start it and run fetchPlaces after 300ms
        debounceTimer.current = setTimeout(() => fetchPlaces(value), 300);
    };

    const handleSelect = (place: string) => {
        setQuery(place); // set input field
        setOpen(false); // close dropdown
        dispatch(
            setTrip({
                ...trip, // keep existing trip data
                destination: place, // set destination
            })
        );
    };
    console.log(trip);
    const onGenerateTrip = async () => {
        if (
            !trip.destination ||
            !trip.from ||
            !trip.to ||
            !trip.budget ||
            !trip.people
        ) {
            toast("Please fill all the fields", {
                icon: "❌",
                style: {
                    borderRadius: "10px",
                    background: "#3c096c",
                    color: "#fff",
                },
            });
            return;
        }
        navigate("/itinerary");
    };

    return (
        <div className="bg-subtle-purple-light min-h-screen text-gray-900 flex flex-col">
            <Navbar />
            <main className="max-w-4xl mx-auto px-8 md:px-12 pt-24 flex-grow">
                <div className="flex flex-col mb-4">
                    <h2 className="font-bold text-3xl text-purple-600">
                        Tell us your travel preferences
                    </h2>
                    <p className="mt-3 text-gray-700 text-md max-w-xl">
                        Just provide some basic information, and our trip
                        planner will generate a customized itinerary based on
                        your preferences.
                    </p>
                </div>

                <form
                    className="flex flex-col gap-6"
                    onSubmit={(e) => {
                        e.preventDefault();
                        onGenerateTrip();
                    }}
                >
                    {/* Destination selection */}
                    <div>
                        <div className="flex flex-col gap-2 relative">
                            <h2 className="text-lg my-1 font-bold">
                                Where do you want to go?
                            </h2>
                            <Command className="border border-purple-500/60 bg-white rounded-lg w-full text-gray-900">
                                <input
                                    id="destination"
                                    placeholder="Enter your destination"
                                    className="px-4 py-2 w-full bg-transparent outline-none text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-purple-400 rounded-lg"
                                    value={query}
                                    onChange={(e) =>
                                        handleChange(e.target.value)
                                    }
                                    onFocus={() => setOpen(true)}
                                    autoComplete="off"
                                />

                                {open && (
                                    <CommandList className="absolute top-full left-0 w-full bg-white border border-purple-500/30 rounded-b-lg z-50 shadow-lg text-gray-900 max-h-64 overflow-auto">
                                        {results.length > 0 ? (
                                            <CommandGroup>
                                                {results.map((place) => (
                                                    <CommandItem
                                                        key={place.place_id}
                                                        onSelect={() =>
                                                            handleSelect(
                                                                place.description
                                                            )
                                                        }
                                                        className="px-3 py-2 hover:bg-purple-600/30 cursor-pointer rounded-md transition-colors"
                                                    >
                                                        {place.description}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        ) : (
                                            <CommandEmpty className="text-gray-500 px-3 py-2">
                                                No results found.
                                            </CommandEmpty>
                                        )}
                                    </CommandList>
                                )}
                            </Command>
                        </div>
                    </div>

                    {/* Travel dates */}
                    <div className="flex flex-col gap-1">
                        <h2 className="text-lg mt-2 font-bold">
                            When are you planning to travel?
                        </h2>
                        <div className="flex gap-6 flex-wrap">
                            <div className="flex flex-col w-full sm:w-1/2">
                                <label className="mb-1 text-sm font-medium">
                                    From
                                </label>
                                <input
                                    type="date"
                                    value={fromDate}
                                    min={addDays(today, 1)} // disallow past dates
                                    onChange={(e) => {
                                        const newFrom = e.target.value;
                                        setFromDate(newFrom);

                                        // reset only if invalid
                                        if (toDate && newFrom > toDate) {
                                            setToDate("");
                                        }

                                        dispatch(
                                            setTrip({
                                                ...trip,
                                                from: newFrom,
                                                to: toDate, // keep existing toDate if valid
                                            })
                                        );
                                    }}
                                    className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-700 outline-none"
                                />
                            </div>

                            <div className="flex flex-col w-full sm:w-1/2">
                                <label className="mb-1 text-sm font-medium">
                                    To
                                </label>
                                <input
                                    type="date"
                                    value={toDate}
                                    min={
                                        fromDate
                                            ? addDays(fromDate, 1)
                                            : addDays(today, 1)
                                    } // cannot be before fromDate
                                    max={
                                        fromDate
                                            ? addDays(fromDate, 3)
                                            : addDays(today, 3)
                                    } // max 4 days after fromDate or today
                                    onChange={(e) => {
                                        const newTo = e.target.value;
                                        setToDate(newTo);

                                        dispatch(
                                            setTrip({
                                                ...trip,
                                                from: fromDate, // keep fromDate
                                                to: newTo,
                                            })
                                        );
                                    }}
                                    className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-700 outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg my-2 font-bold">
                            What is your Budget?
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-2">
                            {SelectBudgetOptions.map((item, index) => {
                                // Initially, selectedBudget is null, so isSelected is null
                                // When a user clicks a card, selectedBudget updates, triggering a re-render.
                                // On re-render, this comparison sets isSelected to true for the clicked card,
                                // allowing us to apply highlighted styles dynamically.
                                const isSelected =
                                    selectedBudget === item.title;
                                return (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            setSelectedBudget(item.title);
                                            dispatch(
                                                setTrip({
                                                    ...trip,
                                                    budget: item.title,
                                                })
                                            );
                                        }}
                                        className={`p-4 border cursor-pointer rounded-lg transition-all duration-200 shadow-sm hover:shadow-md
                      ${
                          isSelected
                              ? "bg-purple-100 border-purple-300 hover:bg-purple-200 hover:border-purple-400"
                              : ""
                      }`}
                                    >
                                        <h2 className="text-2xl">
                                            {item.icon}
                                        </h2>
                                        <h2 className="font-bold text-lg text-gray-900">
                                            {item.title}
                                        </h2>
                                        <h2 className="text-sm text-gray-600">
                                            {item.desc}
                                        </h2>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg my-2 font-bold">
                            Who do you plan on traveling with on your next
                            adventure?
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-2">
                            {SelectTravelList.map((item, index) => {
                                const isSelected =
                                    selectedPerson === item.title;
                                return (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            setSelectedPerson(item.title);
                                            dispatch(
                                                setTrip({
                                                    ...trip,
                                                    people: item.people,
                                                })
                                            );
                                        }}
                                        className={`p-4 border cursor-pointer rounded-lg transition-all duration-200 shadow-sm hover:shadow-md
                      ${
                          isSelected
                              ? "bg-purple-100 border-purple-300 hover:bg-purple-200 hover:border-purple-400"
                              : ""
                      }`}
                                    >
                                        <h2 className="text-2xl">
                                            {item.icon}
                                        </h2>
                                        <h2 className="font-bold text-lg text-gray-900">
                                            {item.title}
                                        </h2>
                                        <h2 className="text-sm text-gray-600">
                                            {item.desc}
                                        </h2>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="my-10 justify-end flex">
                        <button
                            className="bg-purple-700/80 text-white px-6 py-2 rounded-sm cursor-pointer hover:bg-purple-800 transition-colors"
                            onClick={(e) => {
                                e.preventDefault();
                                onGenerateTrip();
                            }}
                        >
                            Generate Trip
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default Plan;
