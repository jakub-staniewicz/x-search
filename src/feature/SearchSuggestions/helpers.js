export function storeStringInLocalStorage(str) {
    const storedStrings = JSON.parse(localStorage.getItem('storedStrings')) || [];
    storedStrings.push(str);
    localStorage.setItem('storedStrings', JSON.stringify(storedStrings));
}

export function getAllStoredStrings() {
    return JSON.parse(localStorage.getItem('storedStrings')) || [];
}

export function setAllStoredStrings(strings) {
    localStorage.setItem('storedStrings', JSON.stringify(strings));
}

export function removeStringFromLocalStorage(str) {
    const storedStrings = JSON.parse(localStorage.getItem('storedStrings')) || [];
    const updatedStrings = storedStrings.filter((s) => s !== str);
    localStorage.setItem('storedStrings', JSON.stringify(updatedStrings));
}

export const onlyUnique = (value, index, array) =>
    array.findIndex((el) => el.search === value.search) === index;

export const sortAlphabeticallyPredicate = (el1, el2) => {
    return el1 < el2 ? -1 : 1;
}