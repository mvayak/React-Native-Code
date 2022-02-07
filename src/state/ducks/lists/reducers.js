import types from './types';
import _ from 'lodash';
import helpers from './../../../helpers';

// Template for a single favorite list
const favoriteListTemplate = () => {
  return {
    id: helpers.uuidv4(),
    name: 'Favoritenliste',
    products: [],
    order: 0,
    created_at: Date.now(),
    updated_at: Date.now(),
  };
};
const initialFavoriteList = favoriteListTemplate();

const initialState = {
  // Shop product mapping
  currentProduct: null,

  currentFavoriteListId: initialFavoriteList.id,
  favoriteLists: [initialFavoriteList],
};

const listPropReducer = (state, action) => {
  const index = _.findIndex(state, {id: action.payload.listId});

  switch (action.type) {
    case types.UPDATE_CURRENT_FAVORITE_LIST_PRODUCTS: {
      return [
        ...state.slice(0, index),
        {
          ...state[index],
          products: action.payload.products,
          updated_at: Date.now(),
        },
        ...state.slice(index + 1),
      ];
    }

    default:
      return state;
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CURRENT_FAVORITE_LIST: {
      return {...state, currentFavoriteListId: action.payload.list.id};
    }
    case types.UPDATE_CURRENT_FAVORITE_LIST_PRODUCTS: {
      return {
        ...state,
        favoriteLists: listPropReducer(state.favoriteLists, action),
      };
    }

    case types.UPDATE_CURRENT_PRODUCT:
      return {
        ...state,
        currentProduct: action.payload.product,
      };

    default:
      return state;
  }
};

export default reducer;
