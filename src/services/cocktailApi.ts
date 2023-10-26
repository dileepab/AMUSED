import { Cocktail } from '../types';

// Base URL for the CocktailDB API
const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

/**
 * Fetches a random cocktail from the CocktailDB API using the Fetch API.
 * @returns {Promise<Cocktail[]>} A promise that resolves to an array of cocktails.
 * @throws {Error} If there is an error during the API request.
 */
export const fetchRandomCocktail = async (): Promise<Cocktail[]> => {
    try {
        const response = await fetch(`${BASE_URL}/random.php`);
        const data = await response.json();
        return data.drinks || [];
    } catch (error) {
        console.error('Error fetching random cocktails', error);
        throw error;
    }
};

/**
 * Searches for cocktails based on a search term using the CocktailDB API with the Fetch API.
 * @param {string} searchTerm - The term to search for.
 * @returns {Promise<Cocktail[]>} A promise that resolves to an array of cocktails matching the search term.
 * @throws {Error} If there is an error during the API request.
 */
export const searchCocktails = async (searchTerm: string): Promise<Cocktail[]> => {
    try {
        const response = await fetch(`${BASE_URL}/search.php?s=${searchTerm}`);
        const data = await response.json();
        return data.drinks || [];
    } catch (error) {
        console.error('Error searching cocktails', error);
        throw error;
    }
};
