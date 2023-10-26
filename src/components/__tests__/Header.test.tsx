import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import Header from '../Header';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // Use actual implementation for other functions
}));

describe('Header Component', () => {
    test('renders Header component', () => {
        render(
            <Router>
                <Header />
            </Router>
        );

        // Assert that the brand/logo is rendered
        expect(screen.getByText('Cocktails')).toBeInTheDocument();
    });

    test('navigates to Search page on search button click', async () => {
        const navigateMock = jest.fn();
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigateMock);

        render(
            <Router>
                <Header />
            </Router>
        );

        // Simulate typing into the search input
        fireEvent.change(screen.getByPlaceholderText('Search Cocktail'), { target: { value: 'Margarita' } });

        // Simulate pressing 'Enter' in the search input
        fireEvent.keyPress(screen.getByPlaceholderText('Search Cocktail'), { key: 'Enter', code: 13, charCode: 13 });

        // Assert that the 'useNavigate' function was called with the expected URL
        expect(navigateMock).toHaveBeenCalledWith('/search', { state: { name: 'Margarita' } });
    });
});
