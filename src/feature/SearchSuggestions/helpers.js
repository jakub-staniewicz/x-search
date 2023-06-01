export function getAllStoredStrings() {
    return JSON.parse(localStorage.getItem('storedStrings')) || [];
}

export function setAllStoredStrings(strings) {
    localStorage.setItem('storedStrings', JSON.stringify(strings));
}


export const getSearchParamFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('search');
};

export const onlyUnique = (value, index, array) =>
    array.findIndex((el) => el.search === value.search) === index;

export const sortAlphabeticallyPredicate = (el1, el2) => {
    return el1 < el2 ? -1 : 1;
}