import { movies } from '../../../data/movies';
import { ELEMENTS_PER_PAGE } from './constants';

function filterListByTitle(list, searchTerm) {
    return list?.filter((item) => {
        return typeof item.title === 'string'
            && item?.title?.toLowerCase().includes(searchTerm?.toLowerCase())
    });
}

export const getSearchResults = (searchTerm, offset) => filterListByTitle(movies, searchTerm)
    ?.slice(offset, offset + ELEMENTS_PER_PAGE);


