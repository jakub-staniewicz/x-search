import { useEffect, useState } from "react";
import { getSearchResults } from "./helpers";
import { SearchResultsElement } from "../SearchResultsElement";
const offset = 0;

export const SearchResultsList = ({ searchTerm }) => {
    const [searchResults, setSearchResults] = useState(null);
    useEffect(() => {
        setSearchResults(getSearchResults(searchTerm, offset));
    }, [searchTerm]);
    return searchResults?.map(result => <SearchResultsElement key={result.id} result={result} />)
}