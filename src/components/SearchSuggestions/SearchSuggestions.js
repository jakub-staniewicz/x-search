import React, { useState } from 'react';
import { SuggestionsList } from './SuggestionsList';

export const SearchSuggestions = ({ suggestions = ['one', 'two', 'three'] }) => {
  const [inputValue, setInputValue] = useState('');
  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().startsWith(inputValue.toLowerCase())
  );
  return (
    <div>
      <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} />
      <SuggestionsList key={filteredSuggestions.length} suggestions={filteredSuggestions} />
    </div>
  );
}