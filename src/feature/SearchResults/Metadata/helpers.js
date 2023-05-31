export const getMetadateString = (resultsLength, requestTime) => {
    if (resultsLength === 1) {
        return `There was one result the request took ${requestTime} seconds`;
    }
    if (resultsLength > 1) {
        return `There were ${resultsLength} results the request took ${requestTime}`;
    }
    if (resultsLength === 0) {
        return 'No results found'
    }
}