import { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import { SelectBudgetOptions, SelectTravelList } from "../constants/options";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

const Plan = () => {
    type PlacePrediction = {
        description: string;
        place_id: string;
    };

    const [query, setQuery] = useState(""); //stores input
    const [results, setResults] = useState<PlacePrediction[]>([]); //stores matched places from google
    const [open, setOpen] = useState(false); //stores open state
    const debounceTimer = useRef<NodeJS.Timeout | null>(null); //stores debounce timer

    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

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
                const filteredResults: PlacePrediction[] = data.predictions.map(
                    (place: PlacePrediction) => ({
                        description: place.description,
                        place_id: place.place_id,
                    })
                );

                setResults(filteredResults); //for performance I am storing only description and id
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
        //when user types, if timer is already running, clear it
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        //when user types, if timer is not running, start it and run fetchPlaces after 300ms
        debounceTimer.current = setTimeout(() => fetchPlaces(value), 300);
    };

    const handleSelect = (place: string) => {
        setQuery(place);
        setOpen(false);
    };
    return (
        <div className="bg-subtle-purple min-h-screen text-gray-100 flex">
            <Navbar />
            <main className="max-w-4xl mx-auto px-8 md:px-12 pt-24">
                <div className="flex flex-col">
                    <h2 className="font-bold text-3xl text-purple-300">
                        Tell us your travel preferences
                    </h2>
                    <p className="mt-3 text-gray-400 text-md">
                        Just provide some basic information, and our trip
                        planner will generate a customized itinerary based on
                        your preferences.
                    </p>
                </div>

                <form className="mt-4">
                    <div className="flex flex-col gap-3">
                        <div>
                            <div className="flex flex-col gap-2 relative">
                                <h2 className="text-lg my-2 font-bold">
                                    Where do you want to go?
                                </h2>
                                <Command className="border border-purple-500/60 bg-subtle-purple rounded-lg w-full text-white">
                                    <input
                                        id="destination"
                                        placeholder="Enter your destination"
                                        className="px-4 py-2 w-full bg-transparent outline-none text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-400 rounded-lg"
                                        value={query}
                                        onChange={(e) =>
                                            handleChange(e.target.value)
                                        }
                                        onFocus={() => setOpen(true)}
                                    />

                                    {open && (
                                        <CommandList className="absolute top-full left-0 w-full bg-subtle-purple border border-purple-500/30 rounded-b-lg z-50 shadow-lg">
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
                                                            className="px-3 py-2 text-gray-200 hover:bg-purple-600/30 hover:text-purple-300 rounded-md cursor-pointer transition-colors"
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
                        <div className="flex flex-col gap-1">
                            <h2 className="text-lg mt-2 font-bold">
                                When are you planning to travel?
                            </h2>
                            <div className="flex gap-24">
                                <div className="flex flex-col w-full">
                                    <label className="mb-1 font-semibold">
                                        From
                                    </label>
                                    <input
                                        type="date"
                                        value={fromDate}
                                        min={today} // disallow past dates
                                        onChange={(e) => {
                                            setFromDate(e.target.value);
                                            if (
                                                toDate &&
                                                e.target.value > toDate
                                            ) {
                                                setToDate(""); // reset "to" date if invalid
                                            }
                                        }}
                                        className="bg-purple-800/20 border border-purple-400/40 rounded-lg px-3 py-2 text-white outline-none"
                                    />
                                </div>

                                <div className="flex flex-col w-full">
                                    <label className="mb-1 font-semibold">
                                        To
                                    </label>
                                    <input
                                        type="date"
                                        value={toDate}
                                        min={fromDate || today} // cannot be before fromDate
                                        onChange={(e) =>
                                            setToDate(e.target.value)
                                        }
                                        className="bg-purple-800/20 border border-purple-400/40 rounded-lg px-3 py-2 text-white outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-lg my-2 font-bold">
                                What is your Budget?
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-2">
                                {SelectBudgetOptions.map((item, index) => (
                                    <div
                                        key={index}
                                        className="p-4 border cursor-pointer rounded-lg
                                               border-purple-400/40 bg-purple-800/20
                                               hover:bg-purple-700/30 hover:border-purple-300
                                               transition-all duration-200 shadow-sm hover:shadow-md"
                                    >
                                        <h2 className="text-2xl">
                                            {item.icon}
                                        </h2>
                                        <h2 className="font-bold text-lg text-gray-100">
                                            {item.title}
                                        </h2>
                                        <h2 className="text-sm text-gray-400">
                                            {item.desc}
                                        </h2>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h2 className="text-lg my-2 font-bold">
                                Who do you plan on traveling with on your next
                                adventure?
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-2">
                                {SelectTravelList.map((item, index) => (
                                    <div
                                        key={index}
                                        className="p-4 border cursor-pointer rounded-lg
                                               border-purple-400/40 bg-purple-800/20
                                               hover:bg-purple-700/30 hover:border-purple-300
                                               transition-all duration-200 shadow-sm hover:shadow-md"
                                    >
                                        <h2 className="text-2xl">
                                            {item.icon}
                                        </h2>
                                        <h2 className="font-bold text-lg text-gray-100">
                                            {item.title}
                                        </h2>
                                        <h2 className="text-sm text-gray-400">
                                            {item.desc}
                                        </h2>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="my-10 justify-end flex">
                        <button
                            className="bg-purple-700/60 text-white px-6 py-2 rounded-sm cursor-pointer"
                            // onClick={onGenerateTrip}
                            // disabled={loading}
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
