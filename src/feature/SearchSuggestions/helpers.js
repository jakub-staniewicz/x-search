export function storeStringInLocalStorage(str) {
    const storedStrings = JSON.parse(localStorage.getItem('storedStrings')) || [];
    storedStrings.push(str);
    localStorage.setItem('storedStrings', JSON.stringify(storedStrings));
}

export function getAllStoredStrings() {
    return JSON.parse(localStorage.getItem('storedStrings')) || [];
}
export function removeStringFromLocalStorage(str) {
    
    const storedStrings = JSON.parse(localStorage.getItem('storedStrings')) || [];
    const updatedStrings = storedStrings.filter((s) => s !== str);
    localStorage.setItem('storedStrings', JSON.stringify(updatedStrings));
}

export function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
}