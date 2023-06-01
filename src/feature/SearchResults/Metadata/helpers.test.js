import { getMetadateString } from './helpers';

describe('getMetadateString', () => {
  it('returns a string with the number of results and request time', () => {
    const resultsLength = 1;
    const requestTime = 0.5;
    const expectedString = `Exactly ${resultsLength} result (${requestTime} seconds)`;
    const result = getMetadateString(resultsLength, requestTime);
    expect(result).toEqual(expectedString);
  });
  it('returns a string with the number of results and request time', () => {
    const resultsLength = 10;
    const requestTime = 1.5;
    const expectedString = `About ${resultsLength} results (${requestTime} seconds)`;
    const result = getMetadateString(resultsLength, requestTime);
    expect(result).toEqual(expectedString);
  });
  it('returns a string with no results found', () => {
    const resultsLength = 0;
    const expectedString = 'No results found';
    const result = getMetadateString(resultsLength);
    expect(result).toEqual(expectedString);
  });
});
