import React, { useState, useEffect } from 'react';
import { setAllStoredStrings, sortAlphabeticallyPredicate } from '../helpers';
import { getAllStoredStrings, onlyUnique } from '../helpers';
import { movies } from '../../../data/movies';

export const SuggestionsList = ({ inputValue }) => {
    const suggestions = movies.map(movie => movie.title)
    const [selectedSearchSuggestionIndex, setSelectedSearchSuggestionIndex] = useState(0);
    const [filteredHistoricalSearches, setFilteredHistoricalSearches] = React.useState(() => getAllStoredStrings()
        .filter(suggestion =>
            suggestion?.toLowerCase().startsWith(inputValue.toLowerCase())));

    useEffect(() => {
        setAllStoredStrings(filteredHistoricalSearches);
    }, [filteredHistoricalSearches]);
    const filteredSuggestions = suggestions
        .filter(suggestion =>
            suggestion.toLowerCase().startsWith(inputValue.toLowerCase())
        );

    const allSuggestions = inputValue ? [
        ...filteredHistoricalSearches.sort(sortAlphabeticallyPredicate).map(search => ({ search, fromSearchHistory: true })),
        ...filteredSuggestions.sort(sortAlphabeticallyPredicate).map(search => ({ search, fromSearchHistory: false }))
    ]
        .filter(onlyUnique)
        .slice(0, 10) : [];

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowUp') {
            setSelectedSearchSuggestionIndex((prevIndex) =>
                prevIndex === 0 ? allSuggestions.length - 1 : prevIndex - 1
            );
        } else if (event.key === 'ArrowDown') {
            setSelectedSearchSuggestionIndex((prevIndex) =>
                prevIndex === allSuggestions.length - 1 ? 0 : prevIndex + 1
            );
        }
    };

    return (
        <div onKeyDown={handleKeyDown} tabIndex="0">
            {allSuggestions?.map((suggestion, index) => (
                <div
                    key={suggestion.search}
                    onClick={() => {
                        if (!suggestion.fromSearchHistory) {
                            setFilteredHistoricalSearches([...filteredHistoricalSearches, suggestion.search])
                        }
                    }}
                    style={{
                        backgroundColor: selectedSearchSuggestionIndex === index ? '#ccc' : '#fff'
                    }}

                >
                    {suggestion.search}
                    {suggestion.fromSearchHistory && <button onClick={(e) => {
                        e.stopPropagation();
                        setFilteredHistoricalSearches(searches => searches.filter((s) => s !== suggestion.search))
                    }}>delete</button>}
                </div>
            ))}
        </div>
    );
}