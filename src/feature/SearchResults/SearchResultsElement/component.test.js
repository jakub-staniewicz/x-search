import { render } from '@testing-library/react';
import { SearchResultsElement } from './component';

describe('SearchResultsElement', () => {
 it('renders the search results element with the correct title and plot', () => {
 const result = {
 title: 'Test Title',
 plot: 'Test Plot',
 };
 const { getByText } = render(<SearchResultsElement result={result} />);
 expect(getByText(result.title)).toBeInTheDocument();
 expect(getByText(result.plot)).toBeInTheDocument();
 });
});