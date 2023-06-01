import { forwardRef } from 'react';
import PropTypes from 'prop-types';
export const SearchInput = forwardRef(({ value, onChange, onClick }, ref) => {
  return (
    <div className="searchInput">
      <div className="loupe"></div>
      <input type="text" value={value} onChange={onChange} onClick={onClick} ref={ref} />
    </div>
  );
});
SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

SearchInput.displayName = 'SearchInput';
