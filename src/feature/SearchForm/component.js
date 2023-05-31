import React, { useState, useEffect, useRef } from 'react';
import { setAllStoredStrings, getAllStoredStrings } from '../SearchSuggestions/helpers';
import { SearchInput } from '../SearchSuggestions/SearchInput';
import { SuggestionsList } from '../SearchSuggestions/SuggestionList'
import { getSearchParamFromUrl } from '../SearchSuggestions/helpers';
import { useNavigate } from "react-router-dom";
import { SearchResultsList } from '../SearchResults/SearchResultsList';
import { getAllSuggestions } from './helpers';

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
        if (searchTerm && !searchTerm.fromSearchHistory && typeof searchTerm?.search === 'string') {
            setFilteredHistoricalSearches([...filteredHistoricalSearches, searchTerm?.search]);
        }
        const searchTextFromSuggestion = typeof searchTerm === 'object' ? searchTerm?.search : null;
        const searchTextFromInput = inputValue ?? '';
        const searchString = searchTextFromSuggestion ?? searchTextFromInput;

        if (searchString) {
            showResults(searchString)
        }
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
    

    const allSuggestions = getAllSuggestions(inputValue, filteredHistoricalSearches);

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
        
        if (event.key === 'Enter' && allSuggestions.length > 0 && selectedSearchSuggestionIndex < allSuggestions.length && selectedSearchSuggestionIndex > 0) {
            console.log('in if');
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
            showResults(searchString);
        }
    }

    return <>
        <form
            className={`searchForm${searchSugestionVisibility ? ' active' : ''}`}
            onKeyDown={(e) => { handleKeyDown(e); }}
            onSubmit={(e) => { handleSubmit(e) }}
        >
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