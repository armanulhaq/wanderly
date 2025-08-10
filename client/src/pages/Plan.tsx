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

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<PlacePrediction[]>([]);
    const [open, setOpen] = useState(false);
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

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
                setResults(data.predictions.slice(0, 4));
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

        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => fetchPlaces(value), 300);
    };

    const handleSelect = (place: string) => {
        setQuery(place);
        setOpen(false);
    };
    console.log(query);
    return (
        <div className="bg-subtle-purple min-h-screen text-gray-100 flex">
            <Navbar />
            <main className="max-w-3xl mx-auto px-8 md:px-12 py-24">
                <div className="flex flex-col">
                    <h2 className="font-bold text-3xl text-purple-300">
                        Tell us your travel preferences
                    </h2>
                    <p className="mt-3 text-gray-400 text-lg">
                        Just provide some basic information, and our trip
                        planner will generate a customized itinerary based on
                        your preferences.
                    </p>
                </div>

                <form className="mt-8">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-xl my-3 font-bold">
                                Where do you want to go?
                            </h2>

                            <Command className="border border-purple-500/60 bg-subtle-purple rounded-lg w-full text-white shadow-lg">
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
                                    <CommandList className="bg-subtle-purple border-t border-purple-500/30 rounded-b-lg">
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
                        <div>
                            <h2 className="text-xl my-3 font-bold">
                                What is your Budget?
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
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
                            <h2 className="text-xl my-3 font-bold">
                                Who do you plan on traveling with on your next
                                adventure?
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
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
