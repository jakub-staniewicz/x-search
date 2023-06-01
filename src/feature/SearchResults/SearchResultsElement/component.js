import PropTypes from 'prop-types';
import React from 'react';
import { generateLink } from './helpers';
export const SearchResultsElement = ({ result }) => {
  return (
    <>
      <a target="_blank" rel="noopener noreferrer" href={generateLink(result.title)}>
        <h3>{result.title}</h3>
      </a>
      <span className="resultsContent">{result.plot}</span>
    </>
  );
};

SearchResultsElement.propTypes = {
  result: PropTypes.shape({
    title: PropTypes.string.isRequired,
    plot: PropTypes.string.isRequired
  }).isRequired
};
