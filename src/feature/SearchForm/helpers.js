import { onlyUnique, sortAlphabeticallyPredicate } from "../SearchSuggestions/helpers";
export const getAllSuggestions = (
    inputValue,
    filteredHistoricalSearches,
    filteredSuggestions
) => inputValue ? [
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