import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from '../slices/favoritesSlice';

// Create the Redux store with the favoritesReducer
export const store = configureStore({
    reducer: {
        favorites: favoritesReducer,
    },
});

// Define types for the RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
