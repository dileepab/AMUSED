import { configureStore } from '@reduxjs/toolkit';
import { RootState } from '../store';
import favoritesReducer, {addToFavorites} from '../../slices/favoritesSlice';

describe('Redux Store Configuration', () => {
    let testStore: ReturnType<typeof configureStore>;

    beforeEach(() => {
        // Create a new store for each test to isolate them
        testStore = configureStore({
            reducer: {
                favorites: favoritesReducer,
            },
        });
    });

    it('should have the correct initial state', () => {
        const initialState: RootState = {
            favorites: {
                favorites: [],
            },
        };

        expect(testStore.getState()).toEqual(initialState);
    });

    // Add more tests as needed

    it('should dispatch actions and update the state', () => {
        const action = addToFavorites({
            idDrink: '123',
            strDrink: 'Mocktail',
            strDrinkThumb: 'mocktail.jpg',
        });

        // Dispatch the action to the test store
        testStore.dispatch(action);

        const updatedState: RootState = {
            favorites: {
                favorites: [
                    {
                        idDrink: '123',
                        strDrink: 'Mocktail',
                        strDrinkThumb: 'mocktail.jpg',
                    },
                ],
            },
        };

        // Check if the state has been updated correctly
        expect(testStore.getState()).toEqual(updatedState);
    });

    // Add more tests as needed
});
