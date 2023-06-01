import { movies } from '../../../data/movies';
import { ELEMENTS_PER_PAGE } from './constants';

function filterListByTitle(list, searchTerm) {
  return list?.filter((item) => {
    return (
      typeof item.title === 'string' &&
      item?.title?.toLowerCase().includes(searchTerm?.toLowerCase())
    );
  });
}

export const getSearchResults = (searchTerm, offset) => {
  const allResults = filterListByTitle(movies, searchTerm);
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          results: allResults?.slice(offset, offset + ELEMENTS_PER_PAGE),
          totalListLength: allResults?.length ?? 0
        }),
      Math.random() * 500
    );
  });
};
