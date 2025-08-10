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
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setTrip } from "@/redux/slices/trip/trip";

const Plan = () => {
    type PlacePrediction = {
        description: string;
        place_id: string;
    };

    const [query, setQuery] = useState(""); // stores input
    const [results, setResults] = useState<PlacePrediction[]>([]); // stores matched places from google
    const [open, setOpen] = useState(false); // stores open state
    const debounceTimer = useRef<NodeJS.Timeout | null>(null); // stores debounce timer
    const dispatch = useAppDispatch();

    const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
    const [selectedPerson, setSelectedPerson] = useState<string | null>(null);

    const today = new Date().toISOString().split("T")[0]; // 2025-08-10T14:23:45.123Z => 2025-08-10
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const trip = useAppSelector((state) => state.trip);

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

                setResults(filteredResults); // for performance I am storing only description and id
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

    const onGenerateTrip = async () => {
        const res = await fetch("http://localhost:3000/api/askgemini", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(trip),
        });
        if (res.ok) {
            const data = await res.json();
            console.log("Success hueuhueueheuheu", data);
        }
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

                <form className="mt-4" onSubmit={onGenerateTrip}>
                    <div className="flex flex-col gap-3">
                        {/* Destination selection */}
                        <div>
                            <div className="flex flex-col gap-2 relative">
                                <h2 className="text-lg my-1 font-bold">
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

                        {/* Travel dates */}
                        <div className="flex flex-col gap-1">
                            <h2 className="text-lg mt-2 font-bold">
                                When are you planning to travel?
                            </h2>
                            <div className="flex gap-24">
                                <div className="flex flex-col w-full">
                                    <label className="mb-1 text-sm font-md">
                                        From
                                    </label>
                                    <input
                                        type="date"
                                        value={fromDate}
                                        min={today} // disallow past dates
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
                                        className="bg-purple-800/20 border border-purple-400/40 rounded-lg px-3 py-2 text-white outline-none"
                                    />
                                </div>

                                <div className="flex flex-col w-full">
                                    <label className="mb-1 text-sm font-md">
                                        To
                                    </label>
                                    <input
                                        type="date"
                                        value={toDate}
                                        min={fromDate || today} // cannot be before fromDate
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
                                        className="bg-purple-800/20 border border-purple-400/40 rounded-lg px-3 py-2 text-white outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Budget selection */}
                        <div>
                            <h2 className="text-lg my-2 font-bold">
                                What is your Budget?
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-2">
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
                                                        ? "bg-gradient-to-r from-purple-700/60 to-purple-600/60 border-purple-300"
                                                        : "bg-purple-800/20 border-purple-400/40 hover:bg-purple-700/30 hover:border-purple-300"
                                                } transition-all duration-200 ease-out`}
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
                                    );
                                })}
                            </div>
                        </div>

                        {/* Travel companions */}
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
                                                        people: item.count,
                                                    })
                                                );
                                            }}
                                            className={`p-4 border cursor-pointer rounded-lg transition-all duration-200 shadow-sm hover:shadow-md
                                                ${
                                                    isSelected
                                                        ? "bg-gradient-to-r from-purple-700/60 to-purple-600/60 border-purple-300"
                                                        : "bg-purple-800/20 border-purple-400/40 hover:bg-purple-700/30 hover:border-purple-300"
                                                } transition-all duration-200 ease-out`}
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
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Submit button */}
                    <div className="my-10 justify-end flex">
                        <button
                            className="bg-purple-700/60 text-white px-6 py-2 rounded-sm cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault(); // Prevent form submission if inside a form
                                onGenerateTrip();
                            }}
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
