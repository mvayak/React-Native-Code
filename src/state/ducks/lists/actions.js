import types from './types';

const doSetCurrentFavoriteList = (list, listId) => ({
  type: types.SET_CURRENT_FAVORITE_LIST,
  payload: {list, listId},
});

const doUpdateCurrentFavoriteListProducts = (
  products,
  listId,
  sortedProducts,
) => ({
  type: types.UPDATE_CURRENT_FAVORITE_LIST_PRODUCTS,
  payload: {products, listId, sortedProducts},
});

const doUpdateCurrentProduct = product => ({
  type: types.UPDATE_CURRENT_PRODUCT,
  payload: {product},
});

export default {
  doSetCurrentFavoriteList,
  doUpdateCurrentFavoriteListProducts,

  doUpdateCurrentProduct,
};
