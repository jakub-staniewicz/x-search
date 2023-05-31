import React, { useState } from 'react';
import { storeStringInLocalStorage, removeStringFromLocalStorage } from '../helpers';

export const SuggestionsList = ({ suggestions }) => {
    const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowUp') {
            setSelectedMonthIndex((prevIndex) =>
                prevIndex === 0 ? suggestions.length - 1 : prevIndex - 1
            );
        } else if (event.key === 'ArrowDown') {
            setSelectedMonthIndex((prevIndex) =>
                prevIndex === suggestions.length - 1 ? 0 : prevIndex + 1
            );
        }
    };

    return (
        <div onKeyDown={handleKeyDown} tabIndex="0">
            {suggestions?.map((suggestion, index) => (
                <div
                    key={suggestion}
                    onClick={() => { storeStringInLocalStorage(suggestion) }}
                    style={{
                        backgroundColor: selectedMonthIndex === index ? '#ccc' : '#fff'
                    }}

                >
                    {suggestion}
                    <button onClick={(e) => {
                        e.stopPropagation();
                        removeStringFromLocalStorage(suggestion)
                    }}>delete</button>
                </div>
            ))}
        </div>
    );
}