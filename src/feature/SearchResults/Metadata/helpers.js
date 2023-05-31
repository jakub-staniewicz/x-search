export const getMetadateString = (resultsLength, requestTime) => {
    if (resultsLength === 1) {
        return `Exactly ${resultsLength} result (${requestTime} seconds)`;
    }
    if (resultsLength > 1) {
        return `About ${resultsLength} results (${requestTime} seconds)`;
    }
    if (resultsLength === 0) {
        return 'No results found'
    }
}