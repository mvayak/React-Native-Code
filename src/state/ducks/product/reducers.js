import types from './types';
import _ from 'lodash';
/**
 * SECTION Reducers
 */
const initialProductState = {
  // Home
  isHomeLoading: false,
  homeCollections: null,
  homeCategories: null,
  homeError: null,
  homeNextLink: null,
  homeTotal: null,

  // Last seen + last scanned
  lastSeen: [],
  lastSearched: [],
  lastScanned: [],

  // Search
  searchNextLink: null,
  searchContext: null,
  searchTotal: null,
  searchData: null,
  searchQuery: null,
  searchPage: null,
  isSearchLoading: false,

  // Search filters
  isLoadingSearchFilters: false,
  searchFilters: {
    brands: [],
    shops: [],
    allergens: [],
    nutritionalValues: [],
    ingredients: [],
  },
  activeSearchFilters: {
    brands: [],
    shops: [],
    allergens: [],
    nutritionalValues: [],
    ingredients: [],
  },

  // Custom behaviour
  showProductDetails: false,
  productPosition: 0
};

const reducer = (state = initialProductState, action) => {
  switch (action.type) {
    // Home Screen
    case types.SET_IS_HOME_LOADING:
      return {
        ...state,
        isHomeLoading: action.payload.status,
      };
    case types.SET_HOME:
      return {
        ...state,
        homeCollections: action.payload.collections,
        homeCategories: action.payload.categories,
        homeNextLink: action.payload.nextLink,
        homeTotal: action.payload.total,
      };

    case types.SET_HOME_WITHOUT_CATEGORIES:
      return {
        ...state,
        homeCollections: action.payload.collections,
      };

    case types.SET_HOME_ERROR:
      return { ...state, homeError: action.payload.error };

    case types.SET_SHOW_PRODUCT_DETAILS:
      return { ...state, showProductDetails: action.payload };

    case types.UPDATE_LAST_SEEN:
      return {
        ...state,
        lastSeen: action.payload.products,
      };

    case types.UPDATE_LAST_SEARCHED:
      return {
        ...state,
        lastSearched: action.payload.queries,
      };

    case types.SET_IS_SCANNING:
      return { ...state, isScanning: action.payload.status };
    case types.SET_SCAN_PRODUCT:
      return { ...state, scanProduct: action.payload.product };
    case types.SET_SCAN_ERROR:
      return { ...state, scanError: action.payload.error };
    case types.UPDATE_LAST_SCANNED:
      return {
        ...state,
        lastScanned: action.payload.products,
      };

    // Product Search
    case types.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload.query,
      };
    case types.SET_IS_SEARCH_LOADING:
      return {
        ...state,
        isSearchLoading: action.payload.status,
      };
    case types.SET_SEARCH_ERROR:
      return {
        ...state,
        searchError: action.payload.error,
      };
    case types.SET_SEARCH_RESULT:
      return {
        ...state,

        searchNextLink: action.payload.nextLink,
        searchContext: action.payload.context,
        searchTotal: action.payload.total,
        searchData: action.payload.data,
        searchPage: action.payload.page,
      };
    case types.RESET_SEARCH:
      return {
        ...state,
        searchNextLink: null,
        searchContext: null,
        searchTotal: null,
        searchData: null,
        searchQuery: null,
        isSearchLoading: false,
      };

    case types.SET_IS_LOADING_SEARCH_FILTERS:
      return {
        ...state,
        isLoadingSearchFilters: action.payload.state,
      };

    case types.DO_UPDATE_SEARCH_FILTERS:
      return {
        ...state,
        searchFilters: action.payload.filters,
      };

    case types.DO_UPDATE_ACTIVE_SEARCH_FILTERS:
      return {
        ...state,
        activeSearchFilters: action.payload.filters,
      };
    case types.SET_PRODUCT_POSITION:
      return {
        ...state,
        productPosition: action.payload.position,
      };
    default:
      return state;
  }
};

export default reducer;
