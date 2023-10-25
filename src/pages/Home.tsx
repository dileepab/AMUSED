import React, {useState, useEffect} from 'react';
import {fetchRandomCocktail} from '../services/cocktailApi';
import {Cocktail} from '../types';
import {Button, Card, Col, Container, Row, Spinner} from 'react-bootstrap';
import debounce from 'lodash/debounce';
import ContentLoaderCmp from '../components/ContentLoaderCmp';

const Home: React.FC = () => {

    // State for storing cocktails and loading status
    const [cocktails, setCocktails] = useState<Cocktail[]>(Array(5).fill(undefined));
    const [loading, setLoading] = useState(false);

    // Function to fetch a random cocktail
    const fetchCocktails = async (): Promise<Cocktail> => {
        try {
            const randomCocktail: Cocktail[] = await fetchRandomCocktail();
            return randomCocktail[0];
        } catch (error) {
            // Handle error
            throw error;
        }
    };

    // Function to fetch five random cocktails
    const fetchCocktailFiveTimes = async () => {
        setLoading(true);
        setCocktails(Array(5).fill(undefined));
        try {
            const cocktailPromises: Promise<Cocktail>[] = [];
            for (let i = 0; i < 5; i++) {
                cocktailPromises.push(fetchCocktails());
            }
            const cocktailsResult: Cocktail[] = await Promise.all(cocktailPromises);
            setCocktails(cocktailsResult);
            setLoading(false);
        } catch (error) {
            // Handle error
        }
    };

    // Debounce the fetchCocktailFiveTimes function
    const debouncedSearch = debounce(fetchCocktailFiveTimes, 300);

    // useEffect to trigger the initial fetch
    useEffect(() => {
        debouncedSearch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {/* Container for displaying cocktails */}
            <Container className={'flex-fill mt-5'}>
                <Row className={'mt-5'}>
                    {/* Map through cocktails and display each in a Card */}
                    {cocktails.map((cocktail, i) => (
                        <Col xs={12} sm={6} md={4} lg={3} xl={2} key={i} className={'mb-4'}>
                            <Card>
                                {/* Display cocktail details or a loading skeleton if details are not available */}
                                {cocktail?.strDrinkThumb ? (
                                    <>
                                        <div className={'cardImage'}
                                             style={{backgroundImage: `url(${cocktail?.strDrinkThumb})`}}/>
                                        <Card.Body>
                                            <Card.Title className={'text-truncate'}>{cocktail?.strDrink}</Card.Title>
                                            <Card.Text className={'text-truncate'}>{cocktail?.strCategory}</Card.Text>
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

            {/* Container for the Refresh button */}
            <Container className={'pt-3 pb-3'}>
                <Button className={'refresh-button'} variant="dark" onClick={fetchCocktailFiveTimes} disabled={loading}>
                    {loading ? <Spinner size={'sm'} animation="border"/> : 'Refresh'}
                </Button>
            </Container>
        </>
    );
};

export default Home;
