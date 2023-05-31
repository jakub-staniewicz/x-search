import { onlyUnique, sortAlphabeticallyPredicate } from "../SearchSuggestions/helpers";
import { movies } from "../../data/movies";

const getFilteredSuggestions = (inputValue) => {
    const suggestions = movies.map(movie => movie.title);
    return suggestions
        .filter(suggestion =>
            suggestion?.toLowerCase()?.startsWith(inputValue?.toLowerCase())
        );
}

export const getAllSuggestions = (
    inputValue,
    filteredHistoricalSearches,
) => {
    const filteredSuggestions = getFilteredSuggestions(inputValue);
    return inputValue ? [
        ...filteredHistoricalSearches
            .sort(sortAlphabeticallyPredicate)
            .filter(suggestion => suggestion?.toLowerCase()
                .startsWith(inputValue.toLowerCase()))
            .slice(0, 1)
            .map(search => ({ search, fromSearchHistory: true })),
        ...filteredSuggestions
            .sort(sortAlphabeticallyPredicate)
            .map(search => ({ search, fromSearchHistory: false }))
    ]
        .filter(onlyUnique)
        .slice(0, 10) : [];
}