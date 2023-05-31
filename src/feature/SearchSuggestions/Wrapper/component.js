import React, { useState } from 'react';
import { SuggestionsList } from '../SuggestionList';
import { getAllStoredStrings, onlyUnique } from '../helpers';

export const Wrapper = ({ suggestions = ['one', 'two', 'three'] }) => {
  const [inputValue, setInputValue] = useState('');
  const filteredHistoricalSearches = getAllStoredStrings()
    .filter(onlyUnique)
    .filter(suggestion =>
      suggestion.toLowerCase().startsWith(inputValue.toLowerCase()));

  const filteredSuggestions = suggestions
    .filter(suggestion =>
      suggestion.toLowerCase().startsWith(inputValue.toLowerCase())
    );

  const allSuggestions = inputValue ? [...filteredHistoricalSearches, ...filteredSuggestions].slice(0, 10) : [];
  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      <SuggestionsList
        key={filteredSuggestions.length}
        suggestions={allSuggestions}
      />
    </div>
  );
}