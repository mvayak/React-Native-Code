import actions from './actions';
import * as service from '../../utils/services';
import _ from 'lodash';

const doFetchHome = (isLoadMore = false) => async (dispatch, getState) => {
  const {
    product: { homeNextLink, homeCollections, isHomeLoading },
  } = getState();

  if (
    (isLoadMore && isHomeLoading) ||
    (isLoadMore === true && homeNextLink === null)
  ) {
    return;
  }

  dispatch(actions.doSetIsHomeLoading(true));
  dispatch(actions.doSetHomeError(null));

  try {
    const result = await service.loadHome(isLoadMore ? homeNextLink : null);

    const { collections, categories, nextLink, total } = result;

    dispatch(
      actions.doSetHome(
        isLoadMore ? [...homeCollections, ...collections] : collections,
        categories,
        nextLink,
        total,
      ),
    );
  } catch (error) {
    dispatch(actions.doSetHomeError(error));
  }

  dispatch(actions.doSetIsHomeLoading(false));
};

const doFetchCategory = category => async (dispatch, getState) => {
  dispatch(actions.doSetIsHomeLoading(true));
  dispatch(actions.doSetHomeError(null));

  try {
    const { collections } = await service.loadHome(null, category);

    dispatch(actions.doSetHomeWithoutCategories(collections));
  } catch (error) {
    dispatch(actions.doSetHomeError(error));
  }

  dispatch(actions.doSetIsHomeLoading(false));
};

const doSearchProducts = (params, isLoadMore = false) => async (
  dispatch,
  getState,
) => {
  const {
    product: {
      searchNextLink,
      searchQuery,
      searchData,
      activeSearchFilters,
      isSearchLoading,
    },
  } = getState();

  let { query } = params;
  if (!query) {
    query = searchQuery;
  }

  if (isLoadMore && isSearchLoading) {
    return;
  }

  // if (query !== searchQuery) {
  //   dispatch(actions.doSetSearchResult(searchResult, 1));
  // }

  dispatch(actions.doSetSearchQuery(query));
  dispatch(actions.doSetIsSearchLoading(true));

  // Prepare params
  params = {
    ...params,
    ...{
      brand_id: params.brand_id
        ? params.brand_id
        : activeSearchFilters && activeSearchFilters.brands
          ? activeSearchFilters.brands.map(item => item.id).join(',')
          : null,
      shop_id: params.shop_id
        ? params.shop_id
        : activeSearchFilters && activeSearchFilters.shops
          ? activeSearchFilters.shops.map(item => item.id).join(',')
          : null,
      // category_id:
      //   activeSearchFilters && activeSearchFilters.categories
      //     ? activeSearchFilters.categories.map(item => item.id).join(',')
      //     : null,
      allergen_id:
        activeSearchFilters && activeSearchFilters.allergens
          ? activeSearchFilters.allergens.map(item => item.id).join(',')
          : null,
      // nutritional_value_id: activeSearchFilters.nutritionalValues ? activeSearchFilters.nutritionalValues.map((item) => item.id) : null,
      ingredient_id:
        activeSearchFilters && activeSearchFilters.ingredients
          ? activeSearchFilters.ingredients.map(item => item.id).join(',')
          : null,
    },
  };
  try {
    const result = await service.search(
      params,
      isLoadMore ? searchNextLink : null,
    );

    if (result && result.data) {
      dispatch(
        actions.doSetSearchResult(
          isLoadMore ? [...searchData, ...result.data] : result.data,
          result.context,
          result.total,
          result.nextLink,
          result.page,
        ),
      );
      dispatch(actions.doSetSearchError(null));
      dispatch(actions.doSetIsSearchLoading(false));
    }
  } catch (error) {
    // console.log('422', error.response);
    if (error && error.message && error.message === 'Automatically') {
      return;
    }
    dispatch(actions.doSetSearchError(error));
    dispatch(actions.doSetIsSearchLoading(false));
  }
};

const doResetSearch = () => (dispatch, getState) => {
  dispatch(actions.doResetSearch());
  dispatch(actions.doSetIsSearchLoading(false));
};

const doScanProduct = barCode => async (dispatch, getState) => {
  dispatch(actions.doSetScanError(null));
  dispatch(actions.doSetScanning(true));

  try {
    const product = await service.scanProduct(barCode);

    dispatch(actions.doSetScanProduct(product));
    dispatch(addToLastScanned(product));
  } catch (error) {
    dispatch(actions.doSetScanError(error));
  }

  dispatch(actions.doSetScanning(false));
};

const doAddToLastSeen = product => (dispatch, getState) => {
  const {
    product: { lastSeen },
  } = getState();

  const index = _.findIndex(lastSeen, { id: product.id });

  if (index !== -1) {
    lastSeen.splice(index, 1);
  }

  // Add at beginning
  product.last_seen_at = Date.now();
  lastSeen.unshift(product);

  const max = 20;

  dispatch(actions.doUpdateLastSeen(lastSeen.slice(0, max)));
};

