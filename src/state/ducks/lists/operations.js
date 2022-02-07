import actions from './actions';
import selectors from './selectors';
import _ from 'lodash';
import {listCommon} from '.';
import * as service from '../../utils/services';
import {commonOperations} from '../common';

const doAddToFavoriteList = product => (dispatch, getState) => {
  const {
    lists: {currentFavoriteListId: list_id, favoriteLists: lists},
  } = getState();

  const {id: product_id} = product;
  const list = selectors.currentFavoriteList(getState());
  const {products} = list;
  const {currentFavoriteListId} = getState().lists;

  const product_index = _.findIndex(products, {id: product.id});

  // Product is already in list
  if (product_index > 0) {
    return;
  }

  product.date_added = Date.now();
  products.push(product);

  const sortedProducts = listCommon.doSortFavoriteProducts(products);

  dispatch(
    commonOperations.doSetSnackbar({
      title: 'Zur Merkliste hinzugefügt.',
      undo: () => {
        dispatch(doRemoveFromFavoriteList(product));
      },
      undoTitle: 'Rückgängig',
    }),
  );

  dispatch(
    actions.doUpdateCurrentFavoriteListProducts(
      products,
      currentFavoriteListId,
      sortedProducts,
    ),
  );

  // Tracking
  service.track.addToFavoriteList(product_id);
};

const doRemoveFromFavoriteList = product => (dispatch, getState) => {
  const {
    lists: {currentFavoriteListId: list_id, favoriteLists: lists},
  } = getState();

  const list = selectors.currentFavoriteList(getState());
  const {id: product_id} = product;
  var {products} = list;
  const {currentFavoriteListId} = getState().lists;

  _.remove(products, {id: product.id});

  const sortedProducts = listCommon.doSortFavoriteProducts(products);

  dispatch(
    actions.doUpdateCurrentFavoriteListProducts(
      products,
      currentFavoriteListId,
      sortedProducts,
    ),
  );

  // Tracking
  service.track.removeFromFavoriteList(product_id);
};

export default {
  doAddToFavoriteList,
  doRemoveFromFavoriteList,
};
