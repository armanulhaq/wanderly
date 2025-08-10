import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/user/user";
import { tripSlice } from "./slices/trip/trip";

//creates one global store for storing data
export const store = configureStore({
    reducer: {
        user: userSlice.reducer, //Registers a slice called user (so the store will have state.user).
        trip: tripSlice.reducer,
    },
});
//Creates a store and tells Redux: ‘for the user part of state, use the logic from userSlice.reducer.’

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
