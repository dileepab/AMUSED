import { configureStore } from '@reduxjs/toolkit';
import { favoritesSlice, addToFavorites, removeFromFavorites, selectFavorites } from '../favoritesSlice';

describe('favoritesSlice', () => {
    let store={};

    beforeEach(() => {
        store = configureStore({
            reducer: {
                favorites: favoritesSlice.reducer,
            },
        });
    });

    it('should handle addToFavorites', () => {
        const cocktailToAdd = {
            idDrink: '123',
            strDrink: 'Mocktail',
            strDrinkThumb: 'mocktail.jpg',
        };

        store.dispatch(addToFavorites(cocktailToAdd));

        const favorites = selectFavorites(store.getState());
        expect(favorites).toHaveLength(1);
        expect(favorites[0]).toEqual(cocktailToAdd);
    });

    it('should handle removeFromFavorites', () => {
        const initialState = {
            favorites: [
                {
                    idDrink: '123',
                    strDrink: 'Mocktail',
                    strDrinkThumb: 'mocktail.jpg',
                },
            ],
        };

        store = configureStore({
            reducer: {
                favorites: favoritesSlice.reducer,
            }
        });

        const cocktailToRemove = initialState.favorites[0];

        store.dispatch(addToFavorites(cocktailToRemove));
        store.dispatch(removeFromFavorites(cocktailToRemove));

        const favorites = selectFavorites(store.getState());
        expect(favorites).toHaveLength(0);
    });
});

// You can add more tests as needed
