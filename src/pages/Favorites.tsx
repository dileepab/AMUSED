import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFavorites, removeFromFavorites } from '../slices/favoritesSlice';
import { Cocktail } from '../types';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { MdOutlineFavorite } from 'react-icons/md';

interface FavoritesProps {}

const Favorites: React.FC<FavoritesProps> = () => {
    // Redux hooks
    const dispatch = useDispatch();
    const favorites = useSelector(selectFavorites);

    // Function to handle removing a cocktail from favorites
    const handleRemoveFromFavorites = (cocktail: Cocktail) => {
        dispatch(removeFromFavorites(cocktail));
    };

    return (
        <Container className={'flex-fill mt-5'}>
            <Row className={'mt-5'}>
                {/* Map through favorites and display each in a Card */}
                {favorites.map((cocktail, i) => (
                    <Col xs={12} sm={6} md={4} lg={3} xl={2} key={i} className={'mb-4'}>
                        <Card>
                            {/* Display cocktail details */}
                            <div className={'cardImage'} style={{ backgroundImage: `url(${cocktail?.strDrinkThumb})` }} />
                            <Card.Body>
                                <Card.Title className={'text-truncate'}>{cocktail?.strDrink}</Card.Title>
                                {/* Button to remove cocktail from favorites */}
                                <Button
                                    onClick={() => handleRemoveFromFavorites(cocktail)}
                                    className={'btn btn-light rounded-pill px-3'}
                                >
                                    Remove <MdOutlineFavorite size={24} color={'red'} className={'ml-2'} />
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Favorites;
