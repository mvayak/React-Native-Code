import _ from 'lodash';

const SORT_MODES = {
  GRID: 'GRID',
  LIST: 'LIST',
};

/**
 * Sort products return 3 sectioned arrays
 *
 * `{ date_added, name, categories }`
 *
 * @param {[]} products
 */
const doSortFavoriteProducts = products => {
  const sorted = {
    date_added: _.sortBy(products, 'date_added'),
    name: _(products)
      .groupBy(p => p.name[0].toUpperCase())
      .map((data, title) => ({title, data}))
      .value(),
  };

  return sorted;
};

export default {
  SORT_MODES,
  doSortFavoriteProducts,
};
