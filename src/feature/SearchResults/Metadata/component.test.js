import { render } from '@testing-library/react';
import { Metadata } from './component';

describe('Metadata', () => {
    it('renders the metadata with the correct text', () => {
        const resultsLength = 1;
        const requestTime = 0.5;
        const expectedString = `Exactly ${resultsLength} result (${requestTime} seconds)`;
        const { getByText } = render(<Metadata resultsLength={resultsLength} requestTime={requestTime} />);
        expect(getByText(expectedString)).toBeInTheDocument();
    });
});
