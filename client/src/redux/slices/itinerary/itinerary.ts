import { createSlice } from "@reduxjs/toolkit";
import type { Itinerary } from "../../../../types/itinerary";

interface ItineraryState {
    itinerary: Itinerary | null;
}

const initialState: ItineraryState = {
    itinerary: null,
};

export const itinerarySlice = createSlice({
    name: "itinerary",
    initialState,
    reducers: {
        setItinerary: (state, action) => {
            state.itinerary = action.payload;
        },
    },
});

export const { setItinerary } = itinerarySlice.actions;
export default itinerarySlice.reducer;
