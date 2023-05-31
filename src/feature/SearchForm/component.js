import React, { useState, useEffect, useRef } from 'react';
import { setAllStoredStrings, sortAlphabeticallyPredicate, getAllStoredStrings, onlyUnique } from '../SearchSuggestions/helpers';
import { movies } from '../../data/movies';
import { SearchInput } from '../SearchSuggestions/SearchInput';
import { SuggestionsList } from '../SearchSuggestions/SuggestionList'
import { getSearchParamFromUrl } from '../SearchSuggestions/helpers';
import { useNavigate } from "react-router-dom";

export const SearchForm = () => {
    console.log(getSearchParamFromUrl())
    const [inputValue, setInputValue] = useState('');
    const [searchTerm, setSearchTerm] = useState(getSearchParamFromUrl());
    const [searchSugestionVisibility, setSearchSugestionVisibility] = useState(false);
    const navigate = useNavigate()
    
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('submit', searchTerm, inputValue);
    navigate(`x-search?search=${searchTerm.search ?? inputValue.search}`);
    setSearchTerm(searchTerm.search ?? inputValue.search);
    setInputValue(searchTerm.search ?? inputValue.search);
  };

    const onSearchInputChange = (e) => {
        setInputValue(e.target.value);
        setSearchSugestionVisibility(true);
    };

    const suggestions = movies.map(movie => movie.title)
    const [selectedSearchSuggestionIndex, setSelectedSearchSuggestionIndex] = useState(0);
    const [filteredHistoricalSearches, setFilteredHistoricalSearches] = React.useState(() => getAllStoredStrings()
        .filter(suggestion =>
            suggestion?.toLowerCase()?.startsWith(inputValue?.toLowerCase())));

    const inputRef = useRef(null);

    useEffect(() => {
        setAllStoredStrings(filteredHistoricalSearches);
    }, [filteredHistoricalSearches]);

    useEffect(() => {
       //  inputRef.current.focus();
        setInputValue(getSearchParamFromUrl());
        
    }, []);

    const filteredSuggestions = suggestions
        .filter(suggestion =>
            suggestion?.toLowerCase()?.startsWith(inputValue?.toLowerCase())
        );

    const allSuggestions = inputValue ? [
        ...filteredHistoricalSearches.sort(sortAlphabeticallyPredicate).filter(suggestion =>
            suggestion?.toLowerCase().startsWith(inputValue.toLowerCase())).slice(0, 1).map(search => ({ search, fromSearchHistory: true })),
        ...filteredSuggestions.sort(sortAlphabeticallyPredicate).map(search => ({ search, fromSearchHistory: false }))
    ]
        .filter(onlyUnique)
        .slice(0, 10) : [];

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowUp' && allSuggestions.length > 1) {
            setSelectedSearchSuggestionIndex((prevIndex) => {
                const currentIndex = prevIndex === 0 ? allSuggestions.length - 1 : prevIndex - 1;
                return currentIndex;
            }
            );
        }
        if (event.key === 'ArrowDown' && allSuggestions.length > 1) {
            setSelectedSearchSuggestionIndex((prevIndex) => {
                const currentIndex = prevIndex === allSuggestions.length - 1 ? 0 : prevIndex + 1;
                return currentIndex;
            }
            );
        }
        if (event.key === 'Enter' && allSuggestions.length > 1) {
            setSearchTerm(allSuggestions[selectedSearchSuggestionIndex]);
            setSearchSugestionVisibility(false);
        }
    };

    const onDelete = (suggestion, e) => {
        e.stopPropagation();
        setFilteredHistoricalSearches(searches => searches.filter((s) => s !== suggestion.search))
    }

    const onAdd = (suggestion) => {
        if (!suggestion.fromSearchHistory) {
            setFilteredHistoricalSearches([...filteredHistoricalSearches, suggestion.search])
        }
    }

    return <form onKeyDown={(e) => {
        handleKeyDown(e);
    }} onSubmit={(e) => handleSubmit(e, searchTerm ?? inputValue) } >
        <SearchInput
            value={inputValue}
            onChange={onSearchInputChange}
            ref={inputRef}
        />
        {searchSugestionVisibility && <SuggestionsList
            inputValue={inputValue}
            suggestions={allSuggestions}
            onDelete={onDelete}
            onAdd={onAdd}
            selectedSearchSuggestionIndex={selectedSearchSuggestionIndex}
        />}
    </form>
}