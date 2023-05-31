import { useState } from 'react';
import { SearchInput } from '../SearchSuggestions/SearchInput';
import { SuggestionsList } from '../SearchSuggestions/SuggestionList'
export const SearchForm = () => {
    const [inputValue, setInputValue] = useState('');
    const onChange = (e) => setInputValue(e.target.value);
    
    return <form onKeyDown={(e) => {
        console.log(e)
    }} >
        <SearchInput
            value={inputValue}
            onChange={onChange}
        />
        <SuggestionsList inputValue={inputValue} />
    </form>
}