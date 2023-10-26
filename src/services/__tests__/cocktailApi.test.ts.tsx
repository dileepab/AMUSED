import { fetchRandomCocktail, searchCocktails } from '../cocktailApi';

describe('fetchRandomCocktail', () => {
    it('should throw an error if the response is not successful', async () => {
        const spy = jest.spyOn(global, 'fetch');
        const mockResponse = new Response('{"drinks": []}', { status: 200, headers: { 'Content-Type': 'text/json' } });

        spy.mockImplementation(() => Promise.resolve(mockResponse));

        await expect(searchCocktails('margarita frozen')).resolves.toEqual([]);

        spy.mockRestore();
    });
});


describe('searchCocktails', () => {
    it('should encode the search term before sending it to the API', async () => {
        const spy = jest.spyOn(global, 'fetch');
        const mockEncodedSearchTerm = 'margarita frozen';
        const mockResponse = new Response('{"drinks": []}', { status: 200, headers: { 'Content-Type': 'text/json' } });

        spy.mockImplementation(() => Promise.resolve(mockResponse));

        await expect(searchCocktails('margarita frozen')).resolves.toEqual([]);

        expect(spy).toHaveBeenCalledWith(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${mockEncodedSearchTerm}`);

        spy.mockRestore();
    });
});
