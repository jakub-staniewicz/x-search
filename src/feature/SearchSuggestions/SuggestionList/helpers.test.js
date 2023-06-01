import { getAllStoredStrings, setAllStoredStrings, onlyUnique, sortAlphabeticallyPredicate } from './helpers';
describe('getAllStoredStrings', () => {
    it('returns an empty array if there are no stored strings', () => {
        localStorage.clear();
        expect(getAllStoredStrings()).toEqual([]);
    });
    it('returns an array of stored strings', () => {
        const strings = ['test string 1', 'test string 2'];
        localStorage.setItem('storedStrings', JSON.stringify(strings));
        expect(getAllStoredStrings()).toEqual(strings);
    });
});

describe('setAllStoredStrings', () => {
    it('sets the stored strings in local storage', () => {
        const strings = ['test string 1', 'test string 2'];
        setAllStoredStrings(strings);
        expect(JSON.parse(localStorage.getItem('storedStrings'))).toEqual(strings);
    });
});

describe('onlyUnique', () => {
    it('returns true if the value is unique in the array', () => {
        const value = { search: 'test search 1' };
        const index = 0;
        const array = [{ search: 'test search 1' }, { search: 'test search 2' }];
        expect(onlyUnique(value, index, array)).toBe(true);
    });
    it('returns false if the value is not unique in the array', () => {
        const value = { search: 'test search' };
        const index = 1;
        const array = [{ search: 'test search' }, { search: 'test search' }];
        expect(onlyUnique(value, index, array)).toBe(false);
    });
});

describe('sortAlphabeticallyPredicate', () => {
    it('sorts two elements alphabetically', () => {
        const el1 = 'test element 1';
        const el2 = 'test element 2';
        expect(sortAlphabeticallyPredicate(el1, el2)).toBe(-1);
        expect(sortAlphabeticallyPredicate(el2, el1)).toBe(1);
    });
});
