import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import Favorites from '../Favorites';
import favoritesReducer, {removeFromFavorites} from "../../slices/favoritesSlice";
import configureStore from 'redux-mock-store';

// Mock the Redux store
const mockStore = configureStore();

describe('Favorites Component', () => {
    it('renders favorites correctly', () => {
        const initialState = {
            favorites: {
                favorites: [
                    {
                        idDrink: '1',
                        strDrink: 'Mocktail 1',
                        strDrinkThumb: 'mocktail1.jpg',
                    },
                    {
                        idDrink: '2',
                        strDrink: 'Mocktail 2',
                        strDrinkThumb: 'mocktail2.jpg',
                    },
                ],
            },
        };

        const store = mockStore(initialState);

        const { getByText } = render(
            <Provider store={store}>
                <Favorites />
            </Provider>
        );

        expect(getByText('Mocktail 1')).toBeInTheDocument();
        expect(getByText('Mocktail 2')).toBeInTheDocument();
    });

    it('dispatches removeFromFavorites action when "Remove" button is clicked', () => {
        const initialState = {
            favorites: {
                favorites: [
                    {
                        idDrink: '1',
                        strDrink: 'Mocktail 1',
                        strDrinkThumb: 'mocktail1.jpg',
                    },
                ],
            },
        };

        const store = mockStore(initialState);

        const { getByText } = render(
            <Provider store={store}>
                <Favorites />
            </Provider>
        );

        const removeButton = getByText('Remove');
        fireEvent.click(removeButton);

        // Check if the removeFromFavorites action is dispatched with the correct payload
        const expectedAction = removeFromFavorites({
            idDrink: '1',
            strDrink: 'Mocktail 1',
            strDrinkThumb: 'mocktail1.jpg',
        });
        expect(store.getActions()).toEqual([expectedAction]);
    });
});
