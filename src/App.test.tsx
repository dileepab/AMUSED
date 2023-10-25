import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

describe('App Component', () => {
  test('renders App component', () => {
    render(
        <Router>
          <App />
        </Router>
    );

    // Assert that the App component renders without crashing
    expect(screen.getByText('Cocktails')).toBeInTheDocument();
  });

  test('navigates to Search page on search button click', async () => {
    render(
        <Router>
          <App />
        </Router>
    );

    // Click the search button
    userEvent.click(screen.getByText('Search'));

    // Assert that the navigation to the Search page happened
    expect(screen.getByText('Search page content')).toBeInTheDocument();
  });

  // Add more tests for other functionalities as needed
});
