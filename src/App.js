import { useState } from 'react';
import './App.css';

import { SuggestionsList } from './feature/SearchSuggestions/SuggestionList';
import { SearchInput } from './feature/SearchSuggestions/SearchInput/component';

function App() {
  const [inputValue, setInputValue] = useState('');
  const onChange = (e) => setInputValue(e.target.value);
  return (
    <>
      <h1>Welcome to fake movie search</h1>
      <SearchInput
        value={inputValue}
        onChange={onChange}
      />
      <SuggestionsList inputValue={inputValue} />
    </>
  );
}

export default App;
