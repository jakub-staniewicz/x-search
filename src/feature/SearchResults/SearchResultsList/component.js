import { useEffect, useState } from "react";
import { getSearchResults } from "./helpers";
import { SearchResultsElement } from "../SearchResultsElement";
import { Pagination } from "../Pagination";

export const SearchResultsList = ({ searchTerm }) => {
    const [searchResults, setSearchResults] = useState(null);
    const [offset, setOffset] = useState(0);
    const [listLength, setListLength] = useState(0);
    useEffect(() => {
        const { results = [], totalListLength } = getSearchResults(searchTerm, offset);
        setSearchResults(results);
        setListLength(totalListLength);
    }, [searchTerm, offset, listLength]);
    return <>
        {searchResults?.map(result => <SearchResultsElement key={result.id} result={result} />)}
        <Pagination offset={offset} setOffset={setOffset} listLength={listLength} />
    </>
}