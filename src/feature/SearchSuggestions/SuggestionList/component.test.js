import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SuggestionsList } from './component';

describe('SuggestionsList', () => {
    it('renders the suggestions list with the correct suggestions and onClick function', () => {
        const suggestions = [
            { search: 'test search 1', fromSearchHistory: false },
            { search: 'test search 2', fromSearchHistory: true },
        ];
        const selectedSearchSuggestionIndex = 0;
        const onDelete = jest.fn();
        const onClick = jest.fn();
        const { getByText } = render(
            <SuggestionsList
                suggestions={suggestions}
                selectedSearchSuggestionIndex={selectedSearchSuggestionIndex}
                onDelete={onDelete}
                onClick={onClick}
            />
        );
        expect(getByText(suggestions[0].search)).toBeInTheDocument();
        expect(getByText(suggestions[1].search)).toBeInTheDocument();
        userEvent.click(getByText(suggestions[0].search));
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
