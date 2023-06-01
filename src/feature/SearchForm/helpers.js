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
  const allSuggestions = inputValue
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
  return Promise.resolve(allSuggestions);
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
export const checkString = (string, stringsArray) => {
  if (!string) {
    return false;
  }
  if (string === '') {
    return false;
  }
  if (stringsArray.includes(string)) {
    return false;
  }
  return true;
};

export const generateHandleKeyDown = (
  allSuggestions,
  selectedSearchSuggestionIndex,
  setSelectedSearchSuggestionIndex,
  setSearchTerm,
  setSearchSugestionVisibility
) => {
  return (event) => {
    if (event.key === 'ArrowUp' && allSuggestions.length > 0) {
      event.preventDefault();
      setSelectedSearchSuggestionIndex((prevIndex) => {
        if (prevIndex === null) {
          return allSuggestions.length - 1;
        }
        const currentIndex = prevIndex === 0 ? allSuggestions.length - 1 : prevIndex - 1;
        return currentIndex;
      });
    }
    if (event.key === 'ArrowDown' && allSuggestions.length > 0) {
      event.preventDefault();
      setSelectedSearchSuggestionIndex((prevIndex) => {
        if (prevIndex === null) {
          return 0;
        }
        const currentIndex = prevIndex === allSuggestions.length - 1 ? 0 : prevIndex + 1;
        return currentIndex;
      });
    }

    if (
      event.key === 'Enter' &&
      allSuggestions.length > 0 &&
      selectedSearchSuggestionIndex < allSuggestions.length &&
      selectedSearchSuggestionIndex >= 0
    ) {
      setSearchTerm(allSuggestions[selectedSearchSuggestionIndex]);
      setSearchSugestionVisibility(false);
    }
  };
};
