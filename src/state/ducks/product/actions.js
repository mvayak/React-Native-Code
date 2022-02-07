import types from './types';

const doSetIsHomeLoading = status => ({
  type: types.SET_IS_HOME_LOADING,
  payload: {
    status,
  },
});
const doSetScanning = status => ({
  type: types.SET_IS_SCANNING,
  payload: { status },
});
const doSetScanProduct = product => ({
  type: types.SET_SCAN_PRODUCT,
  payload: { product },
});
const doSetScanError = error => ({
  type: types.SET_SCAN_ERROR,
  payload: { error },
});
const doSetHome = (collections, categories, nextLink, total) => ({
  type: types.SET_HOME,
  payload: {
    collections,
    categories,
    nextLink,
    total,
  },
});
const doSetHomeWithoutCategories = collections => ({
  type: types.SET_HOME_WITHOUT_CATEGORIES,
  payload: {
    collections,
  },
});
const doSetHomeError = error => ({
  type: types.SET_HOME_ERROR,
  payload: {
    error,
  },
});
const doUpdateLastSeen = products => ({
  type: types.UPDATE_LAST_SEEN,
  payload: { products },
});
const doUpdateLastSearched = queries => ({
  type: types.UPDATE_LAST_SEARCHED,
  payload: { queries },
});
const doUpdateLastScanned = products => ({
  type: types.UPDATE_LAST_SCANNED,
  payload: { products },
});

/** Search */
const doSetSearchQuery = query => ({
  type: types.SET_SEARCH_QUERY,
  payload: { query },
});
const doSetIsSearchLoading = status => ({
  type: types.SET_IS_SEARCH_LOADING,
  payload: { status },
});
const doSetSearchError = error => ({
  type: types.SET_SEARCH_ERROR,
  payload: { error },
});
const doSetSearchResult = (data, context, total, nextLink, page) => ({
  type: types.SET_SEARCH_RESULT,
  payload: { data, context, total, nextLink, page },
});
const doResetSearch = () => ({
  type: types.RESET_SEARCH,
  payload: {},
});

const doSetIsLoadingSearchFilters = state => ({
  type: types.SET_IS_LOADING_SEARCH_FILTERS,
  payload: { state },
});
const doUpdateSearchFilters = filters => ({
  type: types.DO_UPDATE_SEARCH_FILTERS,
  payload: { filters },
});
const doUpdateActiveSearchFilters = filters => ({
  type: types.DO_UPDATE_ACTIVE_SEARCH_FILTERS,
  payload: { filters },
});

const doSetShowProductDetails = state => ({
  type: types.SET_SHOW_PRODUCT_DETAILS,
  payload: state,
});

const doSetProductPosition = position => ({
  type: types.SET_PRODUCT_POSITION,
  payload: position,
});

export default {
  // Home
  doSetIsHomeLoading,
  doSetHome,
  doSetHomeWithoutCategories,
  doSetHomeError,

  // Last seen
  doUpdateLastSeen,
  doUpdateLastSearched,
  doUpdateLastScanned,

  // Search
  doSetIsSearchLoading,
  doSetSearchQuery,
  doSetSearchResult,
  doResetSearch,
  doSetSearchError,

  // Search filters
  doSetIsLoadingSearchFilters,
  doUpdateSearchFilters,
  doUpdateActiveSearchFilters,

  // Scanner
  doSetScanning,
  doSetScanProduct,
  doSetScanError,

  doSetShowProductDetails,
  doSetProductPosition,
};
