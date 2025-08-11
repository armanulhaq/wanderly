import { configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist"; //Redux Persist automatically saves your Redux store data to localStorage and restores it when the app reloads, so users don't lose their data.
import storage from "redux-persist/lib/storage"; // This uses localStorage
import { userSlice } from "./slices/user/user";
import { tripSlice } from "./slices/trip/trip";

// Persist config for trip data
const tripPersistConfig = {
    key: "trip",
    storage, //store in localStorage
    whitelist: ["destination", "from", "to", "budget", "people"], //whitelist the trip data
};

// Persist config for user data
const userPersistConfig = {
    key: "user",
    storage,
    whitelist: ["name", "email", "isAuthenticated"], //whitelist the user data
};

const persistedTripReducer = persistReducer(
    tripPersistConfig,
    tripSlice.reducer
);
const persistedUserReducer = persistReducer(
    userPersistConfig,
    userSlice.reducer
);

export const store = configureStore({
    reducer: {
        user: persistedUserReducer,
        trip: persistedTripReducer,
    },
    //redux allows us to save only serialisable data (boolean, string, number, array, object) in store.ts
    //but redux persists has to store non serialisable (functions, promises, etc.) too in order to do its job so writing this will tell redux to chill
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
