import React from 'react';
const getClassString =(selected, recentSearch) => `${selected ? 'selected' : ''} ${recentSearch ? 'recentSearch' : ''}`;
               
export const SuggestionsList = ({ suggestions, selectedSearchSuggestionIndex, onDelete, onClick }) => {
    return <>
        {suggestions?.length > 0 && <ul className="suggestionsList" tabIndex="0">
            {suggestions?.map((suggestion, index) => {
                const selected = selectedSearchSuggestionIndex === index;
                const recentSearch = !!suggestion.fromSearchHistory;

                 return (
                    <li
                        className={getClassString(selected, recentSearch)}
                        key={suggestion.search}
                        onClick={() => { onClick(suggestion, index) }}
                    >
                        {suggestion.search}
                        {recentSearch && <button onClick={(e) => {
                            onDelete(suggestion, e);
                        }}>delete</button>}
                    </li>
                )
            })}
        </ul >}
    </>
};
