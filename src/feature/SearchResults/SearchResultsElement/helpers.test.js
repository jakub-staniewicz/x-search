import { generateLink } from './helpers';

describe('generateLink', () => {
  it('returns a string with the correct link', () => {
    const searchParam = 'test search';
    const expectedLink = 'https://www.google.com/search?q=test+search';
    const result = generateLink(searchParam);
    expect(result).toEqual(expectedLink);
  });
});
