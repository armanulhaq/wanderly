// types/itinerary.ts
export interface TripSummary {
    title: string;
    subtitle: string;
    location: string;
    aiTripRating: number;
    estimatedCost: number;
    overallWeather: string;
    duration: number;
}

export interface Activity {
    time: string;
    location: string;
    title: string;
    description: string;
}

export interface DailyItinerary {
    day: number;
    date: string;
    activities: Activity[];
}

export interface TravelTip {
    title: string;
    description: string;
}

export interface Accommodation {
    name: string;
    location: string;
    rating: number;
    type: string;
    priceRangePerNight: number;
    description: string;
}

export interface DiningOption {
    name: string;
    location: string;
    rating: number;
    cuisine: string;
    priceRangePerPerson: number;
    description: string;
}

export interface Itinerary {
    tripSummary: TripSummary;
    dailyItinerary: DailyItinerary[];
    travelTips: TravelTip[];
    recommendedAccommodations: Accommodation[];
    diningOptions: DiningOption[];
}
