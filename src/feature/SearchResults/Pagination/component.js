import React from 'react';
import PropTypes from 'prop-types';

export const Pagination = ({ listLength, offset, setOffset }) => {

  function handleNext() {
    setOffset((prevOffset) => prevOffset + 5);
  }

  function handlePrev() {
    setOffset((prevOffset) => prevOffset - 5);
  }

  return (
    <div className="pagination">
      <button onClick={handlePrev} disabled={offset === 0}>
        Prev
      </button>
      <button onClick={handleNext} disabled={offset + 5 >= listLength}>
        Next
      </button>
    </div>
  );
}

Pagination.propTypes = {
    listLength: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired,
    setOffset: PropTypes.func.isRequired,
  };

