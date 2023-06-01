import React from 'react';
import PropTypes from 'prop-types';
import { ELEMENTS_PER_PAGE } from '../SearchResultsList';

export const Pagination = ({ listLength, offset, setOffset }) => {
  function handleNext() {
    setOffset((prevOffset) => prevOffset + ELEMENTS_PER_PAGE);
  }

  function handlePrev() {
    setOffset((prevOffset) => prevOffset - ELEMENTS_PER_PAGE);
  }

  return (
    <div className="pagination">
      <button onClick={handlePrev} disabled={offset === 0}>
        Prev
      </button>
      <button onClick={handleNext} disabled={offset + ELEMENTS_PER_PAGE >= listLength}>
        Next
      </button>
    </div>
  );
};

Pagination.propTypes = {
  listLength: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  setOffset: PropTypes.func.isRequired
};
