import React from 'react';
import { render } from '@testing-library/react';
import { SearchResultsList } from './component';

jest.mock('./helpers', () => ({
  getSearchResults: jest.fn(() => ({
    results: [
      { id: 1, title: 'Result 1' },
      { id: 2, title: 'Result 2' },
      { id: 3, title: 'Result 3' },
    ],
    totalListLength: 3,
  })),
}));

describe('SearchResultsList', () => {
  it('should render the SearchResultsElement and Pagination components', () => {
    const { getByText } = render(<SearchResultsList searchTerm="test" />);
    expect(getByText('Result 1')).toBeInTheDocument();
    expect(getByText('Result 2')).toBeInTheDocument();
    expect(getByText('Result 3')).toBeInTheDocument();
    expect(getByText('Prev')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
  });

  it('should call the getSearchResults function with the correct arguments', () => {
    const searchTerm = 'test';
    const offset = 0;
    const { rerender } = render(<SearchResultsList searchTerm={searchTerm} />);
    expect(require('./helpers').getSearchResults).toHaveBeenCalledWith(searchTerm, offset);
    rerender(<SearchResultsList searchTerm={searchTerm} offset={5} />);
    expect(require('./helpers').getSearchResults).toHaveBeenCalledWith(searchTerm, 5);
  });
});
