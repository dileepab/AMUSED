import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from './components/Header';

/**
 * The main App component that sets up the application's structure and routing.
 * It includes a Redux store provider, a router for navigation, and route configurations for different pages.
 */
const App: React.FC = () => {
    return (
        // Redux store provider wrapping the entire application
        <Provider store={store}>
            {/* React Router for navigation */}
            <Router>
                {/* Main container with a flex column layout */}
                <div className={'min-vh-100 d-flex flex-column'}>
                    {/* Header component for navigation and search */}
                    <Header />
                    {/* Routes configuration for different pages */}
                    <Routes>
                        {/* Route for the search page */}
                        <Route path="/search" element={<Search />} />
                        {/* Route for the favorites page */}
                        <Route path="/favorites" element={<Favorites />} />
                        {/* Default route for the home page */}
                        <Route path="/" element={<Home />} />
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
};

export default App;
