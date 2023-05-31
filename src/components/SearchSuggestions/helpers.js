export function storeStringInLocalStorage(str) {
    const storedStrings = JSON.parse(localStorage.getItem('storedStrings')) || [];
    storedStrings.push(str);
    localStorage.setItem('storedStrings', JSON.stringify(storedStrings));
}

export function getAllStoredStrings() {
    return JSON.parse(localStorage.getItem('storedStrings')) || [];
}

export function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
}