import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const Header: React.FC = () => {
    // State for search input
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    // Function to handle 'Enter' key press in the search input
    const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.charCode === 13) {
            onSearch();
        }
    };

    // Function to handle search button click
    const onSearch = () => {
        navigate('/search', { state: { name: search } });
    };

    return (
        <Navbar expand="md" className="fixed-top" bg="dark" data-bs-theme="dark">
            <Container>
                {/* Brand/logo and toggle button */}
                <Navbar.Brand as={Link} to="/">
                    Cocktails
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                {/* Navigation links */}
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto ms-md-5">
                        <Nav.Link as={Link} to="/">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/favorites">
                            Favorites
                        </Nav.Link>
                    </Nav>
                    {/* Search input and button */}
                    <div className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Name"
                            className="me-2"
                            aria-label="Search"
                            onChange={(ev) => setSearch(ev.target.value)}
                            onKeyPress={(ev) => onKeyUp(ev)}
                        />
                        <Button className={'w-auto'} onClick={() => onSearch()} variant="outline-success">
                            Search
                        </Button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
