import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        name: "",
        email: "",
    },
    reducers: {
        //a rule that says “when someone dispatches setUser, update name & email”.
        setUser: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
