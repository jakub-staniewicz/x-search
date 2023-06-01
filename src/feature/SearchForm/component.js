import React, { useState, useEffect, useRef } from 'react';
import { setAllStoredStrings } from '../SearchSuggestions/SuggestionList/helpers';
import { SearchInput } from '../SearchSuggestions/SearchInput';
import { SuggestionsList } from '../SearchSuggestions/SuggestionList';
import { getSearchParamFromUrl } from '../SearchSuggestions/SuggestionList/helpers';
import { checkString } from './helpers';
import { useNavigate } from 'react-router-dom';
import { SearchResultsList } from '../SearchResults/SearchResultsList';
import {
  getAllSuggestions,
  getRecentSearches,
  newSearchExists,
  getSearchStringForResults,
  outsideEvent
} from './helpers';
import { SEARCH_URL } from './constants';
import { useClickout } from './hooks';

export const SearchForm = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState(getSearchParamFromUrl());
  const [searchSugestionVisibility, setSearchSugestionVisibility] = useState(false);
  const [selectedSearchSuggestionIndex, setSelectedSearchSuggestionIndex] = useState(0);
  const [filteredHistoricalSearches, setFilteredHistoricalSearches] = React.useState(() =>
    getRecentSearches(inputValue)
  );
  const [allSuggestions, setAllSuggestions] = useState();
  const navigate = useNavigate();

  const showResults = (searchString) => {
    navigate(`${SEARCH_URL}${searchString}`);
    setSearchTerm(searchString);
    setInputValue(searchString);
    setSearchSugestionVisibility(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const searchString = getSearchStringForResults(searchTerm, inputValue);
    if (newSearchExists(searchTerm)) {
      setFilteredHistoricalSearches([...filteredHistoricalSearches, searchTerm?.search]);
    } else if (searchString && checkString(searchString, filteredHistoricalSearches)) {
      setFilteredHistoricalSearches([...filteredHistoricalSearches, searchString]);
    }

    if (searchString) {
      showResults(searchString);
    }
  };

  const onSearchInputChange = (e) => {
    setInputValue(e.target.value);
    setSearchSugestionVisibility(true);
    setSelectedSearchSuggestionIndex(null);
  };

  const onInputClick = () => {
    setSearchSugestionVisibility(true);
  };
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  const handleClickOutside = (event) => {
    if (outsideEvent(suggestionsRef, event)) {
      setSearchSugestionVisibility(false);
    }
  };

  useClickout(suggestionsRef, handleClickOutside);
  useEffect(() => {
    setAllStoredStrings(filteredHistoricalSearches);
  }, [filteredHistoricalSearches]);

  useEffect(() => {
    inputRef.current.focus();
    setInputValue(getSearchParamFromUrl());
  }, []);

  useEffect(() => {
    getAllSuggestions(inputValue, filteredHistoricalSearches)
      .then((suggestions) => setAllSuggestions(suggestions))
      .catch((e) => {
        throw new Error(
          `There was an error while getting suggestions. reason ${JSON.stringify(e)}`
        );
      });
  }, [inputValue, filteredHistoricalSearches]);

  const handleKeyDown = (event) => {
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

  const onDelete = (suggestion, e) => {
    e.stopPropagation();
    setFilteredHistoricalSearches((searches) => searches.filter((s) => s !== suggestion.search));
    inputRef.current.focus();
  };

  const onSuggestionClick = (suggestion) => {
    if (allSuggestions.length > 0) {
      const searchString = suggestion?.search;
      if (!suggestion.fromSearchHistory && typeof searchString === 'string') {
        setFilteredHistoricalSearches([...filteredHistoricalSearches, searchString]);
      }
      showResults(searchString);
    }
  };

  return (
    <>
      <form
        className={`searchForm${searchSugestionVisibility ? ' active' : ''}`}
        onKeyDown={(e) => {
          handleKeyDown(e);
        }}
        onSubmit={(e) => {
          handleSubmit(e);
        }}>
        <div ref={suggestionsRef}>
          <SearchInput
            value={inputValue}
            onChange={onSearchInputChange}
            onClick={onInputClick}
            ref={inputRef}
          />
          {searchSugestionVisibility && (
            <SuggestionsList
              inputValue={inputValue}
              suggestions={allSuggestions}
              onDelete={onDelete}
              onClick={onSuggestionClick}
              selectedSearchSuggestionIndex={selectedSearchSuggestionIndex}
            />
          )}
        </div>
      </form>
      {searchTerm && typeof searchTerm === 'string' && (
        <SearchResultsList searchTerm={searchTerm} />
      )}
    </>
  );
};
