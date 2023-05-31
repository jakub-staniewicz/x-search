import React from 'react';

export const SuggestionsList = ({ suggestions, selectedSearchSuggestionIndex, onDelete, onClick }) => <>
    {suggestions?.length > 0 && <ul className="suggestionsList" tabIndex="0">
        {suggestions?.map((suggestion, index) => {
            const selected = selectedSearchSuggestionIndex === index;
            return (
                <li
                    className={selected ? 'selected' : undefined}
                    key={suggestion.search}
                    onClick={() => { onClick(suggestion, index) }}
                >
                    {suggestion.search}
                    {suggestion.fromSearchHistory && selected && <button onClick={(e) => {
                        onDelete(suggestion, e);
                    }}>delete</button>}
                </li>
            )
        })}
    </ul >}
</>;
