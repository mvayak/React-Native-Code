import _ from 'lodash';
const currentFavoriteList = (state, sortMode) => {
  const {currentFavoriteListId, favoriteLists} = state.lists;

  const list =
    favoriteLists[
      _.findIndex(favoriteLists, l => l.id === currentFavoriteListId)
    ];

  // sorted = _.chain(products)
  //   // Group the elements of Array based on `color` property
  //   .groupBy('shop.name')
  //   // `key` is group's name (color), `value` is the array of objects
  //   .map((value, key) => ({datum: key, products: value}))
  //   .value();
  // sorted = _.values(_.groupBy(products, 'shop.name'));

  return {
    ...list,
    ...{
      sortedProducts: {
        name: _.values(_.groupBy(list.products, 'shop.name')),
      },
    },
  };
};
const addProductButtonStates = (state, product) => {
  if (product === undefined || product === null) {
    return {
      isInFavorites: false,
    };
  }

  return {
    isInFavorites: isProductInCurrentFavoriteList(state, product),
  };
};

const isProductInCurrentFavoriteList = (state, product) => {
  const list = currentFavoriteList(state);
  const {products} = list;

  const index = _.findIndex(products, p => p.id === product.id);

  return index > -1;
};

export default {
  currentFavoriteList,
  isProductInCurrentFavoriteList,
  addProductButtonStates,
};
