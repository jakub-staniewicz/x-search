import { getSearchResults } from './helpers';
import { movies } from '../../../data/movies';
import { ELEMENTS_PER_PAGE } from './constants';

describe('getSearchResults', () => {
  it('returns an object with results and totalListLength', () => {
    const searchTerm = 'test';
    const offset = 0;
    const allResults = movies.filter((item) => {
      return (
        typeof item.title === 'string' &&
        item?.title?.toLowerCase().includes(searchTerm?.toLowerCase())
      );
    });
    const expectedResults = {
      results: allResults.slice(offset, offset + ELEMENTS_PER_PAGE),
      totalListLength: allResults.length ?? 0
    };
    const result = getSearchResults(searchTerm, offset);
    expect(result).toEqual(expectedResults);
  });
});
