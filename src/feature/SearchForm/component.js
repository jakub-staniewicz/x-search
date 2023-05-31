import React, { useState, useEffect, useRef } from 'react';
import { setAllStoredStrings, sortAlphabeticallyPredicate, getAllStoredStrings, onlyUnique } from '../SearchSuggestions/helpers';
import { movies } from '../../data/movies';
import { SearchInput } from '../SearchSuggestions/SearchInput';
import { SuggestionsList } from '../SearchSuggestions/SuggestionList'
import { getSearchParamFromUrl } from '../SearchSuggestions/helpers';
import { useNavigate } from "react-router-dom";
import { SearchResultsList } from '../SearchResults/SearchResultsList';

export const SearchForm = () => {
    const [inputValue, setInputValue] = useState('');
    const [searchTerm, setSearchTerm] = useState(getSearchParamFromUrl());
    const [searchSugestionVisibility, setSearchSugestionVisibility] = useState(false);
    const navigate = useNavigate();

    const showResults = (searchString) => {
        navigate(`x-search?search=${searchString}`);
        setSearchTerm(searchString);
        setInputValue(searchString);
        setSearchSugestionVisibility(false);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!searchTerm.fromSearchHistory && typeof searchTerm?.search === 'string') {
            setFilteredHistoricalSearches([...filteredHistoricalSearches, searchTerm?.search]);
        }
        const searchTextFromSuggestion = searchTerm?.search;
        const searchTextFromInput = inputValue?.search;
        const searchString = searchTextFromSuggestion ?? searchTextFromInput;
        showResults(searchString);
    };

    const onSearchInputChange = (e) => {
        setInputValue(e.target.value);
        setSearchSugestionVisibility(true);
        setSelectedSearchSuggestionIndex(null);
    };
    const onInputClick = () => {
        setSearchSugestionVisibility(true);
    }
    const inputRef = useRef(null);
    const suggestionsRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
                setSearchSugestionVisibility(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [suggestionsRef]);

    const suggestions = movies.map(movie => movie.title)
    const [selectedSearchSuggestionIndex, setSelectedSearchSuggestionIndex] = useState(0);
    const [filteredHistoricalSearches, setFilteredHistoricalSearches] = React.useState(() => getAllStoredStrings()
        .filter(suggestion =>
            suggestion?.toLowerCase()?.startsWith(inputValue?.toLowerCase())));

    useEffect(() => {
        setAllStoredStrings(filteredHistoricalSearches);
    }, [filteredHistoricalSearches]);

    useEffect(() => {
        inputRef.current.focus();
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
            event.preventDefault();
            setSelectedSearchSuggestionIndex((prevIndex) => {
                if (prevIndex === null) { return 0 }
                const currentIndex = prevIndex === 0 ? allSuggestions.length - 1 : prevIndex - 1;
                return currentIndex;
            }
            );
        }
        if (event.key === 'ArrowDown' && allSuggestions.length > 0) {
            event.preventDefault();
            setSelectedSearchSuggestionIndex((prevIndex) => {
                if (prevIndex === null) { return 0 }
                const currentIndex = prevIndex === allSuggestions.length - 1 ? 0 : prevIndex + 1;
                return currentIndex;
            }
            );
        }
        if (event.key === 'Enter' && allSuggestions.length > 0) {
            setSearchTerm(allSuggestions[selectedSearchSuggestionIndex]);
            setSearchSugestionVisibility(false);
        }
    };

    const onDelete = (suggestion, e) => {
        e.stopPropagation();
        setFilteredHistoricalSearches(searches => searches.filter((s) => s !== suggestion.search))
    }

    const onAdd = (suggestion) => {


        if (allSuggestions.length > 0) {
            const searchString = suggestion?.search;

            if (!suggestion.fromSearchHistory && typeof suggestion?.search === 'string') {
                setFilteredHistoricalSearches([...filteredHistoricalSearches, suggestion?.search]);
            }
            // setSearchTerm(searchString);
            // setInputValue(searchString)
            // setSearchSugestionVisibility(false);
            // navigate(`x-search?search=${searchString}`);
            showResults(searchString);
        }
    }

    return <>
        <form className={`searchForm${searchSugestionVisibility ? ' active' : ''}`} onKeyDown={(e) => {
            handleKeyDown(e);
        }} onSubmit={(e) => handleSubmit(e, searchTerm ?? inputValue)} >
            <div ref={suggestionsRef}>
                <SearchInput
                    value={inputValue}
                    onChange={onSearchInputChange}
                    onClick={onInputClick}
                    ref={inputRef}
                />
                {searchSugestionVisibility && <SuggestionsList
                    inputValue={inputValue}
                    suggestions={allSuggestions}
                    onDelete={onDelete}
                    onClick={onAdd}
                    selectedSearchSuggestionIndex={selectedSearchSuggestionIndex}
                />
                }
            </div>
        </form>
        {searchTerm && typeof searchTerm === 'string' && <SearchResultsList searchTerm={searchTerm} />}
    </>
}