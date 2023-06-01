import React from 'react';
import PropTypes from 'prop-types';
const getClassString = (selected, recentSearch) =>
  `${selected ? 'selected' : ''} ${recentSearch ? 'recentSearch' : ''}`;

export const SuggestionsList = ({
  suggestions,
  selectedSearchSuggestionIndex,
  onDelete,
  onClick
}) => {
  return (
    <>
      {suggestions?.length > 0 && (
        <ul className="suggestionsList" tabIndex="0">
          {suggestions?.map((suggestion, index) => {
            const selected = selectedSearchSuggestionIndex === index;
            const recentSearch = !!suggestion.fromSearchHistory;

            return (
              <li
                className={getClassString(selected, recentSearch)}
                key={suggestion.search}
                onClick={() => {
                  onClick(suggestion, index);
                }}>
                {suggestion.search}
                {recentSearch && (
                  <button
                    onClick={(e) => {
                      onDelete(suggestion, e);
                    }}>
                    delete
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};
SuggestionsList.propTypes = {
  suggestions: PropTypes.arrayOf(
    PropTypes.shape({
      search: PropTypes.string.isRequired,
      fromSearchHistory: PropTypes.bool
    })
  ),
  selectedSearchSuggestionIndex: PropTypes.number,
  onDelete: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};