const doRemoveFromLastSeen = product => (dispatch, getState) => {
  const {
    product: { lastSeen },
  } = getState();

  const index = _.findIndex(lastSeen, { id: product.id });

  if (index !== -1) {
    lastSeen.splice(index, 1);
  }

  const max = 20;

  dispatch(actions.doUpdateLastSeen(lastSeen.slice(0, max)));
};

const doAddToLastSearched = query => (dispatch, getState) => {
  const {
    product: { lastSearched },
  } = getState();

  let currentLastSearched = lastSearched;

  // Fallback for older versions
  if (typeof lastSearched === 'undefined') {
    dispatch(actions.doUpdateLastSearched([]));
    currentLastSearched = [];
  }

  const index = currentLastSearched.indexOf(query);

  if (index !== -1) {
    currentLastSearched.splice(index, 1);
  }

  // Add at beginning
  currentLastSearched.unshift(query);

  const max = 20;

  dispatch(actions.doUpdateLastSearched(currentLastSearched.slice(0, max)));
};

const doRemoveFromLastSearched = query => (dispatch, getState) => {
  const {
    product: { lastSearched },
  } = getState();

  const index = lastSearched.indexOf(query);

  if (index !== -1) {
    lastSearched.splice(index, 1);
  }

  const max = 20;

  dispatch(actions.doUpdateLastSearched(lastSearched.slice(0, max)));
};

const addToLastScanned = product => (dispatch, getState) => {
  const {
    product: { lastScanned = [] },
  } = getState();

  const index = _.findIndex(lastScanned, { id: product.id });

  if (index !== -1) {
    lastScanned.splice(index, 1);
  }

  product.last_scanned_at = Date.now();
  lastScanned.unshift(product);

  const max = 20;

  dispatch(actions.doUpdateLastScanned(lastScanned.slice(0, max)));
};

const doRemoveFromLastScanned = product => (dispatch, getState) => {
  const {
    product: { lastScanned = [] },
  } = getState();

  const index = _.findIndex(lastScanned, { id: product.id });

  if (index !== -1) {
    lastScanned.splice(index, 1);
  }

  const max = 20;

  dispatch(actions.doUpdateLastScanned(lastScanned.slice(0, max)));
};

const doClearScan = () => dispatch => {
  dispatch(actions.doSetScanning(false));
  dispatch(actions.doSetScanError(null));
  dispatch(actions.doSetScanProduct(null));
};

const doRefreshSearchFilters = () => async (dispatch, getState) => {
  // Enable loading
  dispatch(actions.doSetIsLoadingSearchFilters(true));

  // Fetch and set filters
  const { filters } = await service.loadSearchFilters();
  dispatch(actions.doUpdateSearchFilters(filters));

  // Disable loading
  dispatch(actions.doSetIsLoadingSearchFilters(false));
};

const doResetActiveSearchFilters = () => async (dispatch, getState) => {
  const filters = {
    brands: [],
    ingredients: [],
    nutritionalValues: [],
    allergens: [],
  };

  dispatch(actions.doUpdateActiveSearchFilters(filters));
};

const doResetActiveSearchFilterType = type => async (dispatch, getState) => {
  const {
    product: { activeSearchFilters },
  } = getState();

  let activeFilters = activeSearchFilters;

  activeFilters[type] = [];

  dispatch(actions.doUpdateActiveSearchFilters(activeFilters));
};

const doToggleActiveSearchFiltersItem = (entity, item) => async (
  dispatch,
  getState,
) => {
  const {
    product: { activeSearchFilters },
  } = getState();

  let activeFilters = activeSearchFilters;

  // Check entity
  if (typeof activeFilters[entity] === 'undefined') {
    activeFilters[entity] = [];
  }

  const found = _.findIndex(activeFilters[entity], {
    id: item.id,
  });

  if (found == -1) {
    // Add
    activeFilters[entity].push(item);
  } else {
    // Remove
    activeFilters[entity].splice(found, 1);
  }

  dispatch(actions.doUpdateActiveSearchFilters(activeFilters));
};

export default {
  doFetchHome,
  doFetchCategory,
  doAddToLastSeen,
  doRemoveFromLastSeen,

  // Search
  doSearchProducts,
  doResetSearch,

  doRefreshSearchFilters,
  doResetActiveSearchFilters,
  doToggleActiveSearchFiltersItem,
  doResetActiveSearchFilterType,

  doScanProduct,
  doRemoveFromLastScanned,
  doClearScan,

  doAddToLastSearched,
  doRemoveFromLastSearched,
};
