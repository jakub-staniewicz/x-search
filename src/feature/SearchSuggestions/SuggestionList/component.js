import React  from 'react';


export const SuggestionsList = ({ suggestions, selectedSearchSuggestionIndex, onDelete, onAdd }) => {
    

    return (
        <div tabIndex="0">
            {suggestions?.map((suggestion, index) => (
                <div
                    key={suggestion.search}
                    onClick={() => {onAdd(suggestion)}}
                    style={{
                        backgroundColor: selectedSearchSuggestionIndex === index ? '#ccc' : '#fff'
                    }}

                >
                    {suggestion.search}
                    {suggestion.fromSearchHistory && <button onClick={(e) => {
                       onDelete(suggestion, e);
                    }}>delete</button>}
                </div>
            ))}
        </div>
    );
}