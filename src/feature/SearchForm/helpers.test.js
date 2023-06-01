import { getAllSuggestions, checkString } from './helpers';

describe('getAllSuggestions', () => {
  it('returns an array of suggestions', async () => {
    const inputValue = 'test';
    const filteredHistoricalSearches = ['test1', 'test2'];
    const result = await getAllSuggestions(inputValue, filteredHistoricalSearches);
    expect(Array.isArray(result)).toBe(true);
  });
});

describe('checkString', () => {
  it('should return false if the string is empty', () => {
    expect(checkString('', [])).toBe(false);
  });

  it('should return false if the string is in the stringsArray', () => {
    expect(checkString('hello', ['world', 'hello'])).toBe(false);
  });

  it('should return true if the string is not empty and not in the stringsArray', () => {
    expect(checkString('hello', ['world'])).toBe(true);
  });
});
