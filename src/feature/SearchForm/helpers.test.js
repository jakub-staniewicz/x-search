import { getAllSuggestions } from './helpers';

describe('getAllSuggestions', () => {
  it('returns an array of suggestions', async () => {
    const inputValue = 'test';
    const filteredHistoricalSearches = ['test1', 'test2'];
    const result = await getAllSuggestions(inputValue, filteredHistoricalSearches);
    expect(Array.isArray(result)).toBe(true);
  });
});
