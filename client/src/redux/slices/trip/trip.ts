import { createSlice } from "@reduxjs/toolkit";

//createSlice creates a section of your Redux state
export const tripSlice = createSlice({
    name: "trip",
    initialState: {
        destination: "",
        from: "",
        to: "",
        budget: "",
        people: "",
    },
    //functions (case reducers) that decide how to update that slice’s state when certain actions happen.
    reducers: {
        setTrip: (state, action) => {
            state.destination = action.payload.destination;
            state.from = action.payload.from;
            state.to = action.payload.to;
            state.budget = action.payload.budget;
            state.people = action.payload.people;
        },
    },
});

export const { setTrip } = tripSlice.actions;

export default tripSlice.reducer;
