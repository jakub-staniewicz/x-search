import {
  onlyUnique,
  sortAlphabeticallyPredicate
} from '../SearchSuggestions/SuggestionList/helpers';
import { movies } from '../../data/movies';
import { getAllStoredStrings } from '../SearchSuggestions/SuggestionList/helpers';

const getFilteredSuggestions = (inputValue) => {
  const suggestions = movies.map((movie) => movie.title);
  return suggestions.filter((suggestion) =>
    suggestion?.toLowerCase()?.startsWith(inputValue?.toLowerCase())
  );
};

export const getAllSuggestions = (inputValue, filteredHistoricalSearches) => {
  const filteredSuggestions = getFilteredSuggestions(inputValue);
  return inputValue
    ? [
        ...filteredHistoricalSearches
          .sort(sortAlphabeticallyPredicate)
          .filter((suggestion) => suggestion?.toLowerCase().startsWith(inputValue.toLowerCase()))
          .slice(0, 1)
          .map((search) => ({ search, fromSearchHistory: true })),
        ...filteredSuggestions
          .sort(sortAlphabeticallyPredicate)
          .map((search) => ({ search, fromSearchHistory: false }))
      ]
        .filter(onlyUnique)
        .slice(0, 10)
    : [];
};

export const getRecentSearches = (inputValue) =>
  getAllStoredStrings().filter((suggestion) =>
    suggestion?.toLowerCase()?.startsWith(inputValue?.toLowerCase())
  );

export const newSearchExists = (searchTerm) =>
  searchTerm && !searchTerm.fromSearchHistory && typeof searchTerm?.search === 'string';
export const getSearchStringForResults = (searchTerm, inputValue) => {
  const searchTextFromSuggestion = typeof searchTerm === 'object' ? searchTerm?.search : null;
  const searchTextFromInput = inputValue ?? '';
  return searchTextFromSuggestion ?? searchTextFromInput;
};

export const outsideEvent = (ref, event) => ref.current && !ref.current.contains(event.target);
