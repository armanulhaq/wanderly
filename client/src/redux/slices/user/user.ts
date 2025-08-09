import { createSlice } from "@reduxjs/toolkit";

//createSlice creates a section of your Redux state
export const userSlice = createSlice({
    name: "user",
    initialState: {
        name: "",
        email: "",
    },
    //functions (case reducers) that decide how to update that slice’s state when certain actions happen.
    reducers: {
        //setUser is a function when it is dispatched, Redux passes in:
        //state: the current user slice state.
        //action: an object with a payload property containing the data you sent when dispatching.
        setUser: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
