import React, { useState, useEffect, useRef } from 'react';
import { setAllStoredStrings, sortAlphabeticallyPredicate, getAllStoredStrings, onlyUnique } from '../SearchSuggestions/helpers';
import { movies } from '../../data/movies';
import { SearchInput } from '../SearchSuggestions/SearchInput';
import { SuggestionsList } from '../SearchSuggestions/SuggestionList'

export const SearchForm = () => {
    const [inputValue, setInputValue] = useState('');
    const onChange = (e) => setInputValue(e.target.value);
    const suggestions = movies.map(movie => movie.title)
    const [selectedSearchSuggestionIndex, setSelectedSearchSuggestionIndex] = useState(0);
    const [filteredHistoricalSearches, setFilteredHistoricalSearches] = React.useState(() => getAllStoredStrings()
        .filter(suggestion =>
            suggestion?.toLowerCase().startsWith(inputValue.toLowerCase())));

    const inputRef = useRef(null);

    useEffect(() => {
        setAllStoredStrings(filteredHistoricalSearches);
    }, [filteredHistoricalSearches]);

    const filteredSuggestions = suggestions
        .filter(suggestion =>
            suggestion.toLowerCase().startsWith(inputValue.toLowerCase())
        );

    const allSuggestions = inputValue ? [
        ...filteredHistoricalSearches.sort(sortAlphabeticallyPredicate).filter(suggestion =>
            suggestion?.toLowerCase().startsWith(inputValue.toLowerCase())).map(search => ({ search, fromSearchHistory: true })),
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
    }} >
        <SearchInput
            value={inputValue}
            onChange={onChange}
            ref={inputRef}
        />
        <SuggestionsList
            inputValue={inputValue}
            suggestions={allSuggestions}
            onDelete={onDelete}
            onAdd={onAdd}
            selectedSearchSuggestionIndex={selectedSearchSuggestionIndex}
        />
    </form>
}