export const getMetadateString = (resultsLength, requestTime) => {
    if (resultsLength === 1) {
        return `Exactly ${resultsLength} result (${requestTime})`;
    }
    if (resultsLength > 1) {
        return `About ${requestTime} result (${requestTime})`;
    }
    if (resultsLength === 0) {
        return 'No results found'
    }
}