import { getAllSuggestions } from './helpers';

describe('getAllSuggestions', () => {
    it('returns an array of suggestions', () => {
        const inputValue = 'test';
        const filteredHistoricalSearches = ['test1', 'test2'];
        const result = getAllSuggestions(inputValue, filteredHistoricalSearches);
        expect(Array.isArray(result)).toBe(true);
    });
});