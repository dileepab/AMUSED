import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cocktail } from '../types';
import {RootState} from "../store/store";

interface FavoritesState {
    favorites: Cocktail[];
}

const initialState: FavoritesState = {
    favorites: [],
};

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addToFavorites: (state, action: PayloadAction<Cocktail>) => {
            state.favorites.push(action.payload);
        },
        removeFromFavorites: (state, action: PayloadAction<Cocktail>) => {
            state.favorites = state.favorites.filter(item => item.idDrink !== action.payload.idDrink);
        },
    },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export const selectFavorites = (state: RootState) => state.favorites.favorites;

export default favoritesSlice.reducer;
