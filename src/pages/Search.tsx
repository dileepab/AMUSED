import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {searchCocktails} from '../services/cocktailApi';
import {Cocktail} from '../types';
import {addToFavorites, removeFromFavorites, selectFavorites} from '../slices/favoritesSlice';
import {Button, Card, Col, Container, Row} from 'react-bootstrap';
import {MdOutlineFavorite, MdOutlineFavoriteBorder} from 'react-icons/md';
import ContentLoaderCmp from '../components/ContentLoaderCmp';

interface SearchProps {
}

const Search: React.FC<SearchProps> = () => {
    // React Router hook to get the current location
    const location = useLocation();

    // Redux hooks
    const dispatch = useDispatch();
    const favorites = useSelector(selectFavorites);

    // State for search results and loading status
    const [searchResults, setSearchResults] = useState<Cocktail[]>(Array(15).fill(undefined));
    const [loading, setLoading] = useState(false);

    // Function to handle the search request
    const handleSearch = async (name: string) => {
        try {
            const results = await searchCocktails(name);
            setSearchResults(results);
            setLoading(false);
        } catch (error) {
            // Handle error
        }
    };

    // Function to add a cocktail to favorites
    const handleAddToFavorites = (cocktail: Cocktail) => {
        dispatch(addToFavorites(cocktail));
    };

    // Function to remove a cocktail from favorites
    const handleRemoveFromFavorites = (cocktail: Cocktail) => {
        dispatch(removeFromFavorites(cocktail));
    };

    // Function to check if two IDs are equal
    const isEqual = (idDrink: string, idDrink2: string) => {
        return idDrink === idDrink2;
    };

    // useEffect to trigger the initial search when the location changes
    useEffect(() => {
        setLoading(true);
        handleSearch(location.state.name);
    }, [location]);

    return (
        <Container className={'flex-fill mt-5'}>
            <Row className={'mt-5'}>
                {/* Map through search results and display each in a Card */}
                {searchResults.map((cocktail, i) => (
                    <Col xs={12} sm={6} md={4} lg={3} xl={2} key={i} className={'mb-4'}>
                        <Card>
                            {/* Display cocktail details or a loading skeleton if details are not available */}
                            {!loading ? (
                                <>
                                    <div className={'cardImage'}
                                         style={{backgroundImage: `url(${cocktail?.strDrinkThumb})`}}/>
                                    <Card.Body>
                                        <Card.Title className={'text-truncate'}>{cocktail?.strDrink}</Card.Title>
                                        {/* Display Add/Remove to Favorites button based on whether the cocktail is in favorites */}
                                        {favorites.some((favorite) => isEqual(favorite?.idDrink, cocktail?.idDrink)) ? (
                                            <Button
                                                onClick={() => handleRemoveFromFavorites(cocktail)}
                                                className={'btn btn-light rounded-pill px-3'}
                                            >
                                                Remove <MdOutlineFavorite size={24} color={'red'} className={'m'}/>
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={() => handleAddToFavorites(cocktail)}
                                                className={'btn btn-light rounded-pill px-3'}
                                            >
                                                Add <MdOutlineFavoriteBorder size={24}/>
                                            </Button>
                                        )}
                                    </Card.Body>
                                </>
                            ) : (
                                <ContentLoaderCmp/>
                            )}
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Search;
