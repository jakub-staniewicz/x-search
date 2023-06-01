import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getSearchResults } from './helpers';
import { SearchResultsElement } from '../SearchResultsElement';
import { Pagination } from '../Pagination';
import { Metadata } from '../Metadata';

export const SearchResultsList = ({ searchTerm }) => {
  const [searchResults, setSearchResults] = useState(null);
  const [offset, setOffset] = useState(0);
  const [listLength, setListLength] = useState(0);
  const [searchDuration, setSearchDuration] = useState(0);
  useEffect(() => {
    async function getSuggestions() {
      const start = performance.now();
      const { results = [], totalListLength } = await getSearchResults(searchTerm, offset);
      const end = performance.now();
      setSearchDuration(((end - start) / 1000).toFixed(4));
      setSearchResults(results);
      setListLength(totalListLength);
    }
    getSuggestions();
  }, [searchTerm, offset, listLength]);
  return (
    <>
      <Metadata resultsLength={listLength} requestTime={searchDuration} />
      {searchResults?.map((result) => (
        <SearchResultsElement key={result.id} result={result} />
      ))}
      <Pagination offset={offset} setOffset={setOffset} listLength={listLength} />
    </>
  );
};
SearchResultsList.propTypes = {
  searchTerm: PropTypes.string.isRequired
};
